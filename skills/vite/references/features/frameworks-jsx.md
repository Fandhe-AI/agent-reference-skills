---
source: https://vite.dev/guide/features#jsx
---

# Frameworks / JSX

All modern frameworks maintain Vite integrations. `.jsx` and `.tsx` files are supported out of the box, transpiled by the Oxc Transformer.

## Signature / Usage

Custom JSX settings for your own framework go through the `oxc` option. The Preact plugin would use:

```js
import { defineConfig } from 'vite'

export default defineConfig({
  oxc: {
    jsx: {
      importSource: 'preact',
    },
  },
})
```

`jsxInject` (a Vite-only option) injects the JSX helpers to avoid manual imports:

```js
import { defineConfig } from 'vite'

export default defineConfig({
  oxc: {
    jsxInject: `import React from 'react'`,
  },
})
```

## Notes

- Most framework plugins are maintained by each framework team, except the official Vue and React plugins maintained in the vite org: `@vitejs/plugin-vue`, `@vitejs/plugin-vue-jsx`, `@vitejs/plugin-react`, `@vitejs/plugin-react-swc`, and `@vitejs/plugin-rsc` (React Server Components).
- Vue users should use `@vitejs/plugin-vue-jsx`, which provides Vue 3 specific features including HMR, global component resolving, directives and slots.
- Framework-level routing and SSR frameworks (react-router, tanstack-start, tanstack-router, nextjs-app) are covered by their own skills; this page covers only Vite's JSX transpilation.

## Related

- [oxc / esbuild options](../config-shared/oxc-esbuild.md)
- [Official plugins](../getting-started/official-plugins.md)
