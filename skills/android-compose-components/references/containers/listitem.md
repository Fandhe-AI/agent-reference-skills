# ListItem

A continuous, vertical index row combining leading/trailing content with headline, overline, and supporting text.

## Signature / Usage

```kotlin
@Composable
fun ListItem(
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    leadingContent: @Composable (() -> Unit)? = null,
    trailingContent: @Composable (() -> Unit)? = null,
    overlineContent: @Composable (() -> Unit)? = null,
    supportingContent: @Composable (() -> Unit)? = null,
    verticalAlignment: Alignment.Vertical = ListItemDefaults.verticalAlignment(),
    shapes: ListItemShapes = ListItemDefaults.shapes(),
    colors: ListItemColors = ListItemDefaults.colors(),
    elevation: ListItemElevation = ListItemDefaults.elevation(),
    contentPadding: PaddingValues = ListItemDefaults.ContentPadding,
    content: @Composable () -> Unit,
)
```

```kotlin
ListItem(
    leadingContent = { Icon(Icons.Filled.Favorite, contentDescription = null) },
    supportingContent = { Text("Supporting text") }
) {
    Text("Headline")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to the list item. |
| `enabled` | `Boolean` | `true` | Controls the enabled/disabled visual state. |
| `leadingContent` | `@Composable (() -> Unit)?` | `null` | Slot before the main content, e.g. icon or avatar. |
| `trailingContent` | `@Composable (() -> Unit)?` | `null` | Slot after the main content, e.g. icon or metadata. |
| `overlineContent` | `@Composable (() -> Unit)?` | `null` | Small text shown above the headline. |
| `supportingContent` | `@Composable (() -> Unit)?` | `null` | Secondary text shown below the headline. |
| `verticalAlignment` | `Alignment.Vertical` | `ListItemDefaults.verticalAlignment()` | Vertical alignment of the row. |
| `shapes` | `ListItemShapes` | `ListItemDefaults.shapes()` | Shape of the container. |
| `colors` | `ListItemColors` | `ListItemDefaults.colors()` | Resolves container/content colors. |
| `elevation` | `ListItemElevation` | `ListItemDefaults.elevation()` | Controls shadow size. |
| `contentPadding` | `PaddingValues` | `ListItemDefaults.ContentPadding` | Padding around the content. |
| `content` | `@Composable () -> Unit` | — | The main/headline content. |

## Notes

- This overload does not handle any interaction events. Dedicated overloads add interactions in place of `content`/`enabled` handling: one taking `onClick` (+ optional `onLongClick`, `interactionSource`) for clickable rows, one taking `selected: Boolean, onClick` for single-selection rows, and one taking `checked: Boolean, onCheckedChange` for multi-selection rows — all otherwise sharing the same slot parameters.
- An older overload keyed on a leading `headlineContent: @Composable () -> Unit` parameter (instead of the trailing `content` lambda) is `@Deprecated` in favor of this one.
- Package: `androidx.compose.material3`.

## Related

- [Card](./card.md)
- [Divider](./divider.md)
- [SegmentedListItem](./segmentedlistitem.md)
