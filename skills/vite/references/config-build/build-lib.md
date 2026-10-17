---
source: https://vite.dev/config/build-options#build-lib
---

# build.lib

Build as a library.

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: ['src/main.js'],
      formats: ['es'],
      fileName: (format, entryName) => `my-lib-${entryName}.${format}.js`,
      cssFileName: 'my-lib-style',
    },
  },
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `entry` | `string \| string[] \| { [entryAlias: string]: string }` | top-level `input` | Library entry. One of `entry` or `input` is required since a library cannot use HTML as entry |
| `name` | `string` | — | Exposed global variable. Required when `formats` includes `'umd'` or `'iife'` |
| `formats` | `('es' \| 'cjs' \| 'umd' \| 'iife')[]` | `['es', 'umd']`, or `['es', 'cjs']` if multiple entries are used | Output formats |
| `fileName` | `string \| ((format: ModuleFormat, entryName: string) => string)` | `"name"` in `package.json` | Output package file name; a function receives `format` and `entryName` and returns the file name |
| `cssFileName` | `string` | same as `fileName` if a string, otherwise `"name"` in `package.json` | Name of the CSS file output when the package imports CSS |

## Notes

- A single entry (including a one-element `entry` array) defaults `formats` to `['es', 'umd']`, so `name` must be set or `formats` narrowed to non-UMD/IIFE formats; the official build-options example omits `name` and does not build as-is (`formats: ['es']` is added to the snippet above for that reason).
- With `build.lib`, `build.assetsInlineLimit` is ignored (assets always inlined), `build.cssCodeSplit` defaults to `false`, and `build.assetsDir` is not used.
- The module preload polyfill does not apply to Library Mode.
- `build.minify` does not minify whitespace for the `'es'` format in lib mode, as it removes pure annotations and breaks tree-shaking.

## Related

- [build-assets-inline-limit.md](./build-assets-inline-limit.md)
- [build-css-options.md](./build-css-options.md)
- [build-minify.md](./build-minify.md)
