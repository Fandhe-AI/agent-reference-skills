---
source: https://tanstack.com/table/latest/docs/framework/react/guide/row-pinning
---

# Row Pinning

Keeps selected rows in top or bottom regions while the rest render in the center region.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  rowPinningFeature,
} from '@tanstack/react-table'

const features = tableFeatures({ rowPinningFeature })

const table = useTable({ features, columns, data })

row.pin('top') // or 'bottom' | false
table.getTopRows()
table.getCenterRows()
table.getBottomRows()
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `rowPinning` | `{ top: string[]; bottom: string[] }` | State; pinned row ids per region |
| `enableRowPinning` | `boolean \| (row) => boolean` | Table option; disables pinning per row |
| `keepPinnedRows` | `boolean` | Controls whether pinned rows stay visible through filtering/pagination |

## Notes

- `RowPinningState` is `{ top: string[]; bottom: string[] }`, mirroring the column-pinning shape.
- v9 recommends an external atom via `atoms.rowPinning` for controlled state; v8-style `state.rowPinning` + `onRowPinningChange` still works.
- Row-level APIs: `row.getCanPin()`, `row.getIsPinned()` (`'top' | 'bottom' | false`), `row.pin(position)`.
- Table-level APIs: `table.getTopRows()`, `getCenterRows()`, `getBottomRows()`, `getIsSomeRowsPinned()`.

## Related

- [Row Selection](./row-selection.md)
- [Column Pinning](./column-pinning.md)
- [Expanding](./expanding.md)
