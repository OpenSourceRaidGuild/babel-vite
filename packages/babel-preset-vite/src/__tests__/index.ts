import { promises as fs } from 'fs'
import path from 'path'
import cases from 'jest-in-case'
import * as babel from '@babel/core'
import preset from '..'

expect.addSnapshotSerializer({
  test: (val: unknown) => typeof val === 'string',
  print: (val: unknown) => val as string
})

cases(
  'vite',
  async ({ name, options }) => {
    const fixturePath = path.join(__dirname, 'fixtures', name)
    const inputFile = path.join(fixturePath, 'input.ts')
    const input = await fs.readFile(inputFile, { encoding: 'utf8' })

    const output = await babel.transformAsync(input, {
      filename: inputFile,
      presets: [options ? [preset, options] : preset]
    })

    const actual = output?.code ?? undefined

    const formattedOutput = [input, '\n\n      ↓ ↓ ↓ ↓ ↓ ↓\n\n', fixLineEndings(actual)].join('')
    expect(`\n${formattedOutput}\n`).toMatchSnapshot(name)
  },
  [
    { name: 'all', options: { env: true, glob: true } },
    { name: 'env-only', options: { env: true, glob: false } },
    { name: 'glob-only', options: { env: false, glob: true } },
    { name: 'none' }
  ]
)

function fixLineEndings(string?: string) {
  return string?.replace(/\r?\n/g, '\n').trim()
}
