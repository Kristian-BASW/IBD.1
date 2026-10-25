import { randomUUID } from 'node:crypto'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseSync, stringify } from '@slidev/parser'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const publicationPath = join(projectRoot, 'publication-guids.json')
const deckFilePattern = /^(?:week-.*|vm-installationsguide)\.md$/
const checkOnly = process.argv.includes('--check')
const guidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const rootEntries = await readdir(projectRoot, { withFileTypes: true })
const publication = JSON.parse(await readFile(publicationPath, 'utf8'))
const rootDeckNames = rootEntries
  .filter(entry => entry.isFile() && deckFilePattern.test(entry.name))
  .map(entry => entry.name)

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

const nestedDeckNames = []
for (const entry of rootEntries) {
  if (entry.isDirectory() && /^week-/.test(entry.name))
    nestedDeckNames.push(...await findMarkdownDecks(join(projectRoot, entry.name), entry.name))
}

const deckNames = [...new Set([...rootDeckNames, ...nestedDeckNames])]
  .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }))

publication.decks ||= {}

let publicationChanged = false
let assignedDeckGuids = 0
let assignedSlideGuids = 0

function requireOrCreateGuid(value, description) {
  if (guidPattern.test(value ?? ''))
    return value

  if (checkOnly)
    throw new Error(`${description} is missing a valid permanent GUID. Run "npm run slides:guids".`)

  publicationChanged = true
  return randomUUID()
}

publication.overview = requireOrCreateGuid(publication.overview, 'The publication overview')

function addRouteAlias(slide, guid) {
  const newline = slide.raw.includes('\r\n') ? '\r\n' : '\n'

  if (slide.frontmatterStyle === 'frontmatter') {
    slide.raw = slide.raw.replace(
      /^---[^\r\n]*\r?\n/,
      match => `${match}routeAlias: ${guid}${newline}`,
    )
    return
  }

  const content =
    slide.index > 0 ? slide.raw.replace(/^---[^\r\n]*(?:\r?\n)?/, '') : slide.raw
  slide.raw = [
    '---',
    `routeAlias: ${guid}`,
    '---',
    content.replace(/^\r?\n/, ''),
  ].join(newline)
}

function replaceRouteAlias(slide, guid) {
  slide.raw = slide.raw.replace(
    /^(routeAlias\s*:\s*).*$/m,
    `$1${guid}`,
  )
}

for (const deckName of deckNames) {
  const existingDeckGuid = publication.decks[deckName]
  const deckGuid = requireOrCreateGuid(existingDeckGuid, deckName)

  if (deckGuid !== existingDeckGuid) {
    publication.decks[deckName] = deckGuid
    assignedDeckGuids += 1
  }

  const deckPath = join(projectRoot, deckName)
  const markdown = await readFile(deckPath, 'utf8')
  const parsed = parseSync(markdown, deckPath)
  let deckChanged = false

  for (const slide of parsed.slides) {
    const existingAlias = slide.frontmatter?.routeAlias

    if (guidPattern.test(existingAlias ?? ''))
      continue

    if (checkOnly) {
      throw new Error(
        `${deckName} slide ${slide.index + 1} is missing a valid permanent GUID. ` +
          'Run "npm run slides:guids".',
      )
    }

    const guid = randomUUID()

    if (existingAlias)
      replaceRouteAlias(slide, guid)
    else
      addRouteAlias(slide, guid)

    assignedSlideGuids += 1
    deckChanged = true
  }

  if (deckChanged)
    await writeFile(deckPath, stringify(parsed), 'utf8')
}

if (publicationChanged) {
  await writeFile(
    publicationPath,
    `${JSON.stringify(publication, null, 2)}\n`,
    'utf8',
  )
}

if (checkOnly) {
  console.log('The overview, all decks, and all slides have permanent GUIDs.')
} else {
  console.log(
    `Assigned ${assignedDeckGuids} deck GUID(s) and ${assignedSlideGuids} slide GUID(s).`,
  )
}
