---
source: https://tanstack.com/table/latest/docs/framework/react/guide/cell-selection, https://raw.githubusercontent.com/TanStack/table/main/packages/table-core/src/features/cell-selection/cellSelectionFeature.types.ts
---

# Cell Selection

Spreadsheet-style rectangular cell range selection state, options, and cell/column-def/table APIs, provided by `cellSelectionFeature`.

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

// in a cell
const startHandler = cell.getSelectionStartHandler()
const extendHandler = cell.getSelectionExtendHandler()
```

## Table Options

| Name | Type | Description |
|------|------|-------------|
| `autoResetCellSelection` | `boolean` | Resets cell selection when `data` changes (default `true`); set `false` to keep ranges across data changes. |
| `enableCellRangeSelection` | `boolean` | Enables inclusive cell range selection via shift-click and drag (default `true`). |
| `enableCellSelection` | `boolean \| ((cell) => boolean)` | Allows cells to be selected; a column def may opt out with its own `enableCellSelection: false` (default `true`). |
| `enableCellSelectionDrag` | `boolean` | Enables extending a selection by dragging across cells (default `true`). |
| `enableMultiCellRangeSelection` | `boolean` | Allows modifier interactions to add/subtract ranges (default `true`). |
| `isCellRangeSelectionEvent` | `(event: unknown) => boolean` | Determines whether an event extends the active range; defaults to detecting `shiftKey`. |
| `isMultiCellRangeSelectionEvent` | `(event: unknown) => boolean` | Determines whether an event adds/subtracts a rectangle; defaults to detecting `ctrlKey`/`metaKey`. |
| `onCellSelectionChange` | `OnChangeFn<CellSelectionState>` | Called with an updater when `state.cellSelection` changes (fires once per cell crossed during a drag). |

## Table State

| Name | Type | Description |
|------|------|-------------|
| `cellSelection` | `CellSelectionState` | The current selected cell range(s). |

## Column Definition Options

| Name | Type | Description |
|------|------|-------------|
| `enableCellSelection` | `boolean` | Allows cells in this column to be selected (default `true`). |

## Cell APIs

| Name | Type | Description |
|------|------|-------------|
| `getCanSelect` | `() => boolean` | Whether this cell can currently be selected. |
| `getIsFocused` | `() => boolean` | Whether this cell is the active cell (anchor of the most recent range). |
| `getIsSelected` | `() => boolean` | Whether this cell falls inside the final positive selection. |
| `getSelectionEdges` | `() => CellSelectionEdges` | Which sides of this cell sit on the outer boundary of the selection. |
| `getSelectionExtendHandler` | `() => (event: unknown) => void` | Handler that extends the active range to this cell during a drag; bind to `mouseenter`. |
| `getSelectionStartHandler` | `(contextDocument?: Document) => (event: unknown) => void` | Handler that begins a selection at this cell; bind to `mousedown`. |
| `getTabIndex` | `() => number` | `0` for the focused cell, `-1` otherwise (roving tabindex). |

## Table APIs

| Name | Type | Description |
|------|------|-------------|
| `extendCellSelection` | `(direction: CellSelectionDirection) => void` | Extends the active range one step in a direction, keeping its anchor fixed. |
| `getCellSelectionBounds` | `() => Array<CellSelectionBounds>` | Final positive selection as disjoint, inclusive rectangles. |
| `getCellSelectionMergeBounds` | `() => Array<CellSelectionBounds>` | Merged-cell rectangles from `cell-spanning` (empty array if not registered). |
| `getCellSelectionColumnIds` / `getCellSelectionRowIds` | `() => Array<string>` | Ids of all columns/rows intersected by the selection. |
| `getFocusedCell` | `() => Cell \| undefined` | The active cell (anchor of the most recent operation). |
| `getSelectedCellCount` | `() => number` | Number of selected cells. |
| `getSelectedCellIds` | `() => Array<string>` | Unique ids of all selected cells, row-major order. |
| `getSelectedCellRangesData` | `() => Array<Array<Array<unknown>>>` | Each region's values as a `[region][row][column]` grid. |
| `moveCellSelection` | `(direction: CellSelectionDirection) => void` | Moves the selection one step, collapsing it to a single cell. |
| `resetCellSelection` | `(defaultState?: boolean) => void` | Resets `cellSelection` to `initialState.cellSelection`. |
| `selectAllCells` | `() => void` | Selects every selectable cell as one range. |
| `selectCellRange` | `(range: CellSelectionRange, opts?: SelectCellRangeOptions) => void` | Selects a rectangle using replace/include/exclude mode. |
| `setCellSelection` | `(updater: Updater<CellSelectionState>) => void` | Updates cell selection state. |
| `setFocusedCell` | `(rowId: string, columnId: string) => void` | Collapses the selection to a single cell. |

## Notes

- Distinct from `row-selection` (whole-row checkbox-style selection); the two features can be combined.
- `getCellSelectionMergeBounds` returns merged-cell rectangles only when `cell-spanning` is also registered.
- Guide: https://tanstack.com/table/latest/docs/framework/react/guide/cell-selection . Options/State/APIs source: `packages/table-core/src/features/cell-selection/cellSelectionFeature.types.ts`. React import path shown; table-core options/state/APIs are identical across frameworks.

## Related

- [row-selection.md](./row-selection.md)
- [cell-spanning.md](./cell-spanning.md)
