---
source: https://github.com/TanStack/virtual/blob/main/examples/react/table/src/main.tsx
---

# Virtualizing a `@tanstack/react-table` body

Virtualize the rows of a `@tanstack/react-table` instance by driving `useVirtualizer` off the table's sorted/filtered row model, rendering only `<tr>`s that are currently visible.

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

  return (
    <div ref={parentRef} className="container">
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
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
            {virtualizer.getVirtualItems().map((virtualRow, index) => {
              const row = rows[virtualRow.index]
              return (
                <tr
                  key={row.id}
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

## Notes

- `count` is `rows.length` from `table.getRowModel()`, not the raw data length, so it stays correct through sorting/filtering.
- `<tr>` elements are laid out in normal table flow (no `position: absolute`), so the `translateY` offset is computed **relative to each row's own natural position** (`virtualRow.start - index * virtualRow.size`), unlike the `absolute`-positioned patterns in [fixed-rows](./fixed-rows.md).
- The outer wrapper's `height` (not the `<table>`'s) is set to `virtualizer.getTotalSize()` to reserve the full scrollable height.
- Sorting/column state (`useReactTable`'s `state`/`onSortingChange`) is independent of virtualization — wire it up as usual on the table instance.
