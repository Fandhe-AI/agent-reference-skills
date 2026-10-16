# Client-side data fetching with TanStack Query

Use TanStack Query in Client Components, provide initial data from Server Components through `<HydrationBoundary>`, and coordinate browser mutations with cached server data.

## Signature / Usage

```tsx filename="app/products/providers.tsx"
'use client'

import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  // Keep server requests isolated and preserve the browser cache across renders.
  if (typeof window === 'undefined') return new QueryClient()
  browserQueryClient ??= new QueryClient()
  return browserQueryClient
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      {children}
    </QueryClientProvider>
  )
}
```

```tsx filename="app/product-autocomplete.tsx"
const {
  data = [],
  error,
  isPending,
} = useQuery({
  queryKey: ['product-search', query],
  queryFn: () => searchProducts(query),
  enabled: query.length > 0,
})
```

Server-provided data (Server Component):

```tsx filename="app/products/[id]/page.tsx"
function ProductData({ id }: { id: string }) {
  const queryClient = new QueryClient()

  // Not awaited, so rendering is not blocked.
  void queryClient.prefetchQuery({
    ...productCache.options(id),
    queryFn: () => getProduct(id),
  })

  return (
    <HydrationBoundary
      state={dehydrate(queryClient, {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      })}
    >
      <ProductView id={id} />
    </HydrationBoundary>
  )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `useQuery` | hook | Inline loading and error states; `enabled` delays the request until an input exists |
| `useSuspenseQuery` | hook | Nearest Suspense boundary defines loading UI; errors propagate to the nearest error boundary |
| `useSuspenseQueries` | hook | Run independent suspense queries together in one component |
| `<HydrationBoundary state>` | component | Hydrates dehydrated server query state into the client cache |
| `staleTime` | query option | Keeps hydrated data fresh to avoid an immediate client refetch (example uses `30_000`) |
| `onMutate` / `onError` | `useMutation` callbacks | Optimistic cache update and rollback with `cancelQueries`, `getQueryData`, `setQueryData` |

## Notes

- This page covers only how to integrate TanStack Query with Next.js App Router. The TanStack Query APIs themselves (`useQuery`, `QueryClient`, `HydrationBoundary`, etc.) belong to the tanstack-query skill.
- Create a new `QueryClient` for each server render and reuse one in the browser.
- Dehydrating pending queries requires TanStack Query 5.40.0 or later. Override `queryFn` on the server because the Route Handler's relative URL only resolves in the browser. The server and Client Component must use the same query key; keep key and `queryOptions` in one cache contract module.
- After a query has data, later refetches keep cached data rendered; use `isFetching` for background refresh feedback. Multiple `useSuspenseQuery` calls in one component run sequentially.
- With Cache Components, add `'use cache'`, `cacheLife('max')`, `cacheTag(`product:${id}`)` to the server function. TanStack Query's `staleTime` need not match `cacheLife`. Next.js also prerenders Client Components, so keep a query needed during initial render behind Suspense to avoid a current-time prerender error.
- `dehydrate()` reads `Date.now()` during Cache Components prerendering and causes a current-time prerender error. Instead, cache only the timestamp with `use cache` (same tags as the data reads, `cacheLife('max')`), build the dehydrated state by hand with `setQueryData(..., { updatedAt })`, and pass it to `<HydrationBoundary>`. The timestamp must advance whenever hydrated data changes.
- After a mutation, a Server Action should write to the database and call `updateTag(tag)`; the optimistic query value updates the current screen.

## Related

- [Client-side data fetching](./client-side-data-fetching.md)
- [Client-side data fetching with SWR](./client-side-data-fetching-swr.md)
- [Single-page applications](./single-page-applications.md)
