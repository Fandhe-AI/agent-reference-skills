---
source: https://ui.shadcn.com/docs/react/message-scroller
---

# Message Scroller (@shadcn/react)

`MessageScroller` ships as a headless primitive in the `@shadcn/react` package. The package owns all scroll behavior (anchoring turns, following streamed output, preserving the reader's place as history loads, tracking visibility) and renders no styles of its own.

## Signature / Usage

```bash
npm install @shadcn/react
```

```tsx
import {
  MessageScroller,
  useMessageScroller,
} from "@shadcn/react/message-scroller"
```

The package exports a namespace object instead of flat components.

```tsx
<MessageScroller.Provider>
  <MessageScroller.Root>
    <MessageScroller.Viewport>
      <MessageScroller.Content>
        {messages.map((message) => (
          <MessageScroller.Item
            key={message.id}
            messageId={message.id}
            scrollAnchor={message.role === "user"}
          >
            {/* your message UI */}
          </MessageScroller.Item>
        ))}
      </MessageScroller.Content>
    </MessageScroller.Viewport>
    <MessageScroller.Button />
  </MessageScroller.Root>
</MessageScroller.Provider>
```

Flat styled parts map to the namespace object:

| Styled component | Unstyled part |
| --- | --- |
| `MessageScrollerProvider` | `MessageScroller.Provider` |
| `MessageScroller` | `MessageScroller.Root` |
| `MessageScrollerViewport` | `MessageScroller.Viewport` |
| `MessageScrollerContent` | `MessageScroller.Content` |
| `MessageScrollerItem` | `MessageScroller.Item` |
| `MessageScrollerButton` | `MessageScroller.Button` |

Hooks are imported the same way and read from `MessageScroller.Provider`:

```tsx
import {
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "@shadcn/react/message-scroller"
```

## Options / Props

### MessageScroller.Provider

Headless root. Owns scroll state and behavior props; renders no DOM.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `autoScroll` | `boolean` | `false` | Follow new content only while the reader is already at the live edge. Wheel, touch, keyboard scroll, and explicit jumps release it. |
| `defaultScrollPosition` | `"start" \| "end" \| "last-anchor"` | `"end"` | Opening position on the first non-empty render, applied once. `"last-anchor"` opens at the last `scrollAnchor` row and falls back to `"end"` when the turn fits or no anchor exists. For `"end"` and `"last-anchor"`, the viewport has `data-pending-scroll` until the position is applied. |
| `scrollEdgeThreshold` | `number` | `8` | Distance from either edge that still counts as being at the start or end. Controls state attributes and scroll button visibility. |
| `scrollMargin` | `number` | `0` | Margin applied to the aligned edge for `scrollToMessage`, visibility, and programmatic targets. |
| `scrollPreviousItemPeek` | `number` | `64` | Extra margin added to `scrollMargin` when a newly appended `scrollAnchor` item is positioned so part of the previous item stays visible. |

### MessageScroller.Root

Frame and layout container. Fills its parent, so use it in a height-constrained layout, within a `Provider`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | `React.ComponentProps<"div">` | - | Props spread to the frame element. |

Root and Viewport both carry these scroll-state data attributes:

| Data attribute | Value | Description |
| --- | --- | --- |
| `data-scrollable` | `"start"` \| `"end"` \| `"start end"` \| _absent_ | Edges the viewport can scroll toward. Query one with `[data-scrollable~="end"]`; absent means it fits. |
| `data-autoscrolling` | present | Present while the viewport is programmatically scrolling to the latest message. |
| `data-pending-scroll` | present | Present until `defaultScrollPosition` (`"end"` or `"last-anchor"`) is applied, or skipped for an empty transcript. Hide the viewport while it is set. |

### MessageScroller.Viewport

The scrollable viewport.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `preserveScrollOnPrepend` | `boolean` | `true` | Keep the first visible message item stable when older rows are prepended. |
| `role` | `string` | `"region"` | Landmark role for the labelled scrollable transcript viewport. |
| `aria-label` | `string` | `"Messages"` | Accessible name for the scrollable chat transcript. |
| `tabIndex` | `number` | `0` | Makes the transcript viewport keyboard-scrollable. |
| `...props` | `React.ComponentProps<"div">` | - | Props spread to the viewport element. |

### MessageScroller.Content

Transcript content element. Every direct child should be a `MessageScroller.Item`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `role` | `string` | `"log"` | ARIA role applied to the message list for live announcements. |
| `aria-relevant` | `string` | `"additions"` | Live-region updates to announce. Defaults to new transcript rows only. |
| `aria-busy` | `boolean` | - | Marks the live region busy while a turn streams, if needed. |
| `spacerClassName` | `string` | - | Class name for the internal spacer used to make room for anchored rows. |
| `...props` | `React.ComponentProps<"div">` | - | Props spread to the content element. |

### MessageScroller.Item

One transcript row: a message, marker, typing row, separator, or load-more row.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `messageId` | `string` | - | Stable row id used by `scrollToMessage`, visibility, and prepend preservation. |
| `scrollAnchor` | `boolean` | `false` | Marks this row as a turn boundary that can anchor newly appended turns. |
| `...props` | `React.ComponentProps<"div">` | - | Props spread to the item element. |

Data attributes: `data-message-id` (mirrors `messageId` when provided), `data-scroll-anchor` (`"true"` \| `"false"`, mirrors `scrollAnchor`).

### MessageScroller.Button

Scrolls to the start or end of the transcript. Inert and removed from the tab order when there is nothing to scroll toward.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `behavior` | `ScrollBehavior` | `"smooth"` | Native scroll behavior used when the button scrolls to its target edge. |
| `direction` | `"start" \| "end"` | `"end"` | Transcript edge the button scrolls toward. |
| `children` | `React.ReactNode` | - | Custom button content. Defaults to the scroll icon and accessible label. |
| `render` | `React.ReactElement \| render function` | - | Custom render target. |
| `...props` | `React.ComponentProps<"button">` | - | Props spread to the button. |

Data attributes: `data-direction` (`"start"` \| `"end"`, mirrors `direction`), `data-active` (`"true"` \| `"false"`, whether this button can currently scroll).

### useMessageScroller

Imperative transcript controls.

| Method | Type | Description |
| --- | --- | --- |
| `scrollToMessage` | `(messageId: string, options?) => boolean` | Scroll to a mounted message id. |
| `scrollToEnd` | `(options?) => boolean` | Scroll to the latest message. |
| `scrollToStart` | `(options?) => boolean` | Scroll to the top. |

All commands return `false` when the command could not be applied. `scrollToStart` and `scrollToEnd` return `false` only when the viewport is not mounted yet. `scrollToMessage` returns `false` when the target is not mounted and cannot be queued.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `"start"` \| `"center"` \| `"end"` \| `"nearest"` | `"start"` | How a message target aligns in the viewport. |
| `behavior` | `ScrollBehavior` | `"auto"` | Native scroll behavior for the command. |
| `scrollMargin` | `number` | provider `scrollMargin` | Margin applied to the aligned edge for this command. |

### useMessageScrollerScrollable

Which edges the viewport can scroll toward, for sibling UI that needs the values in JavaScript. Prefer the `data-scrollable` attribute for styling the scroller itself.

| Value | Type | Description |
| --- | --- | --- |
| `start` | `boolean` | Whether the viewport can scroll toward the start. Content is hidden above (`!start` means at the top). |
| `end` | `boolean` | Whether the viewport can scroll toward the end. Content is hidden below (`!end` means at the bottom). Stays `false` while follow-output is keeping the reader at the live edge. |

### useMessageScrollerVisibility

Visibility state for outline, search, and active-turn UI. Subscribes separately from `useMessageScrollerScrollable`.

| Value | Type | Description |
| --- | --- | --- |
| `currentAnchorId` | `string \| null` | The current anchored turn, based on the last `scrollAnchor` item at or above the reading line. |
| `visibleMessageIds` | `string[]` | Message ids intersecting the viewport, in document order. |

## Notes

- Avoiding a flash on reload: a scroll container always opens at the top, so a server-rendered transcript jumps after hydration when `defaultScrollPosition` moves the view. Give the viewport an `id` and hide it while `data-pending-scroll` is present:

  ```css
  #messages[data-pending-scroll] {
    visibility: hidden;
  }
  ```

- For `"end"` visible on first paint, add an inline script right after the viewport (same `id`) that sets `scrollTop = scrollHeight` and removes `data-pending-scroll`; add `suppressHydrationWarning` on the viewport and a `nonce` under a Content Security Policy. Do not use this script with `"last-anchor"`, and skip it when messages load on the client.
- The `message-scroller.tsx` component in the registry is a thin wrapper that adds Tailwind classes on top of this package; the styled copy-in component is documented in `components-chat/message-scroller.md`. This page is the unstyled `@shadcn/react/message-scroller` npm package (flat `MessageScrollerViewport` vs namespaced `MessageScroller.Viewport`).
- This is an npm package (not copied into `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). It is a chat transcript scroll primitive, not an agent runtime; agent runtimes are in skills openai-agents / anthropic-agent-sdk.

## Related

- [Message Scroller (styled component)](../components-chat/message-scroller.md)
- [Questionnaire (@shadcn/react)](./react-questionnaire.md)
- [AI SDK helper](./helpers-ai-sdk.md)
