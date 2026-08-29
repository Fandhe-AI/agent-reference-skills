---
source: https://tanstack.com/start/latest/docs/framework/react/guide/tailwind-integration
---

# Tailwind CSS Setup (v4, Vite)

Install and wire up Tailwind CSS v4 in a TanStack Start project using the Vite plugin.

```bash
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
import { createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
})
```

## Notes

- The `?url` import plus the triple-slash `vite/client` reference is required for Vite; Rsbuild instead uses a plain side-effect CSS import.
- `source('../')` inside the `@import` is Tailwind v4's content-source directive, replacing v3's `content` globs in `tailwind.config.js`.
- Register `tailwindcss()` after `tanstackStart()` and `viteReact()` in the plugin array.
