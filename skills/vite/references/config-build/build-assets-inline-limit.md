---
source: https://vite.dev/config/build-options#build-assetsinlinelimit
---

# build.assetsInlineLimit

Size threshold under which imported or referenced assets are inlined as base64 URLs.

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    assetsInlineLimit: 4096,
  },
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `build.assetsInlineLimit` | `number \| ((filePath: string, content: Buffer) => boolean \| undefined)` | `4096` (4 KiB) | Assets smaller than this are inlined as base64 URLs to avoid extra http requests. `0` disables inlining |

## Notes

- If a callback is passed, return a boolean to opt in or opt out. If nothing is returned the default logic applies.
- Git LFS placeholders are automatically excluded from inlining because they do not contain the content of the file they represent.
- If `build.lib` is specified, `build.assetsInlineLimit` is ignored and assets are always inlined, regardless of file size or being a Git LFS placeholder.

## Related

- [build-lib.md](./build-lib.md)
