# Modifier.semantics / clearAndSetSemantics / contentDescription

`semantics` attaches semantic properties to a composable for accessibility services (e.g. TalkBack), autofill, and UI testing. `clearAndSetSemantics` clears descendant semantics before setting new ones, avoiding duplicate announcements when composing custom actions.

## Signature / Usage

```kotlin
fun Modifier.semantics(
    mergeDescendants: Boolean = false,
    properties: SemanticsPropertyReceiver.() -> Unit,
): Modifier

fun Modifier.clearAndSetSemantics(
    properties: SemanticsPropertyReceiver.() -> Unit,
): Modifier
```

```kotlin
Text(
    text = text,
    style = MaterialTheme.typography.headlineSmall,
    modifier = Modifier.semantics { heading() },
)

Icon(imageVector = Icons.Filled.Favorite, contentDescription = "Like")
```

```kotlin
// Merge nested interactive children's semantics into custom actions on the row.
ArticleListItemRow(
    modifier = Modifier.semantics {
        customActions = listOf(
            CustomAccessibilityAction(label = "Open article", action = { openArticle(); true }),
            CustomAccessibilityAction(label = "Add to bookmarks", action = { addToBookmarks(); true }),
        )
    },
) {
    Article(modifier = Modifier.clearAndSetSemantics { }, onClick = openArticle)
    BookmarkButton(modifier = Modifier.clearAndSetSemantics { }, onClick = addToBookmarks)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `mergeDescendants` | `Boolean` | `false` | When `true`, merges descendant semantics into a single node (used internally by `Button`, `ListItem`, `clickable`, `toggleable`, etc.). |
| `properties` | `SemanticsPropertyReceiver.() -> Unit` | — | Lambda setting properties like `contentDescription`, `heading()`, `liveRegion`, `paneTitle`, `stateDescription`, `error(...)`, `progressBarRangeInfo`, `collectionInfo`/`collectionItemInfo`, `customActions`. |

## Notes

- `contentDescription` on `Icon`/`Image` should be `null` when the graphic is purely decorative or already described by adjacent text.
- Accessibility services and the default testing APIs operate on the *merged* semantics tree; pass `useUnmergedTree = true` in tests to inspect the unmerged tree.
- Low-level custom composables built with `Layout` or `Canvas` (no built-in semantics) must add semantics manually to be accessible.
- Package: `androidx.compose.ui.semantics`.

## Related

- [test-tag](./test-tag.md)
