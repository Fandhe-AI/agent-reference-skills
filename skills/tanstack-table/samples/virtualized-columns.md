---
source: https://tanstack.com/table/latest/docs/framework/react/examples/virtualized-columns
---

# Virtualized Columns (with TanStack Virtual)

Virtualize both columns (horizontal, with empty padding cells) and rows (dynamic height) using `@tanstack/react-virtual`.

```tsx
import React from 'react'
import {
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createSortedRowModel,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  useTable,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { makeColumns, makeData } from './makeData'
import type { ReactTable } from '@tanstack/react-table'
import type { Person } from './makeData'

const features = {
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text,
  },
}

const columnHelper = createColumnHelper<typeof features, Person>()

const makeTableColumns = (columnCount: number) =>
  columnHelper.columns(
    makeColumns(columnCount).map((column) =>
      columnHelper.accessor(column.accessorKey, {
        header: column.header,
        size: column.size,
      }),
    ),
  )

function App() {
  const [columns] = React.useState(() => makeTableColumns(1_000))
  const [data] = React.useState(() => makeData(1_000, columns))

  const table = useTable(
    {
      features,
      columns,
      data,
      columnResizeMode: 'onChange',
      debugTable: true,
    },
    (state) => state, // default selector
  )

  return <TableContainer table={table} />
}

function TableContainer({
  table,
}: {
  table: ReactTable<typeof features, Person>
}) {
  const visibleColumns = table.getVisibleLeafColumns()

  // The virtualizers need to know the scrollable container element
  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  // we are using a slightly different virtualization strategy for columns (compared to virtual rows) in order to support dynamic row heights
  const columnVirtualizer = useVirtualizer<
    HTMLDivElement,
    HTMLTableCellElement
  >({
    count: visibleColumns.length,
    estimateSize: (index) => visibleColumns[index].getSize(), // estimate width of each column for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    horizontal: true,
    overscan: 3, // how many columns to render on each side off screen each way (adjust this for performance)
  })

  // re-measure virtual column widths when a column is resized so the
  // virtualizer's scroll math stays in sync with the rendered widths
  const columnSizing = table.state.columnSizing
  React.useEffect(() => {
    columnVirtualizer.measure()
  }, [columnVirtualizer, columnSizing])

  const virtualColumns = columnVirtualizer.getVirtualItems()

  // different virtualization strategy for columns - instead of absolute and translateY, we add empty columns to the left and right
  let virtualPaddingLeft: number | undefined
  let virtualPaddingRight: number | undefined

  if (virtualColumns.length) {
    virtualPaddingLeft = virtualColumns[0]?.start ?? 0
    virtualPaddingRight =
      columnVirtualizer.getTotalSize() -
      (virtualColumns[virtualColumns.length - 1]?.end ?? 0)
  }

  const { rows } = table.getRowModel()

  // dynamic row height virtualization - alternatively you could use a simpler fixed row height strategy without the need for `measureElement`
  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: rows.length,
    estimateSize: () => 33, // estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    // measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  })

  return (
    <div
      className="container"
      ref={tableContainerRef}
      style={{
        overflow: 'auto', // our scrollable table container
        position: 'relative', // needed for sticky header
        height: '800px', // should be a fixed height
      }}
    >
      {/* Even though we're still using semantic table tags, we must use CSS grid and flexbox for dynamic row heights */}
      <table style={{ display: 'grid' }}>
        {/* <thead> maps headerGroup.headers[virtualColumn.index] the same way as the body rows below */}
        <tbody
          style={{
            display: 'grid',
            height: `${rowVirtualizer.getTotalSize()}px`, // tells scrollbar how big the table is
            position: 'relative', // needed for absolute positioning of rows
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index]
            const visibleCells = row.getVisibleCells()
            return (
              <tr
                data-index={virtualRow.index} // needed for dynamic row height measurement
                ref={(node) => rowVirtualizer.measureElement(node)} // measure dynamic row height
                key={row.id}
                style={{
                  display: 'flex',
                  position: 'absolute',
                  transform: `translateY(${virtualRow.start}px)`, // this should always be a `style` as it changes on scroll
                  width: '100%',
                }}
              >
                {virtualPaddingLeft ? (
                  // fake empty column to the left for virtualization scroll padding
                  <td style={{ display: 'flex', width: virtualPaddingLeft }} />
                ) : null}
                {virtualColumns.map((vc) => {
                  const cell = visibleCells[vc.index]
                  return (
                    <td
                      key={cell.id}
                      style={{ display: 'flex', width: cell.column.getSize() }}
                    >
                      <table.FlexRender cell={cell} />
                    </td>
                  )
                })}
                {virtualPaddingRight ? (
                  // fake empty column to the right for virtualization scroll padding
                  <td style={{ display: 'flex', width: virtualPaddingRight }} />
                ) : null}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
```

## Notes

- Trimmed from the official example: the header components (`TableHead` / `TableHeadRow` / `TableHeadCell` with sorting and resizer handles), the per-cell `table.Subscribe` on `columnSizing`, the stress-test buttons and the development-mode notice. The row/cell components are inlined here into one `TableContainer`.
- Column virtualization pads with empty left/right cells instead of absolute positioning; rows use `translateY` plus `measureElement` for dynamic height.
- Re-run `columnVirtualizer.measure()` when `columnSizing` changes so scroll math follows resizes.
- See the `tanstack-virtual` skill for the virtualizer's API.

## Related

- [virtualized-rows.md](./virtualized-rows.md)
- [column-resizing.md](./column-resizing.md)
