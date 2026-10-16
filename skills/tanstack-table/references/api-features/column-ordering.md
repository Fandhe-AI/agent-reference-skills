---
source: https://tanstack.com/table/latest/docs/framework/react/guide/column-ordering, https://raw.githubusercontent.com/TanStack/table/main/packages/table-core/src/features/column-ordering/columnOrderingFeature.types.ts
---

# Column Ordering

Manual column order state, options, and column/table ordering APIs, provided by `columnOrderingFeature`.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  columnOrderingFeature,
} from '@tanstack/react-table'

const features = tableFeatures({ columnOrderingFeature })

const table = useTable({
  features,
  columns,
  data,
  state: { columnOrder },
  onColumnOrderChange: setColumnOrder,
})
```

## Options / Props

### Table Options

| Name | Type | Description |
|------|------|-------------|
| `onColumnOrderChange` | `OnChangeFn<ColumnOrderState>` | Called with an updater when `state.columnOrder` changes. |

### Table State

| Name | Type | Description |
|------|------|-------------|
| `columnOrder` | `ColumnOrderState` (`Array<string>`) | Ordered array of column ids. |

### Column APIs

| Name | Type | Description |
|------|------|-------------|
| `getIndex` | `(position?: ColumnPinningPosition \| 'center') => number` | Zero-based index among visible columns, optionally scoped to a pinned region. |
| `getIsFirstColumn` | `(position?: ColumnPinningPosition \| 'center') => boolean` | Whether this is the first visible column (optionally within a region). |
| `getIsLastColumn` | `(position?: ColumnPinningPosition \| 'center') => boolean` | Whether this is the last visible column (optionally within a region). |

### Table APIs

| Name | Type | Description |
|------|------|-------------|
| `getColumnIndexes` | `() => ColumnIndexes` | Column-id-to-index records for each visible pinning region (memoized source for `column.getIndex`). |
| `getOrderColumnsFn` | `() => (columns: Array<Column<TFeatures, TData, unknown>>) => Array<Column<TFeatures, TData, unknown>>` | Returns a function that orders leaf columns by `columnOrder`, after moving grouped columns as `groupedColumnMode` sets. Leaf column order reads it; most apps will not need to call it directly. |
| `resetColumnOrder` | `(defaultState?: boolean) => void` | Resets `columnOrder` to `initialState.columnOrder` (or `[]` when `true`). |
| `setColumnOrder` | `(updater: Updater<ColumnOrderState>) => void` | Updates column order state. |

## Notes

- Works together with `column-pinning`: `getIndex`/`getIsFirstColumn`/`getIsLastColumn` accept a pinned region argument.
- `getOrderColumnsFn` is declared on the table type since 9.3.1 (previously assigned by column ordering but undeclared).
- Guide: https://tanstack.com/table/latest/docs/framework/react/guide/column-ordering . Options/State/APIs source: `packages/table-core/src/features/column-ordering/columnOrderingFeature.types.ts`. React import path shown; table-core options/state/APIs are identical across frameworks.

## Related

- [column-pinning.md](./column-pinning.md)
- [column-visibility.md](./column-visibility.md)
