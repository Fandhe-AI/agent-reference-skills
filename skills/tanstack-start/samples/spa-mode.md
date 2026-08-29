---
source: https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode
---

# SPA Mode

Ship a static HTML shell (root route only) that bootstraps the app fully on the client, for static-host deployment without SSR.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    tanstackStart({
      spa: {
        enabled: true,
      },
    }),
    viteReact(),
  ],
})
```

```tsx
// src/routes/__root.tsx
import { Outlet, useRouter } from '@tanstack/react-router'

function RootComponent() {
  const router = useRouter()
  if (router.isShell()) {
    // still rendering the prerendered static shell
    return <ShellFallback />
  }
  return <Outlet />
}
```

## Notes

- Only the root route is prerendered into `/_shell.html` (configurable via `spa.prerender`); matched routes render the router's pending fallback until hydration completes.
- After hydration the router immediately navigates to the first real route and `useRouter().isShell()` becomes `false` — guard against a flash of unstyled/placeholder content.
- Deployment needs redirect rules: serve static assets first, allow-list dynamic paths (`/_serverFn/*`, `/api/*`), then catch-all 404 to the shell HTML.
- Differs from Selective SSR (`selective-ssr.md`): SPA mode disables SSR app-wide; selective SSR configures per-route.
