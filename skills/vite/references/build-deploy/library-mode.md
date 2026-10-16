---
source: https://vite.dev/guide/build#library-mode
---

# Library Mode

Bundle a browser-oriented library for distribution with the `build.lib` config option, externalizing dependencies you do not want to bundle.

## Signature / Usage

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

Multiple entries:

```js
// vite.config.js (multiple entries)
export default defineConfig({
  build: {
    lib: {
      entry: {
        'my-lib': resolve(import.meta.dirname, 'lib/main.js'),
        secondary: resolve(import.meta.dirname, 'lib/secondary.js'),
      },
      name: 'MyLib',
    },
    rolldownOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
```

Entry file exports:

```js
// lib/main.js
import Bar from './Bar.vue'
import Foo from './Foo.vue'
export { Foo, Bar }
```

Recommended `package.json` (single entry):

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

Recommended `package.json` (multiple entries):

```json
{
  "name": "my-lib",
  "type": "module",
  "files": ["dist"],
  "main": "./dist/my-lib.cjs",
  "module": "./dist/my-lib.js",
  "exports": {
    ".": {
      "import": "./dist/my-lib.js",
      "require": "./dist/my-lib.cjs"
    },
    "./secondary": {
      "import": "./dist/secondary.js",
      "require": "./dist/secondary.cjs"
    }
  }
}
```

## Notes

- During development, use your `index.html` as a test/demo page that imports the actual library.
- `vite build` uses a Rollup preset oriented towards shipping libraries and produces two bundle formats: `es` and `umd` (single entry), `es` and `cjs` (multiple entries). Formats are configurable with `build.lib.formats`.
- Example output:

  ```
  $ vite build
  building for production...
  dist/my-lib.js      0.08 kB / gzip: 0.07 kB
  dist/my-lib.umd.cjs 0.30 kB / gzip: 0.16 kB
  ```

- CSS support: imported CSS is bundled as a single CSS file besides the JS files, e.g. `dist/my-lib.css`. The name defaults to `build.lib.fileName` and can be changed with `build.lib.cssFileName`. Export it in `package.json` for consumers:

  ```json
  "exports": {
    ".": {
      "import": "./dist/my-lib.js",
      "require": "./dist/my-lib.umd.cjs"
    },
    "./style.css": "./dist/my-lib.css"
  }
  ```

- File extensions: if `package.json` does not contain `"type": "module"`, Vite generates different extensions for Node.js compatibility: `.js` becomes `.mjs` and `.cjs` becomes `.js`.
- Environment variables: in library mode all `import.meta.env.*` usage is statically replaced when building for production, but `process.env.*` is not, so library consumers can change it dynamically. To replace statically use e.g. `define: { 'process.env.NODE_ENV': '"production"' }`, or use `esm-env` for better compatibility with bundlers and runtimes.
- Advanced usage: library mode is a simple, opinionated configuration for browser-oriented and JS framework libraries. For non-browser libraries or advanced build flows, use tsdown (https://tsdown.dev/) or Rolldown (https://rolldown.rs/) directly.

## Related

- [Customizing the Build](./customizing-build.md)
- [Multi-Page App](./multi-page-app.md)
