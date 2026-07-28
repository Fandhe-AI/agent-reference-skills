# IconToggleButton

Icon button that represents a binary, toggleable action (on/off), such as marking an item as a favorite or bookmark.

## Signature / Usage

```kotlin
@Composable
fun IconToggleButton(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    colors: IconToggleButtonColors = IconButtonDefaults.iconToggleButtonColors(),
    interactionSource: MutableInteractionSource? = null,
    shape: Shape = IconButtonDefaults.standardShape,
    content: @Composable () -> Unit,
)
```

```kotlin
var isToggled by rememberSaveable { mutableStateOf(false) }

IconToggleButton(checked = isToggled, onCheckedChange = { isToggled = it }) {
    Icon(
        if (isToggled) Icons.Filled.Favorite else Icons.Outlined.FavoriteBorder,
        contentDescription = if (isToggled) "Selected" else "Unselected"
    )
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `Boolean` | — | Whether this icon button is toggled on or off. |
| `onCheckedChange` | `(Boolean) -> Unit` | — | Called when this icon button is clicked. |
| `modifier` | `Modifier` | `Modifier` | Applied to this icon button. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `colors` | `IconToggleButtonColors` | `IconButtonDefaults.iconToggleButtonColors()` | Resolves colors in different states. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |
| `shape` | `Shape` | `IconButtonDefaults.standardShape` | Shape of this icon button. |
| `content` | `@Composable () -> Unit` | — | Content, typically an `Icon`. |

## Notes

- Style variants `FilledIconToggleButton`, `FilledTonalIconToggleButton`, `OutlinedIconToggleButton` exist with the same `checked` / `onCheckedChange` signature, differing in `shape` / `colors` defaults; `OutlinedIconToggleButton` additionally exposes `border: BorderStroke?`.
- Use `rememberSaveable` to persist the toggle state across configuration changes.
- Package: `androidx.compose.material3`.

## Related

- [IconButton](./iconbutton.md)
