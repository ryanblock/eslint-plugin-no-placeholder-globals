/**
 * rule: no-global-array-literals
 */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'No initialized empty array literals in global scope',
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
        let initArray = init && init.type === 'ArrayExpression'
        let arrayElements = init && init.elements
        let isGlobal = node.parent.type === 'Program'
        if (!isGlobal) {
          return
        }
        if (initArray && !arrayElements.length && isGlobal) {
          context.report({
            node,
            message: `Do not initialize empty array literals in global scope`
          })
        }
      }
    }
  }
}