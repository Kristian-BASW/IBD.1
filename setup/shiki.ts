import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dtdLanguages = JSON.parse(
  readFileSync(resolve(__dirname, '../shiki/dtd.shikiLanguages.json'), 'utf-8'),
)

const dtdLanguage = {
  ...dtdLanguages,
  name: 'dtd',
}

const gitignoreLanguage = {
  name: 'gitignore',
  aliases: ['ignore'],
  scopeName: 'source.gitignore',
  patterns: [
    { include: '#comment' },
    { include: '#negation' },
    { include: '#pattern' },
  ],
  repository: {
    comment: {
      patterns: [
        {
          name: 'comment.line.number-sign.gitignore',
          match: '\\s*#.*$',
        },
      ],
    },
    negation: {
      patterns: [
        {
          name: 'keyword.operator.negation.gitignore',
          match: '\\s*!',
        },
      ],
    },
    pattern: {
      patterns: [
        {
          name: 'string.unquoted.gitignore',
          match: '\\s*[^#!\\s].*$',
        },
      ],
    },
  },
}

export default () => ({
  langs: [
    'bash',
    'python',
    'sh',
    'shell',
    'yaml',
    'csharp',
    'zsh',
    dtdLanguage,
    gitignoreLanguage,
  ],
})
