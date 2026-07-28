# Checkbox

Checkboxes allow users to select one or more items from a set, turning an option on or off. Displays a checkmark when checked.

## Signature / Usage

```kotlin
@Composable
public fun Checkbox(
    checked: Boolean,
    onCheckedChange: ((Boolean) -> Unit)?,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    colors: CheckboxColors = CheckboxDefaults.colors(),
    interactionSource: MutableInteractionSource? = null,
)
```

```kotlin
var checked by remember { mutableStateOf(true) }
Checkbox(
    checked = checked,
    onCheckedChange = { checked = it }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `Boolean` | — | Whether this checkbox is checked or unchecked. |
| `onCheckedChange` | `((Boolean) -> Unit)?` | — | Called when the user taps the checkbox. If `null`, not interactable unless handled elsewhere. |
| `modifier` | `Modifier` | `Modifier` | Applied to this checkbox. |
| `enabled` | `Boolean` | `true` | Controls the enabled state; when `false`, does not respond to input and appears visually disabled. |
| `colors` | `CheckboxColors` | `CheckboxDefaults.colors()` | Resolves colors in different states. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |

## Notes

- A second overload accepts explicit `checkmarkStroke: Stroke` and `outlineStroke: Stroke` for custom stroke styling.
- For parent-child checkbox groups with an indeterminate state, use `TriStateCheckbox` instead.
- Package: `androidx.compose.material3`.

## Related

- [TriStateCheckbox](./tristatecheckbox.md)
- [RadioButton](./radiobutton.md)
- [Switch](./switch.md)
