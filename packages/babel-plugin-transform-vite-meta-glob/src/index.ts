import type babelCore from '@babel/core'
import nodePath from 'path'
import glob from 'glob'

export default function viteMetaGlobBabelPlugin({
  types: t
}: typeof babelCore): babelCore.PluginObj {
  const asts = {
    glob: (path: string) =>
      t.arrowFunctionExpression(
        [],
        t.callExpression(t.identifier('import'), [t.stringLiteral(path)])
      ),
    globEager: (path: string) => t.callExpression(t.identifier('require'), [t.stringLiteral(path)])
  }

  const isGlobKey = (propertyName: string): propertyName is keyof typeof asts =>
    Object.keys(asts).includes(propertyName)

  return {
    name: 'vite-meta-glob',
    visitor: {
      CallExpression(path, state) {
        const callee = t.isMemberExpression(path.node.callee) && path.node.callee

        if (!callee) {
          return
        }

        const args = path.node.arguments
        const sourceFile = state.file.opts.filename
        const propertyName = t.isIdentifier(callee.property) && callee.property.name

        if (!sourceFile || !propertyName) {
          return
        }

        if (
          isGlobKey(propertyName) &&
          t.isMetaProperty(callee.object) &&
          args.length === 1 &&
          t.isStringLiteral(args[0])
        ) {
          const cwd = nodePath.dirname(sourceFile)
          const paths = glob.sync(args[0].value, { cwd })

          const replacement = t.objectExpression(
            paths.map((path) => t.objectProperty(t.stringLiteral(path), asts[propertyName](path)))
          )

          path.replaceWith(replacement)
        }
      }
    }
  }
}
