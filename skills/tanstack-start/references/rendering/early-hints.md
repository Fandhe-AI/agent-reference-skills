---
source: https://tanstack.com/start/latest/docs/framework/react/guide/early-hints
---

# Early Hints

> Experimental. Support for HTTP `103 Early Hints`, letting the server tell the browser about important resources before the final HTML response is ready. TanStack Start collects route assets and route `head().links`, then calls your server entry's `onEarlyHints` so the runtime can send the `103` response; Start does not send hints automatically.

## Signature / Usage

```tsx
// src/server.ts
import handler, { createServerEntry } from '@tanstack/react-start/server-entry'

export default createServerEntry({
  fetch(request) {
    return handler.fetch(request, {
      onEarlyHints: ({ phase, links }) => {
        if (phase !== 'static' || !links.length) return
        // send `links` with your runtime-specific 103 API
      },
    })
  },
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `onEarlyHints` | `(event: EarlyHintsEvent) => void` | Called (possibly more than once) as hints become available. |
| `EarlyHintsEvent.phase` | `'static' \| 'dynamic'` | `static`: after route matching, before router load — manifest assets; may run before redirects are known. `dynamic`: after `router.load()` completes (skipped on redirect) — route `head().links` links. |
| `EarlyHintsEvent.links` / `allLinks` | `Array<string>` | Serialized `Link`-header form; `links` = new-this-phase, `allLinks` = all deduped so far. |
| `EarlyHintsEvent.hints` / `allHints` | `ReadonlyArray<EarlyHint>` | Structured equivalents of `links`/`allLinks`, index-aligned. |
| `responseLinkHeader` | `boolean \| { filter }` | Fallback: attaches collected hints to the final HTML response's `Link` header (for runtimes without `103` support, or CDNs that generate Early Hints from `Link` headers). |

Supported link relations: `preload`, `modulepreload`, `preconnect`, `dns-prefetch` (serializes `href`, `rel`, `as`, `crossOrigin`, `type`, `integrity`, `referrerPolicy`, `fetchPriority`).

## Notes

- Browsers generally process only the first `103` response per navigation — write at most one.
- `rel: 'stylesheet'` route `head().links` entries are converted to `rel=preload; as=style` for Early Hints.
- Static hints follow `transformAssets` URL rewrites/`crossOrigin` (see CDN Asset URLs); JS hints use `modulepreload` (module output) or `preload; as=script` (IIFE output).
- Only forward `responseLinkHeader` links that are public and cache-stable per the response's cache boundary; use `responseLinkHeader.filter` to exclude private/short-lived/user-specific links.
- Skipped in the Start dev server; requires the runtime/proxy in front of the app to support HTTP `103`.

## Related

- [CDN Asset URLs](./cdn-asset-urls.md)
- [Server Entry Point](./server-entry-point.md)
