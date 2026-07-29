# Switch

Switches toggle the state of a single item on or off, with a draggable thumb over a track.

## Signature / Usage

```kotlin
@Composable
public fun Switch(
    checked: Boolean,
    onCheckedChange: ((Boolean) -> Unit)?,
    modifier: Modifier = Modifier,
    thumbContent: (@Composable () -> Unit)? = null,
    enabled: Boolean = true,
    colors: SwitchColors = SwitchDefaults.colors(),
    interactionSource: MutableInteractionSource? = null,
)
```

```kotlin
var checked by remember { mutableStateOf(true) }
Switch(
    checked = checked,
    onCheckedChange = { checked = it }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `Boolean` | — | Whether this switch is checked. |
| `onCheckedChange` | `((Boolean) -> Unit)?` | — | Called when clicked. If `null`, not interactable unless handled elsewhere. |
| `modifier` | `Modifier` | `Modifier` | Applied to this switch. |
| `thumbContent` | `(@Composable () -> Unit)?` | `null` | Content drawn inside the thumb, expected to measure `SwitchDefaults.IconSize`. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `colors` | `SwitchColors` | `SwitchDefaults.colors()` | Resolves colors used for track/thumb in different states. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |

## Notes

- Use `thumbContent` with `Modifier.size(SwitchDefaults.IconSize)` to show a checkmark icon inside the thumb when checked.
- Package: `androidx.compose.material3`.
- This is the Jetpack Compose (Kotlin) API — distinct from the same-named SwiftUI / Ark UI / Chakra UI / fandhe-frontend components.

## Related

- [Checkbox](./checkbox.md)
