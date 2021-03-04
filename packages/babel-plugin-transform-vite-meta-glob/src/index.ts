import nodePath from 'path'
import type babelCore from '@babel/core'
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
          const globPaths = glob.sync(args[0].value, { cwd })

          const replacement = t.objectExpression(
            globPaths.map((globPath) =>
              t.objectProperty(t.stringLiteral(globPath), asts[propertyName](globPath))
            )
          )

          path.replaceWith(replacement)
        }
      }
    }
  }
}
