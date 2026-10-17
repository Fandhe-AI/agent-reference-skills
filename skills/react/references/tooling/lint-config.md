---
source: https://react.dev/reference/eslint-plugin-react-hooks/lints/config
---

# config

Validates the compiler configuration options.

## Signature / Usage

```js
// ❌ Unknown option name
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      compileMode: 'all' // Typo: should be compilationMode
    }]
  ]
};

// ❌ Invalid option value
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      compilationMode: 'everything' // Invalid: use 'all' or 'infer'
    }]
  ]
};

// ✅ Valid compiler configuration
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      compilationMode: 'infer',
      panicThreshold: 'critical_errors'
    }]
  ]
};
```

## Notes

- React Compiler accepts various configuration options to control its behavior. This rule validates that your configuration uses correct option names and value types, preventing silent failures from typos or incorrect settings.
- Troubleshooting: if the configuration is not working as expected, check for typos in option names (`compilationMod`), wrong value types (`panicThreshold: true`) and unknown options (`optimizationLevel`). Check the configuration documentation for valid options:

```js
// ✅ Better: Valid configuration
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      compilationMode: 'all', // or 'infer'
      panicThreshold: 'none', // or 'critical_errors', 'all_errors'
      // Only use documented options
    }]
  ]
};
```

## Related

- [gating](./lint-gating.md)
- [eslint-plugin-react-hooks](./eslint-plugin-react-hooks.md)
