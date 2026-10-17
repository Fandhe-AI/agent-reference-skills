---
source: https://vite.dev/config/build-options#build-chunkimportmap
---

# build.chunkImportMap

Use the import maps feature to optimize chunk caching efficiency.

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    chunkImportMap: true,
  },
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `build.chunkImportMap` | `boolean` | `false` | Whether to use import maps to optimize chunk caching efficiency |

## Notes

- Experimental.
- Requires `import.meta.resolve` support. If you need to support older browsers, check out `@vitejs/plugin-legacy`.
- See the Chunk Import Map Optimization section of the Features guide.

## Related

- [build-module-preload.md](./build-module-preload.md)
- [build-rolldown-options.md](./build-rolldown-options.md)
