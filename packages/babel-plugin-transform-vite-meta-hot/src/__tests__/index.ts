import pluginTester from 'babel-plugin-tester'
import plugin from '..'

pluginTester({
  plugin,
  pluginName: 'vite-meta-hot',
  snapshot: true,
  tests: {
    'replace import.meta.hot': 'const x = import.meta.hot',
    'not replace import.meta.hot': 'const x = module.hot',
    'replace string access': 'const x = import.meta["hot"]',
    'not replace string access': 'const x = import.meta["env"]',
    'replace key access': 'const key = "hot"; const x = import.meta[key]',
    'not replace key access': 'const key = "env"; const x = import.meta[key]',
    'not replaceable': 'const x = import.meta.other',
    'not import.meta lookup': 'const x = import.meta()'
  }
})
