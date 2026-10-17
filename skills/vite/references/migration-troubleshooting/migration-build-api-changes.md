---
source: https://vite.dev/guide/migration#build-throws-bundleerror
---

# Build Option & API Removals (manualChunks, BundleError)

Removed `chokidar` watch option, removed object form and deprecated function form of `manualChunks`, `build()` throwing `BundleError`, module type auto detection for plugin authors, and other deprecations.

## Signature / Usage

`build()` throws a `BundleError` (typed `Error & { errors?: RolldownError[] }`); access `.errors` for individual errors:

```js
try {
  await build()
} catch (e) {
  if (e.errors) {
    for (const error of e.errors) {
      console.log(error.code) // error code
    }
  }
}
```

Plugin authors converting content from other module types to JavaScript in `load` / `transform` may need `moduleType: 'js'`:

```js
import fs from 'node:fs'

const plugin = {
  name: 'txt-loader',
  load(id) {
    if (id.endsWith('.txt')) {
      const content = fs.readFileSync(id, 'utf-8')
      return {
        code: `export default ${JSON.stringify(content)}`,
        moduleType: 'js', // [!code ++]
      }
    }
  },
}
```

## Options / Props

| Option | Status | Replacement |
| --- | --- | --- |
| `build.rollupOptions.watch.chokidar` | removed | `build.rolldownOptions.watch.watcher` |
| `build.rollupOptions.output.manualChunks` (object form) | removed | `codeSplitting` (Rolldown) |
| `build.rollupOptions.output.manualChunks` (function form) | deprecated | `codeSplitting` (Rolldown) |
| `build.rollupOptions` | deprecated | renamed to `build.rolldownOptions` |
| `worker.rollupOptions` | deprecated | renamed to `worker.rolldownOptions` |
| `build.commonjsOptions` | deprecated | now no-op |
| `build.dynamicImportVarsOptions.warnOnError` | deprecated | now no-op |
| `resolve.alias[].customResolver` | deprecated | custom plugin with `resolveId` hook and `enforce: 'pre'` |

## Notes

- Deprecated options "will be removed in the future".
- `BundleError` change only affects JS API users. Module type change only affects plugin authors.
- Rolldown has experimental support for Module types (similar to esbuild's `loader` option) and automatically sets a module type from the extension of the resolved id.
- Upstream v8.3.4 snippet uses `fs.readFile(id, 'utf-8')` synchronously; use `fs.readFileSync` (or `await fs.promises.readFile` in an async `load`).
- Migration (v7 -> v8): see also `config-build/build-rolldown-options.md`, `javascript-api/build.md`, `config-build/worker-options.md`.

## Related

- [migration-v7-overview.md](./migration-v7-overview.md)
- [migration-advanced.md](./migration-advanced.md)
- [../config-build/build-rolldown-options.md](../config-build/build-rolldown-options.md)
- [../javascript-api/build.md](../javascript-api/build.md)
