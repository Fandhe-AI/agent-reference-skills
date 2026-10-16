---
source: https://tanstack.com/table/latest/docs/framework/react/examples/cell-selection
---

# Cell Selection

Enable spreadsheet-style cell and range selection with `cellSelectionFeature` and wire cell mouse handlers.

```tsx
import React from 'react'
import {
  cellSelectionFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createSortedRowModel,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'
import { useCreateAtom } from '@tanstack/react-store'
import { makeData } from './makeData'
import type { Person } from './makeData'
import type { CellSelectionState } from '@tanstack/react-table'

const features = tableFeatures({
  cellSelectionFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnVisibilityFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    datetime: sortFn_datetime,
    text: sortFn_text,
  },
})

const columnHelper = createColumnHelper<typeof features, Person>()

function App() {
  const columns = React.useMemo(
    () =>
      columnHelper.columns([
        columnHelper.accessor('firstName', {
          header: 'First Name',
          cell: (info) => info.getValue(),
          footer: (props) => props.column.id,
        }),
        columnHelper.accessor('progress', {
          header: 'Profile Progress',
          // enableCellSelection: false, // this column opts out of cell selection
          footer: (props) => props.column.id,
        }),
      ]),
    [],
  )

  const [data, setData] = React.useState(() => makeData(20))

  // optionally, raise the selection state to your own atom
  const cellSelectionAtom = useCreateAtom<CellSelectionState>([])

  const table = useTable(
    {
      key: 'cell-selection', // needed for devtools
      features,
      atoms: {
        cellSelection: cellSelectionAtom,
      },
      columns,
      data,
      getRowId: (row) => row.id,
      enableCellSelection: true, // enable cell selection for all cells
      // enableCellRangeSelection: false, // disable Shift-click and drag ranges; default true
      // enableMultiCellRangeSelection: false, // allow only one rectangle at a time; default true
      // enableCellSelectionDrag: false, // disable drag-to-select; default true
      // isCellRangeSelectionEvent: event => Boolean(event.metaKey), // use Meta instead of Shift
      debugTable: true,
    },
    // Every slice that changes the table's structure has to be here, or the
    // headers and controls will not re-render when you pin, hide, or reorder.
    // cellSelection is the deliberate exception: it is read through <Subscribe>
    // instead, so a drag does not re-render the whole example.
    (state) => ({
      sorting: state.sorting,
      columnVisibility: state.columnVisibility,
      columnOrder: state.columnOrder,
      columnPinning: state.columnPinning,
    }),
  )

  return (
    <>
      <table.Subscribe source={table.atoms.cellSelection}>
        {() => (
          <div>
            {table.getSelectedCellCount().toLocaleString()} cells selected
            across {table.getCellSelectionRowIds().length.toLocaleString()} rows
            and {table.getCellSelectionColumnIds().length} columns
          </div>
        )}
      </table.Subscribe>
      <table>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) =>
                cell.getCanSelect() ? (
                  <td
                    key={cell.id}
                    tabIndex={cell.getTabIndex()}
                    onMouseDown={cell.getSelectionStartHandler()}
                    onMouseEnter={cell.getSelectionExtendHandler()}
                  >
                    <table.FlexRender cell={cell} />
                  </td>
                ) : (
                  <td key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
```

## Notes

- Trimmed from the official example: most columns, the per-row `<table.Subscribe>` optimization with `rowSelectionKey`, `getCellClassName` edge styling, the `useHotkeys` keyboard navigation and TSV clipboard copy, and the pin/visibility/order controls are omitted. The cell `<td>` is simplified (no `className`).
- Imperative APIs used by the full example: `table.moveCellSelection`, `table.extendCellSelection`, `table.selectAllCells`, `table.resetCellSelection(true)`, `table.getSelectedCellRangesData()`. The table ships no keydown handling; the example drives them with TanStack Hotkeys (`useHotkeys`).
- The official example calls `table.resetCellSelection(true)` when column order, pinning, visibility or sorting changes.

## Related

- [row-selection.md](./row-selection.md)
- [cell-spanning.md](./cell-spanning.md)
