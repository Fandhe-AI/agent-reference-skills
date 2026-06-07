# Layout / Fit / Alignment

Controls how Rive content is scaled and positioned within the canvas.

## Signature / Usage

```ts
import { Rive, Layout, Fit, Alignment } from "@rive-app/webgl2";

const r = new Rive({
  src: "vehicles.riv",
  canvas: document.getElementById("canvas") as HTMLCanvasElement,
  layout: new Layout({
    fit: Fit.Cover,
    alignment: Alignment.TopCenter,
  }),
  autoplay: true,
});
```

## Options / Props

### Layout constructor

```ts
new Layout(params?: LayoutParameters)
```

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fit` | `Fit` | `Fit.Contain` | How the artboard scales inside the canvas |
| `alignment` | `Alignment` | `Alignment.Center` | Where the artboard is positioned when it doesn't fill the canvas |
| `minX` | `number` | — | Override left bound (relative to canvas) |
| `minY` | `number` | — | Override top bound |
| `maxX` | `number` | — | Override right bound |
| `maxY` | `number` | — | Override bottom bound |

### Fit enum values

| Value | Description |
|-------|-------------|
| `Fit.Layout` | Apply the Rive layout engine; artboard fills container (artboard must use layouts) |
| `Fit.Contain` | Preserve aspect ratio; scale so the larger dimension matches the container (default) |
| `Fit.Cover` | Preserve aspect ratio; scale so the smaller dimension matches the container (may clip) |
| `Fit.Fill` | Stretch to fill container; aspect ratio not preserved |
| `Fit.FitWidth` | Scale to match container width; preserve aspect ratio |
| `Fit.FitHeight` | Scale to match container height; preserve aspect ratio |
| `Fit.ScaleDown` | Like `Contain` when artboard is larger than container; otherwise use original size |
| `Fit.None` | Use original artboard dimensions; no scaling |

### Alignment enum values

| Value | Description |
|-------|-------------|
| `Alignment.TopLeft` | Top-left corner |
| `Alignment.TopCenter` | Top-center |
| `Alignment.TopRight` | Top-right corner |
| `Alignment.CenterLeft` | Middle-left |
| `Alignment.Center` | Center (default) |
| `Alignment.CenterRight` | Middle-right |
| `Alignment.BottomLeft` | Bottom-left corner |
| `Alignment.BottomCenter` | Bottom-center |
| `Alignment.BottomRight` | Bottom-right corner |

## Notes

- `Alignment` has no effect when `fit` is `Fit.Layout`.
- When providing explicit `minX/minY/maxX/maxY` bounds, they override alignment positioning.
- Call `r.resizeToCanvas()` after canvas resize to update the layout bounds.

## Related

- [rive-constructor.md](./rive-constructor.md)
- [packages.md](./packages.md)
