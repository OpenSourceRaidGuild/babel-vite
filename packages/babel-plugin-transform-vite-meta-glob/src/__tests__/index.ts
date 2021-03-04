import pluginTester from 'babel-plugin-tester'
import plugin from '..'

pluginTester({
  plugin,
  pluginName: 'vite-meta-env',
  snapshot: true,
  babelOptions: { filename: __filename },
  tests: {
    'glob all files': 'const modules = import.meta.glob("./fixtures/**/*")',
    'glob some files': 'const modules = import.meta.glob("./fixtures/**/*{1,3}*")',
    'glob no files': 'const modules = import.meta.glob("./fixtures/**/not-found")',
    'glob all files eagerly': 'const modules = import.meta.globEager("./fixtures/**/*")',
    'glob some files eagerly': 'const modules = import.meta.globEager("./fixtures/**/*{1,3}*")',
    'glob no files eagerly': 'const modules = import.meta.globEager("./fixtures/**/not-found")',
    'not import.meta': 'const x = import.meta.other()',
    'not import.meta function': 'const x = import.meta.env',
    'not import.meta.glob': 'glob("./fixtures/**/*")',
    'not import.meta.globEager': 'globEager("./fixtures/**/*")',
    'not a string arg': 'globEager(1)',
    'too many args': 'globEager("./fixtures/**/*1*", "./fixtures/**/*2*")'
  }
})
