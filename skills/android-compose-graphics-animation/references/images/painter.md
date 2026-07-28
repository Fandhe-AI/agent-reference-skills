# Painter

Abstraction for something that can be drawn into a bounded area. Unlike a `DrawModifier`, a `Painter` can influence the measurement and layout of the composable it is applied to (via `intrinsicSize`), making it a replacement for Android's `Drawable` API in Compose.

## Signature / Usage

```kotlin
abstract class Painter {
    abstract val intrinsicSize: Size
    protected abstract fun DrawScope.onDraw()

    protected open fun applyAlpha(alpha: Float): Boolean = false
    protected open fun applyColorFilter(colorFilter: ColorFilter?): Boolean = false
    protected open fun applyLayoutDirection(layoutDirection: LayoutDirection): Boolean = false
}
```

```kotlin
class OverlayImagePainter(
    private val image: ImageBitmap,
    private val imageOverlay: ImageBitmap,
) : Painter() {
    override val intrinsicSize: Size get() = Size(image.width.toFloat(), image.height.toFloat())

    override fun DrawScope.onDraw() {
        drawImage(image)
        drawImage(imageOverlay, blendMode = BlendMode.Overlay)
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `intrinsicSize` | `Size` | — | Intrinsic size of the painter; return `Size.Unspecified` if there is none. |
| `onDraw` | `DrawScope.() -> Unit` | — | Drawing logic invoked internally by `draw()`; must be overridden. |
| `applyAlpha` | `(Float) -> Boolean` | returns `false` | Override to consume an externally-applied alpha instead of Compose applying a saveLayer. |
| `applyColorFilter` | `(ColorFilter?) -> Boolean` | returns `false` | Override to consume an externally-applied `ColorFilter`. |
| `applyLayoutDirection` | `(LayoutDirection) -> Boolean` | returns `false` | Override to react to RTL/LTR changes (e.g. mirroring). |

## Notes

- Package: `androidx.compose.ui.graphics.painter`.
- `painterResource()` returns a `BitmapPainter` or `VectorPainter` automatically and is recommended over subclassing `Painter` directly for most use cases.
- `Painter` is not `@Stable`; avoid passing it as a composable parameter where recomposition stability matters (prefer passing a resource ID or URL instead).
- Provide a meaningful `equals()`/`hashCode()` implementation when subclassing, since `Painter` instances are compared across recompositions.
- Apply a custom `Painter` directly to any composable with `Modifier.paint(painter)`.

## Related

- [BitmapPainter](./bitmappainter.md)
- [ColorPainter](./colorpainter.md)
- [Modifier.paint](./modifierpaint.md)
- [painterResource](./painterresource.md)
