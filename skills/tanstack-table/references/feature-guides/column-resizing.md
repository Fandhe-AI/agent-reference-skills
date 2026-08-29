---
source: https://tanstack.com/table/latest/docs/framework/react/guide/column-resizing
---

# Column Resizing

User-driven drag-to-resize columns, built on top of Column Sizing.

## Signature / Usage

```tsx
import {
  columnResizingFeature,
  columnSizingFeature,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'

const features = tableFeatures({
  columnSizingFeature,
  columnResizingFeature,
})

const table = useTable({
  features,
  columns,
  data,
})
```

```tsx
<th style={{ width: `${header.getSize()}px` }}>
  ...
  <div
    onMouseDown={header.getResizeHandler()}
    onTouchStart={header.getResizeHandler()}
  />
</th>
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `enableColumnResizing` | `boolean` | `true` | Table option; disables resizing entirely |
| `enableResizing` | `boolean` | `true` | Column option; disables resizing per column |
| `columnResizeMode` | `'onEnd' \| 'onChange'` | `'onEnd'` | When `column.getSize()` reflects the new size during drag |
| `columnResizeDirection` | `'ltr' \| 'rtl'` | `'ltr'` | Resize direction for RTL layouts |
| `atoms.columnResizing` | `Atom<columnResizingState>` | — | v9 external atom for the transient drag state |
| `onColumnResizingChange` | `(updater) => void` | — | v8-style controlled state callback |

## Notes

- `columnResizingFeature` depends on `columnSizingFeature`; register sizing before resizing.
- `columnResizing` state (`columnSizingStart`, `deltaOffset`, `deltaPercentage`, `isResizingColumn`, `startOffset`, `startSize`) is transient drag data, not persisted sizes.
- Key APIs: `header.getResizeHandler()`, `column.getCanResize()`, `column.getIsResizing()`, `table.setColumnResizing`, `table.resetHeaderSizeInfo()`.
- For high-frequency `"onChange"` resizing on large/complex tables, avoid subscribing the table body to resize state; write widths as CSS variables imperatively in a `useLayoutEffect` and isolate reactive UI (resize indicator) into small `table.Subscribe` islands instead of memoizing the whole body.

## Related

- [Column Sizing](./column-sizing.md)
- [Column Pinning](./column-pinning.md)
