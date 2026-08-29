---
source: https://github.com/TanStack/virtual/blob/main/examples/react/fixed/src/main.tsx
---

# Fixed-size row virtualization

Virtualize a vertical list where every row has the same, hard-coded height.

```tsx
import * as React from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

function RowVirtualizerFixed() {
  const parentRef = React.useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: 10000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  })

  return (
    <div
      ref={parentRef}
      style={{ height: `200px`, width: `400px`, overflow: 'auto' }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
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

- Since every row is the same size, `estimateSize` returns a constant and is never adjusted after mount — no `measureElement` needed.
- The outer scroll container needs an explicit `height` and `overflow: auto`; the inner spacer div uses `getTotalSize()` to hold the full scrollbar length.
- Each visible item is absolutely positioned via `transform: translateY(virtualRow.start)`, not `top`, to avoid layout reflow on scroll.
- `overscan` renders extra rows above/below the viewport to reduce blank flashes during fast scrolling.
