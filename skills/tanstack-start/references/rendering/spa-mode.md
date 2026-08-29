---
source: https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode
---

# SPA Mode

Ships a static HTML "shell" (prerendered root route only) that bootstraps the app entirely on the client, while still allowing server functions/routes. Adds a build-time prerender step producing `/_shell.html` (configurable), with default rewrites routing 404s to the shell.

## Signature / Usage

```ts
// vite.config.ts
export default defineConfig({
  plugins: [
    tanstackStart({
      spa: {
        enabled: true,
      },
    }),
  ],
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `spa.enabled` | `boolean` | Enables SPA mode / shell generation. |
| `spa.maskPath` | `string` | Pathname used to generate the shell (the "shell mask path"), default `/`. Recommended to keep default. |
| `spa.prerender` | `PrerenderOptions` | Prerender options for the shell; defaults: `outputPath: '/_shell.html'`, `crawlLinks: false`, `retryCount: 0`. |

## Notes

- Trade-offs: easier/cheaper static-host deployment, simpler client-only rendering, but slower time-to-full-content and weaker SEO unless crawlers execute JS.
- Only the root route is prerendered for the shell; where matched routes would render, the router's pending fallback component renders instead. Other routes can still be prerendered separately (recommended but not required).
- Deployment requires redirects: serve static assets first, optionally allow-list dynamic paths (`/_serverFn/*`, `/api/*`), then catch-all 404 → shell HTML.
- `useRouter().isShell()` detects shell rendering; after hydration the router immediately navigates to the first route and `isShell()` becomes `false` — guard against flash of unstyled content.
- Dynamic data in the shell comes from `loader`/server functionality defined on the **root route**, run during the SSR build's prerendering process.

## Related

- [Selective SSR](./selective-ssr.md)
- [Static Prerendering](./static-prerendering.md)
