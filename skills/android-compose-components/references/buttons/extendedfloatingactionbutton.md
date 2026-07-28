# ExtendedFloatingActionButton

Floating action button that combines an icon and a text label for more complex or descriptive primary actions.

## Signature / Usage

```kotlin
@Composable
fun ExtendedFloatingActionButton(
    text: @Composable () -> Unit,
    icon: @Composable () -> Unit,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    expanded: Boolean = true,
    shape: Shape = FloatingActionButtonDefaults.extendedFabShape,
    containerColor: Color = FloatingActionButtonDefaults.containerColor,
    contentColor: Color = contentColorFor(containerColor),
    elevation: FloatingActionButtonElevation = FloatingActionButtonDefaults.elevation(),
    interactionSource: MutableInteractionSource? = null,
)
```

```kotlin
ExtendedFloatingActionButton(
    onClick = { /* action */ },
    icon = { Icon(Icons.Filled.Edit, contentDescription = null) },
    text = { Text("Extended FAB") },
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `@Composable () -> Unit` | — | Label displayed inside the FAB. |
| `icon` | `@Composable () -> Unit` | — | Icon content, typically an `Icon`. |
| `onClick` | `() -> Unit` | — | Invoked when the FAB is clicked. |
| `modifier` | `Modifier` | `Modifier` | Applied to this FAB. |
| `expanded` | `Boolean` | `true` | When `true`, shows both icon and text; when `false`, shows icon only. |
| `shape` | `Shape` | `FloatingActionButtonDefaults.extendedFabShape` | Defines the FAB's container and shadow shape. |
| `containerColor` | `Color` | `FloatingActionButtonDefaults.containerColor` | Background color. |
| `contentColor` | `Color` | `contentColorFor(containerColor)` | Preferred color for internal content. |
| `elevation` | `FloatingActionButtonElevation` | `FloatingActionButtonDefaults.elevation()` | Controls shadow size and overlay amount. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |

## Notes

- A text-only overload also exists — `ExtendedFloatingActionButton(onClick, modifier, shape, containerColor, contentColor, elevation, interactionSource, content: @Composable RowScope.() -> Unit)` — taking a single `content` slot for a `Text` label without a separate icon slot.
- Package: `androidx.compose.material3`.

## Related

- [FloatingActionButton](./floatingactionbutton.md)
