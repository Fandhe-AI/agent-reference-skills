---
source: https://tanstack.com/table/latest/docs/framework/react/guide/global-filtering
---

# Global Filtering

A single filter value applied across all participating columns (e.g. a search box), client-side or manual server-side.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  columnFilteringFeature,
  globalFilteringFeature,
  createFilteredRowModel,
  filterFn_includesString,
} from '@tanstack/react-table'

const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: { includesString: filterFn_includesString },
})

const table = useTable({ features, columns, data })

// UI
<input
  value={table.state.globalFilter ?? ''}
  onChange={(e) => table.setGlobalFilter(String(e.target.value))}
/>
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `globalFilter` | `any` | State; usually a search string |
| `initialState.globalFilter` | `any` | Default value without controlling state |
| `atoms.globalFilter` | `Atom<any>` | v9 external atom for controlled state |
| `onGlobalFilterChange` | `(updater) => void` | v8-style controlled state callback |
| `globalFilterFn` | `string \| FilterFn` | Filter function name or inline function |
| `manualFiltering` | `boolean` | Skips `filteredRowModel`, assumes pre-filtered `data` |
| `enableGlobalFilter` | `boolean` | Table-wide, or per-column `enableGlobalFilter: false` |

## Notes

- `globalFilteringFeature` depends on `columnFilteringFeature`; register filtering before global filtering.
- 12 built-in `filterFn`s available for `globalFilterFn`: `includesString`, `includesStringSensitive`, `equalsString`, `equals`, `weakEquals`, `arrIncludes`, `arrIncludesAll`, `arrIncludesSome`, `arrHas`, `inNumberRange`, `between`, `betweenInclusive`.
- TanStack Table renders no search input UI; wire `table.state.globalFilter` / `table.setGlobalFilter` to your own input.
- Fuzzy search is commonly implemented as a custom `globalFilterFn` — see Fuzzy Filtering.
- `column.getCanGlobalFilter()` tells whether a column participates in global filtering.

## Related

- [Column Filtering](./column-filtering.md)
- [Fuzzy Filtering](./fuzzy-filtering.md)
