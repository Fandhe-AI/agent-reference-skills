# Modifier.toggleable / Modifier.triStateToggleable

Configures a component to support on/off (or tri-state) toggle behavior via input and accessibility events, without being part of a mutually exclusive group. Used to back custom checkbox/switch-like components.

## Signature / Usage

```kotlin
fun Modifier.toggleable(
    value: Boolean,
    enabled: Boolean = true,
    role: Role? = null,
    interactionSource: MutableInteractionSource? = null,
    onValueChange: (Boolean) -> Unit,
): Modifier

fun Modifier.triStateToggleable(
    state: ToggleableState,
    enabled: Boolean = true,
    role: Role? = null,
    interactionSource: MutableInteractionSource? = null,
    onClick: () -> Unit,
): Modifier
```

```kotlin
val stateSubscribed = stringResource(R.string.subscribed)
val stateNotSubscribed = stringResource(R.string.not_subscribed)

Row(
    modifier = Modifier
        .semantics { stateDescription = if (selected) stateSubscribed else stateNotSubscribed }
        .toggleable(value = selected, onValueChange = { onToggle() }),
) {
    /* ... */
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Boolean` | — | Current toggled state. |
| `state` (tri-state) | `ToggleableState` | — | `On`, `Off`, or `Indeterminate`. |
| `enabled` | `Boolean` | `true` | Controls whether the element responds to input. |
| `role` | `Role?` | `null` | Accessibility role, e.g. `Role.Checkbox` or `Role.Switch`. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Hoisted source for observing press interactions. |
| `onValueChange` / `onClick` | function | — | Called when the toggle is activated. |

## Notes

- An overload accepting explicit `interactionSource: MutableInteractionSource?, indication: Indication?` (as the second/third params) is available for custom indication, mirroring `clickable`.
- `triStateToggleable` is the building block for tri-state components (e.g. a "select all" checkbox with a mixed state).
- Package: `androidx.compose.foundation.selection`.

## Related

- [selectable](./selectable.md)
- [clickable](./clickable.md)
