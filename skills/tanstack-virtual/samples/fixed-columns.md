---
source: https://github.com/TanStack/virtual/blob/main/examples/react/fixed/src/main.tsx
---

# Fixed-size horizontal (column) virtualization

Virtualize a horizontal list of same-width columns using `horizontal: true`.

```tsx
import * as React from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

function ColumnVirtualizerFixed() {
  const parentRef = React.useRef<HTMLDivElement>(null)

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
      style={{ width: `400px`, height: `100px`, overflow: 'auto' }}
    >
      <div
        style={{
          width: `${columnVirtualizer.getTotalSize()}px`,
          height: '100%',
          position: 'relative',
        }}
      >
        {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
          <div
            key={virtualColumn.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${virtualColumn.size}px`,
              transform: `translateX(${virtualColumn.start}px)`,
            }}
          >
            Column {virtualColumn.index}
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Notes

- `horizontal: true` switches the measured axis from height/`top` to width/`left`; the spacer div's `width` (not `height`) uses `getTotalSize()`.
- Items are positioned with `transform: translateX(virtualColumn.start)` instead of `translateY`.
- Set `isRtl: true` on the virtualizer if the horizontal list must scroll right-to-left.
