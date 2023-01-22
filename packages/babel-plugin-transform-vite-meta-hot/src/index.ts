import type babelCore from '@babel/core'

export default function viteMetaHotBabelPlugin({
  template,
  types: t
}: typeof babelCore): babelCore.PluginObj {
  return {
    name: 'vite-meta-hot',
    visitor: {
      MemberExpression(path) {
        const isMetaProperty = t.isMetaProperty(path.node.object)
        const isHotVar = t.isIdentifier(path.node.property) && path.node.property.name === 'hot'

        if (!isMetaProperty || !isHotVar) {
          return
        }

        path.replaceWith(template.expression.ast('module.hot'))
      },
      StringLiteral(path) {
        const isMetaProperty =
          t.isMemberExpression(path.parentPath.node) &&
          t.isMetaProperty(path.parentPath.node.object)
        const isHotVar = path.node.value === 'hot'

        if (!isMetaProperty || !isHotVar) {
          return
        }

        path.parentPath.replaceWith(template.expression.ast('module.hot'))
      },
      Identifier(path) {
        if (
          !t.isMemberExpression(path.parentPath.node) ||
          !t.isMetaProperty(path.parentPath.node.object)
        ) {
          return
        }

        const key = path.node.name
        /* @ts-expect-error outdated types */
        // eslint-disable-next-line
        const keyValue = path.scope.getBinding(key)?.path.node.init?.value
        if (keyValue !== 'hot') {
          return
        }

        path.parentPath.replaceWith(template.expression.ast('module.hot'))
      }
    }
  }
}
