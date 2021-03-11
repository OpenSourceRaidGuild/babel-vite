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
    'no filename': 'import.meta.glob("./fixtures/**/*")'
  }
})
