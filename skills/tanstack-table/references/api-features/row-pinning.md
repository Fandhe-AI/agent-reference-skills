---
source: https://tanstack.com/table/latest/docs/framework/react/guide/row-pinning, https://raw.githubusercontent.com/TanStack/table/main/packages/table-core/src/features/row-pinning/rowPinningFeature.types.ts
---

# Row Pinning

Top/bottom row pinning state, options, and row/table pinning APIs, provided by `rowPinningFeature`.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  rowPinningFeature,
} from '@tanstack/react-table'

const features = tableFeatures({ rowPinningFeature })

const table = useTable({
  features,
  columns,
  data,
  state: { rowPinning },
  onRowPinningChange: setRowPinning,
})
```

## Table Options

| Name | Type | Description |
|------|------|-------------|
| `enableRowPinning` | `boolean \| ((row) => boolean)` | Allows rows to be pinned to top/bottom (default `true`). |
| `keepPinnedRows` | `boolean` | When `true` (default), pinned rows stay visible even if filtered/paginated out; when `false`, they can be filtered/paginated away. |
| `onRowPinningChange` | `OnChangeFn<RowPinningState>` | Called with an updater when `state.rowPinning` changes. |

## Table State

| Name | Type | Description |
|------|------|-------------|
| `rowPinning` | `RowPinningState` | `{ top?: string[]; bottom?: string[] }`-shaped pinned row ids. |

## Row APIs

| Name | Type | Description |
|------|------|-------------|
| `getCanPin` | `() => boolean` | Whether this row can be pinned. |
| `getIsPinned` | `() => RowPinningPosition` | `'top'`, `'bottom'`, or `false`. |
| `getPinnedIndex` | `() => number` | Numeric index within a pinned row group. |
| `pin` | `(position: RowPinningPosition, includeLeafRows?: boolean, includeParentRows?: boolean) => void` | Pins the row to `'top'`/`'bottom'`, or unpins to center with `false`. |

## Table APIs

| Name | Type | Description |
|------|------|-------------|
| `getBottomRows` | `() => Array<Row>` | Rows pinned to the bottom region. |
| `getCenterRows` | `() => Array<Row>` | Rows not pinned to top or bottom. |
| `getIsSomeRowsPinned` | `(position?: RowPinningPosition) => boolean` | Whether any rows are pinned, optionally limited to one region. |
| `getTopRows` | `() => Array<Row>` | Rows pinned to the top region. |
| `resetRowPinning` | `(defaultState?: boolean) => void` | Resets `rowPinning` to `initialState.rowPinning`. |
| `setRowPinning` | `(updater: Updater<RowPinningState>) => void` | Updates row pinning state. |

## Notes

- Distinct from `column-pinning` (which pins columns, not rows); can be combined.
- Guide: https://tanstack.com/table/latest/docs/framework/react/guide/row-pinning . Options/State/APIs source: `packages/table-core/src/features/row-pinning/rowPinningFeature.types.ts`. React import path shown; table-core options/state/APIs are identical across frameworks.

## Related

- [column-pinning.md](./column-pinning.md)
- [row-selection.md](./row-selection.md)
