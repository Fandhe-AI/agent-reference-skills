# RoundedPolygon / Morph / CornerRounding

`androidx.graphics.shapes` (a separate `androidx.graphics:graphics-shapes` library, not `androidx.compose.foundation.shape`) builds polygonal shapes with optional rounded corners (`RoundedPolygon`) and automatically morphs between two of them (`Morph`). It is distinct from the `Shape` interface used by `Modifier.clip`/`Modifier.background`; wrap the resulting `Path` in a custom `Shape` to use it there.

## Signature / Usage

```kotlin
class RoundedPolygon(
    numVertices: Int,
    radius: Float = 1f,
    centerX: Float = 0f,
    centerY: Float = 0f,
    rounding: CornerRounding = CornerRounding.Unrounded,
    perVertexRounding: List<CornerRounding>? = null,
)
// also: RoundedPolygon(vertices: FloatArray, rounding: CornerRounding = ..., perVertexRounding: List<CornerRounding>? = null, centerX: Float = ..., centerY: Float = ...)

fun RoundedPolygon.Companion.circle(numVertices: Int = 8, radius: Float = 1f, centerX: Float = 0f, centerY: Float = 0f): RoundedPolygon
fun RoundedPolygon.Companion.star(numVerticesPerRadius: Int, radius: Float = 1f, innerRadius: Float = 0.5f, rounding: CornerRounding = CornerRounding.Unrounded, innerRounding: CornerRounding? = null, centerX: Float = 0f, centerY: Float = 0f): RoundedPolygon
fun RoundedPolygon.Companion.rectangle(width: Float = 2f, height: Float = 2f, rounding: CornerRounding = CornerRounding.Unrounded, perVertexRounding: List<CornerRounding>? = null, centerX: Float = 0f, centerY: Float = 0f): RoundedPolygon
fun RoundedPolygon.Companion.pill(width: Float = 2f, height: Float = 1f, smoothing: Float = 0f, centerX: Float = 0f, centerY: Float = 0f): RoundedPolygon

data class CornerRounding(val radius: Float = 0f, val smoothing: Float = 0f)

class Morph(start: RoundedPolygon, end: RoundedPolygon) {
    fun toPath(progress: Float): Path
}
```

```kotlin
Box(
    modifier = Modifier
        .fillMaxSize()
        .drawWithCache {
            val triangle = RoundedPolygon(
                numVertices = 3,
                radius = size.minDimension / 2f,
                centerX = size.width / 2f,
                centerY = size.height / 2f,
                rounding = CornerRounding(size.minDimension / 10f, smoothing = 0.1f),
            )
            val square = RoundedPolygon(
                numVertices = 4,
                radius = size.minDimension / 2f,
                centerX = size.width / 2f,
                centerY = size.height / 2f,
            )
            val morph = Morph(start = triangle, end = square)
            val morphPath = morph.toPath(progress = 0.5f).asComposePath()

            onDrawBehind { drawPath(morphPath, color = Color.Black) }
        },
)
```

```kotlin
// Wrap a Morph as a clippable Shape
class MorphPolygonShape(private val morph: Morph, private val percentage: Float) : Shape {
    private val matrix = Matrix()
    override fun createOutline(size: Size, layoutDirection: LayoutDirection, density: Density): Outline {
        matrix.scale(size.width / 2f, size.height / 2f)
        matrix.translate(1f, 1f)
        val path = morph.toPath(progress = percentage).asComposePath()
        path.transform(matrix)
        return Outline.Generic(path)
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `numVertices` | `Int` | — | Number of points on the polygon. |
| `radius` | `Float` | `1f` | Distance from center to each exterior vertex. |
| `centerX` / `centerY` | `Float` | `0f` | Position of the shape's center. |
| `vertices` | `FloatArray` | — | Custom `x1, y1, x2, y2, ...` coordinates instead of a regular polygon. |
| `rounding` | `CornerRounding` | `CornerRounding.Unrounded` | Rounding applied uniformly to every corner. |
| `perVertexRounding` | `List<CornerRounding>?` | `null` | Independent rounding for each corner, overriding `rounding`. |
| `radius` (CornerRounding) | `Float` | `0f` | Radius of the circle used to round the vertex. |
| `smoothing` | `Float` | `0f` | `0f` draws a single circular arc; `0f`-`1f` adds flanking transition curves for a smoother, more "squircle"-like corner. |
| `start` / `end` | `RoundedPolygon` | — | Shapes `Morph` interpolates between. |
| `progress` | `Float` | — | `toPath(progress)` argument, `0f` (fully `start`) to `1f` (fully `end`). |

## Notes

- Separate library: `androidx.graphics:graphics-shapes` (package `androidx.graphics.shapes`), not `androidx.compose.foundation.shape` where `RoundedCornerShape`/`CutCornerShape` live.
- `Morph` matches convex corners to convex corners and concave to concave between `start` and `end`, so morph quality depends on both polygons having a comparable structure.
- `Path.asComposePath()` converts the returned `android.graphics.Path`-based path to a Compose `androidx.compose.ui.graphics.Path` for use with `DrawScope.drawPath` or a custom `Shape.createOutline`.
- `MaterialShapes` (in `androidx.compose.material3`) ships 35+ predefined `RoundedPolygon` shapes (Cookie, Heart, Clover, etc.) built on this library for Material3 Expressive shape-morphing.
- Package: `androidx.graphics.shapes`.

## Related

- [Shape](./shape.md)
- [Path](./path.md)
- [Modifier.clip](./modifier-clip.md)
