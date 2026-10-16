---
source: https://tanstack.com/start/latest/docs/framework/react/guide/tanstack-query
---

# TanStack Query

Use TanStack Query with TanStack Start for request-isolated SSR, hydration, route preloading, streaming, and mutation invalidation. Router loaders coordinate navigation; Query owns fetched data, freshness, and mutation state.

## Signature / Usage

Install `@tanstack/react-query` and `@tanstack/react-router-ssr-query`, then create the QueryClient inside `getRouter` and wire it with `setupRouterSsrQueryIntegration`.

```tsx
// src/router.tsx
import { QueryClient } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 30_000 } },
  })
  const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })

  setupRouterSsrQueryIntegration({ router, queryClient })
  return router
}
```

Share query options between a server function, the loader, and the component:

```tsx
// src/utils/preferences.ts
import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import { getCookie, setResponseHeader } from '@tanstack/react-start/server'

export const getReaderName = createServerFn({ method: 'GET' }).handler(() => {
  setResponseHeader('Cache-Control', 'private, no-store')
  return getCookie('reader-name') || 'Guest'
})

export const readerNameOptions = queryOptions({
  queryKey: ['reader-name'],
  queryFn: () => getReaderName(),
})
```

```tsx
// src/routes/preferences.tsx
export const Route = createFileRoute('/preferences')({
  loader: async ({ context }) => {
    await context.queryClient.query(readerNameOptions)
  },
  headers: () => ({ 'Cache-Control': 'private, no-store' }),
  component: Preferences,
})

function Preferences() {
  const { data: name } = useSuspenseQuery(readerNameOptions)
  return <p>Hello, {name}</p>
}
```

Invalidate after a server mutation:

```tsx
const queryClient = useQueryClient()
const save = useServerFn(saveReaderName)
const mutation = useMutation({
  mutationFn: (name: string) => save({ data: name }),
  onSuccess: () =>
    queryClient.invalidateQueries({ queryKey: readerNameOptions.queryKey }),
})
```

## Notes

- Create the QueryClient inside `getRouter`, not at module scope. Start creates a router per SSR request; a process-wide QueryClient could reuse one reader's cached data in another reader's HTML.
- Declare `queryClient: QueryClient` in the root route's `createRootRouteWithContext` type so child loaders can access it. The integration supplies the Query provider and handles SSR dehydration, hydration, and streaming. Do not add a second QueryClient or dehydrate the same cache independently. If you already own the provider wrapper, use the integration's `wrapQueryClient: false` option.
- The example uses Query 5.102 or newer, including `queryClient.query`.
- `defaultPreloadStaleTime: 0` lets Query decide whether a preload needs data. The 30-second `staleTime` is an example value, not a universal setting.
- Privileged reads belong in a server function, because a normal route loader can also run in the browser during navigation.
- For parameterized resources include identity in the key (e.g. `['post', postId]`). If search values affect the result, validate them and include them in both `loaderDeps` and the query key. Keep secrets out of keys and serialized query data.
- Await queries that determine main content, title, authorization, redirects, or existence. Secondary content can start loading without blocking the loader and render inside a Suspense boundary; keep that query under the SSR integration so it can stream. Handle the imperative promise's rejection to avoid unhandled server rejections. A plain `useQuery` with no loader prefetch is not guaranteed to be in the server-rendered HTML.
- `queryClient.invalidateQueries` refreshes Query data; `router.invalidate()` reloads Router-owned loader data and route context. Use both only when a mutation changes both (e.g. login). Neither purges a CDN or database cache.
- Returning the invalidation promise keeps the mutation pending until the active query's refetch finishes. If a mutation returns the complete updated resource, `setQueryData` can update the entry directly. Optimistic updates need cancellation, rollback, and reconciliation; the example uses a confirmed write followed by invalidation.
- The example enables Start's CSRF middleware for server-function requests in `src/start.ts`. The preference cookie is not an authentication mechanism.
- Request-scoped QueryClients do not authorize reads or clear the browser cache on account change. Authorize every private read and mutation on the server; on sign-out or account switch, cancel and remove the previous account's private queries and reload route context. A key is not an access-control check.
- Personalized responses should send `Cache-Control: private, no-store`; verify the final response through your hosting provider and CDN.

Diagnosing extra requests:

| Symptom | Check |
| --- | --- |
| A read repeats immediately after hydration | Query `staleTime`, hydration configuration, matching keys, accidental extra QueryClients |
| Navigation loads different data than a direct visit | Search validation, `loaderDeps`, query keys, server-only boundaries |
| A mutation succeeds but old data stays visible | Which cache owns the displayed value and which keys were invalidated |
| A second account sees the first account's data | Module-scoped server clients, browser cache cleanup, account keys, shared HTTP caches |
| SSR contains only a loading state | Whether the loader awaited critical data and whether the component reads the prefetched query |

## Related

- [Authentication Server Primitives](./authentication-server-primitives.md)
- [Databases](./databases.md)
