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
  const { env = true, glob = true } = opts

  const plugins = [
    env && vitMetaEnvTransformPlugin(env),
    glob && vitMetaGlobTransformPlugin()
  ].filter(isEnabled)

  return { plugins }
}

function vitMetaEnvTransformPlugin(options: true | ViteMetaEnvPluginOptions): babelCore.PluginItem {
  const pluginPath = require.resolve('babel-plugin-transform-vite-meta-env')
  return typeof options === 'object' ? [pluginPath, options] : pluginPath
}

function vitMetaGlobTransformPlugin(): babelCore.PluginItem {
  return require.resolve('babel-plugin-transform-vite-meta-glob')
}

function isEnabled(plugin: babelCore.PluginItem | false): plugin is babelCore.PluginItem {
  return plugin !== false
}

export default vitePreset
