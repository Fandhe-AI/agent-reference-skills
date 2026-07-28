# Canvas

Composable that allows you to specify an area on the screen and perform freeform `DrawScope` drawing on it.

## Signature / Usage

```kotlin
@Composable
fun Canvas(modifier: Modifier, onDraw: DrawScope.() -> Unit)

@Composable
fun Canvas(modifier: Modifier, contentDescription: String, onDraw: DrawScope.() -> Unit)
```

```kotlin
Canvas(modifier = Modifier.fillMaxSize()) {
    val canvasQuadrantSize = size / 2f
    drawRect(color = Color.Magenta, size = canvasQuadrantSize)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | — | Applied to the layout area on which drawing occurs. |
| `contentDescription` | `String` | — | Optional accessibility description for the canvas area (second overload only). |
| `onDraw` | `DrawScope.() -> Unit` | — | Lambda invoked in `DrawScope` receiver scope to perform drawing. |

## Notes

- Internally is a `Spacer` with a `Modifier.drawBehind` attached; it does not lay out children.
- `size` inside the lambda equals the resolved layout size of the composable in pixels; convert `dp` with `.toPx()`.
- Origin `(0,0)` is the top-left pixel; X increases rightward, Y increases downward.
- Package: `androidx.compose.foundation`.

## Related

- [DrawScope](./draw-scope.md)
- [Modifier.drawBehind](./modifier-draw-behind.md)
