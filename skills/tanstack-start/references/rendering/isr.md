---
source: https://tanstack.com/start/latest/docs/framework/react/guide/isr
---

# Incremental Static Regeneration (ISR)

Serves statically generated content from a CDN while periodically regenerating it in the background, using standard HTTP cache headers rather than a framework-specific ISR mechanism — works with any CDN.

## Signature / Usage

```tsx
// routes/blog/posts/$postId.tsx
export const Route = createFileRoute('/blog/posts/$postId')({
  loader: async ({ params }) => ({ post: await fetchPost(params.postId) }),
  headers: () => ({
    'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
  }),
})
```

## Options / Props

| Name | Description |
|------|-------------|
| `public` | Response cacheable by any cache (CDN, browser). |
| `max-age=N` | Content fresh for N seconds. |
| `s-maxage=N` | Overrides `max-age` for shared caches (CDNs). |
| `stale-while-revalidate=N` | Serves stale content while revalidating in the background for up to N seconds. |
| `immutable` | Content never changes (hash-based assets). |
| `staleTime` / `gcTime` (route option) | Client-side (TanStack Router) freshness/cache duration, layered on top of CDN caching. |

## Notes

- Server functions/server routes can also set `Cache-Control` (and provider-specific headers like `CDN-Cache-Control`) on their `Response`.
- Use middleware (`createMiddleware().server(...)`) to set cache headers across routes, or the route's `headers` option for page routes.
- On-demand revalidation is implemented by exposing a server route that verifies a secret and calls the CDN's purge API (e.g. Cloudflare `purge_cache`).
- Combine with [Static Prerendering](./static-prerendering.md): prerender at build time for instant first load, then rely on cache headers for background regeneration.
- Recommended to start with conservative (short) cache times and add ETags for efficient revalidation.

## Related

- [Static Prerendering](./static-prerendering.md)
