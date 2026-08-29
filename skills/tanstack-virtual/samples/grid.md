---
source: https://github.com/TanStack/virtual/blob/main/examples/react/fixed/src/main.tsx
---

# Grid virtualization (row + column virtualizers combined)

Virtualize both axes at once by running a vertical and a horizontal `useVirtualizer` against the same scroll element and nesting their virtual items.

```tsx
import * as React from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

function GridVirtualizerFixed() {
  const parentRef = React.useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: 10000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  })

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: 10000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  })

  return (
    <div
      ref={parentRef}
      style={{ height: `500px`, width: `500px`, overflow: 'auto' }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: `${columnVirtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <React.Fragment key={virtualRow.key}>
            {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
              <div
                key={virtualColumn.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: `${virtualColumn.size}px`,
                  height: `${virtualRow.size}px`,
                  transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                }}
              >
                Cell {virtualRow.index}, {virtualColumn.index}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
```

## Notes

- Both virtualizers share the same `getScrollElement`, so a single scroll container drives both the row and column ranges.
- The spacer div's `height`/`width` come from `rowVirtualizer.getTotalSize()` / `columnVirtualizer.getTotalSize()` respectively.
- Each cell combines `translateX` (from the column) and `translateY` (from the row) in one `transform`.
- For masonry-style layouts (variable-height items packed into fixed columns) use a single virtualizer's `lanes` option and `virtualRow.lane` instead of two independent virtualizers — see the `lanes`/`laneAssignmentMode` options on [Virtualizer](../references/api/virtualizer.md).
