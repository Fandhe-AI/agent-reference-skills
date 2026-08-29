---
source: https://tanstack.com/virtual/latest/docs/chat
---

# Chat Virtualization Guide

Guide for virtualizing chat-style interfaces: new messages append at the bottom, older history is prepended at the top, and the viewport should only auto-follow when the user is already viewing the latest content ("end anchoring").

## Signature / Usage

```tsx
const virtualizer = useVirtualizer({
  count: messages.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 72,
  getItemKey: (index) => messages[index]!.id,
  anchorTo: 'end',
  followOnAppend: true,
  scrollEndThreshold: 80,
  overscan: 6,
})

// After the scroll element mounts, show the latest messages first
virtualizer.scrollToEnd()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `anchorTo` | `'end'` | Anchors the viewport to the end so prepending older items keeps currently visible messages visually stable |
| `followOnAppend` | `boolean` | Keeps new messages in view only when the user is already at the bottom |
| `scrollEndThreshold` | `number` | Pixel distance from the end that still counts as "at the end" for `followOnAppend` / `isAtEnd()` |
| `getItemKey` | `(index: number) => Key` | Must return a stable message id, never the array index — prepending shifts all indices |

## Notes

- Call `scrollToEnd()` right after the scroll element mounts to land on the latest messages.
- `anchorTo: 'end'` requires stable `getItemKey` values; using indices breaks scroll-position stability when prepending.
- Growing message content (streaming) pins to the bottom automatically through normal dynamic measurement — no special handling needed.
- Use `isAtEnd()` to conditionally show a "jump to latest" button when the user has scrolled up into history.
- Use a normal, non-reversed scroll container; no manual scroll compensation is needed beyond the above options.

## Related

- [Introduction](./introduction.md)
- [React Virtual](./react-virtual.md)
- [Text Measurement with Pretext](./pretext.md)
