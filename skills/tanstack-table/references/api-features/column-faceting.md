---
source: https://tanstack.com/table/latest/docs/framework/react/guide/column-faceting, https://raw.githubusercontent.com/TanStack/table/main/packages/table-core/src/features/column-faceting/columnFacetingFeature.types.ts
---

# Column Faceting

Derives unique/min-max/distinct facet values per column and globally, provided by `columnFacetingFeature`.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  columnFacetingFeature,
  columnFilteringFeature,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFacetedMinMaxValues,
  createFilteredRowModel,
  filterFns,
} from '@tanstack/react-table'

const features = tableFeatures({
  columnFacetingFeature,
  columnFilteringFeature,
  filteredRowModel: createFilteredRowModel(), // if using client-side filtering
  // manualFiltering: true, // if using manual server-side filtering
  facetedRowModel: createFacetedRowModel(), // if using client-side faceting
  facetedUniqueValues: createFacetedUniqueValues(),
  facetedMinMaxValues: createFacetedMinMaxValues(),
  filterFns,
})

const table = useTable({
  features,
  columns,
  data,
})

// per-column facet helpers
table.getColumn('status')?.getFacetedUniqueValues()
table.getColumn('age')?.getFacetedMinMaxValues()
```

## Column APIs

| Name | Type | Description |
|------|------|-------------|
| `getFacetedMinMaxValues` | `() => [number, number] \| undefined` | Min/max numeric facet values for this column. |
| `getFacetedRowModel` | `() => RowModel` | Row model used to derive this column's facet values (other filters applied, this column's own filter excluded). |
| `getFacetedUniqueValues` | `() => Map<any, number>` | Unique facet values with occurrence counts. |

## Table APIs

| Name | Type | Description |
|------|------|-------------|
| `getFacetedMinMaxValues` | `() => [number, number] \| undefined` | Same as the column API, exposed at table level for a given column context. |
| `getFacetedRowModel` | `() => RowModel` | Row model used for faceting at table level. |
| `getFacetedUniqueValues` | `() => Map<any, number>` | Unique facet values at table level. |
| `getGlobalFacetedMinMaxValues` | `() => [number, number] \| undefined` | Min/max facet values computed against the global filter. |
| `getGlobalFacetedRowModel` | `() => RowModel` | Row model used to derive global facet values. |
| `getGlobalFacetedUniqueValues` | `() => Map<any, number>` | Unique facet values computed against the global filter. |

## Notes

- No `TableOptions_*` or `TableState_*` are added by this feature — it only adds row-model helpers and Column/Table APIs on top of `columnFilteringFeature`.
- `createFacetedRowModel`, `createFacetedUniqueValues`, and `createFacetedMinMaxValues` are row-model helper factories registered as `facetedRowModel` / `facetedUniqueValues` / `facetedMinMaxValues` in `tableFeatures(...)`, as shown in Setup.
- Guide: https://tanstack.com/table/latest/docs/framework/react/guide/column-faceting . Options/APIs source: `packages/table-core/src/features/column-faceting/columnFacetingFeature.types.ts`. React import path shown; table-core APIs are identical across frameworks.

## Related

- [column-filtering.md](./column-filtering.md)
- [global-filtering.md](./global-filtering.md)
