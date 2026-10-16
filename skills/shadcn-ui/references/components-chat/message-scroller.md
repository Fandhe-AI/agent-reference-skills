---
source: https://ui.shadcn.com/docs/components/base/message-scroller
---

# Message Scroller

A chat scroll container that anchors turns, opens saved transcripts, follows streamed responses, loads history without jumping, and jumps to any message. Scoped to the scroll viewport: it does not own messages, AI state, transport, persistence, branching, or model state.

## Signature / Usage

```bash
npx shadcn@latest add message-scroller
```

Manual install: `npm install @shadcn/react`, then copy the component source into `components/ui/message-scroller.tsx` and update the import paths.

```tsx
import { Message } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
```

```tsx
<MessageScrollerProvider>
  <MessageScroller>
    <MessageScrollerViewport>
      <MessageScrollerContent>
        {messages.map((message) => (
          <MessageScrollerItem
            key={message.id}
            messageId={message.id}
            scrollAnchor={message.role === "user"}
          >
            <Message />
          </MessageScrollerItem>
        ))}
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>
```

`MessageScroller` fills its parent, so place it inside a height-constrained container:

```tsx
<div className="flex h-screen flex-col">
  <MessageScrollerProvider>
    <MessageScroller className="flex-1">{/* transcript */}</MessageScroller>
  </MessageScrollerProvider>
</div>
```

Parts:

- `MessageScrollerProvider`: the headless root. Owns scroll state and the behavior props for opening position, auto-scroll, anchoring, scroll commands, and visibility tracking.
- `MessageScroller`: the styled frame. Lays out the viewport, content, and controls inside the provider.
- `MessageScrollerViewport`: the scrollable element. Receives native scroll events and preserves the visible row when older messages are prepended.
- `MessageScrollerContent`: the transcript container. Holds the rows and provides the live-region defaults for new messages.
- `MessageScrollerItem`: the transcript row boundary. Wrap every direct child of the content so the scroller can measure, anchor, preserve position, track visibility, and jump to it. An item can be a message, marker, typing indicator, separator, join/leave event, or "load earlier" row.
- `MessageScrollerButton`: the scroll control. Scrolls to the start or end of the transcript and is inert until there is content in its direction.

Behavior examples:

```tsx
// Anchor a turn: the viewport moves it near the top, keeping a peek of the previous item.
<MessageScrollerItem messageId={message.id} scrollAnchor={message.role === "user"} />

// Keep 64px of the previous turn visible above the newly anchored row.
<MessageScrollerProvider scrollPreviousItemPeek={64}>

// Follow the live edge while a reply streams.
<MessageScrollerProvider autoScroll>

// Reopen a saved thread at the last anchored turn.
<MessageScrollerProvider defaultScrollPosition="last-anchor">
```

Hooks (imported from `@/components/ui/message-scroller`):

```tsx
const { scrollToMessage, scrollToEnd, scrollToStart } = useMessageScroller()
const { currentAnchorId, visibleMessageIds } = useMessageScrollerVisibility()
const { start, end } = useMessageScrollerScrollable()
```

## Options / Props

The props, data attributes, and hooks for every part are documented on the `@shadcn/react` Message Scroller page (https://ui.shadcn.com/docs/react/message-scroller#api-reference) and are identical for the styled component and the unstyled parts. Props that appear in the styled page's text and examples:

| Name | Type | Description |
| --- | --- | --- |
| `MessageScrollerProvider` `autoScroll` | `boolean` | Follow the live edge while a reply streams; releases when the reader scrolls away. |
| `MessageScrollerProvider` `defaultScrollPosition` | `"start" \| "end" \| "last-anchor"` | Where a saved transcript opens. `"last-anchor"` is keyed on `scrollAnchor`, not role; falls back to `"end"` if no anchor exists or the last anchored turn already fits. |
| `MessageScrollerProvider` `scrollPreviousItemPeek` | `number` | Pixels of the previous item kept visible above a newly anchored row. |
| `MessageScrollerProvider` `scrollMargin` | `number` | Scroll margin used in the examples (value `24`). Semantics are on the `@shadcn/react` page. |
| `MessageScrollerViewport` `preserveScrollOnPrepend` | `boolean` | Preserves the visible row when older rows are prepended; enabled by default. |
| `MessageScrollerItem` `messageId` | `string` | Identifier used to jump to the row (`scrollToMessage`) and track visibility. |
| `MessageScrollerItem` `scrollAnchor` | `boolean` | Marks the row as the start of a turn. |

## Notes

- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- Same name, different layer: this page is the styled copy-in wrapper; the unstyled behavior comes from the `@shadcn/react` package, documented in the packages category (react-message-scroller).
- Scrolling away from the live edge (wheel, touch, keyboard scroll keys, dragging the scrollbar) or an explicit message jump releases auto-scroll. `scrollToEnd` or pressing `MessageScrollerButton` re-engages it when `autoScroll` is enabled. The root and viewport expose `data-autoscrolling` during that programmatic scroll.
- Anchoring is independent of message role: a user message, a system marker, a handoff event, or any row can be an anchor. Typing indicators and history controls usually should not anchor.
- Scroll state is tracked imperatively and mirrored onto the root and viewport through `data-*` attributes, so scrolling and streaming do not rerender transcript rows. The styled `MessageScrollerItem` ships `content-visibility: auto` and `contain-intrinsic-size`. For styling prefer the `data-scrollable` attribute.
- With `defaultScrollPosition` of `"end"` or `"last-anchor"`, the viewport has `data-pending-scroll` until that position is applied and the styled viewport stays hidden meanwhile. For `"end"` with server-rendered messages, an inline script after the viewport can scroll it to the bottom and remove `data-pending-scroll`; do not use it with `"last-anchor"` (give the viewport an `id`, add `suppressHydrationWarning`, pass a `nonce` under CSP).
- Virtualization is intentionally left outside the primitive: use `MessageScrollerViewport` as the scroll element and let a virtualizer (the official example uses `useVirtualizer` from `@tanstack/react-virtual`; see skill tanstack-virtual) own the rows.
- Accessibility: `MessageScrollerViewport` is a keyboard-focusable region (`role="region"`, `aria-label="Messages"`, `tabIndex={0}`). `MessageScrollerContent` sets `role="log"` and `aria-relevant="additions"`; pass `aria-busy` while a turn streams. `MessageScrollerButton` is a real button that sets `inert`, `tabIndex={-1}` and `data-active="false"` when nothing is left to scroll toward.
- A new `MessageScrollerItem` can be animated by wrapping it, for example `motion.create(MessageScrollerItem)`; keep `messageId` and `scrollAnchor` on it.
- Radix and React Aria variants exist at https://ui.shadcn.com/docs/components/radix/message-scroller and https://ui.shadcn.com/docs/components/aria/message-scroller.

## Related

- [message.md](./message.md)
- [marker.md](./marker.md)
- [questionnaire.md](./questionnaire.md)
