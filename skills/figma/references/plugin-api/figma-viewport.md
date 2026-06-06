# figma.viewport

Sub-API for reading and controlling the visible canvas area — scroll position, zoom level, and view bounds.

## Signature / Usage

```ts
// Pan to center on a node
figma.viewport.scrollAndZoomIntoView([node]);

// Read current state
console.log(figma.viewport.center); // { x: 0, y: 0 }
console.log(figma.viewport.zoom);   // 1.0 = 100%

// Set zoom and center
figma.viewport.zoom = 2;
figma.viewport.center = { x: 100, y: 200 };
```

## Options / Props

### Properties

| Name | Type | Description |
|------|------|-------------|
| `center` | `Vector` (read/write) | Center point of the visible canvas area |
| `zoom` | `number` (read/write) | Zoom level — `1.0` = 100%, `0.5` = 50% |
| `bounds` | `Rect` (readonly) | Full bounds of the visible viewport on the canvas |
| `slidesView` | `'grid' \| 'single-slide'` | Slide layout mode (Figma Slides only) |
| `canvasView` | `'grid' \| 'single-asset'` | Canvas layout mode (Slides and Buzz only) |

### Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `scrollAndZoomIntoView()` | `(nodes: ReadonlyArray<BaseNode>) => void` | Pan and zoom so all provided nodes are visible (equivalent to Shift+1) |

## Notes

- `bounds` is computed from `center` and `zoom`; it reflects exactly what is on-screen.
- `scrollAndZoomIntoView()` does not animate; the viewport snaps immediately.

## Related

- [figma global object](./figma-global.md)
