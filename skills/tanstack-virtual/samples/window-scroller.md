---
source: https://github.com/TanStack/virtual/blob/main/examples/react/window/src/main.tsx
---

# Window-scrolled list with `useWindowVirtualizer`

Virtualize a list that scrolls with the browser window itself instead of an inner scroll container, using `scrollMargin` to account for content rendered above the list.

```tsx
import * as React from 'react'
import { useWindowVirtualizer } from '@tanstack/react-virtual'

function Example() {
  const listRef = React.useRef<HTMLDivElement | null>(null)
  const [listOffset, setListOffset] = React.useState(0)

  React.useLayoutEffect(() => {
    setListOffset(listRef.current?.offsetTop ?? 0)
  }, [])

  const virtualizer = useWindowVirtualizer({
    count: 10000,
    estimateSize: () => 35,
    overscan: 5,
    scrollMargin: listOffset,
  })

  return (
    <div ref={listRef}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((item) => (
          <div
            key={item.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${item.size}px`,
              transform: `translateY(${item.start - virtualizer.options.scrollMargin}px)`,
            }}
          >
            Row {item.index}
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Notes

- `useWindowVirtualizer` has no `getScrollElement` option — it always uses `window` as the scroll element (see the `PartialKeys` omission in [React Virtual](../references/getting-started/react-virtual.md)).
- `scrollMargin` corrects for any page content rendered above the virtualized list (headers, other sections) so offsets are computed relative to the window, not the list's own top; without it, rows are pushed down by the list's `offsetTop`.
- Every `translateY` subtracts `virtualizer.options.scrollMargin` to convert the item's window-relative `start` back into a position relative to the list container itself.
- This sample stores `offsetTop` in `useState` (not `useRef`, as the upstream example does) so the update actually triggers a re-render and `scrollMargin` reflects the real offset instead of staying `0` on first paint; it only measures once on mount, so if content above the list can resize after mount, re-measure `offsetTop` (e.g. via `ResizeObserver`) and call `setListOffset` again.
