---
source: https://react.dev/reference/react-compiler/gating
---

# gating

The `gating` option enables conditional compilation, allowing you to control when optimized code is used at runtime.

## Signature / Usage

```js
{
  gating: {
    source: 'my-feature-flags',
    importSpecifierName: 'shouldUseCompiler'
  }
}
```

The compiler generates gated code:

```js
// Input
function Button(props) {
  return <button>{props.label}</button>;
}

// Output (simplified)
import { shouldUseCompiler } from 'my-feature-flags';

const Button = shouldUseCompiler()
  ? function Button_optimized(props) { /* compiled version */ }
  : function Button_original(props) { /* original version */ };
```

## Options / Props

Type: `{ source: string; importSpecifierName: string } | null`. Default: `null`.

| Name | Type | Description |
| --- | --- | --- |
| `source` | `string` | Module path to import the feature flag from |
| `importSpecifierName` | `string` | Name of the exported function to import |

## Notes

- The gating function must return a boolean.
- Both compiled and original versions increase bundle size.
- The import is added to every file with compiled functions.
- The gating function is evaluated once at module time, so once the JS bundle has been parsed and evaluated the choice of component stays static for the rest of the browser session.
- The flag module must use a named export matching `importSpecifierName` (a default export does not work).
- Import errors: the official docs list a module resolution path (for example `@myapp/feature-flags`) and `./src/utils/flags` (described there as an absolute path from the project root) as correct, and a path relative to `babel.config.js` as wrong. Because the import is inserted into every file with compiled functions, prefer a module resolution path (package name or configured alias) that resolves from every compiled file.

## Related

- [Configuration](./configuration.md)
- [Incremental Adoption](./incremental-adoption.md)
