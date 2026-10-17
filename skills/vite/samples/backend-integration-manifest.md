---
source: https://vite.dev/guide/backend-integration
---

# Backend Integration with the Build Manifest

Serve Vite assets from a traditional backend using a custom entry, dev tags, and `.vite/manifest.json`.

```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // overwrite default .html entry
  input: '/path/to/main.js',
  server: {
    cors: {
      // the origin you will be accessing via browser
      origin: 'http://my-backend.example.com',
    },
  },
  build: {
    // generate .vite/manifest.json in outDir
    manifest: true,
  },
})
```

```html
<!-- if development -->
<script type="module" src="http://localhost:5173/@vite/client"></script>
<script type="module" src="http://localhost:5173/main.js"></script>
```

```html
<!-- if production: for entry point views/foo.js -->
<link rel="stylesheet" href="assets/foo-5UjPuW-k.css" />
<link rel="stylesheet" href="assets/shared-ChJ_j-JJ.css" />
<script type="module" src="assets/foo-BRBmoGS9.js"></script>
<!-- optional -->
<link rel="modulepreload" href="assets/shared-B7PI925R.js" />
```

## Notes

- Add `import 'vite/modulepreload-polyfill'` at the start of the entry unless the module preload polyfill is disabled.
- For assets in dev, either proxy static asset requests to the Vite server or set `server.origin`.
- With `@vitejs/plugin-react`, the docs also require injecting the `@react-refresh` preamble script before the dev scripts, since the plugin cannot modify backend-served HTML.
- Emit order per entry: CSS of the entry, CSS of recursively imported chunks, the entry `file`, then optional `modulepreload` links. `importedChunks` in the docs is illustrative, not a Vite API.
- The experimental `build.chunkImportMap` also needs its `importmap.json` injected as `<script type="importmap">` before module scripts.
