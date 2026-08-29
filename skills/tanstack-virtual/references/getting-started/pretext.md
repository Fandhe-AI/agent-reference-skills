---
source: https://tanstack.com/virtual/latest/docs/pretext
---

# Text Measurement with Pretext

[Pretext](https://github.com/chenglou/pretext) is a text measurement and layout library. TanStack Virtual still owns scrolling, range calculation, item positioning, and scroll-to behavior; Pretext can own the text-height estimate for rows whose height is mostly determined by wrapped text (chat logs, AI streams, activity feeds, comments, changelogs, notifications).

## Signature / Usage

```tsx
import { clearCache, layout, prepare } from '@chenglou/pretext'
import { useVirtualizer } from '@tanstack/react-virtual'

const font = '14px Arial'
const lineHeight = 20
const preparedCache = new Map<string, ReturnType<typeof prepare>>()

function estimateRowHeight(row: { id: string; text: string }, contentWidth: number) {
  const prepared = prepare(row.text, font, { whiteSpace: 'pre-wrap', letterSpacing: 0 })
  const text = layout(prepared, contentWidth, lineHeight)
  return Math.max(lineHeight, text.height) + 24
}

const virtualizer = useVirtualizer({
  count: rows.length,
  getItemKey: (index) => rows[index]!.id,
  getScrollElement: () => parentRef.current,
  estimateSize: (index) => estimateRowHeight(rows[index]!, width - 32),
})
```

## Notes

- Install with `npm install @chenglou/pretext`.
- Use Pretext only for rows whose height derives purely from text content, font, content width, and line-height; do not use it for rows with images, embeds, block markdown, or arbitrary CSS layout — use `measureElement` or `resizeItem` for those instead.
- Rerun `layout()` (cheap, width-dependent) on resize; `prepare()` is the expensive per-text setup and should be cached.
- After `document.fonts.ready`, clear the prepared-text cache, call Pretext's `clearCache()`, and call `virtualizer.measure()` so offsets recalculate with the correct font metrics.
- Use one sizing owner per row — do not mix `measureElement` and Pretext/`resizeItem` for the same row unless DOM measurement is meant to override the estimate.
- Requires `Intl.Segmenter` and Canvas 2D text measurement support.

## Related

- [React Virtual](./react-virtual.md)
- [Introduction](./introduction.md)
