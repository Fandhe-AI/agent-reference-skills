# FloatingActionButton

High-emphasis button that promotes a single, focused primary action, typically anchored to the bottom-right of the screen (e.g. "create new item", "add contact").

## Signature / Usage

```kotlin
@Composable
fun FloatingActionButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    shape: Shape = FloatingActionButtonDefaults.shape,
    containerColor: Color = FloatingActionButtonDefaults.containerColor,
    contentColor: Color = contentColorFor(containerColor),
    elevation: FloatingActionButtonElevation = FloatingActionButtonDefaults.elevation(),
    interactionSource: MutableInteractionSource? = null,
    content: @Composable () -> Unit,
)
```

```kotlin
FloatingActionButton(onClick = { /* action */ }) {
    Icon(Icons.Filled.Add, contentDescription = "Add")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `() -> Unit` | — | Invoked when the FAB is clicked. |
| `modifier` | `Modifier` | `Modifier` | Applied to this FAB. |
| `shape` | `Shape` | `FloatingActionButtonDefaults.shape` | Defines the FAB's container and shadow shape. |
| `containerColor` | `Color` | `FloatingActionButtonDefaults.containerColor` | Background color. Use `Color.Transparent` for no color. |
| `contentColor` | `Color` | `contentColorFor(containerColor)` | Preferred color for internal content. |
| `elevation` | `FloatingActionButtonElevation` | `FloatingActionButtonDefaults.elevation()` | Controls shadow size and overlay amount for surface containers. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |
| `content` | `@Composable () -> Unit` | — | FAB content, typically an `Icon`. |

## Notes

- `SmallFloatingActionButton` and `LargeFloatingActionButton` share this exact signature, differing only in the `shape` default (`FloatingActionButtonDefaults.smallShape` / `largeShape`), for constrained or prominent use cases respectively.
- Package: `androidx.compose.material3`.

## Related

- [ExtendedFloatingActionButton](./extendedfloatingactionbutton.md)
