import pluginTester from 'babel-plugin-tester'
import plugin from '..'

pluginTester({
  plugin,
  pluginName: 'vite-meta-env',
  snapshot: true,
  tests: {
    'replace MODE': 'const x = import.meta.env.MODE',
    'replace BASE_URL': 'const x = import.meta.env.BASE_URL',
    'replace NODE_ENV': 'const x = import.meta.env.NODE_ENV',
    'replace DEV': 'const x = import.meta.env.DEV',
    'replace PROD': 'const x = import.meta.env.PROD',
    'replace VITE_* variables': 'const x = import.meta.env.VITE_VAR',
    'replace string access': 'const x = import.meta.env["VITE_VAR"]',
    'replace key access': 'const key = "VITE_VAR"; const x = import.meta.env[key]',
    'replace env object': 'const env = import.meta.env',
    'not replaceable': 'const x = import.meta.env.OTHER',
    'not import.meta.env': 'const x = import.meta.other',
    'not import.meta': 'const x = process.env.MODE',
    'not import.meta lookup': 'const x = import.meta()'
  }
})

pluginTester({
  plugin,
  pluginName: 'vite-meta-env',
  pluginOptions: {
    envPrefix: 'TEST_PREFIX_'
  },
  snapshot: true,
  tests: {
    'custom prefix replace MODE': 'const x = import.meta.env.MODE',
    'custom prefix replace BASE_URL': 'const x = import.meta.env.BASE_URL',
    'custom prefix replace NODE_ENV': 'const x = import.meta.env.NODE_ENV',
    'custom prefix replace DEV': 'const x = import.meta.env.DEV',
    'custom prefix replace PROD': 'const x = import.meta.env.PROD',
    'custom prefix replace TEST_PREFIX_* variables': 'const x = import.meta.env.TEST_PREFIX_VAR',
    'custom prefix replace string access': 'const x = import.meta.env["TEST_PREFIX_VAR"]',
    'custom prefix replace key access':
      'const key = "TEST_PREFIX_VAR"; const x = import.meta.env[key]',
    'custom prefix replace env object': 'const env = import.meta.env',
    'custom prefix not replaceable': 'const x = import.meta.env.OTHER',
    'custom prefix not replaceable VITE_': 'const x = import.meta.env.VITE_VAR',
    'custom prefix not import.meta.env': 'const x = import.meta.other',
    'custom prefix not import.meta': 'const x = process.env.MODE',
    'custom prefix not import.meta lookup': 'const x = import.meta()'
  }
})

pluginTester({
  plugin,
  pluginName: 'vite-meta-env',
  pluginOptions: {
    envPrefix: ['TEST_PREFIX_A_', 'TEST_PREFIX_B_']
  },
  snapshot: true,
  tests: {
    'multiple custom prefix replace MODE': 'const x = import.meta.env.MODE',
    'multiple custom prefix replace BASE_URL': 'const x = import.meta.env.BASE_URL',
    'multiple custom prefix replace NODE_ENV': 'const x = import.meta.env.NODE_ENV',
    'multiple custom prefix replace DEV': 'const x = import.meta.env.DEV',
    'multiple custom prefix replace PROD': 'const x = import.meta.env.PROD',
    'multiple custom prefix replace TEST_PREFIX_A_* variables':
      'const x = import.meta.env.TEST_PREFIX_A_VAR',
    'multiple custom prefix replace TEST_PREFIX_B_* variables':
      'const x = import.meta.env.TEST_PREFIX_B_VAR',
    'multiple custom prefix replace string access': 'const x = import.meta.env["TEST_PREFIX_A"]',
    'multiple custom prefix replace key access A':
      'const key = "TEST_PREFIX_A_VAR"; const x = import.meta.env[key]',
    'multiple custom prefix replace key access B':
      'const key = "TEST_PREFIX_B_VAR"; const x = import.meta.env[key]',
    'multiple custom prefix replace env object': 'const env = import.meta.env',
    'multiple custom prefix not replaceable': 'const x = import.meta.env.OTHER',
    'multiple custom prefix not replaceable VITE_': 'const x = import.meta.env.VITE_VAR',
    'multiple custom prefix not import.meta.env': 'const x = import.meta.other',
    'multiple custom prefix not import.meta': 'const x = process.env.MODE',
    'multiple custom prefix not import.meta lookup': 'const x = import.meta()'
  }
})
