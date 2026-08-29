---
source: https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries
---

# Pagination

Keep previous page's data visible while the next page fetches, using `placeholderData: keepPreviousData`.

```tsx
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

function Projects() {
  const [page, setPage] = useState(1)

  const { isPending, isError, error, data, isFetching, isPlaceholderData } = useQuery({
    queryKey: ['projects', page],
    queryFn: () => fetchProjects(page),
    placeholderData: keepPreviousData,
  })

  if (isPending) return <span>Loading...</span>
  if (isError) return <span>Error: {error.message}</span>

  return (
    <div>
      {data.projects.map((p) => <p key={p.id}>{p.name}</p>)}
      <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
        Previous
      </button>
      <button
        onClick={() => setPage((p) => (data.hasMore ? p + 1 : p))}
        disabled={isPlaceholderData || !data.hasMore}
      >
        Next
      </button>
      {isFetching && <span> Loading...</span>}
    </div>
  )
}
```

## Notes

- Without `placeholderData`, each `page` value creates a brand-new query key, causing the UI to flash to a `pending` state on every page change.
- `isPlaceholderData` is `true` while the previous page's stale data is shown in place of the new page — use it to disable pagination controls until real data arrives.
- The same `keepPreviousData` option also works with `useInfiniteQuery`.
