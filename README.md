## ⚠️ This repo is no longer maintained

### Package has been renamed to [@public-js/eslint-plugin-react-native](https://github.com/public-js/eslint-plugin-react-native)

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
