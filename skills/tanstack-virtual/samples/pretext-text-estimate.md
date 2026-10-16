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

## Notes

- Pretext only owns text measurement; TanStack Virtual still handles range extraction, positioning, overscan, and `scrollToIndex`. See `references/getting-started/pretext.md` for the guide.
- Keep the `prepare` options (here `whiteSpace: 'pre-wrap'`) in sync with the CSS `white-space`, otherwise estimates drift from the rendered height.
- `layout()` reruns on width change; `prepare()` reruns only when text or font inputs change. After `document.fonts.ready`, both caches are cleared and `measure()` recalculates sizes.
- For rows with media or other non-text content, the official example suggests `measureElement` or `resizeItem` instead.
- `messages` is declared with `declare const` as the data source: supply your own `Message[]` with unique `id` values. Omitted from the pinned `@tanstack/react-virtual@3.14.21` example: message generation (demo text corpus), the toolbar, and the mount code. The layout constants above are kept as in the example.
