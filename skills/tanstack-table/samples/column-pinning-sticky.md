---
source: https://tanstack.com/table/latest/docs/framework/react/examples/column-pinning-sticky
---

# Sticky Column Pinning

Pin columns to the start or end with `position: sticky` styles derived from the pinning APIs.

```tsx
import React from 'react'
import {
  columnOrderingFeature,
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createColumnHelper,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'
import { makeData } from './makeData'
import type { Column } from '@tanstack/react-table'
import type { CSSProperties } from 'react'
import type { Person } from './makeData'

const features = tableFeatures({
  columnOrderingFeature,
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
})

const columnHelper = createColumnHelper<typeof features, Person>()
// These are the important styles to make sticky column pinning work!
// Apply styles like this using your CSS strategy of choice with this kind of logic to head cells, data cells, footer cells, etc.
// View the index.css file for more needed styles such as border-collapse: collapse
const getCommonPinningStyles = (
  column: Column<typeof features, Person>,
): CSSProperties => {
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn =
    isPinned === 'start' && column.getIsLastColumn('start')
  const isFirstRightPinnedColumn =
    isPinned === 'end' && column.getIsFirstColumn('end')

  return {
    boxShadow: isLastLeftPinnedColumn
      ? '-4px 0 4px -4px gray inset'
      : isFirstRightPinnedColumn
        ? '4px 0 4px -4px gray inset'
        : undefined,
    insetInlineStart:
      isPinned === 'start' ? `${column.getStart('start')}px` : undefined,
    insetInlineEnd:
      isPinned === 'end' ? `${column.getAfter('end')}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  }
}

const defaultColumns = columnHelper.columns([
  columnHelper.accessor('firstName', {
    id: 'firstName',
    header: 'First Name',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    size: 180,
  }),
  columnHelper.accessor('age', {
    id: 'age',
    header: 'Age',
    footer: (props) => props.column.id,
    size: 180,
  }),
])

function App() {
  const [data, setData] = React.useState(() => makeData(20))
  const [columns] = React.useState(() => [...defaultColumns])

  const table = useTable(
    {
      features,
      columns,
      data,
      columnResizeMode: 'onChange',
      // initialState: { columnPinning: { start: ['firstName'], end: [] } }, // `start`/`end` follow layout direction
      // atoms: { columnPinning: columnPinningAtom }, // preferred: own pinning state with an external atom
      // enableColumnPinning: false, // disable pinning for every column; default true
    },
    (state) => state, // default selector
  )

  return (
    <div className="table-container">
      <table
        style={{
          width: table.getTotalSize(),
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const { column } = header

                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    // IMPORTANT: This is where the magic happens!
                    style={{ ...getCommonPinningStyles(column) }}
                  >
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                    {!header.isPlaceholder && header.column.getCanPin() && (
                      <div className="pin-actions">
                        <button onClick={() => header.column.pin('start')}>
                          {'<='}
                        </button>
                        <button onClick={() => header.column.pin(false)}>
                          X
                        </button>
                        <button onClick={() => header.column.pin('end')}>
                          {'=>'}
                        </button>
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const { column } = cell
                return (
                  <td
                    key={cell.id}
                    // IMPORTANT: This is where the magic happens!
                    style={{ ...getCommonPinningStyles(column) }}
                  >
                    <table.FlexRender cell={cell} />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

## Notes

- Trimmed from the official example: four of the six columns, the visibility toggle panel, shuffle/regenerate buttons, resizer handle, and debug flags are omitted; the pin buttons are condensed from the example's conditional rendering (the example only shows a button when it applies).
- Pinning uses `'start'` / `'end'` (layout-direction aware) rather than left/right.
- Apply the same style helper to header, data and footer cells; `border-collapse: collapse` and other needed CSS live in the example's `index.css`.

## Related

- [column-pinning.md](./column-pinning.md)
- [column-resizing.md](./column-resizing.md)
