# use cache: private

Allows a function to access runtime request APIs (`cookies()`, `headers()`, `searchParams`) inside a cached scope. In production, matching calls within one request can reuse the same result, but Next.js does not store it in a server cache across requests. In development, Next.js stores it in memory, keyed by the request's cookies and headers, and serves it to the next matching request while a fresh result is generated in the background. The client router can keep the rendered output in browser memory for the `stale` time set with `cacheLife`; this client-side cache does not persist across page reloads.

## Signature / Usage

```tsx
import { cookies } from 'next/headers'
import { cacheLife, cacheTag } from 'next/cache'

async function getRecommendations(productId: string) {
  'use cache: private'
  cacheTag(`recommendations-${productId}`)
  cacheLife({ stale: 60 })

  // cookies() is allowed inside a private cache scope
  const sessionId = (await cookies()).get('session-id')?.value || 'guest'

  return getPersonalizedRecommendations(productId, sessionId)
}
```

Requires `cacheComponents: true` in `next.config.ts` (same as [`use cache`](./use-cache.md)).

## Request APIs allowed

| API | Allowed in `use cache` | Allowed in `use cache: private` |
|-----|------------------------|----------------------------------|
| `cookies()` | No | Yes |
| `headers()` | No | Yes |
| `searchParams` | No | Yes |
| `connection()` | No | No |

## Notes

- Private Cache Functions run at request time and are excluded from static shell generation. To start one before a component needs its result, see the Preloading data section of the Fetching Data getting-started page.
- Custom cache handlers cannot be configured for `use cache: private`.
- The `stale` time must be at least 30 seconds for per-link prefetching to work, and at least 5 minutes for the content to be included in the route's App Shell (see `cacheLife` prerendering behavior).
- Client stale time: private Cache Functions contribute their `stale` time to the route's Client Cache. For request-scoped deduplication only, use `cacheLife({ stale: Infinity })` so it does not lower the route's stale time. Next.js uses the shortest stale time among the route's cache entries, so another cache or route setting can still set a finite value. `Infinity` does not store the private result on the server across production requests; use a finite value when the client router should revalidate personalized output after a known interval.
- `connection()` is prohibited in both `use cache` and `use cache: private` (connection-specific information cannot be safely cached).
- Version history: `v16.0.0` enabled `"use cache: private"` with the Cache Components feature.
- Reach for this directive only when refactoring to pass runtime values as arguments (the preferred pattern for `use cache`) is impractical, or for compliance requirements preventing server-side storage.

## Related

- [use cache](./use-cache.md)
- [use cache: remote](./use-cache-remote.md)
