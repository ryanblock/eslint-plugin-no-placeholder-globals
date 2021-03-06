/**
 * rule: no-undefined-global-vars
 */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'No undefined global variables',
      category: 'Variables',
      recommended: true
    },
    fixable: null,
    schema: []
  },
  create (context) {
    return {
      VariableDeclaration (node) {
        let init = node.declarations[0].init
        let hasInit = !!init
        let isGlobal = node.parent.type === 'Program'
        if (!isGlobal) {
          return
        }
        if (!hasInit && isGlobal) {
          context.report({
            node,
            message: `Do not create undefined variables in global scope`
          })
        }
      }
    }
  }
}
