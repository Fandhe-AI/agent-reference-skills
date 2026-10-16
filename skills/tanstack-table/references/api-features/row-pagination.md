---
source: https://tanstack.com/table/latest/docs/framework/react/guide/pagination, https://raw.githubusercontent.com/TanStack/table/main/packages/table-core/src/features/row-pagination/rowPaginationFeature.types.ts
---

# Row Pagination

Page-index/page-size state, options, and pagination APIs, provided by `rowPaginationFeature`.

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
  paginatedRowModel: createPaginatedRowModel(), // if using client-side pagination
  // manualPagination: true, // if using manual server-side pagination
})

const table = useTable({
  features,
  columns,
  data,
})
```

## Options / Props

### Table Options

| Name | Type | Description |
|------|------|-------------|
| `autoResetPageIndex` | `boolean` | Resets to the first page when page-altering state changes (data, filters, grouping, etc). |
| `manualPagination` | `boolean` | Disables `getPaginatedRowModel()` from auto-paginating, for server-side pagination. |
| `onPaginationChange` | `OnChangeFn<PaginationState>` | Called with an updater when `state.pagination` changes. |
| `pageCount` | `number` | Total page count when manually controlling pagination (`-1` if unknown). |
| `rowCount` | `number` | Total row count when manually controlling pagination; `pageCount` can be derived from this and `pageSize`. |

### Table State

| Name | Type | Description |
|------|------|-------------|
| `pagination` | `PaginationState` | `{ pageIndex, pageSize }` describing the current page. `pageSize` is the number of rows per page; set to `Infinity` to place all rows on a single page (since 9.1.0). |

### Table APIs

| Name | Type | Description |
|------|------|-------------|
| `autoResetPageIndex` | `() => void` | Resets the page index to `0` after page-altering changes such as new data, filtering, sorting, or grouping. Honors `autoResetAll`, `autoResetPageIndex`, and `manualPagination`. Called by the row models; you rarely need to invoke it yourself. |
| `getCanNextPage` | `() => boolean` | Whether there is a next page. |
| `getCanLastPage` | `() => boolean` | Checks whether a known, finite last page exists after the current page. |
| `getCanPreviousPage` | `() => boolean` | Whether there is a previous page. |
| `getPageCount` | `() => number` | Total number of pages. |
| `getRowCount` | `() => number` | Total row count. |
| `getPageOptions` | `() => Array<number>` | Array of page indexes. |
| `nextPage` / `previousPage` / `firstPage` / `lastPage` | `() => void` | Navigate pages. |
| `resetPageIndex` | `(defaultState?: boolean) => void` | Resets the page index. |
| `resetPageSize` | `(defaultState?: boolean) => void` | Resets the page size. |
| `resetPagination` | `(defaultState?: boolean) => void` | Resets full pagination state. |
| `setPageIndex` | `(updater: Updater<number>) => void` | Sets the current page index. |
| `setPageSize` | `(updater: Updater<number>) => void` | Sets the current page size. |
| `setPagination` | `(updater: Updater<PaginationState>) => void` | Updates the full pagination state. |
| `getPaginatedRowModel` | `() => RowModel` | Row model after pagination is applied. |
| `getPrePaginatedRowModel` | `() => RowModel` | Row model immediately before pagination. |

## Notes

- Interacts with `row-expanding`'s `paginateExpandedRows` option, which controls whether expanded sub-rows are paginated along with their parents.
- Added in 9.1.0: `Infinity` is supported as a page size, and `getCanLastPage` was added for detecting whether a finite last page can be reached.
- Fixed in 9.2.8: the `Table_RowPagination` type previously declared the `autoResetPageIndex` method as `_autoResetPageIndex`.
- Guide: https://tanstack.com/table/latest/docs/framework/react/guide/pagination . Options/State/APIs source: `packages/table-core/src/features/row-pagination/rowPaginationFeature.types.ts`. React import path shown; table-core options/state/APIs are identical across frameworks.

## Related

- [row-sorting.md](./row-sorting.md)
- [row-expanding.md](./row-expanding.md)
