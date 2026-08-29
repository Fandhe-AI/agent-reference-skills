---
source: https://tanstack.com/table/latest/docs/guide/client-side-vs-server-side
---

# Server-Side Pagination & Sorting

Delegate pagination and sorting to the backend (e.g. via TanStack Query), telling the table its `data` is already processed.

```tsx
import { useState } from 'react'
import {
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'
import type { PaginationState, SortingState } from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query'

const features = tableFeatures({
  rowSortingFeature,
  rowPaginationFeature,
  sortFns: { alphanumeric: sortFn_alphanumeric },
})

function ServerTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })

  const dataQuery = useQuery({
    queryKey: ['people', sorting, pagination],
    queryFn: () => fetchPeople({ sorting, pagination }),
  })

  const table = useTable({
    features,
    columns,
    data: dataQuery.data?.rows ?? [],
    rowCount: dataQuery.data?.rowCount,
    state: { sorting, pagination },
    onSortingChange: (updater) => {
      setSorting(updater)
      setPagination((p) => ({ ...p, pageIndex: 0 }))
    },
    onPaginationChange: setPagination,
    manualSorting: true,
    manualPagination: true,
  })

  // render table.getRowModel().rows as usual
}
```

## Notes

- `manualSorting` / `manualPagination` (and `manualFiltering`/`manualGrouping`/`manualExpanding`) skip the corresponding client-side row model — `data` must already be the correctly sorted/paginated/filtered slice from the server.
- Do not mix client-side and server-side processing across features on the same dataset (e.g. server pagination + client sorting only sorts the current page) — pick one approach per feature set.
- `manualPagination` disables `autoResetPageIndex`; reset `pageIndex` to `0` yourself in `onSortingChange`/`onColumnFiltersChange` handlers.
- TanStack Table has no built-in server row model by design — it is a synchronous, in-memory state manager; TanStack Query (or an equivalent fetch layer) coordinates the actual server round-trip.
