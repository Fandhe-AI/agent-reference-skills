---
source: https://vite.dev/config/build-options#build-minify
---

# build.minify / build.terserOptions

Select the minifier and pass options to Terser.

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      maxWorkers: 2,
    },
  },
})
```

```sh
npm add -D esbuild
npm add -D terser
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `build.minify` | `boolean \| 'oxc' \| 'terser' \| 'esbuild'` | `'oxc'` for client build, `false` for SSR build | `false` disables minification; otherwise selects the minifier |
| `build.terserOptions` | `TerserOptions` | — | Additional Terser minify options. Also accepts `maxWorkers: number` (default: number of CPUs minus 1) |

## Notes

- The default Oxc Minifier is 30 ~ 90x faster than terser and only 0.5 ~ 2% worse compression.
- `build.minify: 'esbuild'` is deprecated and will be removed in the future.
- `build.minify` does not minify whitespace for the `'es'` format in lib mode, as it removes pure annotations and breaks tree-shaking.
- esbuild or Terser must be installed when set to `'esbuild'` or `'terser'` respectively.
- Migration (v7 → v8): Oxc Minifier replaces esbuild for JavaScript minification. `esbuild.minify*` options are replaced by `build.rolldownOptions.output.minify`; `esbuild.drop` by `build.rolldownOptions.output.minify.compress.drop*`. Property mangling options (`mangleProps`, `reserveProps`, `mangleQuoted`, `mangleCache`) are not supported by Oxc.

## Related

- [build-css-options.md](./build-css-options.md)
- [build-target.md](./build-target.md)
- [build-rolldown-options.md](./build-rolldown-options.md)
