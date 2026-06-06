# Using the Plugin API

Widgets can access the Figma Plugin API inside event handlers and hooks to read or manipulate the canvas, open iframes, and handle messages.

## Signature / Usage

```tsx
const widgetId = useWidgetId()

<AutoLayout onClick={async () => {
  // Plugin API is available in event handlers
  const widget = figma.getNodeById(widgetId) as WidgetNode
  const selection = figma.currentPage.selection

  // Open an iframe for complex input
  figma.showUI(__html__, { width: 400, height: 300 })
  const result = await new Promise<string>(resolve => {
    figma.ui.once("message", resolve)
  })
  setData(result)
  figma.closePlugin()
}}>
  <Text>Open UI</Text>
</AutoLayout>
```

## Notes

- **Widget API** describes what appears on the canvas (JSX); **Plugin API** manipulates the canvas.
- Plugin API can only be called in **event handlers** and **`useEffect`** — not inside rendering code.
- The available Plugin API objects, nodes, and functions depend on `editorType` in `manifest.json`.
- `figma.showUI` opens an HTML iframe (specified via `ui` in the manifest) for collecting complex input.
- `figma.ui.on("message", ...)` / `figma.ui.postMessage(...)` communicate between widget code and the iframe.
- When setting up listeners with `figma.on(...)`, always clean them up in the `useEffect` return function.

## Related

- [useEffect](./useEffect.md)
- [useWidgetId](./useWidgetId.md)
- [handling-user-events](./handling-user-events.md)
- [how-widgets-run](./how-widgets-run.md)
