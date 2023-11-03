import pluginTester from 'babel-plugin-tester'
import plugin from '..'

function withFileName(code: string) {
  return {
    code,
    babelOptions: { filename: __filename }
  }
}

pluginTester({
  plugin,
  pluginName: 'vite-meta-glob',
  snapshot: true,
  tests: {
    'glob all files': withFileName('const modules = import.meta.glob("./fixtures/**/*")'),
    'glob some files': withFileName('const modules = import.meta.glob("./fixtures/**/*{1,3}*")'),
    'glob no files': withFileName('const modules = import.meta.glob("./fixtures/**/not-found")'),
    'glob all files eagerly': withFileName(
      'const modules = import.meta.globEager("./fixtures/**/*")'
    ),
    'glob some files eagerly': withFileName(
      'const modules = import.meta.globEager("./fixtures/**/*{1,3}*")'
    ),
    'glob no files eagerly': withFileName(
      'const modules = import.meta.globEager("./fixtures/**/not-found")'
    ),
    'not import.meta': withFileName('const x = import.meta.other()'),
    'not import.meta function': withFileName('const x = import.meta.env'),
    'not import.meta.glob': withFileName('glob("./fixtures/**/*")'),
    'not import.meta.globEager': withFileName('globEager("./fixtures/**/*")'),
    'not a string arg': withFileName('globEager(1)'),
    'too many args': withFileName('globEager("./fixtures/**/*1*", "./fixtures/**/*2*")'),
    'no filename': 'import.meta.glob("./fixtures/**/*")',
    // ImportGlobOptions test cases
    'glob all files eagerly, with { eager: true }': withFileName(
      'const modules = import.meta.glob("./fixtures/**/*", { eager: true })'
    ),
    'glob some files eagerly, with { eager: true }': withFileName(
      'const modules = import.meta.glob("./fixtures/**/*{1,3}*", { eager: true })'
    ),
    'glob no files eagerly, with { eager: true }': withFileName(
      'const modules = import.meta.glob("./fixtures/**/not-found", { eager: true })'
    ),
    'glob all files normally, with { eager: false }': withFileName(
      'const modules = import.meta.glob("./fixtures/**/*", { eager: false })'
    ),
    'glob some files normally, with { eager: false }': withFileName(
      'const modules = import.meta.glob("./fixtures/**/*{1,3}*", { eager: false })'
    ),
    'glob no files normally, with { eager: false }': withFileName(
      'const modules = import.meta.glob("./fixtures/**/not-found", { eager: false })'
    ),
    'glob with non-object options': 'const modules = import.meta.glob("./fixtures/**/*", true)',
    'glob with non-boolean eager option':
      'const modules = import.meta.glob("./fixtures/**/*", { eager: 11 })',
    'not a string arg, with { eager: true }': withFileName(
      'const modules = import.meta.glob(12, { eager: true })'
    ),
    'not a string arg, with { eager: false }': withFileName(
      'const modules = import.meta.glob(12, { eager: false })'
    ),
    'no filename, with { eager: true }': 'import.meta.glob("./fixtures/**/*", { eager: true })',
    'no filename, with { eager: false }': 'import.meta.glob("./fixtures/**/*", { eager: false })'
  }
})
