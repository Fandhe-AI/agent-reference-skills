---
source: https://vite.dev/config/server-options#server-origin
---

# server.origin / server.sourcemapIgnoreList

Set the origin of generated asset URLs during development, and control which sources are ignored in the server sourcemap.

## Signature / Usage

```js
export default defineConfig({
  server: {
    // This is the default value, and will add all files that have
    // node_modules as a path segment to the ignore list.
    sourcemapIgnoreList(sourcePath, sourcemapPath) {
      return /(?:^|[\\/])node_modules(?:[\\/]|$)/.test(sourcePath)
    },
    origin: 'http://127.0.0.1:8080',
  },
})
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `server.origin` | `string` | — | Origin of the generated asset URLs during development |
| `server.sourcemapIgnoreList` | `false \| (sourcePath: string, sourcemapPath: string) => boolean` | `(sourcePath) => /(?:^|[\\/])node_modules(?:[\\/]|$)/.test(sourcePath)` | Whether to ignore source files in the server sourcemap, used to populate the `x_google_ignoreList` source map extension. `false` disables the default behavior |

## Notes

- `server.sourcemapIgnoreList` is the dev-server equivalent of `build.rolldownOptions.output.sourcemapIgnoreList`. The Rolldown function receives a relative `sourcePath`; `server.sourcemapIgnoreList` receives an absolute path (during dev most modules have the map and source in the same folder, so the relative path would just be the file name).
- The two options must be set independently: `server.sourcemapIgnoreList` is server-only and does not get its default from the Rolldown options.

## Related

- [server-fs.md](./server-fs.md)
