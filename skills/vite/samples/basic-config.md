---
source: https://vite.dev/config/
---

# Basic Config

Create a typed `vite.config.ts` with the `defineConfig` helper.

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
})
```

## Notes

- Vite resolves `vite.config.js` (other JS and TS extensions also supported) inside the project root automatically; use `vite --config my-config.js` to point at another file.
- Alternatives to `defineConfig` for IntelliSense: a JSDoc `/** @type {import('vite').UserConfig} */` hint, or `export default { ... } satisfies UserConfig` in TypeScript.
- To use ES modules syntax in the config file, the file must be detected as ESM by Node.js (e.g. `.mjs`, or `.js` with `"type": "module"`).
- This is Vite's own config. Test configuration belongs to the vitest skill.
