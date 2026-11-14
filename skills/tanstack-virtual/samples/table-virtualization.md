---
source: https://github.com/TanStack/virtual/blob/@tanstack/react-virtual@3.14.26/examples/react/table/src/main.tsx
---

# Virtualizing a `@tanstack/react-table` body

Virtualize the rows of a `@tanstack/react-table` instance by driving `useVirtualizer` off the table's sorted/filtered row model, rendering only the `<tr>`s that are currently visible plus top/bottom spacer rows.

```tsx
import * as React from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

function ReactTableVirtualized<TData>({
  columns,
  data,
}: {
  columns: Array<ColumnDef<TData>>
  data: Array<TData>
}) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })
  const { rows } = table.getRowModel()
  const parentRef = React.useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 34,
    overscan: 20,
  })

  const virtualRows = virtualizer.getVirtualItems()

  // Height of the spacer rows rendered above and below the visible rows
  const [paddingTop, paddingBottom] =
    virtualRows.length > 0
      ? [
          virtualRows[0].start,
          virtualizer.getTotalSize() - virtualRows[virtualRows.length - 1].end,
        ]
      : [0, 0]

  const columnCount = table.getVisibleLeafColumns().length

  return (
    <div ref={parentRef} className="container">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} style={{ width: header.getSize() }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {paddingTop > 0 && (
            <tr>
              <td colSpan={columnCount} style={{ height: paddingTop }} />
            </tr>
          )}
          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index]
            return (
              <tr key={row.id} style={{ height: `${virtualRow.size}px` }}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            )
          })}
          {paddingBottom > 0 && (
            <tr>
              <td colSpan={columnCount} style={{ height: paddingBottom }} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
```

## Notes

- `count` is `rows.length` from `table.getRowModel()`, not the raw data length, so it stays correct through sorting/filtering.
- Table rows cannot be absolutely positioned, so only the visible rows are rendered, with a spacer `<tr>` above (`paddingTop`, the first visible row's `start`) and below (`paddingBottom`, `getTotalSize()` minus the last visible row's `end`). The spacers keep the table as tall as all of its rows, so the sticky header stays in place while scrolling.
- Changed since `@tanstack/react-virtual@3.14.21`: that version wrapped the table in a `getTotalSize()`-high `<div>` and offset each row with `translateY(virtualRow.start - index * virtualRow.size)`; the spacer-row approach replaces it.
- The sample condenses the official example (sorting handlers and header sort indicators are omitted). Pinned to the `@tanstack/react-virtual@3.14.26` tag (fetched 2026-11-14).
- Source: https://github.com/TanStack/virtual/blob/@tanstack/react-virtual@3.14.26/examples/react/table/src/main.tsx
- Sorting/column state (`useReactTable`'s `state`/`onSortingChange`) is independent of virtualization — wire it up as usual on the table instance.
