---
source: https://github.com/TanStack/virtual/blob/@tanstack/react-virtual@3.14.21/examples/react/pretext/src/main.tsx
---

# Text-height estimates with Pretext

Use `@chenglou/pretext` to compute each message's height from its text, font, and width inside `estimateSize`, so variable-height rows need no DOM measurement.

```tsx
import React from 'react'
import { clearCache, layout, prepare } from '@chenglou/pretext'
import { useVirtualizer } from '@tanstack/react-virtual'

type Message = {
  id: string
  author: string
  body: string
  time: string
  type: 'agent' | 'user'
}

const BODY_FONT = '14px Arial'
const BODY_LINE_HEIGHT = 20
const BODY_LETTER_SPACING = 0
const BUBBLE_BORDER_WIDTH = 2
const BUBBLE_MAX_WIDTH = 680
const BUBBLE_X_PADDING = 28
const BUBBLE_Y_PADDING = 24
const META_BODY_GAP = 6
const META_HEIGHT = 18
const ROW_X_PADDING = 32
const ROW_Y_PADDING = 16
const DEFAULT_VIEWPORT_WIDTH = 760

const preparedCache = new Map<string, ReturnType<typeof prepare>>()

// `messages` is a Message[] (2000 synthetic items in the official example; data construction omitted here)
declare const messages: Message[]

function fallbackTextHeight(text: string, width: number) {
  const averageCharacterWidth = 7
  const charactersPerLine = Math.max(
    1,
    Math.floor(width / averageCharacterWidth),
  )

  return text.split('\n').reduce((height, paragraph) => {
    const lineCount = Math.max(
      1,
      Math.ceil(paragraph.length / charactersPerLine),
    )
    return height + lineCount * BODY_LINE_HEIGHT
  }, 0)
}

function getPreparedMessage(message: Message) {
  const key = `${message.id}:${BODY_FONT}:${BODY_LETTER_SPACING}:${message.body}`
  const cached = preparedCache.get(key)

  if (cached) {
    return cached
  }

  const prepared = prepare(message.body, BODY_FONT, {
    letterSpacing: BODY_LETTER_SPACING,
    whiteSpace: 'pre-wrap',
  })
  preparedCache.set(key, prepared)
  return prepared
}

function estimateMessageHeight(message: Message, viewportWidth: number) {
  const bubbleWidth = Math.min(
    BUBBLE_MAX_WIDTH,
    Math.max(1, viewportWidth - ROW_X_PADDING),
  )
  const textWidth = Math.max(
    1,
    bubbleWidth - BUBBLE_X_PADDING - BUBBLE_BORDER_WIDTH,
  )
  const textHeight =
    typeof Intl !== 'undefined' && 'Segmenter' in Intl
      ? layout(getPreparedMessage(message), textWidth, BODY_LINE_HEIGHT).height
      : fallbackTextHeight(message.body, textWidth)
  const bodyHeight = Math.max(BODY_LINE_HEIGHT, textHeight)

  return Math.ceil(
    ROW_Y_PADDING +
      BUBBLE_Y_PADDING +
      BUBBLE_BORDER_WIDTH +
      META_HEIGHT +
      META_BODY_GAP +
      bodyHeight,
  )
}

function useElementWidth(ref: React.RefObject<HTMLElement | null>) {
  const [width, setWidth] = React.useState(DEFAULT_VIEWPORT_WIDTH)

  React.useLayoutEffect(() => {
    const element = ref.current

    if (!element) {
      return
    }

    const updateWidth = () => {
      setWidth(Math.max(1, Math.round(element.clientWidth)))
    }

    updateWidth()

    const observer = new ResizeObserver(updateWidth)
    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref])

  return width
}

function App() {
  const parentRef = React.useRef<HTMLDivElement>(null)
  const viewportWidth = useElementWidth(parentRef)
  const [fontVersion, setFontVersion] = React.useState(0)

  const rowVirtualizer = useVirtualizer({
    count: messages.length,
    estimateSize: React.useCallback(
      (index) => estimateMessageHeight(messages[index]!, viewportWidth),
      [fontVersion, viewportWidth],
    ),
    getItemKey: React.useCallback((index: number) => messages[index]!.id, []),
    getScrollElement: () => parentRef.current,
    overscan: 8,
  })

  React.useLayoutEffect(() => {
    rowVirtualizer.measure()
  }, [fontVersion, rowVirtualizer, viewportWidth])

  React.useEffect(() => {
    let cancelled = false

    document.fonts.ready.then(() => {
      if (cancelled) {
        return
      }

      preparedCache.clear()
      clearCache()
      setFontVersion((value) => value + 1)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div ref={parentRef} className="list">
      <div
        className="spacer"
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const message = messages[virtualRow.index]!

          return (
            <div
              className={`message-row ${message.type}`}
              key={virtualRow.key}
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <article className="message-bubble">
                <div className="message-meta">
                  <span>{message.author}</span>
                  <span className="message-time">{message.time}</span>
                </div>
                <p className="message-body">{message.body}</p>
              </article>
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

The rules from `src/index.css` that the layout and the estimate constants depend on (the example's `* { box-sizing: border-box; }` is also required):

```css
* {
  box-sizing: border-box;
}

