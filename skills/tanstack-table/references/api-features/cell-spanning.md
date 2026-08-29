---
source: https://tanstack.com/table/latest/docs/framework/react/guide/cell-spanning, https://raw.githubusercontent.com/TanStack/table/main/packages/table-core/src/features/cell-spanning/cellSpanningFeature.types.ts
---

# Cell Spanning

Row/column cell merging (`colSpan`/`rowSpan`) options, column definition, and cell/table APIs, provided by `cellSpanningFeature`.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  cellSpanningFeature,
} from '@tanstack/react-table'

const features = tableFeatures({ cellSpanningFeature })

const columns = [
  {
    accessorKey: 'region',
    spanRows: true,
  },
]

const table = useTable({
  features,
  columns,
  data,
})

// in a cell
if (!cell.getIsCovered()) {
  // render with colSpan={cell.getColSpan()} rowSpan={cell.getRowSpan()}
}
```

## Table Options

| Name | Type | Description |
|------|------|-------------|
| `enableCellSpanning` | `boolean` | Allows cells to span rows or columns; when `false` every cell reports a span of `1` and the span index is never built (default `true`). |

## Column Definition Options

| Name | Type | Description |
|------|------|-------------|
| `enableCellSpanning` | `boolean` | Per-column opt-out of spanning. |
| `spanColumns` | `number \| ((context: ColSpanContext) => number)` | Number of columns this column's cells should span. |
| `spanRows` | `boolean \| ((context: RowSpanContext) => boolean)` | Whether this column's cells should span consecutive rows with equal values. |

## Cell APIs

| Name | Type | Description |
|------|------|-------------|
| `getColSpan` | `() => number` | Columns this cell spans (`1` normal, `0` if covered by another cell's colSpan). |
| `getIsCovered` | `() => boolean` | Whether another cell's span covers this cell (skip rendering covered cells). |
| `getRowSpan` | `() => number` | Rows this cell spans (`1` normal, `0` if covered — never render `rowspan="0"` in HTML, it means "span to end of row group"). |

## Table APIs

| Name | Type | Description |
|------|------|-------------|
| `getCellSpanIndex` | `() => CellSpanIndex` | The memoized span index for the currently rendered rows. |

## Notes

- No `TableState_*` interface — spanning is derived from column def config, not persisted state.
- A `getRowSpan`/`getColSpan` result of `0` must never be rendered as the literal HTML attribute; skip the covered cell instead (see `getIsCovered`).
- Interacts with `cell-selection`'s `getCellSelectionMergeBounds`, which expands selection rectangles to fully enclose merged cells.
- Guide: https://tanstack.com/table/latest/docs/framework/react/guide/cell-spanning . Options/APIs source: `packages/table-core/src/features/cell-spanning/cellSpanningFeature.types.ts`. React import path shown; table-core options/APIs are identical across frameworks.

## Related

- [cell-selection.md](./cell-selection.md)
