---
source: https://github.com/TanStack/virtual/blob/main/examples/react/infinite-scroll/src/main.tsx
---

# Infinite scroll with `useInfiniteQuery`

Combine `@tanstack/react-query`'s `useInfiniteQuery` with `useVirtualizer` so scrolling near the end of the loaded rows triggers `fetchNextPage`.

```tsx
import * as React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'

async function fetchServerPage(limit: number, offset = 0) {
  const rows = new Array(limit).fill(0).map((_, i) => `Async loaded row #${i + offset * limit}`)
  await new Promise((r) => setTimeout(r, 500))
  return { rows, nextOffset: offset + 1 }
}

function App() {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: (ctx) => fetchServerPage(10, ctx.pageParam),
    getNextPageParam: (lastGroup) => lastGroup.nextOffset,
    initialPageParam: 0,
  })

  const allRows = data ? data.pages.flatMap((d) => d.rows) : []
  const parentRef = React.useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  })

  React.useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()
    if (!lastItem) return
    if (lastItem.index >= allRows.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, fetchNextPage, allRows.length, isFetchingNextPage, rowVirtualizer.getVirtualItems()])

  return (
    <div ref={parentRef} style={{ height: `500px`, width: `100%`, overflow: 'auto' }}>
      <div
        style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoaderRow = virtualRow.index > allRows.length - 1
          const post = allRows[virtualRow.index]
          return (
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
              {isLoaderRow ? (hasNextPage ? 'Loading more...' : 'Nothing more to load') : post}
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

## Notes

- `count` adds a placeholder "loader row" (`allRows.length + 1`) whenever `hasNextPage` is true, so it becomes the last virtual item.
- The effect watches the *last currently rendered* virtual item's `index`; when it reaches the loader row (`>= allRows.length - 1`), it calls `fetchNextPage()` (guarded by `!isFetchingNextPage` to avoid duplicate requests).
- Only fetched pages are flattened into `allRows` — the virtualizer's `count` grows as new pages arrive, so already-rendered rows keep their position.
- Requires `<QueryClientProvider>` from `@tanstack/react-query` to wrap the tree.
