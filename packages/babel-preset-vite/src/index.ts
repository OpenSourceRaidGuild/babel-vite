import type babelCore from '@babel/core'

export interface VitePresetOptions {
  env?: boolean
  glob?: boolean
}

function vitePreset(_: typeof babelCore, opts: VitePresetOptions = {}): { plugins: babelCore.PluginItem[] } {
  const { env = true, glob = true } = opts
  return {
    plugins: [
      glob && require.resolve('babel-plugin-transform-vite-meta-glob'),
      env && require.resolve('babel-plugin-transform-vite-meta-env')
    ].filter(isEnabled)
  }
}

function isEnabled(plugin: string | false): plugin is string {
  return plugin !== false
}

export default vitePreset
