# SegmentedListItem

A `ListItem` variant whose base shape is derived from its index within a visually grouped, segmented list (e.g. rounded corners only at the group's start/end), rather than a single flat rectangle repeated for every row.

## Signature / Usage

```kotlin
@Composable
fun SegmentedListItem(
    shapes: ListItemShapes,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    leadingContent: @Composable (() -> Unit)? = null,
    trailingContent: @Composable (() -> Unit)? = null,
    overlineContent: @Composable (() -> Unit)? = null,
    supportingContent: @Composable (() -> Unit)? = null,
    verticalAlignment: Alignment.Vertical = ListItemDefaults.verticalAlignment(),
    colors: ListItemColors = ListItemDefaults.segmentedColors(),
    elevation: ListItemElevation = ListItemDefaults.elevation(),
    contentPadding: PaddingValues = ListItemDefaults.ContentPadding,
    content: @Composable () -> Unit,
)
```

```kotlin
val shapes = ListItemDefaults.segmentedShapes(index = index, count = items.size)

SegmentedListItem(
    shapes = shapes,
    leadingContent = { Icon(Icons.Filled.Favorite, contentDescription = null) },
    supportingContent = { Text("Supporting text") }
) {
    Text("Headline")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `shapes` | `ListItemShapes` | — | Base/pressed/dragged shapes for this row; typically derived from the row's index via `ListItemDefaults.segmentedShapes()` so only the group's first/last rows get rounded outer corners. |
| `modifier` | `Modifier` | `Modifier` | Applied to the list item. |
| `enabled` | `Boolean` | `true` | Controls the enabled/disabled visual state. |
| `leadingContent` | `@Composable (() -> Unit)?` | `null` | Slot before the main content, e.g. icon or avatar. |
| `trailingContent` | `@Composable (() -> Unit)?` | `null` | Slot after the main content, e.g. icon or metadata. |
| `overlineContent` | `@Composable (() -> Unit)?` | `null` | Small text shown above the headline. |
| `supportingContent` | `@Composable (() -> Unit)?` | `null` | Secondary text shown below the headline. |
| `verticalAlignment` | `Alignment.Vertical` | `ListItemDefaults.verticalAlignment()` | Vertical alignment of the row. |
| `colors` | `ListItemColors` | `ListItemDefaults.segmentedColors()` | Resolves container/content colors for the segmented variant. |
| `elevation` | `ListItemElevation` | `ListItemDefaults.elevation()` | Controls shadow size. |
| `contentPadding` | `PaddingValues` | `ListItemDefaults.ContentPadding` | Padding around the content. |
| `content` | `@Composable () -> Unit` | — | The main/headline content. |

## Notes

- This overload does not handle any interaction events. Dedicated overloads add interactions in place of `content`/`enabled` handling, mirroring plain `ListItem`: one taking `onClick` (+ optional `onLongClick`, `interactionSource`) for clickable rows, one taking `selected: Boolean, onClick` for single-selection rows, and one taking `checked: Boolean, onCheckedChange` for multi-selection rows — all otherwise sharing the same slot parameters plus the required `shapes` parameter.
- Part of the Expressive list-item API surface alongside a new non-interactive `ListItem` variant; both are no longer experimental as of Compose Material3 1.5.0-alpha23. An older, non-expressive list-item implementation is deprecated in favor of these.
- Package: `androidx.compose.material3`.

## Related

- [ListItem](./listitem.md)
