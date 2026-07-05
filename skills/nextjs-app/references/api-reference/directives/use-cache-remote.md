# use cache: remote

Declares that a cached function/component's output should be stored in a remote, shared cache handler instead of the in-memory cache used by `use cache`, providing durable caching shared across all server instances.

## Signature / Usage

```tsx
import { cacheTag, cacheLife } from 'next/cache'

async function getProductPrice(productId: string, currency: string) {
  'use cache: remote'
  cacheTag(`product-price-${productId}`)
  cacheLife({ expire: 3600 }) // 1 hour

  return db.products.getPrice(productId, currency)
}
```

Requires `cacheComponents: true` in `next.config.ts`. The remote store is configured via [`cacheHandlers`](../config/next-config-js/cacheHandlers.md) (hosting providers typically supply this automatically).

## Comparison

| Feature | `use cache` | `use cache: remote` | `use cache: private` |
|---------|-------------|----------------------|------------------------|
| Server-side caching | In-memory or cache handler | Remote cache handler | None |
| Cache scope | Shared across all users | Shared across all users | Per-client (browser) |
| Can access cookies/headers directly | No | No | Yes |
| Additional costs | None | Infrastructure (storage, network) | None |

## Notes

- Best suited for content deferred to request time (e.g. behind a `Suspense` boundary reading `cookies()`/`headers()`/`searchParams`), where serverless in-memory caches have low hit rates.
- Avoid when: operations are already fast (< 50ms), cache keys are mostly unique per request, or data changes every few seconds/minutes.
- Nesting rules: remote caches can nest inside other remote caches or inside `use cache`; remote and `use cache: private` **cannot** be nested inside each other.
- Choose the cache-key dimension with fewer unique values (e.g. currency or language, not user ID) to maximize cache utilization.
- Not supported with static export deployment; supported on Node.js server, Docker, and platform-specific adapters.

## Related

- [use cache](./use-cache.md)
- [use cache: private](./use-cache-private.md)
