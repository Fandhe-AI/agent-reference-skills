# Layout (custom layout)

The primitive composable used to manually measure and place child composables; all higher-level layouts (`Column`, `Row`, `Box`) are built on top of it.

## Signature / Usage

```kotlin
@Composable
fun Layout(
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit,
    measurePolicy: MeasurePolicy,
)
```

```kotlin
@Composable
fun MyBasicColumn(
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit,
) {
    Layout(modifier = modifier, content = content) { measurables, constraints ->
        val placeables = measurables.map { it.measure(constraints) }
        layout(constraints.maxWidth, constraints.maxHeight) {
            var yPosition = 0
            placeables.forEach { placeable ->
                placeable.placeRelative(x = 0, y = yPosition)
                yPosition += placeable.height
            }
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to the layout. |
| `content` | `@Composable () -> Unit` | — | Children to be measured/placed by `measurePolicy`. |
| `measurePolicy` | `MeasurePolicy` | — | Lambda `(measurables, constraints) -> MeasureResult` that measures each child, decides own size via `layout(width, height) { ... }`, and places children. |

## Notes

- Every node follows measure -> decide own size -> place children; each child can only be measured once per pass (single-pass measurement enforced by `MeasureScope`/`PlacementScope`).
- `Modifier.layout { measurable, constraints -> ... }` applies the same measure/place pattern to a single element instead of a whole subtree (e.g. custom baseline padding).
- Use `placeable.placeRelative(x, y)` for layout-direction-aware placement, or `place(x, y)` for absolute placement.
- Package: `androidx.compose.ui.layout`.

## Related

- [SubcomposeLayout](./subcomposelayout.md)
- [Column](./column.md)
