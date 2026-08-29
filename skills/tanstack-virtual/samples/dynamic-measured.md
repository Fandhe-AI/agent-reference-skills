---
source: https://github.com/TanStack/virtual/blob/main/examples/react/dynamic/src/main.tsx
---

# Dynamically measured rows with `measureElement`

Virtualize rows whose exact size is unknown until rendered (e.g. wrapped text of varying length), using `measureElement` to correct the estimate after mount.

```tsx
import * as React from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

function RowVirtualizerDynamic({ sentences }: { sentences: Array<string> }) {
  const parentRef = React.useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: sentences.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
  })

  return (
    <div
      ref={parentRef}
      style={{
        height: 400,
        width: 400,
        overflowY: 'auto',
        contain: 'strict',
      }}
    >
      <div style={{ width: '100%', position: 'relative' }}>
        {virtualizer.getVirtualItems().map((v) => (
          <div
            key={v.key}
            data-index={v.index}
            ref={virtualizer.measureElement}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${v.start}px)`,
            }}
          >
            <div style={{ padding: '10px 0' }}>
              <div>Row {v.index}</div>
              <div>{sentences[v.index]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Notes

- `data-index` must be set on the same element passed to `virtualizer.measureElement` (the ref callback) — the virtualizer reads it back to know which item was measured.
- Unlike fixed/variable-size rows, the rendered item omits an explicit `height`; its natural DOM height is measured via `ResizeObserver` and fed back into layout.
- `estimateSize` still supplies the *initial* guess before first measurement — pick a value close to the expected average to reduce scroll-position jumps.
- `contain: 'strict'` on the scroll container is a CSS containment hint that improves scroll performance with frequently re-measured items.
