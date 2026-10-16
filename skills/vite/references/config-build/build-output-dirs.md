---
source: https://vite.dev/config/build-options#build-outdir
---

# build.outDir / assetsDir / emptyOutDir / copyPublicDir / write

Output directory layout and write behavior of the production build.

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    copyPublicDir: true,
    write: true,
  },
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `build.outDir` | `string` | `dist` | Output directory, relative to project root |
| `build.assetsDir` | `string` | `assets` | Directory to nest generated assets under, relative to `build.outDir`. Not used in Library Mode |
| `build.write` | `boolean` | `true` | Set to `false` to disable writing the bundle to disk |
| `build.emptyOutDir` | `boolean` | `true` if `outDir` is inside `root` | Empty `outDir` on build |
| `build.copyPublicDir` | `boolean` | `true` | Copy files from `publicDir` into `outDir` on build. Set to `false` to disable |

## Notes

- `build.write: false` is mostly used in programmatic `build()` calls where further post processing of the bundle is needed before writing to disk.
- If `outDir` is outside of root, Vite emits a warning to avoid accidentally removing important files. Set `emptyOutDir` explicitly to suppress the warning. Also available via command line as `--emptyOutDir`.

## Related

- [build-lib.md](./build-lib.md)
- [build-manifest.md](./build-manifest.md)
