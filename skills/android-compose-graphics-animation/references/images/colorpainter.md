# ColorPainter

`Painter` implementation that fills the provided bounds with a single solid color.

## Signature / Usage

```kotlin
class ColorPainter(val color: Color) : Painter() {
    override val intrinsicSize: Size = Size.Unspecified
}
```

```kotlin
Box(
    modifier = Modifier
        .size(150.dp)
        .paint(ColorPainter(Color.Gray))
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `Color` | — | Solid color used to fill the drawn bounds. |

## Notes

- Package: `androidx.compose.ui.graphics.painter`.
- `intrinsicSize` is always `Size.Unspecified`, so `ColorPainter` always fills the full bounds given to it (no aspect ratio to preserve).
- Useful as a lightweight placeholder painter while a real image is loading (e.g. with `AsyncImage`).

## Related

- [Painter](./painter.md)
- [BitmapPainter](./bitmappainter.md)
