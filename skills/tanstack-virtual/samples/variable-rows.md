---
source: https://github.com/TanStack/virtual/blob/main/examples/react/variable/src/main.tsx
---

# Variable-size rows with a known-ahead `estimateSize`

Virtualize rows whose sizes differ per index but are known in advance (no DOM measurement needed).

```tsx
import * as React from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

function RowVirtualizerVariable({ rows }: { rows: Array<number> }) {
  const parentRef = React.useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => rows[i],
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

- `estimateSize` receives the item's `index` and returns its exact known height — since the value is already exact, TanStack Virtual never needs to re-measure it via `measureElement`.
- The rendered item's inline `height` is read from the same `rows[index]` array so the DOM height always matches what the virtualizer calculated.
- Use this pattern (as opposed to [dynamic-measured](./dynamic-measured.md)) whenever sizes come from data/layout metadata rather than actual rendered DOM content.
