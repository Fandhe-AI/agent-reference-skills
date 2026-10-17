---
source: https://tanstack.com/table/latest/docs/framework/react/examples/column-resizing-performant
---

# Performant Column Resizing

Resize columns with no React re-renders by subscribing to the column sizing atom outside React and writing CSS variables.

```tsx
import React from 'react'
import {
  columnResizingFeature,
  columnSizingFeature,
  createColumnHelper,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'
import { makeData } from './makeData'
import type { Table } from '@tanstack/react-table'
import type { Person } from './makeData'

/**
 * This example implements column resizing with NO React re-renders!
 * Instead, we subscribe to the table store OUTSIDE of React and write CSS variables
 */

const features = tableFeatures({ columnResizingFeature, columnSizingFeature })

const columnHelper = createColumnHelper<typeof features, Person>()

const columns = columnHelper.columns([
  columnHelper.accessor('firstName', {
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    footer: (props) => props.column.id,
  }),
])

function App() {
  const [data, setData] = React.useState(() => makeData(200))

  const table = useTable(
    {
      features,
      columns,
      data,
      defaultColumn: {
        minSize: 60,
        maxSize: 800,
      },
      columnResizeMode: 'onChange',
      // initialState: { columnSizing: { firstName: 200 } }, // set column sizes on first render
      // columnResizeDirection: 'rtl', // calculate resize offsets right-to-left; default 'ltr'
      // enableColumnResizing: false, // disable resizing for every column; default true
      debugTable: true,
    },
    () => ({}), // subscribe to nothing instead of re-rendering on every internal state change
  )

  const tableRef = React.useRef<HTMLTableElement>(null)

  /**
   * Instead of re-rendering React on every resize tick, we subscribe to the
   * table store OUTSIDE of React and write the column size CSS variables
   * directly onto the <table> element. Header and data cells reference the
   * variables, so the browser updates widths with zero React work per tick.
   * (The core resize handler already coalesces pointer events to one state
   * update per animation frame.)
   */
  React.useLayoutEffect(() => {
    const writeColumnSizeVars = () => {
      const tableEl = tableRef.current
      if (!tableEl) return
      for (const header of table.getFlatHeaders()) {
        tableEl.style.setProperty(
          `--header-${header.id}-size`,
          String(header.getSize()),
        )
        tableEl.style.setProperty(
          `--col-${header.column.id}-size`,
          String(header.column.getSize()),
        )
      }
      tableEl.style.width = `${table.getTotalSize()}px`
    }
    writeColumnSizeVars() // initial paint
    const { unsubscribe } =
      table.atoms.columnSizing.subscribe(writeColumnSizeVars)
    return () => unsubscribe()
  }, [])

  return (
    <table ref={tableRef} style={{ display: 'grid' }}>
      <thead style={{ display: 'grid' }}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr
            key={headerGroup.id}
            style={{ display: 'flex', width: '100%', height: 30 }}
          >
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                style={{
                  display: 'flex',
                  flexShrink: 0,
                  width: `calc(var(--header-${header.id}-size) * 1px)`, // use CSS variable so not dependent on React re-rendering
                }}
              >
                {header.isPlaceholder ? null : (
                  <table.FlexRender header={header} />
                )}
                {/* Each resizer subscribes to just its own "am I being
                    resized?" boolean, so a drag re-renders exactly one
                    of these islands at drag start and end */}
                <table.Subscribe
                  selector={(state) =>
                    state.columnResizing.isResizingColumn === header.column.id
                  }
                >
                  {(isResizing) => (
                    <div
                      onDoubleClick={() => header.column.resetSize()}
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`resizer ${isResizing ? 'isResizing' : ''}`}
                    />
                  )}
                </table.Subscribe>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      {/* No memoization needed: the root subscribes to no table state,
          so the body only re-renders when `data` itself changes */}
      <TableBody table={table} />
    </table>
  )
}

function TableBody({ table }: { table: Table<typeof features, Person> }) {
  return (
    <tbody style={{ display: 'grid' }}>
      {table.getRowModel().rows.map((row) => (
        <tr
          key={row.id}
          style={{
            display: 'flex',
            width: '100%',
            height: 30,
            // Offscreen rows skip style recalc and layout entirely, so a live
            // column resize only lays out the rows actually on screen.
            contentVisibility: 'auto',
            containIntrinsicHeight: 'auto 30px',
          }}
        >
          {row.getAllCells().map((cell) => {
            return (
              <td
                key={cell.id}
                style={{
                  display: 'flex',
                  flexShrink: 0,
                  width: `calc(var(--col-${cell.column.id}-size) * 1px)`, // use CSS variable so not dependent on React re-rendering
                }}
              >
                {cell.renderValue<any>()}
              </td>
            )
          })}
        </tr>
      ))}
    </tbody>
  )
}
```

## Notes

- Trimmed from the official example: grouped columns (`columnHelper.group`), four of six leaf columns, the regenerate/stress buttons, the state `<pre>`, and the scroll container. `TableBody` is declared as an inline prop type instead of the example's `TableBodyProps` interface.
- Selector `() => ({})` on `useTable` subscribes the component to no state; widths come from CSS variables written in `useLayoutEffect`.
- Use `table.atoms.columnSizing.subscribe(...)` and remember to call the returned `unsubscribe`.

## Related

- [column-resizing.md](./column-resizing.md)
- [basic-subscribe.md](./basic-subscribe.md)
