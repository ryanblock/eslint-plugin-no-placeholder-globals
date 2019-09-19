/**
 * @fileoverview No placeholder globals
 * @author Ryan Block
 */
'use strict'

let rules = require('../../../lib/rules').rules
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
let ruleTester = new RuleTester()

let rule = 'no-undefined-global-vars'
ruleTester.run(rule, rules[rule], {
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
    }
  ]
})

rule = 'no-global-object-literals'
ruleTester.run(rule, rules[rule], {
  valid: [
    // Non-empty ObjectExpressions
    `var foo = {bar: true}`,
    `var foo = {bar}`,

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
      code: `var foo = {}`,
      errors: [{
        message: `Do not initialize empty object literals in global scope`
      }]
    },
    {
      code: `let foo = {}`,
      errors: [{
        message: `Do not initialize empty object literals in global scope`
      }]
    },
    {
      code: `const foo = {}`,
      errors: [{
        message: `Do not initialize empty object literals in global scope`
      }]
    }
  ]
})

rule = 'no-global-array-literals'
ruleTester.run(rule, rules[rule], {
  valid: [
    // Non-empty ArrayExpressions
    `var foo = ['bar']`,
    `var foo = [bar]`,

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
      code: `var foo = []`,
      errors: [{
        message: `Do not initialize empty array literals in global scope`
      }]
    },
    {
      code: `let foo = []`,
      errors: [{
        message: `Do not initialize empty array literals in global scope`
      }]
    },
    {
      code: `const foo = []`,
      errors: [{
        message: `Do not initialize empty array literals in global scope`
      }]
    }
  ]
})
