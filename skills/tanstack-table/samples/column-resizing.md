---
source: https://tanstack.com/table/latest/docs/framework/react/guide/column-resizing
---

# Column Resizing

Drag-to-resize column headers, built on top of column sizing.

```tsx
import { columnResizingFeature, columnSizingFeature, tableFeatures, useTable } from '@tanstack/react-table'

const features = tableFeatures({ columnSizingFeature, columnResizingFeature })

const table = useTable({ features, columns, data, columnResizeMode: 'onChange' })

<th style={{ width: `${header.getSize()}px`, position: 'relative' }}>
  <table.FlexRender header={header} />
  <div
    onMouseDown={header.getResizeHandler()}
    onTouchStart={header.getResizeHandler()}
    className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
  />
</th>
```

## Notes

- `columnResizingFeature` depends on `columnSizingFeature` — register sizing before resizing.
- `columnResizeMode: 'onChange'` reflects the new size live during drag; the default `'onEnd'` only commits on mouse/touch release.
- For high-frequency `'onChange'` resizing on large tables, avoid subscribing the table body to resize state directly — write widths as CSS variables in a `useLayoutEffect` and isolate the live resize indicator in a small `table.Subscribe` island instead.
- Disable resizing table-wide with `enableColumnResizing: false`, or per column with `enableResizing: false` in the column def.
