# FilterChip

Filter chips use tags or descriptive words to filter content. They can be a good alternative to toggle buttons or checkboxes, and show a checkmark leading icon when selected.

## Signature / Usage

```kotlin
@Composable
public fun FilterChip(
    selected: Boolean,
    onClick: () -> Unit,
    label: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    leadingIcon: @Composable (() -> Unit)? = null,
    trailingIcon: @Composable (() -> Unit)? = null,
    shape: Shape = FilterChipDefaults.shape,
    colors: SelectableChipColors = FilterChipDefaults.filterChipColors(),
    elevation: SelectableChipElevation? = FilterChipDefaults.filterChipElevation(),
    border: BorderStroke? = FilterChipDefaults.filterChipBorder(enabled, selected),
    horizontalArrangement: Arrangement.Horizontal = FilterChipDefaults.horizontalArrangement(),
    contentPadding: PaddingValues = FilterChipDefaults.ContentPadding,
    interactionSource: MutableInteractionSource? = null,
)
```

```kotlin
var selected by remember { mutableStateOf(false) }
FilterChip(
    selected = selected,
    onClick = { selected = !selected },
    label = { Text("Filter chip") },
    leadingIcon = if (selected) {
        { Icon(Icons.Filled.Done, contentDescription = null, Modifier.size(FilterChipDefaults.IconSize)) }
    } else null
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `Boolean` | — | Whether this chip is currently selected. |
| `onClick` | `() -> Unit` | — | Called when the chip is clicked; caller toggles `selected`. |
| `label` | `@Composable () -> Unit` | — | Text displayed on the chip. |
| `modifier` | `Modifier` | `Modifier` | Applied to this chip. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `leadingIcon` | `@Composable (() -> Unit)?` | `null` | Icon at the start, commonly a checkmark shown only when `selected`. |
| `trailingIcon` | `@Composable (() -> Unit)?` | `null` | Icon at the end of the chip. |
| `shape` | `Shape` | `FilterChipDefaults.shape` | Shape of the chip container. |
| `colors` | `SelectableChipColors` | `FilterChipDefaults.filterChipColors()` | Resolves colors for selected/unselected states. |
| `elevation` | `SelectableChipElevation?` | `FilterChipDefaults.filterChipElevation()` | Controls the chip's shadow. |
| `border` | `BorderStroke?` | `FilterChipDefaults.filterChipBorder(enabled, selected)` | Border drawn around the chip; varies with selection. |
| `horizontalArrangement` | `Arrangement.Horizontal` | `FilterChipDefaults.horizontalArrangement()` | Arrangement of leading icon / label / trailing icon. |
| `contentPadding` | `PaddingValues` | `FilterChipDefaults.ContentPadding` | Spacing between the container and content. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |

## Notes

- `ElevatedFilterChip` is a style variant with the same parameters and elevated default appearance via `FilterChipDefaults.elevatedFilterChipColors()` / `elevatedFilterChipElevation()`; no separate page.
- The caller is responsible for holding and toggling `selected` state; the composable does not manage it internally.
- Package: `androidx.compose.material3`.

## Related

- [AssistChip](./assistchip.md)
- [InputChip](./inputchip.md)
