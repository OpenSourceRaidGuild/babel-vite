import pluginTester from 'babel-plugin-tester'
import preset, { VitePresetOptions } from '..'

const fixture = (filename: string, options?: VitePresetOptions) => ({
  fixture: require.resolve(`./fixtures/${filename}`),
  babelOptions: {
    presets: [options ? [preset, options] : preset]
  }
})

pluginTester({
  plugin: () => ({}),
  pluginName: 'vite',
  snapshot: true,
  babelOptions: { filename: __filename },
  tests: {
    defaults: fixture('input'),
    all: fixture('input', { env: true, glob: true, hot: true }),
    'env-only': fixture('input', { env: true, glob: false, hot: false }),
    'glob-only': fixture('input', { env: false, glob: true, hot: false }),
    'hot-only': fixture('input', { env: false, glob: false, hot: true })
  }
})
