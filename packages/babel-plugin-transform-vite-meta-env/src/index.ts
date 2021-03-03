import type babelCore from '@babel/core'

const REPLACE_VARS = [
  {
    regex: /^VITE_/,
    replacement: (template: typeof babelCore.template, variableName: string) =>
      template.expression('process.env.%%variableName%%')({ variableName })
  },
  {
    regex: /^(NODE_ENV|MODE)$/,
    replacement: (template: typeof babelCore.template) =>
      template.expression.ast("process.env.NODE_ENV || 'test'")
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
  },
  {
    regex: /.*/,
    replacement: (template: typeof babelCore.template) => template.expression.ast('undefined')
  }
]

function getReplacement(
  variableName: string,
  template: typeof babelCore.template
): babelCore.types.Expression | undefined {
  return REPLACE_VARS.filter(({ regex }) => regex.test(variableName)).map(({ replacement }) =>
    replacement(template, variableName)
  )[0]
}

export default function viteMetaEnvBabelPlugin({
  template,
  types: t
}: typeof babelCore): babelCore.PluginObj {
  return {
    name: 'vite-meta-env',
    visitor: {
      MemberExpression(path) {
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

        const replacement = getReplacement(variableName, template)

        if (replacement) {
          path.replaceWith(replacement)
        }
      }
    }
  }
}
