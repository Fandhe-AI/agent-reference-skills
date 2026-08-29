---
source: https://tanstack.com/router/latest/docs/framework/react/guide/document-head-management
---

# Document Head Management

Manage `<title>`, `<meta>`, `<link>`, `<style>`, and `<script>` tags per route via `routeOptions.head`, with automatic deduping and composable merging across nested routes, for both TanStack Start full-stack apps and SPAs.

## Signature / Usage

```tsx
export const Route = createRootRoute({
  head: () => ({
    meta: [
      { name: 'description', content: 'My App is a web application' },
      { title: 'My App' },
    ],
    links: [{ rel: 'icon', href: '/favicon.ico' }],
    styles: [{ media: 'all and (max-width: 500px)', children: `p { color: blue; }` }],
    scripts: [{ src: 'https://www.google-analytics.com/analytics.js' }],
  }),
})
```

Rendering the head (required):

```tsx
import { HeadContent } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <html>
      <head><HeadContent /></head>
      <body><Outlet /></body>
    </html>
  ),
})
```

Body scripts and pre-hydration inline scripts:

```tsx
export const Route = createRootRoute({
  scripts: () => [{ children: 'console.log("Hello, world!")' }],
})

// pre-hydration (e.g. theme detection), self-removes after execution
import { ScriptOnce } from '@tanstack/react-router'
<ScriptOnce children={themeScript} />
```

## Options / Props

| Name | Description |
|------|-------------|
| `routeOptions.head` | Function returning `{ title, meta, links, styles, scripts }` |
| `<HeadContent />` | Required; renders head/title/meta/link/head-scripts; place in `<head>` or as high as possible |
| `<HeadContent assetCrossOrigin>` | Sets `crossorigin` on manifest-managed asset links (Start only); accepts a string or `{ script, stylesheet }` |
| `routeOptions.scripts` | Function returning body `<script>` entries |
| `<Scripts />` | Required to render body scripts; place in `<body>` |
| `<ScriptOnce>` | Renders an inline script once on SSR that self-removes after execution; no-op on client navigation |

## Notes

- `title`/`meta` tags dedupe by preferring the **last** occurrence found in nested routes (same `name`/`property` for `meta`).
- `assetCrossOrigin` only applies to manifest-managed asset links emitted by Start; if `crossOrigin` is also set via `transformAssets`, `assetCrossOrigin` wins.
- For SPAs, remove any `<title>` from `index.html` before relying on `<HeadContent />`.
- If a `ScriptOnce` script mutates the DOM before hydration (e.g. adding a class to `<html>`), add `suppressHydrationWarning` to avoid React hydration warnings.

## Related

- [SSR](./ssr.md)
