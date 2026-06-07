# Layout

The `Layout` configuration controls how a Rive artboard is scaled and positioned within its host container. It defines the **Fit** mode (scaling strategy) and **Alignment** (anchor position), and optionally constrains the drawing region.

## Signature / Usage

```typescript
import { Rive, Layout, Fit, Alignment } from "@rive-app/canvas";

const r = new Rive({
  src: "animation.riv",
  canvas: document.getElementById("canvas"),
  layout: new Layout({
    fit: Fit.Contain,            // default
    alignment: Alignment.Center, // default
    layoutScaleFactor: 1,        // optional scale multiplier (used with Fit.Layout)
    minX: 0,                     // optional bounds for partial rendering
    minY: 0,
    maxX: 0,
    maxY: 0,
  }),
  autoplay: true,
});

// Update layout responsively
window.addEventListener("resize", () => {
  r.layout = new Layout({ fit: Fit.Cover, alignment: Alignment.TopCenter });
  r.resizeDrawingSurfaceToCanvas();
});
```

## Options / Props

### Fit Modes

| Value | Description |
| --- | --- |
| `Fit.Contain` | (default) Preserves aspect ratio; scales so the artboard's **larger** dimension fills its container dimension |
| `Fit.Cover` | Preserves aspect ratio; scales so the artboard's **smaller** dimension fills its container dimension (may clip) |
| `Fit.Fill` | Stretches to fill the container; aspect ratio not preserved |
| `Fit.FitWidth` | Preserves aspect ratio; scales artboard width to match container width |
| `Fit.FitHeight` | Preserves aspect ratio; scales artboard height to match container height |
| `Fit.None` | No scaling; artboard renders at its original design size (may clip or leave space) |
| `Fit.ScaleDown` | Like Contain, but only scales down — never scales up beyond original size |
| `Fit.Layout` | Uses the Rive layout engine for responsive artboard layout; artboard dimensions match the container |

### Alignment Options

| Value | Description |
| --- | --- |
| `Alignment.TopLeft` | Anchor top-left |
| `Alignment.TopCenter` | Anchor top-center |
| `Alignment.TopRight` | Anchor top-right |
| `Alignment.CenterLeft` | Anchor center-left |
| `Alignment.Center` | (default) Anchor center |
| `Alignment.CenterRight` | Anchor center-right |
| `Alignment.BottomLeft` | Anchor bottom-left |
| `Alignment.BottomCenter` | Anchor bottom-center |
| `Alignment.BottomRight` | Anchor bottom-right |

### Layout Class Constructor

| Parameter | Type | Description |
| --- | --- | --- |
| `fit` | `Fit` | Scaling strategy |
| `alignment` | `Alignment` | Anchor position within the container |
| `layoutScaleFactor` | `number` | Scale multiplier applied when using `Fit.Layout` |
| `minX`, `minY` | `number` | Top-left corner of optional drawing bounds |
| `maxX`, `maxY` | `number` | Bottom-right corner of optional drawing bounds |

## Notes

- Alignment has no effect for `Fit.Fill` and `Fit.Layout`, since those modes expand the artboard to match the container exactly.
- For responsive layouts: set `fit` to `Fit.Layout`, configure artboard constraints in the editor, then call `resizeDrawingSurfaceToCanvas()` on window resize events (and on device pixel ratio changes).
- The `layout` property on a live Rive instance is a getter/setter — assign a new `Layout` object to update it without recreating the instance.
- Layout in the editor (Row/Column-based positioning of child objects) is a separate concept from the runtime `Layout` class described here; the editor layout system controls intra-artboard element positioning.

## Related

- [State Machine](./state-machine.md)
