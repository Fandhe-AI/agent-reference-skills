---
source: https://tanstack.com/table/latest/docs/framework/react/guide/global-filtering, https://raw.githubusercontent.com/TanStack/table/main/packages/table-core/src/features/global-filtering/globalFilteringFeature.types.ts
---

# Global Filtering

Table-wide filtering state, options, and table/column filter APIs, provided by `globalFilteringFeature`.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  globalFilteringFeature,
  columnFilteringFeature,
  createFilteredRowModel,
} from '@tanstack/react-table'

const features = tableFeatures({
  globalFilteringFeature,
  columnFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
})

const table = useTable({
  features,
  columns,
  data,
  state: { globalFilter },
  onGlobalFilterChange: setGlobalFilter,
})
```

## Table Options

| Name | Type | Description |
|------|------|-------------|
| `enableGlobalFilter` | `boolean` | Enables global filtering for the table. |
| `getColumnCanGlobalFilter` | `(column) => boolean` | Overrides whether a given column participates in global filtering. |
| `globalFilterFn` | `FilterFnOption` | The filter function used for the global filter. |
| `onGlobalFilterChange` | `OnChangeFn<any>` | Called with an updater when `state.globalFilter` changes. |

## Table State

| Name | Type | Description |
|------|------|-------------|
| `globalFilter` | `any` | The current global filter value. |

## Column Definition Options

| Name | Type | Description |
|------|------|-------------|
| `enableGlobalFilter` | `boolean` | Allows this column to be included in global filtering. |

## Column APIs

| Name | Type | Description |
|------|------|-------------|
| `getCanGlobalFilter` | `() => boolean` | Whether this column can be global-filtered. |

## Table APIs

| Name | Type | Description |
|------|------|-------------|
| `getGlobalAutoFilterFn` | `() => FilterFn \| undefined` | Automatically inferred global filter function. |
| `getGlobalFilterFn` | `() => FilterFn \| undefined` | The resolved global filter function. |
| `resetGlobalFilter` | `(defaultState?: boolean) => void` | Resets `globalFilter` to its initial state. |
| `setGlobalFilter` | `(updater: Updater<any>) => void` | Updates the global filter value. |

## Notes

- Requires `columnFilteringFeature`'s `filteredRowModel` to actually apply the filter; `globalFilteringFeature` only adds the state/options/APIs for the table-wide value.
- Guide: https://tanstack.com/table/latest/docs/framework/react/guide/global-filtering . Options/State/APIs source: `packages/table-core/src/features/global-filtering/globalFilteringFeature.types.ts`. React import path shown; table-core options/state/APIs are identical across frameworks.

## Related

- [column-filtering.md](./column-filtering.md)
- [column-faceting.md](./column-faceting.md)
