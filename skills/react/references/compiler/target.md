---
source: https://react.dev/reference/react-compiler/target
---

# target

The `target` option specifies which React version the compiler should generate code for.

## Signature / Usage

```js
{
  target: '19' // or '18', '17'
}
```

React 17 or 18: install the runtime package, then configure the target.

```bash
npm install react-compiler-runtime@latest
```

```js
// For React 18
{
  target: '18'
}

// For React 17
{
  target: '17'
}
```

Compiled output differs by runtime:

```js
// For React 19 (built-in runtime)
import { c } from 'react/compiler-runtime'

// For React 17/18 (polyfill runtime)
import { c } from 'react-compiler-runtime'
```

## Options / Props

Type: `'17' | '18' | '19'`. Default: `'19'`.

| Value | Description |
| --- | --- |
| `'19'` | Target React 19 (default). No additional runtime required. |
| `'18'` | Target React 18. Requires `react-compiler-runtime` package. |
| `'17'` | Target React 17. Requires `react-compiler-runtime` package. |

## Notes

- Always use string values, not numbers (e.g., `'17'` not `17`).
- Don't include patch versions (e.g., use `'18'` not `'18.2.0'`).
- React 19 includes built-in compiler runtime APIs; React 17 and 18 require installing `react-compiler-runtime@latest`.
- "Cannot find module 'react/compiler-runtime'": check your React version (`npm why react`), install the runtime if using React 17 or 18, and ensure `target` matches your React major version.
- The runtime package must be installed in your project (not globally), listed in `package.json` dependencies, the correct version (`@latest` tag), and not in `devDependencies` (it's needed at runtime).

## Related

- [Configuration](./configuration.md)
- [Installation](./installation.md)
- [Compiling Libraries](./compiling-libraries.md)
