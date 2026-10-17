---
source: https://vite.dev/guide/api-plugin#hook-filters
---

# Path Normalization / Hook Filters

Normalize paths to POSIX separators before comparing against resolved ids, and use hook filters to avoid unnecessary hook invocations.

## Signature / Usage

```js
import { normalizePath } from 'vite'

normalizePath('foo\\bar') // 'foo/bar'
normalizePath('foo/bar') // 'foo/bar'
```

Hook filter with a backward-compatible in-handler check:

```js
export default function myPlugin() {
  const jsFileRegex = /\.js$/

  return {
    name: 'my-plugin',
    // Example: only call transform for .js files
    transform: {
      filter: {
        id: jsFileRegex,
      },
      handler(code, id) {
        // Additional check for backward compatibility
        if (!jsFileRegex.test(id)) return null

        return {
          code: transformCode(code),
          map: null,
        }
      },
    },
  }
}
```

## Notes

- Vite normalizes paths while resolving ids to POSIX separators (`/`) while preserving the volume on Windows. Rollup keeps resolved paths untouched, so ids have win32 separators (`\`) on Windows. Rollup plugins use `normalizePath` from `@rollup/pluginutils` internally, so `include` / `exclude` patterns work in Vite.
- For Vite plugins, normalize paths to POSIX separators before comparing against resolved ids; an equivalent `normalizePath` is exported from `vite`.
- Vite exposes `@rollup/pluginutils`'s `createFilter` to encourage the standard include/exclude filtering pattern, which Vite core also uses.
- Rolldown's hook filter feature reduces Rust/JavaScript communication overhead by specifying patterns that decide when hooks are called. Also supported by Rollup 4.38.0+ and Vite 6.3.0+; for backward compatibility with older versions, also run the filter inside the handler.
- `@rolldown/pluginutils` exports filter utilities such as `exactRegex` and `prefixRegex`, also re-exported from `rolldown/filter`.

## Related

- [Transforming Custom File Types / Virtual Modules](./virtual-modules-transforms.md)
