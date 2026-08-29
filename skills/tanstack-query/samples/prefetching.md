---
source: https://tanstack.com/query/latest/docs/framework/react/guides/prefetching
---

# Prefetching on Interaction

Warm the cache before a component mounts, e.g. on hover, to avoid a loading spinner when the user navigates.

```tsx
import { noop, useQueryClient } from '@tanstack/react-query'

function ShowDetailsButton({ id }: { id: string }) {
  const queryClient = useQueryClient()

  const prefetch = () => {
    void queryClient
      .query({
        queryKey: ['details', id],
        queryFn: () => getDetailsData(id),
        staleTime: 60_000,
      })
      .catch(noop)
  }

  return (
    <button onMouseEnter={prefetch} onFocus={prefetch} onClick={() => navigateToDetails(id)}>
      Show Details
    </button>
  )
}
```

## Notes

- `queryClient.query` is the current name for prefetching a single query (formerly `prefetchQuery`); `void ...catch(noop)` discards the promise so failures don't surface here — `useQuery` in the destination component will retry naturally.
- Set `staleTime` on the prefetch call so the subsequent `useQuery` with the same key doesn't immediately refetch.
- Under a Suspense boundary use `usePrefetchQuery`/`usePrefetchInfiniteQuery` instead, so the prefetch does not itself suspend.
