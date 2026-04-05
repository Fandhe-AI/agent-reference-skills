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

## Notes

- On Cloudflare Workers, `Cache-Control` headers from the origin response are respected automatically.
- On Deno, set `wait: true` because cache invalidation is not automatic.
- This middleware requires a runtime that implements the Cache API.

## Related

- [ETag](./etag.md)
