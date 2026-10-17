---
source: https://vite.dev/config/build-options#build-target
---

# build.target

Browser compatibility target for the final bundle.

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'baseline-widely-available', // default
  },
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `build.target` | `string \| string[]` | `'baseline-widely-available'` | Browser compatibility target. Special values: `'baseline-widely-available'` and `'esnext'`. Custom values: an ES version (e.g. `es2015`), a browser with version (e.g. `chrome58`), or an array of target strings |

## Notes

- `'baseline-widely-available'` targets the minimum browser versions compatible with Baseline Widely Available as of a date fixed for each major release (2026-01-01 for this major). Specifically: `['chrome111', 'edge111', 'firefox114', 'safari16.4', 'ios16.4']`.
- `'esnext'` assumes native dynamic imports support and only performs minimal transpiling.
- The transform is performed with Oxc Transformer; the value must be a valid Oxc Transformer target option. The build outputs a warning if the code contains features that cannot be safely transpiled by Oxc.
- Migration (v7 → v8): the `'baseline-widely-available'` default moved to Chrome 107 → 111, Edge 107 → 111, Firefox 104 → 114, Safari 16.0 → 16.4. Passing the same browser with multiple versions to `build.target` now errors (esbuild previously selected the latest version).
- Related: `build.cssTarget` defaults to this value.

## Related

- [build-css-options.md](./build-css-options.md)
- [build-minify.md](./build-minify.md)
