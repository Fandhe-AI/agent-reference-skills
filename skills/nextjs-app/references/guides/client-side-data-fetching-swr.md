# Client-side data fetching with SWR

Use SWR in Client Components, provide initial data from Server Components through `<SWRConfig fallback>`, and coordinate browser mutations with cached server data.

## Signature / Usage

```tsx filename="app/product-autocomplete.tsx"
'use client'

import useSWR from 'swr'

type Product = { id: string; name: string }

async function fetcher(url: string): Promise<Product[]> {
  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to fetch products')
  return response.json()
}

export function ProductAutocomplete({ query }: { query: string }) {
  const {
    data = [],
    error,
    isLoading,
  } = useSWR(
    query ? `/api/products?query=${encodeURIComponent(query)}` : null,
    fetcher
  )

  if (!query) return null
  if (error) return <p>Failed to load products.</p>
  if (isLoading) return <p>Loading products...</p>

  return (
    <ul>
      {data.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  )
}
```

Server-provided fallback (Server Component):

```tsx filename="app/products/[id]/page.tsx"
function ProductData({ id }: { id: string }) {
  return (
    <SWRConfig
      value={{
        fallback: {
          // Not awaited: only components that read this key suspend
          [productCache.key(id)]: getProduct(id),
        },
      }}
    >
      <ProductView id={id} />
    </SWRConfig>
  )
}
```

Optimistic mutation:

```tsx filename="app/activity/mark-read-button.tsx"
return mutate(
  activityCache.key,
  async () => {
    await markActivityReadAction()
    return { count: 0 }
  },
  {
    optimisticData: { count: 0 },
    revalidate: false,
    rollbackOnError: true,
    throwOnError: false,
  }
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `suspense: true` | `useSWR` option | Nearest Suspense boundary defines the initial loading UI |
| `isLoading` | boolean | `true` when a request is running and there is no loaded data |
| `isValidating` | boolean | `true` whenever a request is running, including background revalidation |
| `fallback` | `<SWRConfig>` value | Initial values keyed by SWR key; can be unawaited Promises from a Server Component |
| `revalidateIfStale: false` | option | Skip revalidation when the hook mounts with cached data (every mount) |
| `refreshInterval` | option | Revalidate on a schedule |
| `optimisticData` / `rollbackOnError` / `revalidate` / `throwOnError` | `mutate` options | Optimistic update with rollback on failure |

## Notes

- A conditional key (`null`) delays the request until an input exists. With an unconditional key and `suspense: true`, `data` is defined after Suspense resolves. Request errors go to the nearest error boundary.
- With `suspense: true`, later revalidation for the same key keeps current data rendered (no fallback again); use `isValidating` for background refresh feedback. Independent Suspense reads in sibling components start in parallel; multiple reads in one component run sequentially.
- Server-provided data requires SWR 2.3.0 and React 19. Scope `<SWRConfig>` to the route segment that owns the data. The `fallback` key and the `useSWR` key must match exactly or SWR ignores the fallback and fetches on the client. Define the key once (e.g. `productCache.key(id)`).
- By default SWR treats fallback data as stale and revalidates after hydration; it has no time-based freshness window (unlike TanStack Query `staleTime`).
- The SWR key should point to a Route Handler with a `GET` method that can call the same function providing the fallback.
- With Cache Components, add `'use cache'`, `cacheLife('max')`, and `cacheTag(`product:${id}`)` to the server function; SWR's browser cache options need not match `cacheLife`. Keep key and tag in one shared contract module free of server-only / client-only imports.
- After a mutation, a Server Action should write to the database and call `updateTag(tag)` so the next cached server read is fresh. Use the same key for the fallback, the Client Component read, and the mutation.

## Related

- [Client-side data fetching](./client-side-data-fetching.md)
- [Client-side data fetching with TanStack Query](./client-side-data-fetching-tanstack-query.md)
- [Single-page applications](./single-page-applications.md)
