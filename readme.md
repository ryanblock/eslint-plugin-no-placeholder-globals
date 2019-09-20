# eslint-plugin-no-placeholder-globals

## ESLint plugin for identifying potentially dangerous placeholders in global scope

Global scope is a potentially dangerous place to cache or store any transient or highly mutable data. Doing so can lead to unpredictable and difficult to debug state issues, especially when dealing with modules and modern compute contexts.

This ESLint plugin helps identify potentially dangerous **global placeholders**: declarations in global scope intended to be assigned or mutated later. Some examples:

```js
// Pattern:         // Corresponding ESLint rule:
let really          // 'no-placeholder-globals/no-undefined-global-vars'
var dont = {}       // 'no-placeholder-globals/no-global-object-literals'
const doThis = []   // 'no-placeholder-globals/no-global-array-literals'
```


### Installing

Using ESLint:
- globally: `npm i eslint-plugin-no-placeholder-globals -g`
- as a dep: `npm i eslint-plugin-no-placeholder-globals --save-dev`

Then add the plugin and its rules to your project's ESLint config.

An example for `.eslintrc.js`:

```js
module.exports = {
  // Your other options here...
  rules: {
    'no-placeholder-globals/no-undefined-global-vars': 'error',
    'no-placeholder-globals/no-global-object-literals': 'warn',
    'no-placeholder-globals/no-global-array-literals': 'warn'
  },
  plugins: ['no-placeholder-globals']
}
```
