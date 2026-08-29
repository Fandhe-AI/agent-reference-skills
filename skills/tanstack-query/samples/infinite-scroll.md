---
source: https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries, https://tanstack.com/query/latest/docs/framework/react/reference/useInfiniteQuery
---

# Infinite Scroll

Load additional pages of data on demand with `useInfiniteQuery`.

```tsx
import { useInfiniteQuery } from '@tanstack/react-query'

function Posts() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => fetchPage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
  })

  if (status === 'pending') return <span>Loading...</span>
  if (status === 'error') return <span>Error loading posts</span>

  return (
    <>
      {data.pages.map((page) =>
        page.items.map((post) => <p key={post.id}>{post.title}</p>),
      )}
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
      </button>
    </>
  )
}
```

## Notes

- `getNextPageParam` must return `undefined`/`null` when there is no next page — that value determines `hasNextPage`.
- `data.pages` is the array of fetched page responses; `data.pageParams` is the array of page parameters used to fetch them.
- Call `fetchNextPage()` only from user-triggered actions (button click, scroll-sentinel intersection) guarded by `hasNextPage && !isFetchingNextPage` — imperative calls can otherwise race with background refetches.
- Set `maxPages` to cap memory usage for very long lists; both `getNextPageParam` and `getPreviousPageParam` are then required.
