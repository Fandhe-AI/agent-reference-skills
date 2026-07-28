# TriStateCheckbox

Checkbox supporting three states (On, Off, Indeterminate). Used for a parent checkbox that controls a group of child checkboxes with mixed selection.

## Signature / Usage

```kotlin
@Composable
public fun TriStateCheckbox(
    state: ToggleableState,
    onClick: (() -> Unit)?,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    colors: CheckboxColors = CheckboxDefaults.colors(),
    interactionSource: MutableInteractionSource? = null,
)
```

```kotlin
val parentState = when {
    childChecked.all { it } -> ToggleableState.On
    childChecked.none { it } -> ToggleableState.Off
    else -> ToggleableState.Indeterminate
}
TriStateCheckbox(
    state = parentState,
    onClick = { /* toggle all children */ }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `ToggleableState` | — | Current state: `On`, `Off`, or `Indeterminate`. |
| `onClick` | `(() -> Unit)?` | — | Called when the user taps the checkbox. |
| `modifier` | `Modifier` | `Modifier` | Applied to this checkbox. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `colors` | `CheckboxColors` | `CheckboxDefaults.colors()` | Resolves colors in different states. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |

## Notes

- A second overload accepts explicit `checkmarkStroke: Stroke` and `outlineStroke: Stroke`.
- Parent becomes `Indeterminate` when only some of its children are checked.
- Package: `androidx.compose.material3`.

## Related

- [Checkbox](./checkbox.md)
