# Cache Middleware

Caches responses using the Cache API (available on Cloudflare Workers, Deno, etc.).

## Signature / Usage

```ts
import { cache } from 'hono/cache'

app.get('*', cache({
  cacheName: 'my-app',
  cacheControl: 'max-age=3600',
}))
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `cacheName` | `string \| (c) => string \| Promise<string>` | Yes | Cache storage identifier; multiple caches can coexist with different names |
| `wait` | `boolean` | No | Wait for cache write to complete before proceeding (default: `false`; required for Deno) |
| `cacheControl` | `string` | No | `Cache-Control` header directives to set on responses |
| `vary` | `string \| string[]` | No | `Vary` header value; duplicates are removed when merging |
| `keyGenerator` | `(c) => string \| Promise<string>` | No | Custom cache key generator (default: `c.req.url`) |
| `cacheableStatusCodes` | `number[]` | No | HTTP status codes to cache (default: `[200]`) |
| `onCacheNotAvailable` | `(() => void) \| false` | No | Callback when the Cache API is unavailable. Pass `false` to suppress the default `console.log` warning |

## Notes

- On Cloudflare Workers, `Cache-Control` headers from the origin response are respected automatically.
- On Deno, set `wait: true` because cache invalidation is not automatic.
- This middleware requires a runtime that implements the Cache API.
### Caching authenticated responses

The cache is shared by all clients and stores any cacheable response, including one for a signed-in user; the middleware does not look at the `Cookie` request header. To keep per-user responses out of the shared cache: register `cache()` after your authentication middleware, set `Cache-Control: private` (or `no-store`) on per-user responses (the middleware does not store them), or use `vary` such as `vary: 'Cookie'` to cache a separate response per cookie value.

```ts
app.use('/api/*', auth)
app.get(
  '/api/*',
  cache({
    cacheName: 'my-app',
    cacheControl: 'max-age=60',
    vary: 'Cookie',
  })
)
```
- The middleware also caches responses to QUERY requests; the cache key then includes a digest of the request content and its representation metadata (RFC 10008).
- Source: https://hono.dev/docs/middleware/builtin/cache (honojs/website@20aab4e0, retrieved 2026-11-14)

## Related

- [ETag](./etag.md)
