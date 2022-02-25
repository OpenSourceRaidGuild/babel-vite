import type babelCore from '@babel/core'

const defaultPrefix = 'VITE_'

const replaceVars = [
  {
    regex: /^(NODE_ENV|MODE)$/,
    replacement: (template: typeof babelCore.template) =>
      template.expression.ast("process.env.NODE_ENV || 'test'")
  },
  {
    regex: /^BASE_URL$/,
    replacement: (template: typeof babelCore.template) => template.expression.ast("'/'")
  },
  {
    regex: /^DEV$/,
    replacement: (template: typeof babelCore.template) =>
      template.expression.ast("process.env.NODE_ENV !== 'production'")
  },
  {
    regex: /^PROD$/,
    replacement: (template: typeof babelCore.template) =>
      template.expression.ast("process.env.NODE_ENV === 'production'")
  }
]

const getPrefix = (opts: { prefix?: unknown }): string =>
  typeof opts.prefix === 'string' ? opts.prefix : defaultPrefix

const replaceEnv = (template: typeof babelCore.template, prefix: string) =>
  template.expression.ast(`{
    ...Object.fromEntries(Object.entries(process.env).filter(([k]) => k.startsWith('${prefix}'))),
    NODE_ENV: process.env.NODE_ENV || 'test',
    MODE: process.env.NODE_ENV || 'test',
    BASE_URL: '/',
    DEV: process.env.NODE_ENV !== 'production',
    PROD: process.env.NODE_ENV === 'production'
  }`)

function getReplacement(
  variableName: string,
  template: typeof babelCore.template,
  prefix: string
): babelCore.types.Expression | undefined {
  return (
    replaceVars
      .filter(({ regex }) => regex.test(variableName))
      .map(({ replacement }) => replacement(template))[0] ??
    (variableName.startsWith(prefix)
      ? template.expression('process.env.%%variableName%%')({ variableName })
      : undefined)
  )
}

export default function viteMetaEnvBabelPlugin({
  template,
  types: t
}: typeof babelCore): babelCore.PluginObj {
  return {
    name: 'vite-meta-env',
    visitor: {
      MemberExpression(path, { opts }) {
        const envNode = t.isMemberExpression(path.node.object) && path.node.object
        const variableName = t.isIdentifier(path.node.property) && path.node.property.name

        if (!envNode || !variableName) {
          return
        }

        const isMetaProperty = t.isMetaProperty(envNode.object)
        const isEnvVar = t.isIdentifier(envNode.property) && envNode.property.name === 'env'

        if (!isMetaProperty || !isEnvVar) {
          return
        }

        const replacement = getReplacement(variableName, template, getPrefix(opts))

        if (replacement) {
          path.replaceWith(replacement)
        }
      },
      MetaProperty(path, { opts }) {
        const envNode = t.isMemberExpression(path.parentPath.node) && path.parentPath.node

        if (!envNode) {
          return
        }

        const isEnvVar = t.isIdentifier(envNode.property) && envNode.property.name === 'env'

        if (!isEnvVar) {
          return
        }

        path.parentPath.replaceWith(replaceEnv(template, getPrefix(opts)))
      }
    }
  }
}
