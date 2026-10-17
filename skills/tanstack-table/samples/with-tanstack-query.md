---
source: https://tanstack.com/table/latest/docs/framework/react/examples/with-tanstack-query
---

# With TanStack Query

Drive a table with manual (server-side) sorting, global filtering and offset pagination from `useQuery`.

```tsx
import React from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import {
  columnFilteringFeature,
  createColumnHelper,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'
import { fetchData } from './fetchData'
import type { PaginationState, SortingState } from '@tanstack/react-table'
import type { Person } from './fetchData'

const defaultData: Array<Person> = []

const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  // Client-side filtering, sorting, and pagination row models are not
  // required because those operations are handled manually on the server.
  // Omitting the filtered and sorted row models also omits their page-reset
  // hooks, so pagination is reset in the change handlers below.
})

const columnHelper = createColumnHelper<typeof features, Person>()
const columns = columnHelper.columns([
  columnHelper.accessor('id', { header: 'ID' }),
  columnHelper.accessor('firstName', { header: 'First Name' }),
  columnHelper.accessor('lastName', { header: 'Last Name' }),
])

function UseQueryApp() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const pageSizeQueryKey =
    pagination.pageSize === Infinity ? 'all' : pagination.pageSize
  const dataQuery = useQuery({
    queryKey: [
      'people',
      'offset',
      pagination.pageIndex,
      pageSizeQueryKey,
      sorting,
      globalFilter,
    ],
    queryFn: () => fetchData({ pagination, sorting, globalFilter }),
    placeholderData: keepPreviousData,
  })
  const table = useTable(
    {
      key: 'with-tanstack-query-offset',
      features,
      columns,
      data: dataQuery.data?.rows ?? defaultData,
      rowCount: dataQuery.data?.rowCount,
      getRowId: (row) => String(row.id),
      state: { sorting, globalFilter, pagination },
      onSortingChange: (updater) => {
        setSorting(updater)
        setPagination((previous) => ({ ...previous, pageIndex: 0 }))
      },
      onGlobalFilterChange: (updater) => {
        setGlobalFilter(updater)
        setPagination((previous) => ({ ...previous, pageIndex: 0 }))
      },
      onPaginationChange: setPagination,
      manualFiltering: true,
      manualPagination: true,
      manualSorting: true,
    },
    (state) => state,
  )

  return (
    <>
      <input
        aria-label="Search useQuery data"
        value={globalFilter}
        onChange={(event) => table.setGlobalFilter(event.target.value)}
        placeholder="Search all columns..."
      />
      {/* ... render table.getHeaderGroups() / table.getRowModel() ... */}
      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {'>'}
      </button>
    </>
  )
}

// Wrap in <QueryClientProvider client={queryClient}> where queryClient = new QueryClient()
```

## Notes

- Trimmed from the official example: only three of seven columns, the table/pagination markup, devtools, and the second `UseInfiniteQueryApp` (cursor pagination with `useInfiniteQuery`, `pageCount: -1`, unknown total). `fetchData` lives in the example's `fetchData.ts`.
- With `manualSorting` / `manualFiltering` / `manualPagination` the filtered and sorted row models are omitted, so the page index is reset to 0 manually in `onSortingChange` / `onGlobalFilterChange`.
- `rowCount` (from the server) lets the table compute `getPageCount()`; `placeholderData: keepPreviousData` avoids flicker between pages.
- See the `tanstack-query` skill for the query APIs.

## Related

- [server-side.md](./server-side.md)
- [virtualized-infinite-scrolling.md](./virtualized-infinite-scrolling.md)
