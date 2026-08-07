# Path

A mutable drawing object built from move/line/curve commands, rendered with `Renderer:drawPath(path, paint)`.

## Signature / Usage

```lua
local path = Path.new()
path:moveTo(Vector.xy(-10, -10))
path:lineTo(Vector.xy(10, -10))
path:quadTo(Vector.xy(15, 0), Vector.xy(10, 10))
path:cubicTo(Vector.xy(5, 15), Vector.xy(-5, 15), Vector.xy(-10, 10))
path:close()

function draw(self: MyNode, renderer: Renderer)
  renderer:drawPath(path, self.paint)
end
```

## Options / Props

| Member | Description |
| --- | --- |
| `Path.new() -> Path` | Constructor |
| `moveTo(to: Vector)` | Repositions the current point, starts a new contour |
| `lineTo(to: Vector)` | Straight line segment to `to` |
| `quadTo(control: Vector, to: Vector)` | Quadratic Bézier curve |
| `cubicTo(controlOut: Vector, controlIn: Vector, to: Vector)` | Cubic Bézier curve |
| `close()` | Completes the contour, connecting back to the last `moveTo` |
| `__len() -> number` | Total number of commands in the path |
| `reset()` | Clears all path data; only call on the frame after a `Renderer:drawPath` |
| `add(other: PathData, transform: Mat2D?)` | Merges another path's commands, optionally transformed |
| `contours() -> ContourMeasure?` | Measurement data for the first contour; iterate via `.next` |
| `measure() -> PathMeasure` | Measurement data spanning the whole path |

## Notes

- Path mutations (`moveTo`/`lineTo`/`cubicTo`/etc.) require waiting until the next frame before redrawing takes effect.

## Related

- [path-measure.md](./path-measure.md)
- [paint.md](./paint.md)
- [renderer.md](./renderer.md)
- [mat2d.md](./mat2d.md)
