---
source: https://tanstack.com/start/latest/docs/framework/react/guide/cdn-asset-urls
---

# CDN Asset URLs

> Experimental. `transformAssets` (a `createStartHandler` option) rewrites manifest-managed asset URLs (JS preload links, manifest CSS `<link rel="stylesheet">`, the client entry script URL, and optionally `url()`/`@import` inside inlined CSS) at runtime — for serving assets from a CDN whose origin is known only at server start or varies per request.

## Signature / Usage

```tsx
// src/server.ts
import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server'
import { createServerEntry } from '@tanstack/react-start/server-entry'

const handler = createStartHandler({
  handler: defaultStreamHandler,
  transformAssets: process.env.CDN_ORIGIN || '',
})

export default createServerEntry({ fetch: handler })
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `transformAssets` (string) | `string` | Static prefix applied to every Start-managed asset URL; empty/unset leaves URLs unchanged. |
| `transformAssets` (object shorthand) | `{ prefix, crossOrigin? }` | Prefix plus `crossOrigin` for manifest-managed `<link>` tags (single value or per-kind record: `script`/`stylesheet`). |
| `transformAssets` (callback) | `(asset) => string \| { href, crossOrigin? } \| Promise<...>` | Per-asset logic; `asset.kind` is `'script'`, `'stylesheet'`, or `'css-url'` (with `stylesheetHref` for the latter). Cached after first request by default. |
| `transformAssets.transform` / `createTransform` | function | Object form: `transform` = string/callback; `createTransform` = async factory run once per manifest computation, mutually exclusive with `transform`. |
| `transformAssets.cache` | `boolean` | Default `true`; set `false` when the transform depends on per-request data (region/tenant/header). |
| `transformAssets.warmup` | `boolean` | Computes the cached manifest in the background on server startup (production only, no effect with `cache: false`). |
| `HeadContent assetCrossOrigin` | `string \| record` | App-shell-level cross-origin override; takes precedence over `transformAssets`'s `crossOrigin`. |

## Notes

- Does **not** rewrite arbitrary route `head().links` entries (e.g. CSS imported with `?url()` and returned from `head()`) or asset URLs imported directly in components — use bundler-level URL config instead (Vite `experimental.renderBuiltUrl`, Rsbuild `output.assetPrefix`).
- CSS-internal URL rewriting requires opting into build-time CSS URL templates (`inlineCss: { enabled: true, transformAssets: true }`); plain `inlineCss: true` does not emit the needed metadata.
- For client-side navigation chunk URLs to also resolve against the CDN, set Vite `base: ''` (not `'./'`) or Rsbuild `output.assetPrefix: 'auto'`.
- Development mode (`TSS_DEV_SERVER`) always skips caching regardless of the `cache` setting.
- Static Early Hints reflect `transformAssets` rewrites and `crossOrigin` (see Early Hints guide).

## Related

- [Early Hints](./early-hints.md)
- [Server Entry Point](./server-entry-point.md)
