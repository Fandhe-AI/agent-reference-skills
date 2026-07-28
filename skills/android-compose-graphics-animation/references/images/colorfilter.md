# ColorFilter

Transforms the color of each pixel drawn by an `Image`, `Painter`, or `DrawScope` operation. `tint()` blends a single color in; `colorMatrix()` applies a general 4x5 color transform.

## Signature / Usage

```kotlin
class ColorFilter

fun ColorFilter.Companion.tint(color: Color, blendMode: BlendMode = BlendMode.SrcIn): ColorFilter

fun ColorFilter.Companion.colorMatrix(colorMatrix: ColorMatrix): ColorFilter
```

```kotlin
Image(
    painter = painterResource(id = R.drawable.bus),
    contentDescription = null,
    colorFilter = ColorFilter.tint(Color.Yellow)
)

Image(
    painter = painterResource(id = R.drawable.dog),
    contentDescription = null,
    colorFilter = ColorFilter.colorMatrix(ColorMatrix().apply { setToSaturation(0f) })
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `Color` | — | Source color used by `tint()`. |
| `blendMode` | `BlendMode` | `BlendMode.SrcIn` | Blend mode combining `color` with the destination pixels. |
| `colorMatrix` | `ColorMatrix` | — | 4x5 matrix used by `colorMatrix()` to transform saturation, brightness, contrast, channel inversion, etc. |

## Notes

- Package: `androidx.compose.ui.graphics`.
- `setToSaturation(0f)` on a `ColorMatrix` produces a grayscale filter.
- A custom `colorMatrix` array of `contrast`/`brightness` terms per RGB channel adjusts brightness and contrast; inverting the diagonal (`-1f`) and offsetting by `255f` inverts colors.

## Related

- [Image](./image.md)
- [Painter](./painter.md)
