---
source: https://tanstack.com/table/latest/docs/framework/react/guide/virtualization
---

# Virtualized Rows (with TanStack Virtual)

Render only the visible slice of a large row model using `@tanstack/react-virtual`'s `useVirtualizer`.

```tsx
import { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

const tableContainerRef = useRef<HTMLDivElement>(null)
const rows = table.getRowModel().rows

const rowVirtualizer = useVirtualizer({
  count: rows.length,
  getScrollElement: () => tableContainerRef.current,
  estimateSize: () => 33,
  overscan: 5,
})

<div ref={tableContainerRef} style={{ overflow: 'auto', height: '600px' }}>
  <table style={{ display: 'grid' }}>
    <tbody
      style={{ display: 'grid', height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const row = rows[virtualRow.index]
        return (
          <tr
            key={row.id}
            style={{
              display: 'flex',
              position: 'absolute',
              transform: `translateY(${virtualRow.start}px)`,
              width: '100%',
            }}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} style={{ display: 'flex' }}>
                <table.FlexRender cell={cell} />
              </td>
            ))}
          </tr>
        )
      })}
    </tbody>
  </table>
</div>
```

## Notes

- TanStack Table ships no virtualization APIs itself; this pairs the table's row model with the separate TanStack Virtual library. See the `tanstack-virtual` skill for the virtualizer's own API surface.
- Row virtualization absolutely positions rows via `transform: translateY(...)`, so the table typically needs `display: grid`/`flex` layout instead of native `<table>` layout, especially with sticky headers.
- Recompute virtual items from the table's current row list after sorting, filtering, pagination, or grouping — stale indexes are a common bug source.
- Virtualization does not reduce fetched/processed data volume; it complements, but does not replace, server-side pagination (see the `server-side` sample) when the full dataset cannot fit in the browser.
