---
source: https://tanstack.com/table/latest/docs/framework/react/guide/column-resizing, https://raw.githubusercontent.com/TanStack/table/main/packages/table-core/src/features/column-resizing/columnResizingFeature.types.ts
---

# Column Resizing

Interactive drag-to-resize state, options, and column/header/table resizing APIs, provided by `columnResizingFeature`.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  columnResizingFeature,
} from '@tanstack/react-table'

const features = tableFeatures({ columnResizingFeature })

const table = useTable({
  features,
  columns,
  data,
  columnResizeMode: 'onChange', // or 'onEnd'
})

// in a header cell
const resizeHandler = header.getResizeHandler()
```

## Table Options

| Name | Type | Description |
|------|------|-------------|
| `columnResizeMode` | `ColumnResizeMode` (`'onChange' \| 'onEnd'`) | When committed `columnSizing` values update: while dragging (`onChange`) or when the drag ends (`onEnd`). |
| `enableColumnResizing` | `boolean` | Enables/disables column resizing for the whole table. |
| `columnResizeDirection` | `ColumnResizeDirection` (`'ltr' \| 'rtl'`) | Resize direction used to calculate drag offsets (default `ltr`). |
| `onColumnResizingChange` | `OnChangeFn<columnResizingState>` | Called with an updater when the transient `columnResizing` state changes. |

## Table State

| Name | Type | Description |
|------|------|-------------|
| `columnResizing` | `columnResizingState` | Transient in-drag resize interaction state. |

## Column APIs

| Name | Type | Description |
|------|------|-------------|
| `getCanResize` | `() => boolean` | Whether this column can start a resize interaction. |
| `getIsResizing` | `() => boolean` | Whether this column is the active resize target. |

## Header APIs

| Name | Type | Description |
|------|------|-------------|
| `getResizeHandler` | `(context?: Document) => (event: unknown) => void` | Creates the `onMouseDown`/`onTouchStart` handler for a resize handle; drag/release listeners are auto-installed/cleaned up. |

## Table APIs

| Name | Type | Description |
|------|------|-------------|
| `resetHeaderSizeInfo` | `(defaultState?: boolean) => void` | Resets `columnResizing` to `initialState.columnResizing` (or the no-drag default when `true`). |
| `setColumnResizing` | `(updater: Updater<columnResizingState>) => void` | Updates transient resize interaction state. |

## Notes

- Committed column widths are read via `column-sizing`'s `columnSizing` state/`getSize()`; this feature only manages the drag interaction and mode/direction options.
- Guide: https://tanstack.com/table/latest/docs/framework/react/guide/column-resizing . Options/State/APIs source: `packages/table-core/src/features/column-resizing/columnResizingFeature.types.ts`. React import path shown; table-core options/state/APIs are identical across frameworks.

## Related

- [column-sizing.md](./column-sizing.md)
