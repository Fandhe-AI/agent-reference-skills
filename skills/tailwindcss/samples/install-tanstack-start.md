---
source: https://tailwindcss.com/docs/installation/framework-guides/tanstack-start
---

# Tailwind CSS Setup Steps for TanStack Start

Install-only variant: the commands, Vite plugin config, CSS entry, and root-route `?url` stylesheet link needed to enable Tailwind CSS in TanStack Start (no demo markup).

```shell
npx create-start-app@latest my-project
cd my-project
npm install tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss()
    tanstackStart(),
    tsConfigPaths(),
  ]
});
```

```css
/* src/styles.css */
@import "tailwindcss";
```

```tsx
// src/routes/__root.tsx
// other imports...

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      // your meta tags and site config
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
    // other head config
  }),
  component: RootComponent,
})
```

## Notes

- Role split: this page is the setup steps only; `tanstack-start.md` is the full v4 walkthrough including the demo route.
- The `vite.config.ts` snippet is verbatim from the official guide, which omits the comma after `tailwindcss()`; add it when copying.
- TanStack Start APIs live in the tanstack-start skill.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/framework-guides/tanstack-start.tsx` (fetched 2026-10-16).
