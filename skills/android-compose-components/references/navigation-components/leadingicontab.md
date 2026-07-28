# LeadingIconTab

A tab displaying a text label with an icon positioned before the label. Responds to selection state through color tinting of both elements.

## Signature / Usage

```kotlin
@Composable
fun LeadingIconTab(
    selected: Boolean,
    onClick: () -> Unit,
    text: @Composable () -> Unit,
    icon: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    selectedContentColor: Color = LocalContentColor.current,
    unselectedContentColor: Color = selectedContentColor,
    interactionSource: MutableInteractionSource? = null,
)
```

```kotlin
LeadingIconTab(
    selected = selectedDestination == index,
    onClick = { selectedDestination = index },
    text = { Text(destination.label) },
    icon = { Icon(destination.icon, contentDescription = null) }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `Boolean` | — | Whether this tab is currently selected. |
| `onClick` | `() -> Unit` | — | Called when this tab is clicked. |
| `text` | `@Composable () -> Unit` | — | Text label content (required, unlike `Tab`). |
| `icon` | `@Composable () -> Unit` | — | Icon content, shown before the text (required, unlike `Tab`). |
| `modifier` | `Modifier` | `Modifier` | Applied to this tab. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `selectedContentColor` | `Color` | `LocalContentColor.current` | Content color when selected. |
| `unselectedContentColor` | `Color` | `selectedContentColor` | Content color when not selected. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |

## Notes

- Package: `androidx.compose.material3`. Used as a child of `PrimaryTabRow` / `SecondaryTabRow` (or their scrollable variants), as an alternative to `Tab` when both an icon and text are required side-by-side.

## Related

- [Tab](./tab.md)
- [PrimaryTabRow](./primarytabrow.md)
