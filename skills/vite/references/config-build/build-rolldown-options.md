---
source: https://vite.dev/config/build-options#build-rolldownoptions
---

# build.rolldownOptions / rollupOptions / dynamicImportVarsOptions

Directly customize the underlying Rolldown bundle, and configure dynamic imports with variables.

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rolldownOptions: {
      // same as options exported from a Rolldown config file
    },
    dynamicImportVarsOptions: {
      exclude: /node_modules/,
    },
  },
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `build.rolldownOptions` | `RolldownOptions` | — | Same as options exportable from a Rolldown config file; merged with Vite's internal Rolldown options |
| `build.rollupOptions` | `RolldownOptions` | — | Deprecated alias of `build.rolldownOptions` |
| `build.dynamicImportVarsOptions` | `{ include?: string \| RegExp \| (string \| RegExp)[], exclude?: string \| RegExp \| (string \| RegExp)[] }` | — | Whether to transform dynamic imports with variables |

## Notes

- Vite overrides Rolldown's default for `preserveEntrySignatures`. When unset, Vite uses `false` for regular client builds, `'strict'` for library builds, and `'allow-extension'` for SSR builds.
- Instead of `build.rolldownOptions.input`, setting the top-level `input` option is recommended because it is used in dev as well. If `build.rolldownOptions.input` is set, it overrides the top-level `input` for build only.
- `build.rollupOptions` is deprecated; use `build.rolldownOptions`.
- Migration (v7 → v8): `build.rollupOptions` renamed to `build.rolldownOptions`. `build.rollupOptions.watch.chokidar` was removed (use `build.rolldownOptions.watch.watcher`). The object form of `output.manualChunks` is not supported anymore and the function form is deprecated; use Rolldown's `codeSplitting` option. `output.format: 'system'` and `'amd'` are not supported.
- See the Rolldown options reference (rolldown.rs/reference/) for the full option list.

## Related

- [build-lib.md](./build-lib.md)
- [worker-options.md](./worker-options.md)
- [build-watch.md](./build-watch.md)
