import { spawnSync } from 'node:child_process'
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseSync } from '@slidev/parser'
import vue from '@vitejs/plugin-vue'
import { build as viteBuild } from 'vite'

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const outputRoot = join(projectRoot, 'site')
const overviewRoot = join(projectRoot, 'overview')
const slidevBin = join(projectRoot, 'node_modules', '.bin', 'slidev')
const publicationPath = join(projectRoot, 'publication-guids.json')
const publication = JSON.parse(await readFile(publicationPath, 'utf8'))
const guidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function normalizeBasePath(value = '') {
  const trimmed = value.trim().replace(/^\/+|\/+$/g, '')
  return trimmed ? `/${trimmed}` : ''
}

const siteBasePath = normalizeBasePath(process.env.SITE_BASE_PATH)
const viteBase = siteBasePath ? `${siteBasePath}/` : '/'
const withBase = path => `${siteBasePath}${path}`
const rootEntries = await readdir(projectRoot, { withFileTypes: true })

async function findMarkdownDecks(directory, relativeDirectory) {
  const found = []
  const directoryEntries = await readdir(directory, { withFileTypes: true })

  for (const entry of directoryEntries) {
    const relativePath = join(relativeDirectory, entry.name)

    if (entry.isDirectory())
      found.push(...await findMarkdownDecks(join(directory, entry.name), relativePath))
    else if (entry.isFile() && entry.name.endsWith('.md'))
      found.push(relativePath)
  }

  return found
}

const rootDecks = rootEntries
  .filter(entry => entry.isFile() && /^week-.*\.md$/.test(entry.name))
  .map(entry => entry.name)
const nestedDecks = []

for (const entry of rootEntries) {
  if (entry.isDirectory() && /^week-/.test(entry.name))
    nestedDecks.push(...await findMarkdownDecks(join(projectRoot, entry.name), entry.name))
}

const entries = [...rootDecks, ...nestedDecks]
  .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }))

if (entries.length === 0)
  throw new Error('No publishable Slidev decks were declared')

if (!guidPattern.test(publication.overview ?? ''))
  throw new Error('The publication overview is missing a valid GUID')

const usedDeckGuids = new Map()
for (const entry of entries) {
  const deckGuid = publication.decks[entry]

  if (!guidPattern.test(deckGuid ?? ''))
    throw new Error(`${entry} is missing a valid GUID in publication-guids.json`)

  const previousEntry = usedDeckGuids.get(deckGuid)
  if (previousEntry)
    throw new Error(`${entry} and ${previousEntry} use the same deck GUID`)

  usedDeckGuids.set(deckGuid, entry)
}

const staticDirectories = rootEntries
  .filter(entry => entry.isDirectory() && (/^week-/.test(entry.name) || entry.name === 'pictures'))
  .map(entry => entry.name)

await rm(outputRoot, { recursive: true, force: true })
await mkdir(outputRoot, { recursive: true })

function notFoundPage() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Not found</title>
  </head>
  <body><main><h1>404</h1><p>Page not found.</p></main></body>
</html>
`
}

const decks = []

for (const entry of entries) {
  const deckGuid = publication.decks[entry]
  const deckPath = join(projectRoot, entry)
  const markdown = await readFile(deckPath, 'utf8')
  const slides = parseSync(markdown, entry).slides

  if (slides.length === 0)
    throw new Error(`${entry} contains no slides`)

  const slideGuids = slides.map((slide, index) => {
    const guid = slide.frontmatter?.routeAlias

    if (!guidPattern.test(guid ?? ''))
      throw new Error(`${entry} slide ${index + 1} is missing a valid routeAlias GUID`)

    return guid
  })

  const outputDirectory = join(outputRoot, deckGuid)
  console.log(`Building ${entry} at ${withBase(`/${deckGuid}/`)}`)

  const result = spawnSync(
    slidevBin,
    ['build', entry, '--base', withBase(`/${deckGuid}/`), '--out', outputDirectory],
    { cwd: projectRoot, stdio: 'inherit' },
  )

  if (result.error)
    throw result.error

  if (result.status !== 0)
    process.exit(result.status ?? 1)

  const builtIndexPath = join(outputDirectory, 'index.html')
  const appIndex = (await readFile(builtIndexPath, 'utf8')).replace(
    '</head>',
    '<meta name="robots" content="noindex, nofollow"></head>',
  )

  for (const slideGuid of slideGuids) {
    const slideDirectory = join(outputDirectory, slideGuid)
    await mkdir(slideDirectory, { recursive: true })
    await writeFile(join(slideDirectory, 'index.html'), appIndex)
  }

  await writeFile(builtIndexPath, notFoundPage())

  for (const directory of staticDirectories) {
    await cp(join(projectRoot, directory), join(outputDirectory, directory), { recursive: true })
  }

  const frontmatter = slides[0].frontmatter ?? {}
  if (!frontmatter.hideFromOverview) {
    decks.push({
      name: frontmatter.title || basename(entry, '.md'),
      url: withBase(`/${deckGuid}/${slideGuids[0]}/`),
    })
  }
}

await writeFile(join(outputRoot, 'decks.json'), `${JSON.stringify({ decks }, null, 2)}\n`)

await viteBuild({
  root: overviewRoot,
  base: viteBase,
  plugins: [vue()],
  define: {
    __BUILD_SHA__: JSON.stringify(process.env.BUILD_SHA?.slice(0, 7) || ''),
  },
  build: {
    outDir: outputRoot,
    emptyOutDir: false,
  },
})

const overviewHtml = await readFile(join(outputRoot, 'index.html'), 'utf8')
const overviewDirectory = join(outputRoot, publication.overview)
await mkdir(overviewDirectory, { recursive: true })
await writeFile(join(overviewDirectory, 'index.html'), overviewHtml)
await writeFile(join(outputRoot, 'index.html'), notFoundPage())
await writeFile(join(outputRoot, '404.html'), notFoundPage())
await writeFile(join(outputRoot, 'robots.txt'), 'User-agent: *\nDisallow: /\n')

console.log(`Built ${entries.length} deck(s). Overview: ${withBase(`/${publication.overview}/`)}`)
