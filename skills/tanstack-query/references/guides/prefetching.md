---
source: https://tanstack.com/query/latest/docs/framework/react/guides/prefetching
---

# Prefetching & Router Integration

Populate the cache ahead of time using `queryClient.query` (formerly `prefetchQuery`) to avoid request waterfalls.

## Signature / Usage

```tsx
import { noop } from '@tanstack/react-query'

const prefetchTodos = async () => {
  await queryClient
    .query({ queryKey: ['todos'], queryFn: fetchTodos })
    .catch(noop)
}
```

In an event handler:

```tsx
function ShowDetailsButton() {
  const queryClient = useQueryClient()
  const prefetch = () => {
    void queryClient
      .query({ queryKey: ['details'], queryFn: getDetailsData, staleTime: 60000 })
      .catch(noop)
  }
  return <button onMouseEnter={prefetch} onFocus={prefetch}>Show Details</button>
}
```

Before a Suspense boundary:

```tsx
function ArticleLayout({ id }) {
  usePrefetchQuery({ queryKey: ['article-comments', id], queryFn: getArticleCommentsById })
  return (
    <Suspense fallback="Loading article">
      <Article id={id} />
    </Suspense>
  )
}
```

Manually priming a query:

```tsx
queryClient.setQueryData(['todos'], todos)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `staleTime` | `number \| 'static'` | Controls whether cached data is considered fresh enough to skip refetch |

## Notes

- `queryClient.query` replaces the deprecated `prefetchQuery`/`ensureQueryData` (removed in the next major version).
- For non-critical prefetches, discard the promise with `void` and `.catch(noop)` so `useQuery` gracefully retries later.
- Infinite queries can be prefetched with `queryClient.infiniteQuery` + the `pages` option (requires `getNextPageParam`).
- Under Suspense, use `usePrefetchQuery`/`usePrefetchInfiniteQuery` rather than `useQuery`/`useSuspenseQueries` to prefetch without blocking render.
- Router-level prefetching (e.g. TanStack Router `beforeLoad`/`loader`) can `await` critical data while letting secondary data prefetch in background.

## Related

- [request-waterfalls.md](./request-waterfalls.md)
- [ssr.md](./ssr.md)
- [infinite-queries.md](./infinite-queries.md)
