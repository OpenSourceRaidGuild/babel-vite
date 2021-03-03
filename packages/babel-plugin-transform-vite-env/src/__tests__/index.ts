import pluginTester from 'babel-plugin-tester'
import plugin from '..'

pluginTester({
    plugin,
    pluginName: 'vite-meta-env',
    snapshot: true,
    babelOptions: {filename: __filename},
    tests: {
      'replace MODE': 'const x = import.meta.env.MODE',
      'replace NODE_ENV': 'const x = import.meta.env.NODE_ENV',
      'replace DEV': 'const x = import.meta.env.DEV',
      'replace PROD': 'const x = import.meta.env.PROD',
      'replace VITE_* variables': 'const x = import.meta.env.VITE_VAR',
      'not replaceable': 'const x = import.meta.env.OTHER',
      'not import.meta.env': 'const x = process.env.MODE'
    }
})