.list {
  background: #fff;
  border: 1px solid #d9e0ea;
  border-radius: 8px;
  height: 720px;
  overflow-x: hidden;
  overflow-y: auto;
}

.spacer {
  position: relative;
  width: 100%;
}

.message-row {
  left: 0;
  padding: 8px 16px;
  position: absolute;
  top: 0;
  width: 100%;
}

.message-bubble {
  background: #f8fafc;
  border: 1px solid #d9e0ea;
  border-radius: 8px;
  max-width: 680px;
  padding: 12px 14px;
  width: 100%;
}

.message-row.user .message-bubble {
  background: #eef6ff;
  border-color: #bed8f4;
  margin-left: auto;
}

.message-meta {
  align-items: center;
  color: #596579;
  display: flex;
  font-size: 12px;
  font-weight: 700;
  gap: 8px;
  height: 18px;
  line-height: 18px;
  margin-bottom: 6px;
}

.message-time {
  color: #8792a2;
  font-weight: 400;
}

.message-body {
  font:
    14px/20px Arial,
    Helvetica,
    sans-serif;
  letter-spacing: 0;
  margin: 0;
  white-space: pre-wrap;
}
```

## Notes

- Pretext only owns text measurement; TanStack Virtual still handles range extraction, positioning, overscan, and `scrollToIndex`. See `references/getting-started/pretext.md` for the guide.
- Keep the `prepare` options (here `whiteSpace: 'pre-wrap'`) in sync with the CSS `white-space`, otherwise estimates drift from the rendered height.
- The CSS must match the constants: `padding: 12px 14px` + 1px border = `BUBBLE_X_PADDING` 28 / `BUBBLE_Y_PADDING` 24 / `BUBBLE_BORDER_WIDTH` 2, `max-width: 680px`, `.message-meta` `height: 18px` + `margin-bottom: 6px`, `.message-body` `14px/20px Arial`, and `.message-row` `padding: 8px 16px` (`ROW_Y_PADDING` 16 / `ROW_X_PADDING` 32).
- `layout()` reruns on width change; `prepare()` reruns only when text or font inputs change. After `document.fonts.ready`, both caches are cleared and `measure()` recalculates sizes.
- For rows with media or other non-text content, the official example suggests `measureElement` or `resizeItem` instead.
- `messages` is declared with `declare const` as the data source: supply your own `Message[]` with unique `id` values. Omitted from the pinned `@tanstack/react-virtual@3.14.21` example: message generation (demo text corpus), the toolbar, and the mount code. The layout constants above are kept as in the example.
- Full stylesheet: `examples/react/pretext/src/index.css` (page, toolbar, button, and media-query rules omitted here).
