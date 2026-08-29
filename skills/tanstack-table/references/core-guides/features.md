---
source: https://tanstack.com/table/latest/docs/guide/features
---

# Features Guide

TanStack Table v9 is a headless, tree-shakable, plugin-based library. Every table explicitly declares the capabilities it uses via `tableFeatures()`; a feature not registered does not ship its code or its TypeScript APIs.

## Signature / Usage

```ts
import { tableFeatures, useTable } from '@tanstack/react-table'

const features = tableFeatures({}) // core-only table

// or register optional features
import {
  columnFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
} from '@tanstack/react-table'

const features = tableFeatures({
  columnFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
})

function Table() {
  const table = useTable({ features, columns, data })
  // render the table...
}
```

Enable client-side data processing for a feature by adding its row-model factory and function registries alongside the feature object:

```ts
import {
  columnFilteringFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
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
```

## Stock Features

| Feature | Purpose |
|---------|---------|
| `cellSelectionFeature` | Cell-range selection state and APIs |
| `cellSpanningFeature` | Cells span rows or columns |
| `columnFacetingFeature` | Derives unique values, ranges, counts for filtering UIs |
| `columnFilteringFeature` | Filters individual columns; column-filter state |
| `columnGroupingFeature` | Groups rows by column values |
| `columnOrderingFeature` | Controls column order |
| `columnPinningFeature` | Pins columns to left/right |
| `columnResizingFeature` | Resize interactions (builds on column sizing) |
| `columnSizingFeature` | Stores/exposes column width |
| `columnVisibilityFeature` | Shows/hides columns |
| `globalFilteringFeature` | Filters rows across multiple columns (builds on column filtering) |
| `rowAggregationFeature` | Calculates totals/aggregate values |
| `rowExpandingFeature` | Controls expanded rows and sub-rows |
| `rowPaginationFeature` | Page state, navigation APIs, optional client-side pagination |
| `rowPinningFeature` | Pins rows to top/bottom |
| `rowSelectionFeature` | Selected-row state and APIs |
| `rowSortingFeature` | Sort state and optional client-side row ordering |

`stockFeatures` bundles every optional feature above (`tableFeatures({ ...stockFeatures })`) but does not add client-side row models or function registries, and it includes the full bundle size — prefer individual imports for tree-shaking.

## Notes

- Total potential bundle size grew from ~14 kB (v8) to ~25 kB (v9), but most apps ship less because unused features are tree-shaken.
- A feature (state/options/APIs) and its client-side row model (browser-side data processing) are separate concerns — omit the row model and use `manual*` options for server-side processing instead.
- Register only individual filter/sort/aggregation functions you use; spreading a complete built-in registry defeats tree-shaking.
- `tableFeatures()` validates cross-feature prerequisites at the type level (e.g. `sortedRowModel` requires `rowSortingFeature`).
- Fuzzy filtering is a recipe built from filtering + sorting features; virtualization comes from TanStack Virtual, not a Table feature.

## Related

- [Row Models](./row-models.md)
- [Client-Side vs Server-Side](./client-side-vs-server-side.md)
- [Type Helpers](./helpers.md)
