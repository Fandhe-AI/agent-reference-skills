---
source: https://react.dev/reference/react-compiler/compiling-libraries
---

# Compiling Libraries

Guide for library authors on using React Compiler to ship optimized library code.

## Signature / Usage

```bash
npm install -D babel-plugin-react-compiler@latest
```

```js
// babel.config.js
module.exports = {
  plugins: [
    'babel-plugin-react-compiler',
  ],
  // ... other config
};
```

Backwards compatibility for React below 19: install `react-compiler-runtime` as a direct dependency and set `target` to the minimum supported React version.

```bash
npm install react-compiler-runtime@latest
```

```json
{
  "dependencies": {
    "react-compiler-runtime": "^1.0.0"
  },
  "peerDependencies": {
    "react": "^17.0.0 || ^18.0.0 || ^19.0.0"
  }
}
```

```js
{
  target: '17', // Minimum supported React version
}
```

## Notes

- Benefits of shipping compiled code: performance improvements for all users (even without React Compiler), no configuration required by users, and consistent behavior regardless of build setup.
- Testing: test your library both with and without compilation; run the existing suite against compiled code and also keep a separate test configuration that bypasses the compiler.
- Library fails on React 17 or 18: verify `react-compiler-runtime` is installed as a dependency, `target` matches your minimum supported React version, and the runtime is included in the published bundle.
- Babel plugin conflicts: place `babel-plugin-react-compiler` early in your plugin list, disable conflicting optimizations in other plugins, and test build output thoroughly.
- "Cannot find module 'react-compiler-runtime'": ensure the runtime is in `dependencies`, not `devDependencies`, that the bundler includes it, and that the package is published to npm with your library.

## Related

- [target](./target.md)
- [Debugging and Troubleshooting](./debugging.md)
- [Configuration](./configuration.md)
- [compilationMode](./compilationMode.md)
