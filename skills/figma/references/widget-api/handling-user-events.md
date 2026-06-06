# Handling User Events

How widgets respond to user interactions: click events, text editing, property menus, and async operations.

## Signature / Usage

```tsx
// onClick with positional info
<AutoLayout
  onClick={(e) => {
    console.log(e.offsetX, e.offsetY)     // relative to component
    console.log(e.canvasX, e.canvasY)     // canvas coordinates
    setCount(c => c + 1)
  }}
>
  <Text>Click me</Text>
</AutoLayout>

// Async handler — widget stays alive until promise resolves
<AutoLayout
  onClick={async () => {
    await fetchAndUpdate()
  }}
>
  <Text>Fetch</Text>
</AutoLayout>
```

## Options / Props

`WidgetClickEvent` fields:

| Field | Type | Description |
|-------|------|-------------|
| `offsetX` | `number` | X position relative to the clicked component |
| `offsetY` | `number` | Y position relative to the clicked component |
| `canvasX` | `number` | X position on the canvas |
| `canvasY` | `number` | Y position on the canvas |

## Notes

- Only `click` events are supported on widget nodes; there is no hover/focus event on nodes (use `hoverStyle` for visual hover feedback).
- Click handlers can be sync or async; returning a `Promise` keeps the widget process alive until resolution.
- For text input events, use the `Input` component's `onTextEditEnd` callback.
- Open iframes (`figma.showUI`) inside async handlers to collect complex user input.
- Use `usePropertyMenu` for secondary actions (settings, formatting) rather than inline widget controls.

## Related

- [Input](./Input.md)
- [usePropertyMenu](./usePropertyMenu.md)
- [AutoLayout](./AutoLayout.md)
- [using-the-plugin-api](./using-the-plugin-api.md)
