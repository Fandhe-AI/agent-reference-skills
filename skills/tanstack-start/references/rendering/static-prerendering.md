---
source: https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering
---

# Static Prerendering

Generates static HTML files for the app at build time, for performance or for deploying to platforms without SSR support.

## Signature / Usage

```ts
// vite.config.ts
export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        enabled: false,
        autoSubfolderIndex: true,
        autoStaticPathsDiscovery: true,
        concurrency: 14,
        crawlLinks: true,
        filter: ({ path }) => !path.startsWith('/do-not-render-me'),
        retryCount: 2,
        retryDelay: 1000,
        maxRedirects: 5,
        failOnError: true,
        onSuccess: ({ page }) => console.log(`Rendered ${page.path}!`),
      },
      pages: [
        { path: '/my-page', prerender: { enabled: true, outputPath: '/my-page/index.html' } },
      ],
    }),
    viteReact(),
  ],
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `enabled` | `boolean` | Turns prerendering on (default `false`). |
| `autoSubfolderIndex` | `boolean` | `/page/index.html` vs `/page.html` output layout. |
| `autoStaticPathsDiscovery` | `boolean` | Auto-discovers static routes; merged with `pages` config. Default `true`. |
| `concurrency` | `number` | Parallel prerender jobs, default `14`. |
| `crawlLinks` | `boolean` | Extracts links from rendered HTML and prerenders them too, default `true`. |
| `filter` | `(page) => boolean` | Excludes specific paths. |
| `retryCount` / `retryDelay` | `number` | Retry behavior for failed renders. |
| `maxRedirects` | `number` | Maximum redirects to follow during prerendering. |
| `failOnError` | `boolean` | Whether to halt the build on prerender error. |
| `onSuccess` | `({ page }) => void` | Callback per successfully rendered page. |
| `pages` | `Array<{ path, prerender }>` | Explicit per-page prerender overrides, merged with auto-discovered routes. |

## Notes

- Auto-discovery excludes routes with path parameters (e.g. `/users/$userId`), layout routes (prefixed `_`), and routes without components (API routes) — these can still be prerendered if linked and `crawlLinks` is enabled.
- Both Vite and Rsbuild plugins support the same configuration shape.

## Related

- [SPA Mode](./spa-mode.md)
- [Incremental Static Regeneration (ISR)](./isr.md)
