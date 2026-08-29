---
source: https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering
---

# Static Prerendering

Generate static HTML files at build time for specific pages or the whole crawlable route tree.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        filter: ({ path }) => !path.startsWith('/do-not-render-me'),
      },
      pages: [
        { path: '/about', prerender: { enabled: true, outputPath: '/about/index.html' } },
      ],
    }),
    viteReact(),
  ],
})
```

## Notes

- `prerender.enabled: true` turns on the build-time step; `crawlLinks: true` extracts links from rendered HTML and prerenders those too.
- Routes with path parameters (`/users/$userId`), layout routes (`_layout`), and component-less API routes are excluded from auto-discovery — list them explicitly under `pages` if they must be prerendered.
- `pages` entries are merged with auto-discovered static routes, not a replacement list.
