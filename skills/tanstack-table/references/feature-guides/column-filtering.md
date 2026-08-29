---
source: https://tanstack.com/table/latest/docs/framework/react/guide/column-filtering
---

# Column Filtering

Per-column filter applied to a single accessor value, client-side or manual server-side.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  columnFilteringFeature,
  createFilteredRowModel,
  filterFn_includesString,
  filterFn_inNumberRange,
} from '@tanstack/react-table'

const features = tableFeatures({
  columnFilteringFeature,
  filteredRowModel: createFilteredRowModel(), // client-side
  // manualFiltering: true, // server-side
  filterFns: {
    includesString: filterFn_includesString,
    inNumberRange: filterFn_inNumberRange,
  },
})

const table = useTable({ features, columns, data })
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `columnFilters` | `{ id: string; value: unknown }[]` | State; array of active column filters |
| `initialState.columnFilters` | same | Default filters without controlling state |
| `atoms.columnFilters` | `Atom<ColumnFiltersState>` | v9 external atom for controlled filters |
| `onColumnFiltersChange` | `(updater) => void` | v8-style controlled state callback |
| `filterFn` | `string \| FilterFn` | Column option; filter function name or inline function |
| `manualFiltering` | `boolean` | Table option; skips `filteredRowModel`, assumes pre-filtered `data` |
| `enableColumnFilters` / `enableColumnFilter` | `boolean` | Table-wide / per-column disable |
| `enableFilters` | `boolean` | Disables both column and global filtering |
| `filterFromLeafRows` | `boolean` | Filters from leaf rows up (keeps parents with matching children) |
| `maxLeafRowFilterDepth` | `number` | Limits filtering depth in row trees (expanding/grouping) |

## Notes

- 18 built-in `filterFn`s: `includesString`, `includesStringSensitive`, `startsWith`, `endsWith`, `equalsString`, `equalsStringSensitive`, `equals`, `weakEquals`, `empty`, `notEmpty`, `arrIncludes`, `arrIncludesAll`, `arrIncludesSome`, `arrHas`, `inNumberRange`, `inDateRange`, `between`, `betweenInclusive`.
- Custom filter functions: `(row, columnId, filterValue, addMeta?) => boolean`; register by name in `filterFns` on `tableFeatures` or pass inline.
- `constructFilterFn` builds a filter function from a `filter` comparator plus optional `resolveFilterValue` / `resolveDataValue` / `autoRemove` hooks — reuse via spread to build variants.
- Filtering should operate over the same dataset as sorting/pagination; client-side filtering only sees what's loaded.
- Distinct from Global Filtering, which filters across all columns at once.

## Related

- [Global Filtering](./global-filtering.md)
- [Fuzzy Filtering](./fuzzy-filtering.md)
- [Column Faceting](./column-faceting.md)
