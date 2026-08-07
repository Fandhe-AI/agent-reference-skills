# PathMeasure / ContourMeasure / PathCommand / PathData / CommandType

Measurement and inspection types for [Path](./path.md) geometry. `PathData` is the indexed collection of `PathCommand`s (also `Path`'s base type, e.g. what a [Path Effect](./protocol-path-effect-scripts.md) receives); `PathMeasure` measures the whole path; `ContourMeasure` measures one contour (a `moveTo`-to-next-`moveTo` sequence).

## Signature / Usage

```lua
-- Iterate commands
local path = Path.new()
path:moveTo(Vector.xy(0, 0))
path:lineTo(Vector.xy(10, 0))
for i, command in ipairs(path) do
  print(i, command.type) -- 1 moveTo, 2 lineTo
end

-- Measure the whole path
local m = path:measure()
local pos, tangent = m:positionAndTangent(m.length / 2)

-- Walk contours
local contour = path:contours()
while contour do
  print(contour.length)
  contour = contour.next
end
```

## Options / Props

| Type | Member | Description |
| --- | --- | --- |
| `PathMeasure` | `length` | Total length across all contours |
| `PathMeasure` | `isClosed` | True only if the path has exactly one closed contour |
| `PathMeasure` | `positionAndTangent(distance) -> (Vector, Vector)` | Position and tangent at a distance (clamped to `[0, length]`) |
| `PathMeasure` | `warp(source: Vector) -> Vector` | Maps a point onto the path (`source.x` = distance, `source.y` = perpendicular offset) |
| `PathMeasure` | `extract(startDistance, endDistance, destination: Path, startWithMove: boolean?)` | Extracts a segment into `destination`; distances clamped to `[0, length]` |
| `ContourMeasure` | `next -> ContourMeasure?` | Next contour, or nil if this is the last (returned by `path:contours()`) |
| `PathCommand` | `type -> CommandType` | The command's type |
| `PathCommand` | `__len() -> number` | Point count: `moveTo`/`lineTo` = 1, `quadTo` = 2, `cubicTo` = 3, `close` = 0 |
| `PathData` | `__len() -> number` | Number of commands (`#pathData`) |
| `PathData` | `contours() -> ContourMeasure?` | First contour, or nil if none |
| `PathData` | `measure() -> PathMeasure` | Measurement across the whole path |
| `CommandType` (enum) | — | `none` (placeholder), `moveTo`, `lineTo`, `cubicTo`, `quadTo`, `close` |

## Related

- [path.md](./path.md)
- [protocol-path-effect-scripts.md](./protocol-path-effect-scripts.md)
