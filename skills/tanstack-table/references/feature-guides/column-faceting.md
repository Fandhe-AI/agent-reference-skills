---
source: https://tanstack.com/table/latest/docs/framework/react/guide/column-faceting
---

# Faceting

Derives filter-UI metadata (unique values/counts, min/max) per column, without applying filters itself.

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
  filteredRowModel: createFilteredRowModel(),
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
  facetedMinMaxValues: createFacetedMinMaxValues(),
  filterFns,
})

const table = useTable({ features, columns, data })

column.getFacetedUniqueValues() // Map<value, count>
column.getFacetedMinMaxValues() // [min, max] | undefined
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `facetedRowModel` | `createFacetedRowModel()` | Required for client-side faceting |
| `facetedUniqueValues` | `createFacetedUniqueValues()` | Required for `getFacetedUniqueValues()` |
| `facetedMinMaxValues` | `createFacetedMinMaxValues()` | Required for `getFacetedMinMaxValues()` |
| `getUniqueValues` | `(row) => unknown[]` | Column option; returns multiple/bucketed facet values per row |

## Notes

- Faceting answers "which filter choices remain", filtering answers "which rows remain", row aggregation answers "what summary value" — three distinct concerns.
- A column's faceted row model excludes that column's own filter but applies all other active filters, so a facet can keep showing alternatives while the user edits it. This requires both `filteredRowModel` and `facetedRowModel`.
- Key APIs: `column.getFacetedRowModel()`, `column.getFacetedUniqueValues()` (`Map<value, count>`), `column.getFacetedMinMaxValues()` (`[min, max]` or `undefined`).
- High-cardinality/continuous columns (dates, sizes) are easier to filter when bucketed via `getUniqueValues` returning a bucket key while the column keeps its raw accessor value.
- For server-side filtering, provide custom `facetedUniqueValues`/`facetedMinMaxValues` factories that read live data (e.g. from `table.options.meta`); factories resolve once per column but their returned function runs on every read.
- Global faceting (`table.getGlobalFacetedRowModel()`, `getGlobalFacetedUniqueValues()`, `getGlobalFacetedMinMaxValues()`) mirrors column faceting across all globally-filterable columns; custom factories receive the special `__global__` column id.

## Related

- [Column Filtering](./column-filtering.md)
- [Global Filtering](./global-filtering.md)
