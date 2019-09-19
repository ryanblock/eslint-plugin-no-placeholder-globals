/**
 * @fileoverview No placeholder globals
 * @author Ryan Block
 */
'use strict'
let noUndefinedGlobalVars = require('./no-undefined-global-vars')
let noGlobalObjectLiterals = require('./no-global-object-literals')
let noGlobalArrayLiterals = require('./no-global-array-literals')

/**
 * Le rule
 */
module.exports = {
  rules: {
    'no-undefined-global-vars': noUndefinedGlobalVars,
    'no-global-object-literals': noGlobalObjectLiterals,
    'no-global-array-literals': noGlobalArrayLiterals
  }
}
