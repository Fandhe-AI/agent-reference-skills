# Modifier.drawBehind

Draws into a `DrawScope` positioned behind the modified composable's content. A thin wrapper around `Modifier.drawWithContent`.

## Signature / Usage

```kotlin
fun Modifier.drawBehind(onDraw: DrawScope.() -> Unit): Modifier
```

```kotlin
Text(
    "Hello Compose!",
    modifier = Modifier
        .drawBehind {
            drawRoundRect(
                Color(0xFFBBAAEE),
                cornerRadius = CornerRadius(10.dp.toPx()),
            )
        }
        .padding(4.dp),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onDraw` | `DrawScope.() -> Unit` | — | Lambda run in `DrawScope` receiver scope before the composable's own content is drawn. |

## Notes

- Content drawn here appears below (behind) the modifier chain's subsequent content.
- Package: `androidx.compose.ui.draw`.

## Related

- [Modifier.drawWithContent](./modifier-draw-with-content.md)
- [Modifier.drawWithCache](./modifier-draw-with-cache.md)
- [DrawScope](./draw-scope.md)
