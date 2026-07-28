# DrawScope

Scoped drawing environment providing shape, image, text, and path drawing functions plus coordinate transformations, used inside `Canvas`, `Modifier.drawBehind`, `Modifier.drawWithContent`, and `Modifier.drawWithCache`.

## Signature / Usage

```kotlin
fun drawRect(color: Color, topLeft: Offset = Offset.Zero, size: Size = this.size.offsetSize(topLeft), alpha: Float = 1.0f, style: DrawStyle = Fill, colorFilter: ColorFilter? = null, blendMode: BlendMode = DefaultBlendMode)
fun drawCircle(color: Color, radius: Float = size.minDimension / 2.0f, center: Offset = this.center, alpha: Float = 1.0f, style: DrawStyle = Fill, colorFilter: ColorFilter? = null, blendMode: BlendMode = DefaultBlendMode)
fun drawLine(color: Color, start: Offset, end: Offset, strokeWidth: Float = Stroke.HairlineWidth, cap: StrokeCap = Stroke.DefaultCap, pathEffect: PathEffect? = null, alpha: Float = 1.0f, colorFilter: ColorFilter? = null, blendMode: BlendMode = DefaultBlendMode)
fun drawPath(path: Path, color: Color, alpha: Float = 1.0f, style: DrawStyle = Fill, colorFilter: ColorFilter? = null, blendMode: BlendMode = DefaultBlendMode)
fun drawArc(color: Color, startAngle: Float, sweepAngle: Float, useCenter: Boolean, topLeft: Offset = Offset.Zero, size: Size = this.size.offsetSize(topLeft), alpha: Float = 1.0f, style: DrawStyle = Fill, colorFilter: ColorFilter? = null, blendMode: BlendMode = DefaultBlendMode)
fun drawImage(image: ImageBitmap, topLeft: Offset = Offset.Zero, alpha: Float = 1.0f, style: DrawStyle = Fill, colorFilter: ColorFilter? = null, blendMode: BlendMode = DefaultBlendMode)
fun drawRoundRect(color: Color, topLeft: Offset = Offset.Zero, size: Size = this.size.offsetSize(topLeft), cornerRadius: CornerRadius = CornerRadius.Zero, style: DrawStyle = Fill, alpha: Float = 1.0f, colorFilter: ColorFilter? = null, blendMode: BlendMode = DefaultBlendMode)
fun drawOval(color: Color, topLeft: Offset = Offset.Zero, size: Size = this.size.offsetSize(topLeft), alpha: Float = 1.0f, style: DrawStyle = Fill, colorFilter: ColorFilter? = null, blendMode: BlendMode = DefaultBlendMode)
fun drawPoints(points: List<Offset>, pointMode: PointMode, color: Color, strokeWidth: Float = Stroke.HairlineWidth, cap: StrokeCap = StrokeCap.Butt, pathEffect: PathEffect? = null, alpha: Float = 1.0f, colorFilter: ColorFilter? = null, blendMode: BlendMode = DefaultBlendMode)
fun DrawScope.drawText(textMeasurer: TextMeasurer, text: String, ...)

inline fun DrawScope.translate(left: Float = 0.0f, top: Float = 0.0f, block: DrawScope.() -> Unit)
inline fun DrawScope.rotate(degrees: Float, pivot: Offset = center, block: DrawScope.() -> Unit)
inline fun DrawScope.scale(scaleX: Float, scaleY: Float, pivot: Offset = center, block: DrawScope.() -> Unit)
inline fun DrawScope.scale(scale: Float, pivot: Offset = center, block: DrawScope.() -> Unit)
inline fun DrawScope.inset(left: Float, top: Float, right: Float, bottom: Float, block: DrawScope.() -> Unit)
inline fun DrawScope.inset(inset: Float, block: DrawScope.() -> Unit)
inline fun DrawScope.inset(horizontal: Float = 0.0f, vertical: Float = 0.0f, block: DrawScope.() -> Unit)
inline fun DrawScope.withTransform(transformBlock: DrawTransform.() -> Unit, drawBlock: DrawScope.() -> Unit)
fun DrawScope.drawIntoCanvas(block: (Canvas) -> Unit)
```

Each `draw*` function has a matching `brush: Brush` overload in place of `color: Color`.

```kotlin
Canvas(modifier = Modifier.fillMaxSize()) {
    rotate(degrees = 45f) {
        drawRect(
            color = Color.Gray,
            topLeft = Offset(x = size.width / 3f, y = size.height / 3f),
            size = size / 3f,
        )
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` / `brush` | `Color` / `Brush` | — | Paint used to fill or stroke the drawn shape. |
| `topLeft` | `Offset` | `Offset.Zero` | Top-left corner of the bounding box for rect/arc/image/oval drawing. |
| `size` | `Size` | remaining canvas size from `topLeft` | Dimensions of the bounding box. |
| `alpha` | `Float` | `1.0f` | Opacity applied to the draw operation, `0.0`-`1.0`. |
| `style` | `DrawStyle` | `Fill` | `Fill` or `Stroke(width, cap, join, ...)`. |
| `colorFilter` | `ColorFilter?` | `null` | Color filter applied to the drawn content. |
| `blendMode` | `BlendMode` | `DefaultBlendMode` (`SrcOver`) | Compositing mode used to blend with content already drawn. |
| `cornerRadius` | `CornerRadius` | `CornerRadius.Zero` | Corner radius for `drawRoundRect`. |
| `strokeWidth` | `Float` | `Stroke.HairlineWidth` | Line/point stroke thickness. |

## Notes

- `translate` / `rotate` / `scale` / `inset` only apply during the draw phase; they do not affect layout or measurement.
- Prefer `withTransform` over nesting multiple transform calls for combined transformations (single matrix multiplication vs. layered canvas saves).
- `drawIntoCanvas` exposes the underlying platform `Canvas` (e.g. to drive an Android `Drawable`) via `canvas.nativeCanvas`.
- `drawText` requires a `TextMeasurer` (`rememberTextMeasurer()`) to first measure an `AnnotatedString`/`String` into a `TextLayoutResult`.
- Package: `androidx.compose.ui.graphics.drawscope`.

## Related

- [Canvas](./canvas.md)
- [Brush](./brush.md)
- [Path](./path.md)
- [BlendMode](./blend-mode.md)
