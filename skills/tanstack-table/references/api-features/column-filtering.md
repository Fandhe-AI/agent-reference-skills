---
source: https://tanstack.com/table/latest/docs/framework/react/guide/column-filtering, https://raw.githubusercontent.com/TanStack/table/main/packages/table-core/src/features/column-filtering/columnFilteringFeature.types.ts
---

# Column Filtering

Per-column filtering state, options, and column/table filter APIs, provided by `columnFilteringFeature`.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  columnFilteringFeature,
  createFilteredRowModel,
} from '@tanstack/react-table'

const features = tableFeatures({
  columnFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
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
| `enableColumnFilters` | `boolean` | Enables column-specific filtering for all columns that also allow it. |
| `enableFilters` | `boolean` | Enables all filtering features for the table. Set to `false` to disable both column and global filtering. |
| `filterFromLeafRows` | `boolean` | By default filtering is done parent-down; set `true` to filter leaf-up so a parent stays if any child matches. |
| `manualFiltering` | `boolean` | Disables `getFilteredRowModel` from being used, for server-side filtering. |
| `maxLeafRowFilterDepth` | `number` | Limits how deep filtering is applied into sub-row hierarchies (default 100). |
| `onColumnFiltersChange` | `OnChangeFn<ColumnFiltersState>` | Called with an updater when `state.columnFilters` changes. |

## Table State

| Name | Type | Description |
|------|------|-------------|
| `columnFilters` | `ColumnFiltersState` (`Array<{ id: string; value: unknown }>`) | The active per-column filter entries. |

## Column Definition Options

| Name | Type | Description |
|------|------|-------------|
| `enableColumnFilter` | `boolean` | Enables this column to participate in column-specific filtering (default `true`). |
| `filterFn` | `'auto' \| keyof FilterFns \| FilterFn` | The filter function used for this column; built-in name or custom function. |

## Column APIs

| Name | Type | Description |
|------|------|-------------|
| `getAutoFilterFn` | `() => FilterFn` | Automatically inferred filter function based on the column's first known value. |
| `getCanFilter` | `() => boolean` | Whether this column can currently be filtered. |
| `getFilterFn` | `() => FilterFn` | The resolved filter function (user-defined or automatic). |
| `getFilterIndex` | `() => number` | Index (or `-1`) of the filter in `state.columnFilters`. |
| `getFilterValue` | `() => unknown` | The column's current value from `state.columnFilters`. |
| `getIsFiltered` | `() => boolean` | Whether this column has an active filter entry. |
| `setFilterValue` | `(updater: Updater<any>) => void` | Adds, updates, or removes this column's filter value. |

## Table APIs

| Name | Type | Description |
|------|------|-------------|
| `resetColumnFilters` | `(defaultState?: boolean) => void` | Resets `columnFilters` to `initialState.columnFilters` (or `[]` when `true`). |
| `setColumnFilters` | `(updater: Updater<ColumnFiltersState>) => void` | Updates column filter state. |
| `getFilteredRowModel` | `() => RowModel` | Row model after column and global filters are applied. |
| `getPreFilteredRowModel` | `() => RowModel` | Row model immediately before filtering. |

## Notes

- 18 built-in filter functions ship with the library (string matching, number/date ranges, array operations, empty checks); create custom ones with `constructFilterFn` and register them in `filterFns`.
- Filter functions support `autoRemove`, `resolveFilterValue`, and `resolveDataValue` for normalization behavior.
- Guide: https://tanstack.com/table/latest/docs/framework/react/guide/column-filtering . Options/State/APIs source: `packages/table-core/src/features/column-filtering/columnFilteringFeature.types.ts`. React import path shown; other frameworks (Solid/Vue/Svelte/Angular/etc.) use the same table-core options/state/APIs with a framework-specific `useTable`/`createTable` entry point.

## Related

- [global-filtering.md](./global-filtering.md)
- [column-faceting.md](./column-faceting.md)
