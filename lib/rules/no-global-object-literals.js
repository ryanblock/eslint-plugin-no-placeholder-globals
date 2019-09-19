/**
 * rule: no-global-object-literals
 */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'No initialized empty object literals in global scope',
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
        let initObject = init && init.type === 'ObjectExpression'
        let objectProperties = init && init.properties
        let isGlobal = node.parent.type === 'Program'
        if (!isGlobal) {
          return
        }
        if (initObject && !objectProperties.length && isGlobal) {
          context.report({
            node,
            message: `Do not initialize empty object literals in global scope`
          })
        }
      }
    }
  }
}