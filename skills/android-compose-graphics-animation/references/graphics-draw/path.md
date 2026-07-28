# Path

Mutable geometric path used with `DrawScope.drawPath`, `Modifier.clip` (via `Shape`), and `GenericShape`. `PathEffect` transforms how a `Path` is stroked.

## Signature / Usage

```kotlin
var fillType: PathFillType

fun moveTo(x: Float, y: Float)
fun lineTo(x: Float, y: Float)
fun relativeMoveTo(dx: Float, dy: Float)
fun relativeLineTo(dx: Float, dy: Float)
fun quadraticTo(x1: Float, y1: Float, x2: Float, y2: Float)
fun cubicTo(x1: Float, y1: Float, x2: Float, y2: Float, x3: Float, y3: Float)
fun arcTo(rect: Rect, startAngleDegrees: Float, sweepAngleDegrees: Float, forceMoveTo: Boolean)
fun addRect(rect: Rect, direction: Direction = Direction.CounterClockwise)
fun addOval(oval: Rect, direction: Direction = Direction.CounterClockwise)
fun addRoundRect(roundRect: RoundRect, direction: Direction = Direction.CounterClockwise)
fun addArc(oval: Rect, startAngleDegrees: Float, sweepAngleDegrees: Float)
fun close()
fun reset()
fun translate(offset: Offset)
fun transform(matrix: Matrix)
fun op(path1: Path, path2: Path, operation: PathOperation): Boolean

fun PathEffect.cornerPathEffect(radius: Float): PathEffect
fun PathEffect.dashPathEffect(intervals: FloatArray, phase: Float = 0f): PathEffect
fun PathEffect.chainPathEffect(outer: PathEffect, inner: PathEffect): PathEffect
fun PathEffect.stampedPathEffect(shape: Path, advance: Float, phase: Float, style: StampedPathEffectStyle): PathEffect
```

```kotlin
val path = Path().apply {
    moveTo(0f, 0f)
    lineTo(size.width / 2f, size.height / 2f)
    lineTo(size.width, 0f)
    close()
}
drawPath(path, Color.Magenta, style = Stroke(width = 10f, pathEffect = PathEffect.dashPathEffect(floatArrayOf(10f, 20f))))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fillType` | `PathFillType` | — | Controls interior calculation (nonzero/even-odd winding). |
| `direction` | `Direction` | `CounterClockwise` | Winding direction used when adding closed shapes. |
| `intervals` | `FloatArray` | — | Alternating on/off dash lengths for `dashPathEffect`; must have an even, `>= 2` element count. |
| `phase` | `Float` | `0f` | Pixel offset into `intervals` (mod sum of all intervals). |

## Notes

- `dashPathEffect` only applies to `Stroke` styles; ignored for `Fill`.
- `stampedPathEffect` repeats a shape `Path` along the stroked path; the stroke width parameter of the `Stroke` is ignored when a stamp effect is used.
- `chainPathEffect(outer, inner)` applies `inner` first, then `outer` to the result.
- Package: `androidx.compose.ui.graphics` (`Path`, `PathEffect`).

## Related

- [DrawScope](./draw-scope.md)
- [Shape](./shape.md)
