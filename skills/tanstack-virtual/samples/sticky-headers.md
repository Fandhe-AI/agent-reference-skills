---
source: https://github.com/TanStack/virtual/blob/main/examples/react/sticky/src/main.tsx
---

# Sticky section headers via a custom `rangeExtractor`

Keep a group header pinned to the top of the viewport while its group scrolls past, by injecting the active header's index into the rendered range with a custom `rangeExtractor`.

```tsx
import * as React from 'react'
import { defaultRangeExtractor, useVirtualizer } from '@tanstack/react-virtual'
import type { Range } from '@tanstack/react-virtual'

function StickyList({
  rows,
  stickyIndexes,
}: {
  rows: Array<string>
  stickyIndexes: Array<number>
}) {
  const parentRef = React.useRef<HTMLDivElement>(null)
  const activeStickyIndexRef = React.useRef(0)

  const isSticky = (index: number) => stickyIndexes.includes(index)
  const isActiveSticky = (index: number) =>
    activeStickyIndexRef.current === index

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 50,
    getScrollElement: () => parentRef.current,
    rangeExtractor: React.useCallback(
      (range: Range) => {
        activeStickyIndexRef.current =
          [...stickyIndexes].reverse().find((index) => range.startIndex >= index) ?? 0

        const next = new Set([
          activeStickyIndexRef.current,
          ...defaultRangeExtractor(range),
        ])

        return [...next].sort((a, b) => a - b)
      },
      [stickyIndexes],
    ),
  })

  return (
    <div ref={parentRef} style={{ height: `300px`, width: `400px`, overflow: 'auto' }}>
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
              ...(isSticky(virtualRow.index)
                ? { background: '#fff', borderBottom: '1px solid #ddd', zIndex: 1 }
                : {}),
              ...(isActiveSticky(virtualRow.index)
                ? { position: 'sticky' }
                : { position: 'absolute', transform: `translateY(${virtualRow.start}px)` }),
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
            }}
          >
            {rows[virtualRow.index]}
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Notes

- `defaultRangeExtractor` is imported from `@tanstack/react-virtual` and wrapped, not replaced — the custom extractor always merges its sticky index into the normal overscan-expanded range.
- The currently active sticky item switches from `position: absolute` (translated into place, like normal rows) to `position: sticky` so it visually pins to `top: 0` of the scroll container.
- `activeStickyIndexRef` is a ref (not state) updated as a side effect of `rangeExtractor`, which runs during the virtualizer's own render/measure cycle — avoid replacing it with `useState` as that would cause extra render loops.
- `stickyIndexes` must be precomputed (e.g. the row index of each group's header) before it is passed in.
