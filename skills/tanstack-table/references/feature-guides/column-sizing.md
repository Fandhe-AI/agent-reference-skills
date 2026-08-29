---
source: https://tanstack.com/table/latest/docs/framework/react/guide/column-sizing
---

# Column Sizing

Sets fixed/min/max width per column; a headless collection of size state you map onto your own layout.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  columnSizingFeature,
} from '@tanstack/react-table'

const features = tableFeatures({ columnSizingFeature })

const columns = [
  { accessorKey: 'col1', size: 270 },
  //...
]

const table = useTable({
  features,
  columns,
  data,
  defaultColumn: {
    size: 200,
    minSize: 50,
    maxSize: 500,
  },
})

column.getSize()
header.getSize()
table.getTotalSize()
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `number` | `150` | Column or `defaultColumn` option; width in state units (typically px) |
| `minSize` | `number` | `20` | Enforced during resizing |
| `maxSize` | `number` | `Number.MAX_SAFE_INTEGER` | Enforced during resizing |
| `columnSizing` | `Record<string, number>` | — | State; per-column-id overrides |
| `atoms.columnSizing` | `Atom<ColumnSizingState>` | — | v9 external atom for controlled sizing |
| `onColumnSizingChange` | `(updater) => void` | — | v8-style controlled state callback |

## Notes

- Only sets widths; for user-draggable resizing, see the Column Resizing feature (`enableColumnResizing`/`columnResizingFeature`, a separate guide not covered here).
- Sizes are stored as plain numbers; interpreting them as px and applying them to `table`/`div`/flex/grid layouts is left to the caller.
- Offset/region helpers: `column.getStart(region?)`, `column.getAfter(region?)`, `table.getTotalSize()`, `table.getStartTotalSize()`/`getCenterTotalSize()`/`getEndTotalSize()`.
- v9 recommends an external atom via `atoms.columnSizing`; v8-style `state.columnSizing` + `onColumnSizingChange` still works.

## Related

- [Column Pinning](./column-pinning.md)
- [Column Visibility](./column-visibility.md)
