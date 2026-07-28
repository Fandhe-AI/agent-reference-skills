# BlendMode

Value class describing how the source (currently drawn) pixels are composited with the destination (already drawn) pixels.

## Signature / Usage

```kotlin
value class BlendMode internal constructor(private val value: Int)
```

```kotlin
drawCircle(
    Color.Black,
    radius = dotSize,
    center = Offset(size.width - dotSize, size.height - dotSize),
    blendMode = BlendMode.Clear,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Clear` | `BlendMode` | — | Drops both source and destination, leaving nothing. |
| `Src` / `Dst` | `BlendMode` | — | Paints only the source / only the destination. |
| `SrcOver` | `BlendMode` | default `DrawScope` blend mode | Composites source over destination. |
| `DstOver` | `BlendMode` | — | Composites source under destination. |
| `SrcIn` / `DstIn` | `BlendMode` | — | Shows source/destination only where both overlap. |
| `SrcOut` / `DstOut` | `BlendMode` | — | Shows source/destination only where they do not overlap. |
| `SrcAtop` / `DstAtop` | `BlendMode` | — | Composites one image over the other, limited to the overlap region. |
| `Xor` | `BlendMode` | — | Bitwise XOR of source and destination. |
| `Plus` | `BlendMode` | — | Sums color components of both images. |
| `Modulate` / `Multiply` | `BlendMode` | — | Multiplies color components (`Multiply` also includes alpha, API 29+). |
| `Screen` / `Overlay` / `Darken` / `Lighten` | `BlendMode` | — | Standard photo-editing blend modes. |
| `ColorDodge` / `ColorBurn` / `Hardlight` / `Softlight` / `Difference` / `Exclusion` | `BlendMode` | — | Additional blend modes, require API 29+. |
| `Hue` / `Saturation` / `Color` / `Luminosity` | `BlendMode` | — | HSL-component blend modes, require API 29+. |

## Notes

- `DrawScope`'s default (`DefaultBlendMode`) is `BlendMode.SrcOver`.
- Modes from `ColorDodge` onward require API 29 (Android 10) and above.
- Correct blending of overlapping semi-transparent draw calls within one `graphicsLayer` requires `CompositingStrategy.Offscreen`.
- Package: `androidx.compose.ui.graphics`.

## Related

- [DrawScope](./draw-scope.md)
- [Modifier.graphicsLayer](./modifier-graphics-layer.md)
