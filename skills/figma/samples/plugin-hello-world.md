# Plugin Hello World

Minimal three-file plugin: manifest, sandboxed logic, and UI — inserts a rectangle and shows a modal.

```json
// manifest.json
{
  "name": "Hello World",
  "id": "",
  "api": "1.0.0",
  "editorType": ["figma"],
  "documentAccess": "dynamic-page",
  "main": "code.js",
  "ui": "ui.html"
}
```

```typescript
// code.ts  (compiled to code.js via tsc / esbuild)
figma.showUI(__html__, { width: 240, height: 120 });

figma.ui.onmessage = (msg) => {
  if (msg.type === "create-rect") {
    const rect = figma.createRectangle();
    rect.x = 0;
    rect.y = 0;
    rect.resize(100, 100);
    rect.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.6, b: 1 } }];
    figma.currentPage.appendChild(rect);
    figma.viewport.scrollAndZoomIntoView([rect]);
  }
  figma.closePlugin();
};
```

```html
<!-- ui.html -->
<button id="create">Create Rectangle</button>
<script>
  document.getElementById("create").onclick = () =>
    parent.postMessage({ pluginMessage: { type: "create-rect" } }, "*");
</script>
```

## Notes

- `figma.showUI(__html__)` renders `ui.html` as an iframe; communication is via `postMessage` / `figma.ui.onmessage`.
- `documentAccess: "dynamic-page"` is required for all new plugins; it disables deprecated synchronous APIs.
- Leave `id` blank during local development; Figma assigns it when you register the plugin.
- `figma.closePlugin()` must be called to terminate the plugin after work is done.
