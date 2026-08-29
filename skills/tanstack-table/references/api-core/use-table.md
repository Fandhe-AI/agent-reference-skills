---
source: https://tanstack.com/table/latest/docs/framework/react/reference/index/functions/useTable
---

# useTable

The v9 React adapter hook. Creates a React table instance backed by TanStack Store atoms, given `tableOptions` and an explicit `features` set.

## Signature / Usage

```tsx
import { useTable, tableFeatures } from '@tanstack/react-table'

const features = tableFeatures({ /* rowSortingFeature, ... */ })

const table = useTable(
  {
    features,
    columns,
    data,
  },
  (state) => ({ pagination: state.pagination }), // optional selector
)

table.state.pagination
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `tableOptions` | `TableOptions<TFeatures, TData>` | Table options, including the required `features` (from `tableFeatures()`), `columns`, and `data` |
| `selector` | `(state: TableState<TFeatures>) => TSelected` (optional) | Projects from the table's store; selected values are exposed via `table.state` and compared shallowly for re-renders. Omit to subscribe to all registered state slices |

## Notes

- Returns `ReactTable<TFeatures, TData, TSelected>`.
- Unlike v8's `useReactTable`, `features` is mandatory — nothing is enabled implicitly. See `TableFeature` / `tableFeatures`.
- For v8-compatible usage without an explicit `features` object, use `useLegacyTable` (in `legacy-v8/`) instead.

## Related

- [Table](./table.md)
- [TableOptions](./table-options.md)
- [tableFeatures](./table-features-fn.md)
- [flex-render.md](./flex-render.md)
