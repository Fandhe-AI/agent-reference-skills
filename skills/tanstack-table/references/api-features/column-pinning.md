---
source: https://tanstack.com/table/latest/docs/framework/react/guide/column-pinning, https://raw.githubusercontent.com/TanStack/table/main/packages/table-core/src/features/column-pinning/columnPinningFeature.types.ts
---

# Column Pinning

Logical start/end column pinning state, options, and column/row/table pinning APIs, provided by `columnPinningFeature`.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  columnPinningFeature,
} from '@tanstack/react-table'

const features = tableFeatures({ columnPinningFeature })

const table = useTable({
  features,
  columns,
  data,
  state: { columnPinning },
  onColumnPinningChange: setColumnPinning,
})
```

## Table Options

| Name | Type | Description |
|------|------|-------------|
| `enableColumnPinning` | `boolean` | Allows columns to be pinned into logical start/end regions (default `true`); column-level `enablePinning` can opt individual columns out. |
| `onColumnPinningChange` | `OnChangeFn<ColumnPinningState>` | Called with an updater when `state.columnPinning` changes. |

## Table State

| Name | Type | Description |
|------|------|-------------|
| `columnPinning` | `ColumnPinningState` | `{ left?: string[]; right?: string[] }`-shaped state (logical start/end). |

## Column APIs

| Name | Type | Description |
|------|------|-------------|
| `getCanPin` | `() => boolean` | Whether this column or any of its leaves can be pinned. |
| `getIsPinned` | `() => ColumnPinningPosition` | Logical pinned position: `'start'`, `'end'`, or `false`. |
| `getPinnedIndex` | `() => number` | Index within the pinned region. |
| `pin` | `(position: ColumnPinningPosition) => void` | Pins leaf columns to logical start/end, or unpins with `false`. |

## Row APIs

| Name | Type | Description |
|------|------|-------------|
| `getCenterVisibleCells` | `() => Array<Cell>` | Visible cells whose columns are not pinned start or end. |
| `getStartVisibleCells` | `() => Array<Cell>` | Visible cells pinned to logical start. |
| `getEndVisibleCells` | `() => Array<Cell>` | Visible cells pinned to logical end. |

## Table APIs

| Name | Type | Description |
|------|------|-------------|
| `getCenterFlatHeaders` / `getStartFlatHeaders` / `getEndFlatHeaders` | `() => Array<Header>` | Flat headers per region including parent headers. |
| `getCenterFooterGroups` / `getStartFooterGroups` / `getEndFooterGroups` | `() => Array<HeaderGroup>` | Footer groups per region. |
| `getCenterHeaderGroups` / `getStartHeaderGroups` / `getEndHeaderGroups` | `() => Array<HeaderGroup>` | Header groups per region. |
| `getCenterLeafColumns` / `getStartLeafColumns` / `getEndLeafColumns` | `() => Array<Column>` | Leaf columns per region. |
| `getCenterLeafHeaders` / `getStartLeafHeaders` / `getEndLeafHeaders` | `() => Array<Header>` | Leaf headers per region. |
| `getCenterVisibleLeafColumns` / `getStartVisibleLeafColumns` / `getEndVisibleLeafColumns` | `() => Array<Column>` | Visible leaf columns per region. |
| `getIsSomeColumnsPinned` | `(position?: ColumnPinningPosition) => boolean` | Whether any columns are pinned, optionally limited to one side. |
| `getPinnedLeafColumns` | `(position: ColumnPinningPosition \| 'center') => Array<Column>` | Pinned leaf columns for the requested region. |
| `getPinnedVisibleLeafColumns` | `(position: ColumnPinningPosition \| 'center') => Array<Column>` | Visible leaf columns for the requested region. |
| `resetColumnPinning` | `(defaultState?: boolean) => void` | Resets `columnPinning` to `initialState.columnPinning`. |
| `setColumnPinning` | `(updater: Updater<ColumnPinningState>) => void` | Updates column pinning state. |

## Notes

- "start"/"end" are logical: in LTR they map to left/right, in RTL they map to right/left.
- Guide: https://tanstack.com/table/latest/docs/framework/react/guide/column-pinning . Options/State/APIs source: `packages/table-core/src/features/column-pinning/columnPinningFeature.types.ts`. React import path shown; table-core options/state/APIs are identical across frameworks.

## Related

- [column-ordering.md](./column-ordering.md)
- [row-pinning.md](./row-pinning.md)
