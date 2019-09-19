/**
 * @fileoverview No undefined global variables
 * @author Ryan Block
 */
'use strict'

let rule = require('../../../lib/rules/no-undefined-global-vars')
let RuleTester = require('eslint').RuleTester
RuleTester.setDefaultConfig({
  parserOptions: {
    sourceType: 'script',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  }
})

/**
 * Tests
 */
let ruleTester = new RuleTester();
ruleTester.run('no-undefined-global-vars', rule, {

  valid: [
    // VariableDeclaration to Literal
    `var foo = 'bar'`,

    // VariableDeclaration to CallExpression
    `let foo = require('foo')`,

    // VariableDeclaration to ArrowFunctionExpression
    `const noop = x=> !!x`,

    // Undefined VariableDeclaration contained within local scope
    `function foo () {
        let baz
        return
      }`,

    // VariableDeclaration to FunctionExpression
    `var noop = function noop () {}`,

    // ExpressionStatement
    `exports.handler = foo`,

    // ExpressionStatement
    `;[].slice(0)`,

    // ExpressionStatement
    `module.exports = function () {}`,

    // ExpressionStatement
    `;(function() {
        console.log('foo')
      })()`,

    // ImportDeclaration
    `import something from './somewhere'`,

    // ExportNamedDeclaration
    `export function foo () {}`
  ],

  invalid: [
    {
      code: `var foo`,
      errors: [{
        message: `Do not create undefined variables in global scope`,
      }]
    },
    {
      code: `let foo`,
      errors: [{
        message: `Do not create undefined variables in global scope`,
      }]
    },
    {
      code: `var foo = {}`,
      errors: [{
        message: `Do not initialize object literals in global scope`
      }]
    },
    {
      code: `var foo = {bar: true}`,
      errors: [{
        message: `Do not initialize object literals in global scope`
      }]
    },
    {
      code: `var foo = []`,
      errors: [{
        message: `Do not initialize array literals in global scope`
      }]
    },
    {
      code: `var foo = ['bar']`,
      errors: [{
        message: `Do not initialize array literals in global scope`
      }]
    }
  ]
})
