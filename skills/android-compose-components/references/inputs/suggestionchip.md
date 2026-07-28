# SuggestionChip

Suggestion chips help narrow a user's intent by presenting dynamically generated suggestions, such as possible responses or search filters. The most basic of the chip types.

## Signature / Usage

```kotlin
@Composable
public fun SuggestionChip(
    onClick: () -> Unit,
    label: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    icon: @Composable (() -> Unit)? = null,
    shape: Shape = SuggestionChipDefaults.shape,
    colors: ChipColors = SuggestionChipDefaults.suggestionChipColors(),
    elevation: ChipElevation? = SuggestionChipDefaults.suggestionChipElevation(),
    border: BorderStroke? = SuggestionChipDefaults.suggestionChipBorder(enabled),
    horizontalArrangement: Arrangement.Horizontal = SuggestionChipDefaults.horizontalArrangement(),
    contentPadding: PaddingValues = SuggestionChipDefaults.ContentPadding,
    interactionSource: MutableInteractionSource? = null,
)
```

```kotlin
SuggestionChip(
    onClick = { /* action */ },
    label = { Text("Suggestion chip") }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `() -> Unit` | — | Called when the chip is clicked. |
| `label` | `@Composable () -> Unit` | — | Text displayed on the chip. |
| `modifier` | `Modifier` | `Modifier` | Applied to this chip. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `icon` | `@Composable (() -> Unit)?` | `null` | Icon at the start of the chip (single icon slot, unlike `AssistChip`'s `leadingIcon`/`trailingIcon`). |
| `shape` | `Shape` | `SuggestionChipDefaults.shape` | Shape of the chip container. |
| `colors` | `ChipColors` | `SuggestionChipDefaults.suggestionChipColors()` | Resolves colors in different states. |
| `elevation` | `ChipElevation?` | `SuggestionChipDefaults.suggestionChipElevation()` | Controls the chip's shadow. |
| `border` | `BorderStroke?` | `SuggestionChipDefaults.suggestionChipBorder(enabled)` | Border drawn around the chip. |
| `horizontalArrangement` | `Arrangement.Horizontal` | `SuggestionChipDefaults.horizontalArrangement()` | Arrangement of icon / label. |
| `contentPadding` | `PaddingValues` | `SuggestionChipDefaults.ContentPadding` | Spacing between the container and content. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |

## Notes

- `ElevatedSuggestionChip` is a style variant with the same parameters and elevated default appearance via `SuggestionChipDefaults.elevatedSuggestionChipColors()` / `elevatedSuggestionChipElevation()`; no separate page.
- Typically shown beneath an input field as a row of dynamically generated options.
- Package: `androidx.compose.material3`.

## Related

- [AssistChip](./assistchip.md)
