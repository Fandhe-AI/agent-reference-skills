# AssistChip

Chips help people enter information, make selections, filter content, or trigger actions. Assist chips represent smart or automated actions that can span multiple apps, such as opening a calendar event from search results.

## Signature / Usage

```kotlin
@Composable
public fun AssistChip(
    onClick: () -> Unit,
    label: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    leadingIcon: @Composable (() -> Unit)? = null,
    trailingIcon: @Composable (() -> Unit)? = null,
    shape: Shape = AssistChipDefaults.shape,
    colors: ChipColors = AssistChipDefaults.assistChipColors(),
    elevation: ChipElevation? = AssistChipDefaults.assistChipElevation(),
    border: BorderStroke? = AssistChipDefaults.assistChipBorder(enabled),
    horizontalArrangement: Arrangement.Horizontal = AssistChipDefaults.horizontalArrangement(),
    contentPadding: PaddingValues = AssistChipDefaults.ContentPadding,
    interactionSource: MutableInteractionSource? = null,
)
```

```kotlin
AssistChip(
    onClick = { /* action */ },
    label = { Text("Assist chip") },
    leadingIcon = {
        Icon(Icons.Filled.Settings, contentDescription = null, Modifier.size(AssistChipDefaults.IconSize))
    }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `() -> Unit` | — | Called when the chip is clicked. |
| `label` | `@Composable () -> Unit` | — | Text displayed on the chip. |
| `modifier` | `Modifier` | `Modifier` | Applied to this chip. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `leadingIcon` | `@Composable (() -> Unit)?` | `null` | Icon at the start of the chip. |
| `trailingIcon` | `@Composable (() -> Unit)?` | `null` | Icon at the end of the chip. |
| `shape` | `Shape` | `AssistChipDefaults.shape` | Shape of the chip container. |
| `colors` | `ChipColors` | `AssistChipDefaults.assistChipColors()` | Resolves colors in different states. |
| `elevation` | `ChipElevation?` | `AssistChipDefaults.assistChipElevation()` | Controls the chip's shadow. |
| `border` | `BorderStroke?` | `AssistChipDefaults.assistChipBorder(enabled)` | Border drawn around the chip. |
| `horizontalArrangement` | `Arrangement.Horizontal` | `AssistChipDefaults.horizontalArrangement()` | Arrangement of leading icon / label / trailing icon. |
| `contentPadding` | `PaddingValues` | `AssistChipDefaults.ContentPadding` | Spacing between the container and content. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |

## Notes

- `ElevatedAssistChip` is a style variant with the same parameters and an elevated (shadowed, borderless) default appearance via `AssistChipDefaults.elevatedAssistChipColors()` / `elevatedAssistChipElevation()`; no separate page — swap the composable name and defaults.
- `SuggestionChip` shares an almost identical shape (no `trailingIcon`, uses `icon` instead of `leadingIcon`) for dynamically generated suggestions; see Related.
- `FilterChip` / `InputChip` add a `selected: Boolean` parameter for toggleable/removable chips; see Related.
- Package: `androidx.compose.material3`.

## Related

- [FilterChip](./filterchip.md)
- [InputChip](./inputchip.md)
- [SuggestionChip](./suggestionchip.md)
