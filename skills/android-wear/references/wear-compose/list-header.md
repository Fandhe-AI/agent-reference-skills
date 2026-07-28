# ListHeader

Slot-based composable for a list section header — typically a few words on a single line, start/end padded.

## Signature / Usage

```kotlin
@Composable
public fun ListHeader(
    modifier: Modifier = Modifier,
    backgroundColor: Color = Color.Transparent,
    contentColor: Color = ListHeaderDefaults.contentColor,
    contentPadding: PaddingValues = ListHeaderDefaults.ContentPadding,
    transformation: SurfaceTransformation? = null,
    content: @Composable RowScope.() -> Unit,
)
```

```kotlin
item {
    ListHeader { Text("Settings") }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to the header. |
| `backgroundColor` | `Color` | `Color.Transparent` | Background color. |
| `contentColor` | `Color` | `ListHeaderDefaults.contentColor` | Text/icon color. |
| `contentPadding` | `PaddingValues` | `ListHeaderDefaults.ContentPadding` | Start/end padding. |
| `transformation` | `SurfaceTransformation?` | `null` | Scale/morph transformation when used inside `TransformingLazyColumn` (combine with `Modifier.transformedHeight`). |
| `content` | `@Composable RowScope.() -> Unit` | — | Header text/content. |

## Notes

- Typically the first `item {}` of a section inside `TransformingLazyColumn` / `ScalingLazyColumn`.
- Package: `androidx.wear.compose.material3` (artifact `androidx.wear.compose:compose-material3`).

## Related

- [TransformingLazyColumn / ScalingLazyColumn](./lists.md)
- [Card](./card.md)
