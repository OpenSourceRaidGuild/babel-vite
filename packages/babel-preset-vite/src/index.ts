import type babelCore from '@babel/core'
import type { ViteMetaEnvPluginOptions } from 'babel-plugin-transform-vite-meta-env'

export interface VitePresetOptions {
  env?: boolean | ViteMetaEnvPluginOptions
  glob?: boolean
}

function vitePreset(
  _: typeof babelCore,
  opts: VitePresetOptions
): { plugins: babelCore.PluginItem[] } {
  opts.env
  const { env = true, glob = true } = opts

  const plugins: babelCore.PluginItem[] = []

  if (env) {
    if (typeof env === 'object') {
      plugins.push([require.resolve('babel-plugin-transform-vite-meta-env'), env])
    } else {
      plugins.push(require.resolve('babel-plugin-transform-vite-meta-env'))
    }
  }

  if (glob) {
    plugins.push(require.resolve('babel-plugin-transform-vite-meta-glob'))
  }

  return { plugins }
}

export default vitePreset
