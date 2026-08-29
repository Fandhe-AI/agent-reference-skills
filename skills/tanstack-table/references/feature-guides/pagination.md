---
source: https://tanstack.com/table/latest/docs/framework/react/guide/pagination
---

# Pagination

Client-side or manual server-side row pagination with `pageIndex`/`pageSize` state.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  rowPaginationFeature,
  createPaginatedRowModel,
} from '@tanstack/react-table'

const features = tableFeatures({
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(), // client-side
  // manualPagination: true, // server-side
})

const table = useTable({
  features,
  columns,
  data,
  rowCount: dataQuery.data?.rowCount, // server-side page count
})

table.nextPage()
table.setPageSize(20)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `pagination` | `{ pageIndex: number; pageSize: number }` | State |
| `atoms.pagination` | `Atom<PaginationState>` | v9 external atom for controlled pagination |
| `onPaginationChange` | `(updater) => void` | v8-style controlled state callback |
| `manualPagination` | `boolean` | Assumes `data` is already paginated |
| `rowCount` | `number` | Total rows; table computes `pageCount` internally |
| `pageCount` | `number` | Total pages directly; `-1` means unknown |
| `autoResetPageIndex` | `boolean` | Resets `pageIndex` to 0 when client-side row models recompute |

## Notes

- Use client-side pagination when the browser holds the full dataset; use manual/server-side when data is fetched per page.
- Virtualization is a separate, complementary concept — see the `tanstack-virtual` skill for windowed rendering; it does not replace server-side pagination when the full dataset is too large to load.
- With `pageCount: -1` (unknown total, e.g. cursor pagination), `getCanNextPage()` always returns `true` and `getCanLastPage()` returns `false`; drive a Next button from your own `hasNextPage` signal instead.
- Do not set the `pagination` slice in more than one of `atoms`, `state`, `initialState` — controlled values override `initialState`.
- Reset `pageIndex` to `0` yourself when sorting/filtering/page-size changes in a manual (server-side) setup, since `autoResetPageIndex` only fires from client-side row-model recomputation.
- Button/info APIs: `getCanPreviousPage`, `getCanNextPage`, `getCanLastPage`, `previousPage`, `nextPage`, `firstPage`, `lastPage`, `setPageIndex`, `setPageSize`, `getPageCount`, `getRowCount`.

## Related

- [Sorting](./sorting.md)
- [Column Filtering](./column-filtering.md)
- [Virtualization](./virtualization.md)
