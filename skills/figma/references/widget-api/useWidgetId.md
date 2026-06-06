# useWidgetId

Returns the node ID of the current widget instance. Use it inside event handlers to reference the widget via the Plugin API.

## Signature / Usage

```typescript
useWidgetId(): string
```

```tsx
const widgetId = useWidgetId()

<AutoLayout onClick={async () => {
  const node = figma.getNodeById(widgetId) as WidgetNode
  // Inspect or modify the widget node
  console.log(node.widgetSyncedState)
}}>
  <Text>Inspect me</Text>
</AutoLayout>
```

## Notes

- The returned ID corresponds to a `WidgetNode` in the Plugin API; retrieve it with `figma.getNodeById(widgetId)`.
- Useful when building multi-widget interactions — combine with `figma.findWidgetNodesByWidgetId()` to enumerate all instances of the same widget.
- Must be called at the top level of the widget component (same rules as React hooks).

## Related

- [managing-multiple-widgets](./managing-multiple-widgets.md)
- [using-the-plugin-api](./using-the-plugin-api.md)
- [register](./register.md)
