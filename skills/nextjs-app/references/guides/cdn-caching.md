# CDN Caching

Next.js sets standard `Cache-Control` headers per route (static, ISR, dynamic) that CDNs can use to cache at the edge, with a `_rsc` search-parameter cache key and `Vary` header handling response variants across RSC/HTML and prefetch requests.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Static pages | `Cache-Control` | `s-maxage=31536000` (one year, no revalidation) |
| ISR pages | `Cache-Control` | `s-maxage={revalidate}, stale-while-revalidate={expire - revalidate}`, tunable via `cacheLife` |
| Dynamic pages | `Cache-Control` | `private, no-cache, no-store, max-age=0, must-revalidate` |
| Static assets (`/_next/static/`) | `Cache-Control` | `public, max-age=31536000, immutable` (filenames content-hashed) |
| `assetPrefix` | `next.config` | Serves static assets from a different domain/CDN origin |
| `_rsc` search parameter | cache key | Hash of relevant request-header values distinguishing response variants; must be preserved in the cache key |
| `rsc` header | request header | Must be forwarded — tells the server to return RSC payload instead of HTML |
| `experimental.validateRSCRequestHeaders` | `next.config` boolean | When `true` (default), a mismatched `_rsc` hash triggers a 307 redirect to the correct URL |

## Notes

- CDN-level caching does not propagate `revalidateTag()`/`revalidatePath()` on-demand invalidation — trigger a CDN purge alongside the revalidation call for both HTML and RSC variants.
- Response variance comes from custom headers: `rsc`, `next-router-state-tree`, `next-router-prefetch`, `next-router-segment-prefetch`, `next-url` (interception routes only); Next.js signals this via `Vary`, but many CDNs don't support `Vary` without extra config.
- Safe to omit `next-router-state-tree` (server falls back to full payload) and `next-router-segment-prefetch` (falls back to a broader prefetch payload); `next-url` must not be dropped for interception routes to work.
- `proxy.js` (formerly Middleware) should run before the CDN cache layer so it remains the source of truth for auth/redirects/rewrites.
- For PPR-enabled routes, a CDN can cache static prefetch responses by including `_rsc` in the cache key and respecting `Cache-Control`.
- Direction of travel: pathname-based cache keying (`/my/page.rsc`, `/my/page.segments/.../segment.rsc`) will eliminate `Vary`/`_rsc` dependency, making search params safely droppable and interception-route support CDN-opt-in — currently in active design, not yet shipped.

## Related

- [Rendering Philosophy](./rendering-philosophy.md)
- [Streaming](./streaming.md)
