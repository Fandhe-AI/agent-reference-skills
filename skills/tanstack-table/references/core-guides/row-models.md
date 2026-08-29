---
source: https://tanstack.com/table/latest/docs/guide/row-models
---

# Row Models Guide

Row models transform the original `data` into the rows actually rendered (filtered, sorted, grouped, expanded, paginated). In v9, row-model factories are registered as slots on the object created by `tableFeatures()`; only the core row model is always included.

## Signature / Usage

```ts
import {
  tableFeatures,
  useTable,
  columnFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  createFilteredRowModel,
  createSortedRowModel,
  createPaginatedRowModel,
  filterFn_includesString,
  sortFn_alphanumeric,
} from '@tanstack/react-table'

const features = tableFeatures({
  columnFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric },
})

const table = useTable({ features, columns, data })
```

Reading rows:

```ts
table.getRowModel().rows        // rows to render
table.getRowModel().flatRows    // sub-rows flattened to top level
table.getRowModel().rowsById['row-id']
```

## Options / Props

| Slot key | Factory function | Purpose |
|----------|-------------------|---------|
| (automatic) | (none) | Core row model, always included |
| `filteredRowModel` | `createFilteredRowModel()` | Column + global filtering |
| `sortedRowModel` | `createSortedRowModel()` | Sorting |
| `paginatedRowModel` | `createPaginatedRowModel()` | Pagination |
| `expandedRowModel` | `createExpandedRowModel()` | Row expanding |
| `groupedRowModel` | `createGroupedRowModel()` | Grouping (+ aggregation when enabled) |
| `facetedRowModel` | `createFacetedRowModel()` | Faceted filtering |
| `facetedMinMaxValues` | `createFacetedMinMaxValues()` | Min/max for faceted filters |
| `facetedUniqueValues` | `createFacetedUniqueValues()` | Unique values for faceted filters |
| `filterFns` / `sortFns` / `aggregationFns` | registry objects | Named function registries resolved by string in column defs |

## Notes

- Row model factories no longer accept `filterFns`/`sortFns`/`aggregationFns` as arguments (v8 style); those registries are their own slots on `tableFeatures()`.
- Each row model requires its matching feature object too (e.g. `sortedRowModel` needs `rowSortingFeature`).
- Full built-in registries (`filterFns`, `sortFns`, `aggregationFns` exported wholesale) still work when spread into these slots but are deprecated — they pull every built-in implementation into the bundle. Register individual functions under conventional keys, or pass functions directly to column options without registering them.
- Execution order: `getCoreRowModel` → `getFilteredRowModel` → `getGroupedRowModel` → `getSortedRowModel` → `getExpandedRowModel` → `getPaginatedRowModel` → `getRowModel`. A disabled/`manual*` feature uses `getPre*RowModel` at that step instead.
- Each row model exposes `rows`, `flatRows`, and `rowsById`.
- Custom/forked row models: copy the relevant factory source from `packages/table-core/src/features/` (or `core/row-models` for the core model) and adapt it.
- See [Worker Row Models](./worker-row-models.md) for offloading filtering/grouping/sorting to a Web Worker at very large row counts.

## Related

- [Worker Row Models (Experimental)](./worker-row-models.md)
- [Client-Side vs Server-Side](./client-side-vs-server-side.md)
- [Rows](./rows.md)
- [Type Helpers](./helpers.md)
