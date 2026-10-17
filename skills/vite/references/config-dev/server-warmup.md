---
source: https://vite.dev/config/server-options#server-warmup
---

# server.warmup

Warm up files to transform and cache the results in advance, improving initial page load during server start and preventing transform waterfalls.

## Signature / Usage

```js
export default defineConfig({
  server: {
    warmup: {
      clientFiles: ['./src/components/*.vue', './src/utils/big-utils.js'],
      ssrFiles: ['./src/server/modules/*.js'],
    },
  },
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `server.warmup` | `{ clientFiles?: string[], ssrFiles?: string[] }` | Files to warm up |
| `clientFiles` | string[] | Files used in the client only |
| `ssrFiles` | string[] | Files used in SSR only |

## Notes

- Both accept file paths or `tinyglobby` patterns relative to `root`.
- Only add frequently used files, to avoid overloading the Vite dev server on startup.
- Related guide: "Warm Up Frequently Used Files" in the performance guide.

## Related

- [server-watch.md](./server-watch.md)
