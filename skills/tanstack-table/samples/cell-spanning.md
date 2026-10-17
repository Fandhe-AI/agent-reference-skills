---
source: https://tanstack.com/table/latest/docs/framework/react/examples/cell-spanning
---

# Cell Spanning

Merge adjacent cells vertically (`spanRows`) or horizontally (`spanColumns`) with `cellSpanningFeature`.

```tsx
import * as React from 'react'
import {
  cellSpanningFeature,
  columnVisibilityFeature,
  createColumnHelper,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'
import { makeSummaryData } from './makeData'
import type { SummaryRow } from './makeData'

const summaryFeatures = tableFeatures({
  cellSpanningFeature,
  columnVisibilityFeature,
})

const summaryColumnHelper = createColumnHelper<
  typeof summaryFeatures,
  SummaryRow
>()

const summaryColumns = summaryColumnHelper.columns([
  summaryColumnHelper.accessor('label', {
    header: 'Shift',
    // Subtotal rows render one label cell covering every column but the
    // total. `Infinity` clamps to the rest of the cell's pinned region.
    spanColumns: ({ row }) => (row.original.kind === 'subtotal' ? Infinity : 1),
  }),
  summaryColumnHelper.accessor('region', {
    header: 'Region',
  }),
  summaryColumnHelper.accessor('hours', {
    header: 'Hours',
  }),
])

// For row spanning, a column def uses `spanRows` (boolean or predicate), e.g.:
//   columnHelper.accessor('region', { header: 'Region', spanRows: true })
//   columnHelper.accessor('shift', {
//     header: 'Shift',
//     spanRows: ({ column, value, anchorValue }) =>
//       column.getIsSorted() !== false && value === anchorValue,
//   })
// and the table option `enableCellSpanning: true | false` toggles the feature.

function App() {
  const [summaryData] = React.useState(() => makeSummaryData())

  const summaryTable = useTable(
    {
      debugTable: true,
      features: summaryFeatures,
      columns: summaryColumns,
      data: summaryData,
    },
    (state) => state, // default selector
  )

  return (
    <table>
      <tbody>
        {summaryTable.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const rowSpan = cell.getRowSpan()
              const colSpan = cell.getColSpan()

              if (rowSpan === 0 || colSpan === 0) return null

              return (
                <td key={cell.id} rowSpan={rowSpan} colSpan={colSpan}>
                  <summaryTable.FlexRender cell={cell} />
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

## Notes

- Trimmed from the official example: the sortable/filterable/paginated "Row Spanning" table and its `spanRows` columns are reduced to the comment lines in the snippet (the comment is a condensed paraphrase of the example's column defs, not new API); the example's `cellSelectionFeature` integration and `getCellClassName` are omitted.
- A span of 0 means the cell is covered by a neighbor. The official example warns: do NOT render `rowSpan={0}`, because in HTML it means "span to the end of the row group"; return `null` instead.
- Spans derive from the rows actually rendered, so sorting, filtering, and paging only change which rows are adjacent.

## Related

- [cell-selection.md](./cell-selection.md)
- [header-groups.md](./header-groups.md)
