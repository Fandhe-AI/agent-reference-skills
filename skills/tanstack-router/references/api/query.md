---
source: https://tanstack.com/router/latest/docs/framework/react/integrations/query
---

# TanStack Query Integration

Automates SSR dehydration/hydration and streaming between TanStack Router and TanStack Query, removing the need for manual external data-loading configuration.

## Signature / Usage

```tsx
// src/router.tsx
import { QueryClient } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const queryClient = new QueryClient()
  const router = createRouter({
    routeTree,
    // optionally expose the QueryClient via router context
    context: { queryClient },
  })

  setupRouterSsrQueryIntegration({ router, queryClient })

  return router
}
```

```tsx
// src/routes/posts.tsx
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

// fetchPosts: a data-fetching function usable on both server and client
const postsQuery = queryOptions({
  queryKey: ['posts'],
  queryFn: () => fetchPosts(),
})

export const Route = createFileRoute('/posts')({
  // Ensure the data is in the cache before render
  loader: ({ context }) =>
    context.queryClient.query({
      ...postsQuery,
      // returns data from cache immediately, otherwise executes a fetch
      staleTime: 'static',
    }),
  component: PostsPage,
})

function PostsPage() {
  const { data } = useSuspenseQuery(postsQuery)
  return <div>{data.map((p: any) => p.title).join(', ')}</div>
}
```

## Notes

- Create a fresh `QueryClient` per request in SSR and expose it via router `context`.
- `queryClient.query({ ...options, staleTime: 'static' })` in a loader returns cached data immediately, otherwise executes a fetch, so data is cached before render; `useSuspenseQuery()` executes on the server and streams results; `useQuery()` only runs on the client after hydration.
- Returning the `query` promise from the loader blocks the SSR request until the query finishes. If a loader promise is neither awaited nor returned, the query starts on the server and streams to the client as it resolves without blocking SSR.
- Non-blocking pattern: `void context.queryClient.query(userQuery(params.id)).catch(noop)` (`noop` from `@tanstack/react-query`).
- `queryClient.ensureQueryData` and `queryClient.prefetchQuery` (used in earlier versions of this guide) are deprecated in TanStack Query in favor of `queryClient.query`.
- The integration is the separate package `@tanstack/react-router-ssr-query` (`@tanstack/solid-router-ssr-query` for Solid); `dehydrateOptions` / `hydrateOptions` customize SSR payload serialization.
- `QueryClientProvider` wrapping happens automatically by default (disable via `wrapQueryClient: false`).
- Redirects thrown from queries/mutations are handled by default.
- Compatible with TanStack Start (which uses Router internally).
- The official snippet uses a relative URL (`fetch('/api/posts')`); Node.js `fetch` cannot resolve relative URLs during SSR, so use a server-capable fetcher or build an absolute URL from a trusted API origin.

## Related

- [createRouter](./create-router.md)
- [RouterOptions](./router-options.md)
