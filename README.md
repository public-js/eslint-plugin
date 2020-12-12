# @public-js/pluralize

[![CI](https://img.shields.io/github/workflow/status/public-js/eslint-plugin/CI?style=flat-square)](https://github.com/public-js/pluralize/actions?query=workflow%3ACI)
[![Downloads](https://img.shields.io/npm/dm/@public-js/eslint-plugin?style=flat-square)](https://www.npmjs.com/package/@public-js/pluralize)
[![Version](https://img.shields.io/npm/v/@public-js/eslint-plugin?style=flat-square)](https://www.npmjs.com/package/@public-js/pluralize)
[![License](https://img.shields.io/npm/l/@public-js/eslint-plugin?style=flat-square)](https://www.npmjs.com/package/@public-js/pluralize)

---

Helpful ESLint rules especially for those using TypeScript.


## Getting Started

Add the required packages to your project by running:
```shell
npm install eslint typescript @typescript-eslint/parser @public-js/eslint-plugin --save-dev
```

Then configure ESLint as you wish.

And finally add the following to your `eslintrc` file (or just modify the required properties):
```javascript
// ...
parser: '@typescript-eslint/parser'
// ...
parserOptions: {
    ecmaFeatures: { jsx: true }
}
// ...
plugins: ['@public-js'] // append this plugin, don't replace everything
// ...
```


## Rules

#### rn-stylesheet-rational
Sorting React Native Stylesheet's properties in rational order 

Usage:
```javascript
'@public-js/rn-stylesheet-rational': ['warn', { borderInBoxModel: false }]
```
