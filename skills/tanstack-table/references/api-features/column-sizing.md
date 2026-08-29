---
source: https://tanstack.com/table/latest/docs/framework/react/guide/column-sizing, https://raw.githubusercontent.com/TanStack/table/main/packages/table-core/src/features/column-sizing/columnSizingFeature.types.ts
---

# Column Sizing

Committed column width state, options, column definition bounds, and column/header/table sizing APIs, provided by `columnSizingFeature`.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  columnSizingFeature,
} from '@tanstack/react-table'

const features = tableFeatures({ columnSizingFeature })

const columns = [
  { accessorKey: 'name', size: 200, minSize: 50, maxSize: 400 },
]

const table = useTable({
  features,
  columns,
  data,
})

const width = table.getColumn('name')?.getSize()
```

## Table Options

| Name | Type | Description |
|------|------|-------------|
| `onColumnSizingChange` | `OnChangeFn<ColumnSizingState>` | Called with an updater when committed `state.columnSizing` changes. |

## Table State

| Name | Type | Description |
|------|------|-------------|
| `columnSizing` | `ColumnSizingState` | Map of column id to committed width override. |

## Column Definition Options

| Name | Type | Description |
|------|------|-------------|
| `maxSize` | `number` | Upper bound used when resolving this column's size. |
| `minSize` | `number` | Lower bound used when resolving this column's size. |
| `size` | `number` | Initial size before `columnSizing` state overrides it. |

## Column APIs

| Name | Type | Description |
|------|------|-------------|
| `getAfter` | `(position?: ColumnPinningPosition \| 'center') => number` | Offset from this column's end edge to the end of its region. |
| `getSize` | `() => number` | Resolved current size after state and min/max constraints. |
| `getStart` | `(position?: ColumnPinningPosition \| 'center') => number` | Offset from the start of the region to this column's start edge. |
| `resetSize` | `() => void` | Resets the column to its initial size. |

## Header APIs

| Name | Type | Description |
|------|------|-------------|
| `getSize` | `() => number` | Computes this header's rendered size from its leaf columns. |
| `getStart` | `(position?: ColumnPinningPosition) => number` | Offset along the row-axis, summing preceding headers. |

## Table APIs

| Name | Type | Description |
|------|------|-------------|
| `getCenterTotalSize` | `() => number` | Sum of current sizes of visible center-region leaf columns. |
| `getColumnOffsets` | `() => ColumnOffsetsByPosition` | Memoized offset maps per pinning region (backs `getStart`/`getAfter`). |
| `getStartTotalSize` / `getEndTotalSize` | `() => number` | Sum of sizes of visible pinned-region leaf columns. |
| `getTotalSize` | `() => number` | Sum of sizes of all visible leaf columns. |
| `resetColumnSizing` | `(defaultState?: boolean) => void` | Resets to `initialState.columnSizing` (or `{}` when `true`). |
| `setColumnSizing` | `(updater: Updater<ColumnSizingState>) => void` | Updates committed column sizing state. |

## Notes

- Distinct from `column-resizing`, which manages the interactive drag session (`columnResizing` transient state / `getResizeHandler`); this feature owns the committed widths.
- Guide: https://tanstack.com/table/latest/docs/framework/react/guide/column-sizing . Options/State/APIs source: `packages/table-core/src/features/column-sizing/columnSizingFeature.types.ts`. React import path shown; table-core options/state/APIs are identical across frameworks.

## Related

- [column-resizing.md](./column-resizing.md)
- [column-pinning.md](./column-pinning.md)
