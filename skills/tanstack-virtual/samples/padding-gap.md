---
source: https://github.com/TanStack/virtual/blob/main/examples/react/padding/src/main.tsx
---

# Padding around the list and gaps between items

Reserve empty space before/after the virtualized range with `paddingStart`/`paddingEnd`, and add spacing between items with `gap` — both are plain `Virtualizer` options, no extra markup required.

```tsx
import * as React from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

function RowVirtualizerPadded({ rows }: { rows: Array<number> }) {
  const parentRef = React.useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    paddingStart: 100,
    paddingEnd: 100,
    gap: 8,
  })

  return (
    <div ref={parentRef} style={{ height: `200px`, width: `400px`, overflow: 'auto' }}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            ref={rowVirtualizer.measureElement}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${rows[virtualRow.index]}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            Row {virtualRow.index}
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Notes

- `paddingStart`/`paddingEnd` add fixed pixel space before the first item and after the last item; `getTotalSize()` already includes this padding, so no extra spacer elements are needed.
- `gap` inserts spacing between consecutive items along the virtualized axis (and is factored into `virtualRow.start`/`getTotalSize()` automatically) — it behaves like CSS flex/grid `gap`, not a per-item margin.
- Both options work identically for horizontal (`horizontal: true`) virtualizers, applying to the width axis instead.
- For a grid, set `indexAttribute` to distinct values (e.g. `data-row-index` / `data-column-index`) on the row/column virtualizers so `measureElement` can disambiguate which axis it measured, as shown in the official padding example's grid variant.
