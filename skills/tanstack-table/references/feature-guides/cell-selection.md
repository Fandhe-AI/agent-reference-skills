---
source: https://tanstack.com/table/latest/docs/framework/react/guide/cell-selection
---

# Cell Selection

Spreadsheet-style rectangular cell selection: click, drag, Shift-extend, and Ctrl/Cmd add-or-subtract.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  cellSelectionFeature,
} from '@tanstack/react-table'

const features = tableFeatures({ cellSelectionFeature })

const table = useTable({
  features,
  columns,
  data,
})
```

```tsx
<td
  onMouseDown={cell.getSelectionStartHandler()}
  onMouseEnter={cell.getSelectionExtendHandler()}
>
  <table.FlexRender cell={cell} />
</td>
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `enableCellSelection` | `boolean \| (cell) => boolean` | Table option; enables/disables selection per cell |
| `enableCellSelectionDrag` | `boolean` | Table option; disables drag-to-select when `false` |
| `enableCellRangeSelection` | `boolean` | Table option; disables Shift-extend range behavior |
| `isCellRangeSelectionEvent` | `(event) => boolean` | Table option; customizes the Shift-extend trigger |
| `enableMultiCellRangeSelection` | `boolean` | Table option; disables Ctrl/Cmd add/subtract ranges |
| `isMultiCellRangeSelectionEvent` | `(event) => boolean` | Table option; customizes the multi-range modifier |
| `enableCellSelection` (column) | `false` | Column option; opts a column out of selection entirely |
| `autoResetCellSelection` | `boolean` | Table option; resets selection when `data` changes (default true) |
| `getRowId` | `(row) => string` | Table option; keys selection by a stable row id |

## Notes

- `CellSelectionState` is an array of `{ anchorRowId, anchorColumnId, focusRowId, focusColumnId, operation? }` ranges applied in order; omitted `operation` means include.
- Recommended v9 pattern for controlled state is an external atom via the `atoms` table option; v8-style `state.cellSelection` + `onCellSelectionChange` still works.
- Ranges track row/column ids, so sorting, filtering, reordering, pinning, and pagination all keep selections attached to the correct cells.
- `table.moveCellSelection` / `extendCellSelection` / `setFocusedCell` / `selectAllCells` / `resetCellSelection` drive keyboard navigation; the feature ships no keyboard handling itself.
- For large tables, subscribe per row with `table.Subscribe` and a selector rather than wrapping the whole `<tbody>`, to avoid re-rendering every cell on each drag update.
- When `cellSpanningFeature` is also registered, selection rectangles expand to fully enclose any merged cell they touch.

## Related

- [Cell Spanning](./cell-spanning.md)
- [Row Selection](./row-selection.md)
- [Virtualization](./virtualization.md)
