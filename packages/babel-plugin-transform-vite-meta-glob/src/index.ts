import nodePath from 'path'
import type babelCore from '@babel/core'
import { globSync } from 'glob'

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
          const globPaths = globSync(args[0].value, { cwd, dotRelative: true })
            .sort()
            .map((globPath) => globPath.replace(/\\/g, '/'))

          const replacement = t.objectExpression(
            globPaths.map((globPath) =>
              t.objectProperty(t.stringLiteral(globPath), asts[propertyName](globPath))
            )
          )

          path.replaceWith(replacement)
        }
      },
      VariableDeclaration(path, state) {
        const id = path.node.declarations[0].id
        const call = path.node.declarations[0].init
        const callee = t.isCallExpression(call) && t.isMemberExpression(call.callee) && call.callee
        const identifier = t.isIdentifier(id) && t.identifier(id.name)

        if (!identifier || !callee) {
          return
        }

        const args = call.arguments
        const sourceFile = state.file.opts.filename
        const propertyName = t.isIdentifier(callee.property) && callee.property.name
        const eagerOption =
          t.isObjectExpression(args[1]) &&
          args[1].properties.filter(
            (p) => t.isObjectProperty(p) && t.isIdentifier(p.key) && p.key.name === 'eager'
          )

        if (!sourceFile || !propertyName || !eagerOption || eagerOption.length === 0) {
          return
        }

        if (
          isGlobKey(propertyName) &&
          t.isMetaProperty(callee.object) &&
          args.length === 2 &&
          t.isStringLiteral(args[0]) &&
          t.isObjectProperty(eagerOption[0]) &&
          t.isBooleanLiteral(eagerOption[0].value)
        ) {
          const cwd = nodePath.dirname(sourceFile)
          const globPaths = globSync(args[0].value, { cwd, dotRelative: true })
            .sort()
            .map((globPath) => globPath.replace(/\\/g, '/'))

          if (eagerOption[0].value.value) {
            const identifiers = globPaths.map((_, idx) => t.identifier(`__glob__0_${idx}`))

            const imports = globPaths.map((globPath, idx) => {
              const modulePath = t.stringLiteral(globPath)
              return t.variableDeclaration('const', [
                t.variableDeclarator(
                  identifiers[idx],
                  t.callExpression(t.identifier('require'), [modulePath])
                )
              ])
            })

            const variable = t.variableDeclaration('const', [
              t.variableDeclarator(
                identifier,
                t.objectExpression(
                  globPaths.map((globPath, idx) =>
                    t.objectProperty(t.stringLiteral(globPath), identifiers[idx])
                  )
                )
              )
            ])

            path.replaceWithMultiple([...imports, variable])
          } else {
            const replacement = t.variableDeclaration('const', [
              t.variableDeclarator(
                identifier,
                t.objectExpression(
                  globPaths.map((globPath) =>
                    t.objectProperty(t.stringLiteral(globPath), asts[propertyName](globPath))
                  )
                )
              )
            ])

            path.replaceWith(replacement)
          }
        }
      }
    }
  }
}
