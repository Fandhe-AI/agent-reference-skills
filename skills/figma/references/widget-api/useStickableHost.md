# useStickableHost

Registers a callback that fires when stickable objects (e.g., stamps) are attached to or detached from the widget. **FigJam only.**

## Signature / Usage

```typescript
useStickableHost(
  onAttachmentsChanged?: (e: WidgetAttachedStickablesChangedEvent) => void | Promise<void>
): void
```

```tsx
// Count stamps attached to this widget by name
useStickableHost((e) => {
  const counts: Record<string, number> = {}
  for (const node of e.stuckNodes) {
    if (node.type === "STAMP") {
      counts[node.name] = (counts[node.name] ?? 0) + 1
    }
  }
  setStampCounts(counts)
})
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `onAttachmentsChanged` | `(e: WidgetAttachedStickablesChangedEvent) => void \| Promise<void>` | Optional callback fired on attach/detach |

`WidgetAttachedStickablesChangedEvent` fields:

| Field | Type | Description |
|-------|------|-------------|
| `stuckNodes` | `SceneNode[]` | All nodes currently stuck to the widget |

## Notes

- **FigJam only.**
- All widgets are stickable hosts by default — calling `useStickableHost` without a callback changes nothing functionally. It is needed only to react to attach/detach events.
- Only **stickable** objects can attach to the widget (not arbitrary nodes).
- Do not call both `useStickable` and `useStickableHost` in the same widget render.

## Related

- [useStickable](./useStickable.md)
- [figma-figjam-widgets](./figma-figjam-widgets.md)
