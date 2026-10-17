---
source: https://tanstack.com/table/latest/docs/framework/react/examples/row-pinning
---

# Row Pinning

Pin rows to the top or bottom of the table with `rowPinningFeature` and render them from `getTopRows` / `getCenterRows` / `getBottomRows`.

```tsx
import React from 'react'
import {
  createColumnHelper,
  createExpandedRowModel,
  createPaginatedRowModel,
  rowExpandingFeature,
  rowPaginationFeature,
  rowPinningFeature,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'
import { makeData } from './makeData'
import type { Person } from './makeData'
import type {
  ExpandedState,
  ReactTable,
  Row,
  RowPinningState,
} from '@tanstack/react-table'

const features = tableFeatures({
  rowPinningFeature,
  rowExpandingFeature,
  rowPaginationFeature,
  expandedRowModel: createExpandedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
})

const columnHelper = createColumnHelper<typeof features, Person>()
function App() {
  // table states
  const [rowPinning, setRowPinning] = React.useState<RowPinningState>({
    top: [],
    bottom: [],
  })
  const [expanded, setExpanded] = React.useState<ExpandedState>({})

  const columns = React.useMemo(
    () =>
      columnHelper.columns([
        columnHelper.display({
          id: 'pin',
          header: () => 'Pin',
          cell: ({ row }) =>
            row.getIsPinned() ? (
              <button onClick={() => row.pin(false, true, false)}>❌</button>
            ) : (
              <div style={{ display: 'flex', gap: '4px' }}>
                <button onClick={() => row.pin('top', true, false)}>⬆️</button>
                <button onClick={() => row.pin('bottom', true, false)}>
                  ⬇️
                </button>
              </div>
            ),
        }),
        columnHelper.accessor('firstName', {
          header: 'First Name',
        }),
      ]),
    [],
  )

  const [data, setData] = React.useState(() => makeData(1_000, 2, 2))

  const table = useTable(
    {
      features,
      columns,
      data,
      initialState: {
        pagination: { pageSize: 20, pageIndex: 0 },
        // rowPinning: { top: ['0'], bottom: ['1'] }, // pin rows on first render
      },
      state: {
        expanded,
        rowPinning,
      },
      onExpandedChange: setExpanded,
      onRowPinningChange: setRowPinning,
      getSubRows: (row) => row.subRows,
      keepPinnedRows: true,
      // atoms: { rowPinning: rowPinningAtom }, // preferred: own pinning state with an external atom
      // enableRowPinning: row => row.original.age > 18, // allow pinning only for matching rows; default true
      debugTable: true,
    },
    (state) => state, // default selector
  )

  return (
    <table>
      <tbody>
        {table.getTopRows().map((row) => (
          <PinnedRow key={row.id} row={row} table={table} />
        ))}
        {table.getCenterRows().map((row) => {
          return (
            <tr key={row.id}>
              {row.getAllCells().map((cell) => {
                return (
                  <td key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </td>
                )
              })}
            </tr>
          )
        })}
        {table.getBottomRows().map((row) => (
          <PinnedRow key={row.id} row={row} table={table} />
        ))}
      </tbody>
    </table>
  )
}

function PinnedRow({
  row,
  table,
}: {
  row: Row<typeof features, Person>
  table: ReactTable<typeof features, Person>
}) {
  return (
    <tr
      style={{
        backgroundColor: 'lightblue',
        position: 'sticky',
        top:
          row.getIsPinned() === 'top'
            ? `${row.getPinnedIndex() * 26 + 48}px`
            : undefined,
        bottom:
          row.getIsPinned() === 'bottom'
            ? `${
                (table.getBottomRows().length - 1 - row.getPinnedIndex()) * 26
              }px`
            : undefined,
      }}
    >
      {row.getAllCells().map((cell) => {
        return (
          <td key={cell.id}>
            <table.FlexRender cell={cell} />
          </td>
        )
      })}
    </tr>
  )
}
```

## Notes

- Trimmed from the official example: filtering, column sizing, most columns, pagination controls, header markup, and the demo toggles are omitted. The `row.pin(position, includeLeafRows, includeParentRows)` arguments are hard-coded (`true, false`) here, whereas the example binds them to checkboxes; `keepPinnedRows` is likewise fixed to `true`.
- `keepPinnedRows` controls whether pinned rows persist across pagination and filtering.
- The example's `copyPinnedRows` toggle renders `table.getRowModel().rows` instead of `getCenterRows()` to keep pinned rows duplicated in the main body.

## Related

- [column-pinning.md](./column-pinning.md)
- [expanding-subrows.md](./expanding-subrows.md)
