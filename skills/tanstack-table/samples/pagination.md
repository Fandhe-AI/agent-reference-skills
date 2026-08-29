---
source: https://tanstack.com/table/latest/docs/framework/react/guide/pagination
---

# Pagination

Client-side page navigation with `pageIndex`/`pageSize` state and next/previous controls.

```tsx
import {
  createPaginatedRowModel,
  rowPaginationFeature,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'

const features = tableFeatures({
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
})

const table = useTable({
  features,
  columns,
  data,
  initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
})

<div>
  <button onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>{'<<'}</button>
  <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>{'<'}</button>
  <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>{'>'}</button>
  <button onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>{'>>'}</button>
  <span>Page {table.state.pagination.pageIndex + 1} of {table.getPageCount()}</span>
  <select value={table.state.pagination.pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
    {[10, 20, 50].map((size) => <option key={size} value={size}>{size}</option>)}
  </select>
</div>
```

## Notes

- Use `paginatedRowModel` for client-side (browser holds the full dataset); for server-side, set `manualPagination: true`, skip the row model, and pass `rowCount` from the API response.
- `table.state` is the v9 reactive read (used in render, as above); event handlers should read a snapshot via `table.atoms.pagination.get()` instead.
- With unknown total (`pageCount: -1`, e.g. cursor pagination), `getCanNextPage()` always returns `true` — drive the Next button from your own `hasNextPage` signal instead.
- Reset `pageIndex` to `0` yourself in `onSortingChange`/`onColumnFiltersChange` when server-side, since `autoResetPageIndex` only fires from client-side row-model recomputation. See the `server-side` sample for the full manual-pagination + manual-sorting + TanStack Query flow.
