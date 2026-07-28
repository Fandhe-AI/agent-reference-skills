# Modifier.paint

Draws a `Painter` (including a custom `Painter` subclass) into the composable it is chained on, without wrapping it in an `Image` composable.

## Signature / Usage

```kotlin
fun Modifier.paint(
    painter: Painter,
    sizeToIntrinsics: Boolean = true,
    alignment: Alignment = Alignment.Center,
    contentScale: ContentScale = ContentScale.Inside,
    alpha: Float = 1.0f,
    colorFilter: ColorFilter? = null,
): Modifier
```

```kotlin
val customPainter = remember { OverlayImagePainter(dogImage, rainbowImage) }
Box(
    modifier = Modifier
        .background(color = Color.Gray)
        .padding(30.dp)
        .paint(customPainter)
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `painter` | `Painter` | — | Painter drawn into this modifier's chain. |
| `sizeToIntrinsics` | `Boolean` | `true` | Whether the layout is sized based on `painter.intrinsicSize`. |
| `alignment` | `Alignment` | `Alignment.Center` | Alignment of the painter within the destination bounds. |
| `contentScale` | `ContentScale` | `ContentScale.Inside` | How the painter content is scaled to the destination bounds. |
| `alpha` | `Float` | `1.0f` | Opacity applied when drawing. |
| `colorFilter` | `ColorFilter?` | `null` | Optional color filter applied when drawing. |

## Notes

- Package: `androidx.compose.ui`.
- Default `contentScale` is `ContentScale.Inside`, differing from `Image`'s default of `ContentScale.Fit`.
- Use this instead of `Image` when a composable already has content and only needs a painter drawn as a background/decoration, avoiding an extra layout node.

## Related

- [Painter](./painter.md)
- [Image](./image.md)
- [ContentScale](./contentscale.md)
