# Surface tonal elevation

`Surface` exposes two independent elevation mechanisms in Material 3: `tonalElevation` (a color-overlay effect, new in M3) and `shadowElevation` (a traditional drop shadow, same mechanism as M2).

## Signature / Usage

```kotlin
@Composable
fun Surface(
    modifier: Modifier = Modifier,
    shape: Shape = RectangleShape,
    color: Color = MaterialTheme.colorScheme.surface,
    contentColor: Color = contentColorFor(color),
    tonalElevation: Dp = 0.dp,
    shadowElevation: Dp = 0.dp,
    border: BorderStroke? = null,
    content: @Composable () -> Unit,
)
```

```kotlin
Surface(
    tonalElevation = 8.dp,
    shadowElevation = 4.dp
) {
    Column(content = content)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `Color` | `MaterialTheme.colorScheme.surface` | Background; when equal to `ColorScheme.surface`, `tonalElevation` tints it. |
| `contentColor` | `Color` | `contentColorFor(color)` | Preferred content color set as `LocalContentColor` for descendants. |
| `tonalElevation` | `Dp` | `0.dp` | Higher values produce a darker tint of `color` in light theme, lighter in dark theme (when `color == ColorScheme.surface`). |
| `shadowElevation` | `Dp` | `0.dp` | Size of the drop shadow below the surface; does not affect z-index/draw order (use `Modifier.zIndex` for that). |
| `border` | `BorderStroke?` | `null` | Border drawn around the surface. |

## Notes

- Both elevation types can be applied simultaneously; tonal elevation is the M3-preferred way to convey elevation without a shadow.
- To avoid "shadow creep", reserve `shadowElevation` for cases where visual separation truly requires a shadow (e.g. over a patterned background); prefer `tonalElevation` and the `surfaceContainer*` color roles otherwise.
- Package: `androidx.compose.material3`.

## Related

- [ColorScheme](./color-scheme.md)
- [contentColorFor / LocalContentColor](./content-color.md)
