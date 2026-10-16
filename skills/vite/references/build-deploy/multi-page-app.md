---
source: https://vite.dev/guide/build#multi-page-app
---

# Multi-Page App

Specify multiple `.html` files as entry points during build; during dev, simply navigate or link to `/nested/`.

## Signature / Usage

Source structure:

```
├── package.json
├── vite.config.js
├── index.html
├── main.js
└── nested
    ├── index.html
    └── nested.js
```

```js
// vite.config.js
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  input: {
    main: resolve(import.meta.dirname, 'index.html'),
    nested: resolve(import.meta.dirname, 'nested/index.html'),
  },
})
```

## Notes

- During dev it works as expected, just like a normal static file server.
- If you specify a different root, `import.meta.dirname` is still the folder of your `vite.config.js` when resolving the input paths; add your `root` entry to the arguments for `resolve`.
- For HTML files, Vite ignores the name given to the entry in the `rolldownOptions.input` object and respects the resolved id of the file when generating the HTML asset in the dist folder. This keeps the structure consistent with the dev server.
- The example above uses a top-level `input` key exactly as it appears in the v8.3.4 docs source; the prose refers to `rolldownOptions.input`.

## Related

- [Customizing the Build](./customizing-build.md)
- [Library Mode](./library-mode.md)
