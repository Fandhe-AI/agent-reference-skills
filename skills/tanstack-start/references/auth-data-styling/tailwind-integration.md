---
source: https://tanstack.com/start/latest/docs/framework/react/guide/tailwind-integration
---

# Tailwind CSS Integration

Setting up Tailwind CSS v4 (recommended) or v3 (legacy) in a TanStack Start project with Vite or Rsbuild.

## Signature / Usage

```shell
npm install tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [tanstackStart(), viteReact(), tailwindcss()],
})
```

```css
/* src/styles/app.css */
@import 'tailwindcss' source('../');
```

```tsx
// src/routes/__root.tsx
/// <reference types="vite/client" />
import appCss from '../styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `@tailwindcss/vite` | package | Vite plugin for Tailwind v4 |
| `@tailwindcss/postcss` | package | PostCSS plugin for Tailwind v4 with Rsbuild |
| `source('../')` | CSS function | Tailwind v4 content-source directive inside `@import` |

## Notes

- Vite uses `?url` import (with the triple-slash `vite/client` reference); Rsbuild uses a side-effect CSS import instead — Start discovers the generated stylesheet as a route asset either way.
- Tailwind v3 (legacy) uses `tailwindcss@3` with `tailwind.config.js` `content` globs and `@tailwind base/components/utilities` directives instead of the v4 `@import` form.

## Related

- [CSS Styling](./css-styling.md)
