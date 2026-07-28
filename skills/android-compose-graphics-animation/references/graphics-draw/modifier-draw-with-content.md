# Modifier.drawWithContent

Draws into a `ContentDrawScope`, giving full control over when the composable's own content (`drawContent()`) is drawn relative to custom drawing.

## Signature / Usage

```kotlin
fun Modifier.drawWithContent(onDraw: ContentDrawScope.() -> Unit): Modifier
```

```kotlin
Column(
    modifier = Modifier
        .fillMaxSize()
        .drawWithContent {
            drawContent()
            drawRect(
                Brush.radialGradient(
                    listOf(Color.Transparent, Color.Black),
                    center = pointerOffset,
                    radius = 100.dp.toPx(),
                )
            )
        }
) { /* composables here */ }
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onDraw` | `ContentDrawScope.() -> Unit` | — | Lambda run in `ContentDrawScope`, which extends `DrawScope` with `drawContent()`. |

## Notes

- Calling `drawContent()` before other draw calls layers custom drawing on top; calling it after layers custom drawing underneath.
- Omitting `drawContent()` entirely suppresses the composable's own content.
- Package: `androidx.compose.ui.draw`.

## Related

- [Modifier.drawBehind](./modifier-draw-behind.md)
- [Modifier.drawWithCache](./modifier-draw-with-cache.md)
