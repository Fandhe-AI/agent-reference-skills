# InputChip

Input chips represent discrete pieces of information entered by a user, such as recipients or tags, typically paired with a trailing remove (X) icon.

## Signature / Usage

```kotlin
@Composable
public fun InputChip(
    selected: Boolean,
    onClick: () -> Unit,
    label: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    leadingIcon: @Composable (() -> Unit)? = null,
    avatar: @Composable (() -> Unit)? = null,
    trailingIcon: @Composable (() -> Unit)? = null,
    shape: Shape = InputChipDefaults.shape,
    colors: SelectableChipColors = InputChipDefaults.inputChipColors(),
    elevation: SelectableChipElevation? = InputChipDefaults.inputChipElevation(),
    border: BorderStroke? = InputChipDefaults.inputChipBorder(enabled, selected),
    horizontalArrangement: Arrangement.Horizontal = InputChipDefaults.horizontalArrangement(),
    contentPadding: PaddingValues = InputChipDefaults.contentPadding(avatar != null, leadingIcon != null, trailingIcon != null),
    interactionSource: MutableInteractionSource? = null,
)
```

```kotlin
InputChip(
    selected = enabled,
    onClick = { onDismiss(); enabled = !enabled },
    label = { Text(text) },
    avatar = {
        Icon(Icons.Filled.Person, contentDescription = null, Modifier.size(InputChipDefaults.AvatarSize))
    },
    trailingIcon = {
        Icon(Icons.Default.Close, contentDescription = null, Modifier.size(InputChipDefaults.AvatarSize))
    }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `Boolean` | — | Whether this chip is currently selected. |
| `onClick` | `() -> Unit` | — | Called when the chip is clicked (e.g. remove). |
| `label` | `@Composable () -> Unit` | — | Text displayed on the chip. |
| `modifier` | `Modifier` | `Modifier` | Applied to this chip. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `leadingIcon` | `@Composable (() -> Unit)?` | `null` | Icon at the start of the chip. |
| `avatar` | `@Composable (() -> Unit)?` | `null` | Avatar image/icon shown at the start instead of `leadingIcon`. |
| `trailingIcon` | `@Composable (() -> Unit)?` | `null` | Icon at the end, commonly a remove (X) button. |
| `shape` | `Shape` | `InputChipDefaults.shape` | Shape of the chip container. |
| `colors` | `SelectableChipColors` | `InputChipDefaults.inputChipColors()` | Resolves colors for selected/unselected states. |
| `elevation` | `SelectableChipElevation?` | `InputChipDefaults.inputChipElevation()` | Controls the chip's shadow. |
| `border` | `BorderStroke?` | `InputChipDefaults.inputChipBorder(enabled, selected)` | Border drawn around the chip. |
| `horizontalArrangement` | `Arrangement.Horizontal` | `InputChipDefaults.horizontalArrangement()` | Arrangement of avatar/icon / label / trailing icon. |
| `contentPadding` | `PaddingValues` | `InputChipDefaults.contentPadding(avatar != null, leadingIcon != null, trailingIcon != null)` | Spacing between the container and content; adapts to which slots are present. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |

## Notes

- `avatar` and `leadingIcon` are mutually exclusive slots at the start of the chip; use `avatar` for a person/contact image.
- Package: `androidx.compose.material3`.

## Related

- [AssistChip](./assistchip.md)
- [FilterChip](./filterchip.md)
