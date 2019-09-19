/**
 * @fileoverview No undefined global variables
 * @author Ryan Block
 */
'use strict'

/**
 * Le rule
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
  create: function(context) {
    return {
      VariableDeclaration (node) {
        let init = node.declarations[0].init
        let hasInit = !!init
        let initObject = init && init.type === 'ObjectExpression'
        let initArray = init && init.type === 'ArrayExpression'
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
        if (initObject && isGlobal) {
          context.report({
            node,
            message: `Do not initialize object literals in global scope`
          })
        }
        if (initArray && isGlobal) {
          context.report({
            node,
            message: `Do not initialize array literals in global scope`
          })
        }
      }
    }
  }
}
