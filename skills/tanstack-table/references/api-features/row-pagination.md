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

## Table Options

| Name | Type | Description |
|------|------|-------------|
| `autoResetPageIndex` | `boolean` | Resets to the first page when page-altering state changes (data, filters, grouping, etc). |
| `manualPagination` | `boolean` | Disables `getPaginatedRowModel()` from auto-paginating, for server-side pagination. |
| `onPaginationChange` | `OnChangeFn<PaginationState>` | Called with an updater when `state.pagination` changes. |
| `pageCount` | `number` | Total page count when manually controlling pagination (`-1` if unknown). |
| `rowCount` | `number` | Total row count when manually controlling pagination; `pageCount` can be derived from this and `pageSize`. |

## Table State

| Name | Type | Description |
|------|------|-------------|
| `pagination` | `PaginationState` | `{ pageIndex, pageSize }` describing the current page. |

## Table APIs

| Name | Type | Description |
|------|------|-------------|
| `getCanNextPage` | `() => boolean` | Whether there is a next page. |
| `getCanLastPage` | `() => boolean` | Whether a last page exists. |
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
- Guide: https://tanstack.com/table/latest/docs/framework/react/guide/pagination . Options/State/APIs source: `packages/table-core/src/features/row-pagination/rowPaginationFeature.types.ts`. React import path shown; table-core options/state/APIs are identical across frameworks.

## Related

- [row-sorting.md](./row-sorting.md)
- [row-expanding.md](./row-expanding.md)
