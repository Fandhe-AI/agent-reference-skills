# BitmapPainter

`Painter` implementation that draws an `ImageBitmap` into the provided canvas. Returned automatically by `painterResource()` for rasterized (PNG/JPEG/WEBP) drawable resources.

## Signature / Usage

```kotlin
class BitmapPainter(
    image: ImageBitmap,
    srcOffset: IntOffset = IntOffset.Zero,
    srcSize: IntSize = IntSize(image.width, image.height),
) : Painter()

fun BitmapPainter(
    image: ImageBitmap,
    srcOffset: IntOffset = IntOffset.Zero,
    srcSize: IntSize = IntSize(image.width, image.height),
    filterQuality: FilterQuality = FilterQuality.Low,
): BitmapPainter
```

```kotlin
val bitmap = ImageBitmap.imageResource(id = R.drawable.dog)
val painter = remember(bitmap) { BitmapPainter(bitmap) }
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `image` | `ImageBitmap` | — | Bitmap to draw. |
| `srcOffset` | `IntOffset` | `IntOffset.Zero` | Top-left offset of the sub-region of `image` to draw. |
| `srcSize` | `IntSize` | full `image` size | Size of the sub-region of `image` to draw. |
| `filterQuality` | `FilterQuality` | `FilterQuality.Low` | Sampling algorithm used when the bitmap is scaled (factory function overload only). |

## Notes

- Package: `androidx.compose.ui.graphics.painter`.
- Supports applying `alpha` and `ColorFilter` to the rendered output.
- Prefer `painterResource()` over constructing `BitmapPainter` manually unless a sub-region crop (`srcOffset`/`srcSize`) is needed.

## Related

- [Painter](./painter.md)
- [ColorPainter](./colorpainter.md)
- [ImageBitmap](./imagebitmap.md)
