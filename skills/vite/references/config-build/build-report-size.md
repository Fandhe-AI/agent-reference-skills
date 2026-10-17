---
source: https://vite.dev/config/build-options#build-reportcompressedsize
---

# build.reportCompressedSize / chunkSizeWarningLimit

Build output size reporting and chunk size warnings.

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    reportCompressedSize: false,
    chunkSizeWarningLimit: 500,
  },
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `build.reportCompressedSize` | `boolean` | `true` | Enable/disable gzip-compressed size reporting. Compressing large output files can be slow, so disabling may increase build performance for large projects |
| `build.chunkSizeWarningLimit` | `number` | `500` | Limit for chunk size warnings (in kB), compared against the uncompressed chunk size |

## Related

- [build-minify.md](./build-minify.md)
