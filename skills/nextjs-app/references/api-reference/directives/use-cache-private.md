# use cache: private

Allows a function to access runtime request APIs (`cookies()`, `headers()`, `searchParams`) inside a cached scope. Results are never stored on the server — they are cached only in the browser's memory and do not persist across page reloads.

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

- **Experimental** feature, subject to change; not recommended for production. Depends on runtime prefetching, which is not yet stable.
- Because the function accesses runtime data, it re-executes on every server render and is excluded from static shell generation.
- Custom cache handlers cannot be configured for `use cache: private`.
- Not available in Route Handlers.
- The `stale` time set via `cacheLife` must be at least 30 seconds for runtime prefetching to work.
- Reach for this directive only when refactoring to pass runtime values as arguments (the preferred pattern for `use cache`) is impractical, or for compliance requirements preventing server-side storage.

## Related

- [use cache](./use-cache.md)
- [use cache: remote](./use-cache-remote.md)
