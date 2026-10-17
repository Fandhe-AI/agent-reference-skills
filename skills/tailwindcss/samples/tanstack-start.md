---
source: https://tailwindcss.com/docs/installation/framework-guides/tanstack-start
---

# Install Tailwind CSS with TanStack Start

Set up Tailwind CSS v4 in a TanStack Start project with the `@tailwindcss/vite` plugin.

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
    tailwindcss(),
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

```tsx
// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello World!
    </h1>
  )
}
```

## Notes

- Import the stylesheet in `__root.tsx` with the `?url` query and register it via `links`.
- The `vite.config.ts` snippet follows the official guide, except that the comma after `tailwindcss()` (missing in the original) has been added here.
- Framework APIs live in the tanstack-start skill; this sample covers only Tailwind setup.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/framework-guides/tanstack-start.tsx` (fetched 2026-10-16).
