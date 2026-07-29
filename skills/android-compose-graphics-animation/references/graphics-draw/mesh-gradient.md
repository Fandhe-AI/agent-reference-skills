# MeshGradient / MeshGradientPainter

`MeshGradientPainter` renders a mesh gradient: a grid of vertices, each with its own color and optional Bezier control points, interpolated into cubic Bézier patches. It is a distinct primitive from `Brush.linearGradient`/`radialGradient`/`sweepGradient` — colors vary per vertex across a 2D grid rather than along a line, circle, or sweep.

## Signature / Usage

```kotlin
class MeshGradientPainter(rows: Int, columns: Int, block: MeshGradientPainter.() -> Unit) : Painter

fun MeshGradientPainter.setVertex(
    row: Int,
    column: Int,
    position: Offset,
    color: Color,
    rightControlPoint: Offset = Offset.Unspecified,
    bottomControlPoint: Offset = Offset.Unspecified,
    topControlPoint: Offset = Offset.Unspecified,
    leftControlPoint: Offset = Offset.Unspecified,
)

var MeshGradientPainter.hasBicubicColor: Boolean
```

```kotlin
val gradientPainter = remember {
    MeshGradientPainter(rows = 1, columns = 1) {
        setVertex(0, 0, Offset(0f, 0f), Color.Red)     // top-left
        setVertex(0, 1, Offset(1f, 0f), Color.Blue)    // top-right
        setVertex(1, 0, Offset(0f, 1f), Color.Green)   // bottom-left
        setVertex(1, 1, Offset(1f, 1f), Color.Yellow)  // bottom-right
    }
}

Box(
    modifier = Modifier
        .aspectRatio(16 / 9f)
        .fillMaxWidth()
        .paint(gradientPainter),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `rows` / `columns` | `Int` | — | Grid size; a mesh with `rows` × `columns` cells has `(rows+1) × (columns+1)` vertices to set. |
| `block` | `MeshGradientPainter.() -> Unit` | — | Lambda where every vertex is configured via `setVertex`; runs inside `DrawScope`, so it can read mutable/animated state. |
| `row` / `column` | `Int` | — | Vertex index in the grid, `0` to `rows`/`columns` inclusive. |
| `position` | `Offset` | — | Normalized coordinate: `(0f, 0f)` is top-left, `(1f, 1f)` is bottom-right. |
| `color` | `Color` | — | Color at this vertex. |
| `rightControlPoint` / `bottomControlPoint` / `topControlPoint` / `leftControlPoint` | `Offset` | `Offset.Unspecified` | Bezier tangent handles relative to the vertex; `Offset.Unspecified` auto-infers a smooth curve, `Offset.Zero` forces a sharp (non-inferred) boundary. |
| `hasBicubicColor` | `Boolean` | `false` | `true` uses Catmull-Rom color interpolation between vertices (smoother color shifts); `false` uses bilinear interpolation. |

## Notes

- Each 2×2 block of adjacent vertices forms one cubic Bézier patch; a 3×3 mesh (`rows = 3, columns = 3`) has 16 vertices forming 9 patches.
- Because `block` executes inside `DrawScope`, positions or colors can be driven by animated state (e.g. `rememberInfiniteTransition`) without reallocating shaders or bitmaps.
- Applied like any other `Painter`, typically via `Modifier.paint(gradientPainter)`.
- Package: `androidx.compose.ui.graphics`.

## Related

- [Brush](./brush.md)
- [DrawScope](./draw-scope.md)
