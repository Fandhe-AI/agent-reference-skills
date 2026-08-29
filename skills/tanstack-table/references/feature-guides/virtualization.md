---
source: https://tanstack.com/table/latest/docs/framework/react/guide/virtualization
---

# Virtualization

Renders only visible rows/columns for very large tables; not a TanStack Table feature but a rendering strategy paired with TanStack Virtual.

## Signature / Usage

```tsx
import { useVirtualizer } from '@tanstack/react-virtual'

const rows = table.getRowModel().rows

const rowVirtualizer = useVirtualizer({
  count: rows.length,
  getScrollElement: () => tableContainerRef.current,
  estimateSize: () => 33,
  overscan: 5,
})

<tbody style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}>
  {rowVirtualizer.getVirtualItems().map((virtualRow) => {
    const row = rows[virtualRow.index]
    return (
      <tr
        key={row.id}
        style={{ position: 'absolute', transform: `translateY(${virtualRow.start}px)`, width: '100%' }}
      >
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id}>{/* render cell */}</td>
        ))}
      </tr>
    )
  })}
</tbody>
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `count` | `number` | Virtualizer option; total item count (`rows.length` or `visibleColumns.length`) |
| `getScrollElement` | `() => HTMLElement` | Virtualizer option; the scrollable container |
| `estimateSize` | `(index?) => number` | Virtualizer option; initial size guess per item |
| `overscan` | `number` | Virtualizer option; extra items rendered outside the viewport |
| `horizontal` | `boolean` | Virtualizer option; enables column (horizontal) virtualization |
| `measureElement` | `(node) => void` | Virtualizer option; refines actual size after render for dynamic heights |

## Notes

- TanStack Table ships no virtualization APIs; this page documents pairing it with the separate **TanStack Virtual** library (`@tanstack/react-virtual`) — see the `tanstack-virtual` skill for the virtualizer's own API surface.
- Virtualization complements but does not replace server-side pagination/filtering/sorting: virtualized data must still fully exist in the browser.
- Row virtualization absolutely positions rows via `transform: translateY(...)`; column virtualization instead adds left/right spacer cells to preserve scroll width.
- Always recompute virtual items from the table's current row/column lists after sorting, filtering, pagination, grouping, or visibility changes — stale indexes are a common bug source.
- Dynamic row heights need `measureElement` plus a `data-index` attribute; skip it entirely when every row has a fixed height.
- Sticky headers with virtualized rows typically require `display: grid`/`flex` table CSS instead of native table layout.

## Related

- [Pagination](./pagination.md)
- [Column Sizing](./column-sizing.md)
