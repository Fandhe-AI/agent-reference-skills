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

### Responsive layouts (`Fit.Layout`)

Set `fit: Fit.Layout` and the artboard resizes to the canvas when `resizeDrawingSurfaceToCanvas()` is called. Optionally set `layoutScaleFactor`. Call `resizeDrawingSurfaceToCanvas()` again on `window.onresize` and on device pixel ratio changes (e.g. dragging between monitors).

```ts
const r = new Rive({
  src: "your-rive-file.riv",
  autoplay: true,
  canvas: riveCanvas,
  layout: new Layout({ fit: Fit.Layout /*, layoutScaleFactor: 2 */ }),
  stateMachine: "State Machine 1",
  onLoad: () => computeSize(),
});

function computeSize() {
  r.resizeDrawingSurfaceToCanvas();
}
window.onresize = computeSize;
window
  .matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
  .addEventListener("change", computeSize);
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
| `layoutScaleFactor` | `number` | — | Multiplies the scale of the content; only applies when `fit` is `Fit.Layout` |
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

### TypeScript API surface

Exported from `@rive-app/canvas` (or the bundled `rive` global):

```ts
export interface LayoutParameters {
  fit?: Fit; alignment?: Alignment; layoutScaleFactor?: number;
  minX?: number; minY?: number; maxX?: number; maxY?: number;
}
export class Layout {
  constructor(params?: LayoutParameters);
  readonly fit: Fit; readonly alignment: Alignment; readonly layoutScaleFactor: number;
  readonly minX: number; readonly minY: number; readonly maxX: number; readonly maxY: number;
  copyWith(partial: LayoutParameters): Layout;
}
```

## Notes

- `Alignment` has no effect when `fit` is `Fit.Layout`.
- When providing explicit `minX/minY/maxX/maxY` bounds, they override alignment positioning.
- Call `r.resizeToCanvas()` after canvas resize to update the layout bounds.
- Bounds (`minX`, `minY`, `maxX`, `maxY`) are relative to the container and all four must be provided.
- Update the layout later with `r.layout = new Layout({ fit: Fit.Fill })`; treat `Layout` as immutable (`copyWith(partial)` returns a new one).
- The media query in the official responsive snippet is bound to the initial `devicePixelRatio`, so it fires only once on a change away from that value; to keep tracking successive DPR changes, remove the listener in the handler and re-register `matchMedia` with the current `window.devicePixelRatio`.

## Related

- [rive-constructor.md](./rive-constructor.md)
- [packages.md](./packages.md)
