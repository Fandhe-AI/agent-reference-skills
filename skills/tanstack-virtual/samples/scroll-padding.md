---
source: https://github.com/TanStack/virtual/blob/@tanstack/react-virtual@3.14.21/examples/react/scroll-padding/src/main.tsx
---

# Scroll padding below a sticky table header

Set `paddingStart` and `scrollPaddingStart` to the measured `<thead>` height so `scrollToIndex` lands the target row below the table header instead of under it.

```tsx
import React from 'react'
import { useMeasure } from '@react-hookz/web'
import { useVirtualizer } from '@tanstack/react-virtual'

function App() {
  const parentRef = React.useRef<HTMLDivElement>(null)
  const [theadSize, theadRef] = useMeasure<HTMLTableSectionElement>()

  const rowVirtualizer = useVirtualizer({
    count: 10000,
    getScrollElement: () => parentRef.current,
    estimateSize: React.useCallback(() => 35, []),
    overscan: 5,
    paddingStart: theadSize?.height ?? 0,
    scrollPaddingStart: theadSize?.height ?? 0,
  })

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => {
            rowVirtualizer.scrollToIndex(40)
          }}
          className="border border-black"
        >
          Scroll to index 40
        </button>
        <button
          onClick={() => {
            rowVirtualizer.scrollToIndex(20)
          }}
          className="border border-black"
        >
          Then scroll to index 20
        </button>
      </div>

      <br />
      <br />

      <div
        ref={parentRef}
        className="List"
        style={{
          height: `200px`,
          width: `400px`,
          overflow: 'auto',
        }}
      >
        <table
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
          }}
        >
          <thead ref={theadRef}>
            <tr>
              <th>Index</th>
              <th>Key</th>
            </tr>
          </thead>
          <tbody>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => (
              <tr
                key={virtualRow.index}
                className={
                  virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'
                }
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <td>#{virtualRow.index}</td>
                <td>{virtualRow.key}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
```

## Notes

- `paddingStart` reserves space at the top of the scroll content for the header; `scrollPaddingStart` keeps `scrollToIndex` targets offset by the same amount so the row is not hidden behind it.
- `useMeasure` comes from `@react-hookz/web` (not part of TanStack Virtual); it returns `undefined` until the first measurement, hence the `?? 0` fallback.
- Pinned to the `@tanstack/react-virtual@3.14.21` tag; the `createRoot` / `NODE_ENV` boilerplate of the example is omitted.
