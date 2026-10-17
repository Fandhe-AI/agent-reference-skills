---
source: https://vite.dev/guide/build#multi-page-app
---

# Multi-Page App

Build several HTML entry points by listing them in the config `input`.

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

- In dev, simply navigate or link to `/nested/`; only the build needs the explicit entries.
- `import.meta.dirname` is the folder of `vite.config.js` even when `root` differs, so include your `root` in the `resolve` arguments.
- For HTML entries Vite ignores the entry name and uses the resolved file id when emitting HTML, matching the dev server structure.
- `input` is the shared option that defaults `build.rolldownOptions.input`; the docs prose refers to `rolldownOptions.input` as well.
