# Tab

A primary navigation tab with slots for text and/or icon, representing a single page of content within a tab row. Indicates selection by tinting its content.

## Signature / Usage

```kotlin
@Composable
fun Tab(
    selected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    text: @Composable (() -> Unit)? = null,
    icon: @Composable (() -> Unit)? = null,
    selectedContentColor: Color = LocalContentColor.current,
    unselectedContentColor: Color = selectedContentColor,
    interactionSource: MutableInteractionSource? = null,
)
```

```kotlin
Tab(
    selected = selectedDestination == index,
    onClick = { selectedDestination = index },
    text = { Text(destination.label) }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `Boolean` | — | Whether this tab is currently selected. |
| `onClick` | `() -> Unit` | — | Called when this tab is clicked. |
| `modifier` | `Modifier` | `Modifier` | Applied to this tab. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `text` | `@Composable (() -> Unit)?` | `null` | Text label content. |
| `icon` | `@Composable (() -> Unit)?` | `null` | Icon content. |
| `selectedContentColor` | `Color` | `LocalContentColor.current` | Content color when selected. |
| `unselectedContentColor` | `Color` | `selectedContentColor` | Content color when not selected. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |

## Notes

- Package: `androidx.compose.material3`. Used as a child of `PrimaryTabRow` / `SecondaryTabRow` (or their scrollable variants).
- A content-slot overload also exists — `Tab(selected, onClick, modifier, enabled, selectedContentColor, unselectedContentColor, interactionSource, content: @Composable ColumnScope.() -> Unit)` — for fully custom tab layouts unopinionated about text/icon placement.

## Related

- [PrimaryTabRow](./primarytabrow.md)
- [LeadingIconTab](./leadingicontab.md)
