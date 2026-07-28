# Surface

The central container metaphor in Material Design: a piece of content at a given elevation, modified by tonal variance and shadow.

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
    modifier = Modifier.size(120.dp),
    shape = MaterialTheme.shapes.medium,
    shadowElevation = 4.dp
) {
    Text("Surface content", modifier = Modifier.padding(16.dp))
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to the surface container. |
| `shape` | `Shape` | `RectangleShape` | Shape used to clip content, border, and shadow. |
| `color` | `Color` | `MaterialTheme.colorScheme.surface` | Background color. |
| `contentColor` | `Color` | `contentColorFor(color)` | Preferred content color derived from `color`. |
| `tonalElevation` | `Dp` | `0.dp` | Elevation used to apply a tonal overlay tint. |
| `shadowElevation` | `Dp` | `0.dp` | Elevation used to draw a drop shadow. |
| `border` | `BorderStroke?` | `null` | Border drawn around the container. |
| `content` | `@Composable () -> Unit` | — | Surface content. |

## Notes

- Additional overloads add `onClick` (clickable), `selected` + `onClick` (selectable), and `checked` + `onCheckedChange` (toggleable) parameters for interactive surfaces.
- Package: `androidx.compose.material3`.

## Related

- [Card](./card.md)
- [Scaffold](./scaffold.md)
