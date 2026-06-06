# useStickable

Makes the widget stick to other canvas nodes when dragged over them, mimicking FigJam stamp behavior. **FigJam only.**

## Signature / Usage

```typescript
useStickable(
  onStuckStatusChanged?: (e: WidgetStuckEvent) => void | Promise<void>
): void
```

```tsx
// Basic — enable sticking with no callback
useStickable()

// With callback — respond when the widget sticks or unsticks
useStickable((e) => {
  if (e.newHostId) {
    const host = figma.getNodeById(e.newHostId)
    setLabel(host?.type ?? "none")
  }
})
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `onStuckStatusChanged` | `(e: WidgetStuckEvent) => void \| Promise<void>` | Optional callback fired when the widget sticks to or detaches from a node |

`WidgetStuckEvent` fields:

| Field | Type | Description |
|-------|------|-------------|
| `newHostId` | `string \| null` | ID of the node the widget stuck to; `null` if detached |

## Notes

- **FigJam only** — has no effect in Figma design files.
- A node is either a stickable **or** a stickable host — never both. Do not call `useStickable` and `useStickableHost` in the same render.
- All widgets are stickable hosts by default; calling `useStickable` overrides that and makes the widget a stickable instead.

## Related

- [useStickableHost](./useStickableHost.md)
- [figma-figjam-widgets](./figma-figjam-widgets.md)
