# Brush

Paint source usable wherever a draw or background operation accepts color: solid colors, linear/radial/sweep gradients, and custom `ShaderBrush` implementations.

## Signature / Usage

```kotlin
fun Brush.linearGradient(colors: List<Color>, start: Offset = Offset.Zero, end: Offset = Offset.Infinite, tileMode: TileMode = TileMode.Clamp): Brush
fun Brush.linearGradient(vararg colorStops: Pair<Float, Color>, start: Offset = Offset.Zero, end: Offset = Offset.Infinite, tileMode: TileMode = TileMode.Clamp): Brush
fun Brush.horizontalGradient(colors: List<Color>, startX: Float = 0.0f, endX: Float = Float.POSITIVE_INFINITY, tileMode: TileMode = TileMode.Clamp): Brush
fun Brush.verticalGradient(colors: List<Color>, startY: Float = 0.0f, endY: Float = Float.POSITIVE_INFINITY, tileMode: TileMode = TileMode.Clamp): Brush
fun Brush.radialGradient(colors: List<Color>, center: Offset = Offset.Unspecified, radius: Float = Float.POSITIVE_INFINITY, tileMode: TileMode = TileMode.Clamp): Brush
fun Brush.sweepGradient(colors: List<Color>, center: Offset = Offset.Unspecified): Brush

class SolidColor(val value: Color) : Brush
abstract class ShaderBrush : Brush {
    abstract fun createShader(size: Size): Shader
}
```

```kotlin
val brush = Brush.horizontalGradient(listOf(Color.Red, Color.Blue))
Box(modifier = Modifier.requiredSize(200.dp).background(brush))
```

```kotlin
val imageBrush = ShaderBrush(ImageShader(ImageBitmap.imageResource(id = R.drawable.dog)))
Canvas(modifier = Modifier.size(200.dp), onDraw = { drawCircle(imageBrush) })
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `colors` | `List<Color>` | — | Colors evenly dispersed along the gradient. |
| `colorStops` | `vararg Pair<Float, Color>` | — | Colors placed at explicit fractional offsets (`0f`-`1f`). |
| `start` / `end` | `Offset` | `Offset.Zero` / `Offset.Infinite` | Line endpoints for `linearGradient`. |
| `startX`/`endX`, `startY`/`endY` | `Float` | `0f` / `POSITIVE_INFINITY` | Axis-aligned endpoints for `horizontalGradient` / `verticalGradient`. |
| `center` | `Offset` | `Offset.Unspecified` | Center point for `radialGradient` / `sweepGradient`. |
| `radius` | `Float` | `POSITIVE_INFINITY` | Radius for `radialGradient`. |
| `tileMode` | `TileMode` | `TileMode.Clamp` | Tiling behavior beyond the gradient extent: `Clamp`, `Repeated`, `Mirror`, `Decal`. |

## Notes

- `sweepGradient` sweeps clockwise starting at the 3 o'clock position around `center`.
- `ShaderBrush` subclasses override `createShader(size)` to lazily build a platform `Shader` (e.g. `LinearGradientShader`, `RadialGradientShader`, `RuntimeShader` for AGSL) once the draw size is known; construct expensive shaders inside `Modifier.drawWithCache`.
- `SolidColor` wraps a single `Color` as a `Brush` for APIs that only accept `Brush`.
- Package: `androidx.compose.ui.graphics`.

## Related

- [Color](./color.md)
- [DrawScope](./draw-scope.md)
- [Modifier.drawWithCache](./modifier-draw-with-cache.md)
