import { spawn } from 'node:child_process'
import { createServer, request } from 'node:http'
import { connect } from 'node:net'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const slidevBin = join(projectRoot, 'node_modules', '.bin', 'slidev')
const publicPort = Number(process.env.VM_GUIDE_PORT || 3030)
const firstInternalPort = Number(process.env.VM_GUIDE_INTERNAL_PORT || 3130)

const decks = [
  {
    entry: 'week-36/vm-installationsguide/vm-installationsguide.md',
    deck: 'e5c2a3a8-4295-48ac-9e81-f3e685d29ca6',
    slide: 'e9cce577-68ea-4eda-b59c-9170eff03fa9',
  },
  {
    entry: 'week-36/vm-installationsguide/os-guides/linux-guide.md',
    deck: 'bc4eacb4-0843-485b-8238-e958e3310aaf',
    slide: '6ae609d0-76c4-47ce-8969-948d8cc4e639',
  },
  {
    entry: 'week-36/vm-installationsguide/os-guides/windows-guide.md',
    deck: 'f3f3c0af-8662-4bc5-be7c-9b84b1aa02b9',
    slide: 'fe64182b-7a68-4507-94da-cd199a90a726',
  },
  {
    entry: 'week-36/vm-installationsguide/os-guides/mac/mac-guide.md',
    deck: '439cc56f-5c98-46f4-b534-60408e50f9c2',
    slide: 'a13f4b45-9f39-430f-8cbf-1cfe083e7d15',
  },
  {
    entry: 'week-36/vm-installationsguide/os-guides/mac/intel-based.md',
    deck: '6d3448a7-65fd-4991-867c-03c7bddedd17',
    slide: '84447088-9762-432e-b10a-5db4b3323c3d',
  },
  {
    entry: 'week-36/vm-installationsguide/os-guides/mac/silicon-based.md',
    deck: 'c92f7269-d980-4bf6-a6eb-8bc729578861',
    slide: 'd3c3d959-8e8e-4f66-b967-88db63b4c977',
  },
].map((deck, index) => ({ ...deck, port: firstInternalPort + index }))

const deckByGuid = new Map(decks.map(deck => [deck.deck, deck]))
const selector = decks[0]
const selectorPath = `/${selector.deck}/${selector.slide}/`
const children = []
let proxyServer
let shuttingDown = false

function targetForUrl(url = '/') {
  const deckGuid = url.split('/')[1]
  return deckByGuid.get(deckGuid)
}

function proxyHttp(req, res) {
  const target = targetForUrl(req.url)

  if (!target) {
    res.writeHead(302, { location: selectorPath })
    res.end()
    return
  }

  const proxyReq = request({
    hostname: 'localhost',
    port: target.port,
    path: req.url,
    method: req.method,
    headers: req.headers,
  }, (proxyRes) => {
    res.writeHead(proxyRes.statusCode ?? 502, proxyRes.headers)
    proxyRes.pipe(res)
  })

  proxyReq.on('error', (error) => {
    if (!res.headersSent)
      res.writeHead(502, { 'content-type': 'text/plain; charset=utf-8' })
    res.end(`Slidev-serveren er ikke klar: ${error.message}`)
  })

  req.pipe(proxyReq)
}

function proxyWebSocket(req, socket, head) {
  const target = targetForUrl(req.url)

  if (!target) {
    socket.destroy()
    return
  }

  const upstream = connect(target.port, 'localhost', () => {
    const requestLine = `${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`
    const headers = []

    for (let index = 0; index < req.rawHeaders.length; index += 2)
      headers.push(`${req.rawHeaders[index]}: ${req.rawHeaders[index + 1]}`)

    upstream.write(`${requestLine}${headers.join('\r\n')}\r\n\r\n`)
    if (head.length)
      upstream.write(head)

    socket.pipe(upstream).pipe(socket)
  })

  upstream.on('error', () => socket.destroy())
  socket.on('error', () => upstream.destroy())
}

function waitForDeck(deck, attempts = 80) {
  return new Promise((resolve, reject) => {
    const check = (remaining) => {
      const req = request({
        hostname: 'localhost',
        port: deck.port,
        path: `/${deck.deck}/`,
        method: 'GET',
      }, (res) => {
        res.resume()
        resolve()
      })

      req.on('error', () => {
        if (remaining <= 1) {
          reject(new Error(`Slidev kunne ikke starte ${deck.entry}`))
          return
        }

        setTimeout(() => check(remaining - 1), 250)
      })

      req.end()
    }

    check(attempts)
  })
}

function openBrowser(url) {
  if (process.env.VM_GUIDE_NO_OPEN)
    return

  let command
  let args

  if (process.platform === 'darwin') {
    command = 'open'
    args = [url]
  }
  else if (process.platform === 'win32') {
    command = 'cmd'
    args = ['/c', 'start', '', url]
  }
  else {
    command = 'xdg-open'
    args = [url]
  }

  const opener = spawn(command, args, { detached: true, stdio: 'ignore' })
  opener.unref()
}

function shutdown(signal = 'SIGTERM', exitCode = 0) {
  if (shuttingDown)
    return

  shuttingDown = true
  proxyServer?.close()

  for (const child of children) {
    if (!child.killed)
      child.kill(signal)
  }

  process.exitCode = exitCode
}

for (const deck of decks) {
  const child = spawn(slidevBin, [
    deck.entry,
    '--port', String(deck.port),
    '--base', `/${deck.deck}/`,
    '--log', 'error',
  ], {
    cwd: projectRoot,
    env: { ...process.env, NODE_NO_WARNINGS: '1' },
    stdio: ['pipe', 'ignore', 'inherit'],
  })

  child.on('exit', (code, signal) => {
    if (!shuttingDown) {
      console.error(`${deck.entry} stoppede uventet (${signal ?? code ?? 'ukendt fejl'})`)
      shutdown('SIGTERM', code || 1)
    }
  })

  children.push(child)
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))

try {
  await Promise.all(decks.map(deck => waitForDeck(deck)))

  proxyServer = createServer(proxyHttp)
  proxyServer.on('upgrade', proxyWebSocket)
  proxyServer.on('error', (error) => {
    console.error(`Den lokale gateway kunne ikke starte: ${error.message}`)
    shutdown('SIGTERM', 1)
  })

  await new Promise((resolve, reject) => {
    proxyServer.once('error', reject)
    proxyServer.listen(publicPort, '127.0.0.1', resolve)
  })

  const url = `http://127.0.0.1:${publicPort}${selectorPath}`
  console.log(`VM-guides: ${url}`)
  console.log(`Tryk Ctrl+C for at stoppe alle ${decks.length} Slidev-servere.`)
  openBrowser(url)
}
catch (error) {
  console.error(error.message)
  shutdown('SIGTERM', 1)
}
