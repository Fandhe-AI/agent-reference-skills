# Modifier.shadow

Creates a `graphicsLayer` that draws a shadow whose visual depth is defined by `elevation`, using `shape` as the physical object outline.

## Signature / Usage

```kotlin
fun Modifier.shadow(
    elevation: Dp,
    shape: Shape = RectangleShape,
    clip: Boolean = elevation > 0.dp,
    ambientColor: Color = DefaultShadowColor,
    spotColor: Color = DefaultShadowColor,
): Modifier
```

```kotlin
Box(
    modifier = Modifier
        .shadow(elevation = 8.dp, shape = RoundedCornerShape(12.dp))
        .background(Color.White, RoundedCornerShape(12.dp))
        .size(120.dp),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `elevation` | `Dp` | — | Shadow depth in pixels; `0.dp` draws no shadow. |
| `shape` | `Shape` | `RectangleShape` | Shape of the physical object casting the shadow. |
| `clip` | `Boolean` | `elevation > 0.dp` | When `true`, content is also clipped to `shape`. |
| `ambientColor` | `Color` | `DefaultShadowColor` (Black) | Color of the ambient shadow drawn when `elevation > 0f`. |
| `spotColor` | `Color` | `DefaultShadowColor` (Black) | Color of the spot shadow drawn when `elevation > 0f`. |

## Notes

- If `shape` is concave, the shadow does not render on Android versions below 10.
- `ambientColor`/`spotColor` are only honored on Android 9 (Pie) and above; older versions always render `Color.Black` regardless of the value set.
- `elevation` only affects shadow size, not draw order; combine with `Modifier.zIndex` to control stacking order between elements of different elevation.
- Renders this composable into a separate graphics layer.
- Package: `androidx.compose.ui.draw`.

## Related

- [Modifier.graphicsLayer](./modifier-graphics-layer.md)
- [Shape](./shape.md)
