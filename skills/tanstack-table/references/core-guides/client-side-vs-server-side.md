---
source: https://tanstack.com/table/latest/docs/guide/client-side-vs-server-side
---

# Client-Side vs Server-Side Guide

TanStack Table supports either client-side row processing (via row models) or server-side processing (via `manual*` options), for filtering, grouping, sorting, expanding, aggregating, faceting, and pagination. Pick one approach per feature set — mixing client-side and server-side processing for different features on the same dataset produces misleading results.

## Signature / Usage

`manual*` table options tell the table that the `data` you provide is already processed for that operation; the table itself never fetches or transforms it.

| Operation | Manual option | Client-side row model |
|-----------|----------------|------------------------|
| Column/global filtering | `manualFiltering` | `filteredRowModel` |
| Grouping | `manualGrouping` | `groupedRowModel` |
| Aggregation values | `manualAggregation` | `aggregationFn` local fallback |
| Sorting | `manualSorting` | `sortedRowModel` |
| Expanding | `manualExpanding` | `expandedRowModel` |
| Pagination | `manualPagination` | `paginatedRowModel` |

Server-side flow example (React + TanStack Query, page-index pagination):

```tsx
const table = useTable(
  {
    features,
    columns,
    data: dataQuery.data?.rows ?? [],
    rowCount: dataQuery.data?.rowCount,
    state: { sorting, globalFilter, pagination },
    onSortingChange: (updater) => {
      setSorting(updater)
      setPagination((p) => ({ ...p, pageIndex: 0 }))
    },
    onGlobalFilterChange: (updater) => {
      setGlobalFilter(updater)
      setPagination((p) => ({ ...p, pageIndex: 0 }))
    },
    onPaginationChange: setPagination,
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
  },
  (state) => state,
)
```

## Notes

- Client-side row models are stress-tested with 1 million rows, and up to ~15 million with the v9 Object Prototypes Refactor — do not rule out client-side processing purely on row count.
- Prefer server-side processing when: fetching the full dataset is slow/expensive, the browser only ever receives a page, permissions/business rules must be enforced server-side, data is highly volatile, or the backend can query/sort/aggregate more efficiently.
- When the server owns pagination, it should also own filtering/grouping/sorting/aggregation that must apply to the full result set — client-side sort after server-side pagination only sorts the current page.
- `manualPagination` disables `autoResetPageIndex` by default; in fully manual configurations without the row models that normally trigger resets, reset dependent state (e.g. page index) explicitly in change handlers.
- TanStack Table has no built-in server row model by design — it is a synchronous, in-memory state manager; TanStack Query (or your own fetch layer) is the recommended coordinator for server-side state.
- Pagination (how many rows render) and virtualization (rendering only the visible portion) are separate decisions — virtualization does not reduce fetched/processed data volume.
- Use a stable `getRowId` when selection/expansion state must survive across server responses; page-relative indexes are not reliable identifiers.

## Related

- [Row Models](./row-models.md)
- [Data](./data.md)
