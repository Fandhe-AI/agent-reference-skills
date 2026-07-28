# Finders

Functions on `SemanticsNodeInteractionsProvider` (implemented by `ComposeTestRule`) that select one or more nodes from the semantics tree by matcher, text, tag, content description, or the tree root.

## Signature / Usage

```kotlin
fun SemanticsNodeInteractionsProvider.onNode(
    matcher: SemanticsMatcher,
    useUnmergedTree: Boolean = false,
): SemanticsNodeInteraction

fun SemanticsNodeInteractionsProvider.onAllNodes(
    matcher: SemanticsMatcher,
    useUnmergedTree: Boolean = false,
): SemanticsNodeInteractionCollection

fun SemanticsNodeInteractionsProvider.onNodeWithText(
    text: String,
    substring: Boolean = false,
    ignoreCase: Boolean = false,
    useUnmergedTree: Boolean = false,
): SemanticsNodeInteraction

fun SemanticsNodeInteractionsProvider.onNodeWithTag(
    testTag: String,
    useUnmergedTree: Boolean = false,
): SemanticsNodeInteraction

fun SemanticsNodeInteractionsProvider.onNodeWithContentDescription(
    label: String,
    substring: Boolean = false,
    ignoreCase: Boolean = false,
    useUnmergedTree: Boolean = false,
): SemanticsNodeInteraction

fun SemanticsNodeInteractionsProvider.onRoot(
    useUnmergedTree: Boolean = false,
): SemanticsNodeInteraction
```

```kotlin
composeTestRule.onNodeWithText("Submit").performClick()
composeTestRule.onAllNodesWithTag("listItem").assertCountEquals(5)
composeTestRule.onNode(hasText("Button")).assertIsDisplayed()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `matcher` | `SemanticsMatcher` | — | Condition a node must satisfy. |
| `text` / `testTag` / `label` | `String` | — | Value to match text, `Modifier.testTag`, or content description against. |
| `substring` | `Boolean` | `false` | Match if the value contains the given string rather than equals it. |
| `ignoreCase` | `Boolean` | `false` | Case-insensitive match. |
| `useUnmergedTree` | `Boolean` | `false` | Search the unmerged semantics tree (before parent nodes merge children's semantics). |

## Notes

- `onNodeWithText` / `onNodeWithTag` / `onNodeWithContentDescription` are convenience wrappers over `onNode(matcher)`; their `onAllNodesWith*` counterparts wrap `onAllNodes(matcher)`.
- `onNode` / `onAllNodes` throw if the expected cardinality (exactly one vs. zero-or-more) is not met only when a following `assert*` / `perform*` call forces resolution — the finder call itself is lazy.
- Package: `androidx.compose.ui.test`. Artifact: `androidx.compose.ui:ui-test-junit4`.

## Related

- [semantics-matcher](./semantics-matcher.md)
- [semantics-node-interaction](./semantics-node-interaction.md)
- [assertions](./assertions.md)
