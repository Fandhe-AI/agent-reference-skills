# Color

Value class encoding color information (up to 4 components plus alpha, packed with an optional `ColorSpace`) used throughout Compose drawing and styling APIs.

## Signature / Usage

```kotlin
value class Color(val value: ULong)

fun Color(red: Float, green: Float, blue: Float, alpha: Float = 1f, colorSpace: ColorSpace = ColorSpaces.Srgb): Color
fun Color(color: Long): Color   // 32-bit ARGB, e.g. 0xFFFF0000
fun Color(color: Int): Color    // @ColorInt ARGB
```

```kotlin
val purpleColor = Color(0xFFBA68C8)
Canvas(modifier = Modifier.fillMaxSize().padding(16.dp), onDraw = { drawCircle(purpleColor) })
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `red` / `green` / `blue` | `Float` | — | Component values in `colorSpace` range; out-of-range values are clamped. |
| `alpha` | `Float` | `1f` | Opacity component. |
| `colorSpace` | `ColorSpace` | `ColorSpaces.Srgb` | Color space the float components are interpreted in. |
| `color` | `Long` / `Int` | — | Packed 32-bit ARGB value, e.g. `0xFFRRGGBB`. |

## Notes

- Companion constants: `Color.Black`, `Color.White`, `Color.Red`, `Color.Green`, `Color.Blue`, `Color.Yellow`, `Color.Cyan`, `Color.Magenta`, `Color.Transparent`, `Color.Unspecified`.
- The `Long` constructor form is preferred over `Int` for colors with alpha `> 0x80` due to signed-int overflow ambiguity.
- Package: `androidx.compose.ui.graphics`.

## Related

- [Brush](./brush.md)
- [DrawScope](./draw-scope.md)
