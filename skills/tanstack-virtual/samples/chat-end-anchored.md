---
source: https://github.com/TanStack/virtual/blob/@tanstack/react-virtual@3.14.21/examples/react/chat/src/main.tsx
---

# End-anchored chat message list

Anchor a chat list to its latest message with `anchorTo: 'end'` and `followOnAppend`, load older messages on upward scroll, and show a jump-to-latest button.

```tsx
import * as React from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import type { Message } from './api'

function MessageList({
  messages,
  loadingOlder,
  onLoadOlder,
}: {
  messages: Message[]
  loadingOlder: boolean
  onLoadOlder: () => void
}) {
  const parentRef = React.useRef<HTMLDivElement>(null)
  const lastScrollTopRef = React.useRef(0)
  const [atEnd, setAtEnd] = React.useState(true)

  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
    getItemKey: React.useCallback(
      (index: number) => messages[index]!.id,
      [messages],
    ),
    anchorTo: 'end',
    followOnAppend: true,
    scrollEndThreshold: 80,
    overscan: 6,
    directDomUpdates: true,
    // Runs after the virtualizer reads each scroll event. React's onScroll
    // runs before it, so isAtEnd() there still sees the previous position.
    onChange: (instance) => setAtEnd(instance.isAtEnd()),
  })

  // Start at the latest message, and jump to it again after each send, like
  // most chat apps. Assistant output follows only when the reader is already
  // at the latest message (followOnAppend).
  const lastUserMessageId = [...messages]
    .reverse()
    .find((message) => message.author === 'user')?.id
  React.useLayoutEffect(() => {
    virtualizer.scrollToEnd()
  }, [lastUserMessageId, virtualizer])

  return (
    <div className="Pane">
      <div
        ref={parentRef}
        className="Messages"
        onScroll={(event) => {
          const { scrollTop } = event.currentTarget
          const movingUp = scrollTop < lastScrollTopRef.current
          lastScrollTopRef.current = scrollTop
          // Load only while scrolling up. Safari's rubber band reports
          // negative positions past the top; ignore them.
          if (movingUp && scrollTop >= 0 && scrollTop < 400) {
            onLoadOlder()
          }
        }}
      >
        <div
          ref={virtualizer.containerRef}
          style={{
            position: 'relative',
            width: '100%',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const message = messages[virtualItem.index]!

            return (
              <div
                key={virtualItem.key}
                ref={virtualizer.measureElement}
                data-index={virtualItem.index}
                className="MessageRow"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                }}
              >
                <MessageView message={message} />
              </div>
            )
          })}
        </div>
      </div>

      {loadingOlder && <div className="HistoryLoader">Loading older…</div>}
      {!atEnd && (
        <button
          type="button"
          className="JumpToLatest"
          aria-label="Jump to latest message"
          onClick={() => virtualizer.scrollToEnd({ behavior: 'smooth' })}
        >
          <Icon path={icons.down} />
        </button>
      )}
    </div>
  )
}
```

The rules from `src/index.css` that the scroll container depends on (`.Pane` is the positioned parent; `.Messages` must have a bounded height and scroll):

```css
.Pane {
  flex: 1;
  min-height: 0;
  position: relative;
}

.Messages {
  height: 100%;
  overflow: auto;
  overflow-anchor: none;
}

.MessageRow {
  padding: 0 16px;
}
```

## Notes

- `anchorTo: 'end'` plus `followOnAppend: true` keeps the view pinned to the newest message only while the reader is within `scrollEndThreshold` (80px) of the end; `directDomUpdates: true` is paired with `ref={virtualizer.containerRef}` on the inner container.
- `isAtEnd()` is read in `onChange` (after the virtualizer processes the scroll event) rather than in React's `onScroll`, which runs earlier and would see the previous position.
- `MessageView`, `Icon`, and `icons` are other components defined elsewhere in the official `main.tsx` and are not reproduced here. The example does not call `cancelScroll`.
- The data layer (`queries.ts` / `api.ts`) uses `@tanstack/react-query` `useInfiniteQuery` (`fetchPreviousPage` drives `onLoadOlder`); that belongs to the tanstack-query skill and is not transcribed. Pinned to the `@tanstack/react-virtual@3.14.21` tag.
- Full stylesheet: `examples/react/chat/src/index.css` (the `.Pane` is nested in the example's `.Main` flex column; sidebar, composer, and message-bubble styling omitted here).
