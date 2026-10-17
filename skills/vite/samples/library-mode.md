---
source: https://vite.dev/guide/build#library-mode
---

# Library Mode

Bundle a browser-oriented library with `build.lib`, externalizing peer dependencies.

```js
// vite.config.js (single entry)
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'lib/main.js'),
      name: 'MyLib',
      // the proper extensions will be added
      fileName: 'my-lib',
    },
    rolldownOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
```

```json
{
  "name": "my-lib",
  "type": "module",
  "files": ["dist"],
  "main": "./dist/my-lib.umd.cjs",
  "module": "./dist/my-lib.js",
  "exports": {
    ".": {
      "import": "./dist/my-lib.js",
      "require": "./dist/my-lib.umd.cjs"
    }
  }
}
```

## Notes

- Single entry produces `es` and `umd`; multiple entries (`entry` as an object) produce `es` and `cjs`. Override with `build.lib.formats`.
- Imported CSS is emitted as one file (default name from `build.lib.fileName`, changeable with `build.lib.cssFileName`) and can be exported in `package.json` (e.g. `"./style.css": "./dist/my-lib.css"`).
- Without `"type": "module"` in `package.json`, Vite emits `.mjs` / `.js` instead of `.js` / `.cjs`.
- `import.meta.env.*` is statically replaced in library builds, but `process.env.*` is not unless you add `define`.
- Option name is `rolldownOptions` in v8 (`rollupOptions` is deprecated).
