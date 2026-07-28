# Modifier.selectable / Modifier.selectableGroup

`selectable` configures a component to be selectable, typically as part of a mutually exclusive group (only one item selected at a time), such as a radio group or a row of tabs. `selectableGroup` marks the container of such items for correct accessibility grouping.

## Signature / Usage

```kotlin
fun Modifier.selectable(
    selected: Boolean,
    enabled: Boolean = true,
    role: Role? = null,
    interactionSource: MutableInteractionSource? = null,
    onClick: () -> Unit,
): Modifier

@Stable
fun Modifier.selectableGroup(): Modifier
```

```kotlin
Column(Modifier.selectableGroup()) {
    radioOptions.forEach { text ->
        Row(
            Modifier.selectable(
                selected = (text == selectedOption),
                onClick = { onOptionSelected(text) },
                role = Role.RadioButton,
            ),
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
| `selected` | `Boolean` | — | Whether this item is currently selected. |
| `enabled` | `Boolean` | `true` | Controls whether the element responds to input. |
| `role` | `Role?` | `null` | Accessibility role, e.g. `Role.RadioButton` or `Role.Tab`. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Hoisted source for observing press interactions. |
| `onClick` | `() -> Unit` | — | Called when this item is selected. |

## Notes

- An overload accepting explicit `interactionSource: MutableInteractionSource?, indication: Indication?` (inserted after `selected`) is available for custom indication.
- Always pass `Modifier.selectableGroup()` on the container (e.g. `Column`/`Row`) of a set of `selectable` items so accessibility services announce the group as mutually exclusive.
- For non-exclusive on/off items, use [toggleable](./toggleable.md) instead.
- Package: `androidx.compose.foundation.selection`.

## Related

- [toggleable](./toggleable.md)
- [clickable](./clickable.md)
