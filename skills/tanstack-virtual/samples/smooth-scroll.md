---
source: https://github.com/TanStack/virtual/blob/main/examples/react/smooth-scroll/src/main.tsx
---

# Custom easing for `scrollToIndex` via `scrollToFn`

Override the default (instant/native `smooth`) scroll behavior with a custom easing function, so `scrollToIndex`/`scrollToOffset` animate using your own timing curve.

```tsx
import * as React from 'react'
import { elementScroll, useVirtualizer } from '@tanstack/react-virtual'
import type { VirtualizerOptions } from '@tanstack/react-virtual'

function easeInOutQuint(t: number) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
}

function App() {
  const parentRef = React.useRef<HTMLDivElement>(null)
  const scrollingRef = React.useRef<number>()

  const scrollToFn: VirtualizerOptions<any, any>['scrollToFn'] = React.useCallback(
    (offset, canSmooth, instance) => {
      const duration = 1000
      const start = parentRef.current?.scrollTop || 0
      const startTime = (scrollingRef.current = Date.now())

      const run = () => {
        if (scrollingRef.current !== startTime) return
        const elapsed = Date.now() - startTime
        const progress = easeInOutQuint(Math.min(elapsed / duration, 1))
        const interpolated = start + (offset - start) * progress

        if (elapsed < duration) {
          elementScroll(interpolated, canSmooth, instance)
          requestAnimationFrame(run)
        } else {
          elementScroll(interpolated, canSmooth, instance)
        }
      }

      requestAnimationFrame(run)
    },
    [],
  )

  const rowVirtualizer = useVirtualizer({
    count: 10000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
    scrollToFn,
  })

  return (
    <div>
      <button onClick={() => rowVirtualizer.scrollToIndex(5000)}>Scroll To Index</button>
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
    </div>
  )
}
```

## Notes

- `elementScroll` (imported from `@tanstack/react-virtual`) is the library's default `scrollToFn` implementation for element-based containers — this sample wraps it in a `requestAnimationFrame` loop instead of replacing it outright.
- `scrollingRef` guards against overlapping animations: if a new scroll starts before the previous one finishes, the stale `run()` loop compares `scrollingRef.current !== startTime` and bails out.
- `scrollToFn` is called by both `scrollToIndex` and `scrollToOffset`, so overriding it once affects both APIs.
- Use `windowScroll` instead of `elementScroll` as the base function when building the same pattern for `useWindowVirtualizer`.
