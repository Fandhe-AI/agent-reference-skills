# RadioButton

Radio buttons let users select exactly one option from a set.

## Signature / Usage

```kotlin
@Composable
public fun RadioButton(
    selected: Boolean,
    onClick: (() -> Unit)?,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    colors: RadioButtonColors = RadioButtonDefaults.colors(),
    interactionSource: MutableInteractionSource? = null,
)
```

```kotlin
Column(Modifier.selectableGroup()) {
    options.forEach { text ->
        Row(
            Modifier.selectable(
                selected = (text == selectedOption),
                onClick = { onOptionSelected(text) },
                role = Role.RadioButton
            )
        ) {
            RadioButton(selected = (text == selectedOption), onClick = null)
            Text(text)
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `Boolean` | — | Whether this radio button is selected. |
| `onClick` | `(() -> Unit)?` | — | Called when clicked; set to `null` and delegate to a parent `Modifier.selectable` for accessibility. |
| `modifier` | `Modifier` | `Modifier` | Applied to this radio button. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `colors` | `RadioButtonColors` | `RadioButtonDefaults.colors()` | Resolves colors in different states. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |

## Notes

- Wrap the option group in `Modifier.selectableGroup()` on the container for correct screen reader behavior.
- Recommended pattern: set `onClick = null` on `RadioButton` and drive selection via `Modifier.selectable(role = Role.RadioButton)` on the enclosing `Row`.
- Use `RadioButton` when only one item can be selected; use `Checkbox` when multiple can be selected.
- Package: `androidx.compose.material3`.
- This is the Jetpack Compose (Kotlin) API — distinct from the same-named SwiftUI / Ark UI / Chakra UI / fandhe-frontend components.

## Related

- [Checkbox](./checkbox.md)
