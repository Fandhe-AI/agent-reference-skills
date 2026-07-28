# SemanticsNodeInteraction / SemanticsNodeInteractionCollection

`SemanticsNodeInteraction` represents a single matched node; `SemanticsNodeInteractionCollection` represents zero or more matched nodes. Both support navigation to related nodes (children, parent, siblings, ancestors, descendants) and filtering, in addition to the `assert*` / `perform*` extensions.

## Signature / Usage

```kotlin
fun SemanticsNodeInteraction.onChildren(): SemanticsNodeInteractionCollection
fun SemanticsNodeInteraction.onParent(): SemanticsNodeInteraction
fun SemanticsNodeInteraction.onSibling(): SemanticsNodeInteraction
fun SemanticsNodeInteraction.onSiblings(): SemanticsNodeInteractionCollection
fun SemanticsNodeInteraction.onAncestors(): SemanticsNodeInteractionCollection
fun SemanticsNodeInteraction.onDescendants(): SemanticsNodeInteractionCollection

fun SemanticsNodeInteractionCollection.onFirst(): SemanticsNodeInteraction
fun SemanticsNodeInteractionCollection.onLast(): SemanticsNodeInteraction
fun SemanticsNodeInteractionCollection.filter(matcher: SemanticsMatcher): SemanticsNodeInteractionCollection
fun SemanticsNodeInteractionCollection.filterToOne(matcher: SemanticsMatcher): SemanticsNodeInteraction
operator fun SemanticsNodeInteractionCollection.get(index: Int): SemanticsNodeInteraction

fun SemanticsNodeInteraction.fetchSemanticsNode(errorMessageOnFail: String? = null): SemanticsNode
fun SemanticsNodeInteractionCollection.fetchSemanticsNodes(
    atLeastOneRootRequired: Boolean = true,
    errorMessageOnFail: String? = null,
): List<SemanticsNode>
```

```kotlin
composeTestRule
    .onNode(hasTestTag("Players"))
    .onChildren()
    .filter(hasClickAction())
    .assertCountEquals(4)
    .onFirst()
    .assert(hasText("John"))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `matcher` | `SemanticsMatcher` | — | Condition used by `filter` / `filterToOne`. |
| `index` | `Int` | — | Positional index into the collection (`get`/`[]`). |
| `errorMessageOnFail` | `String?` | `null` | Custom prefix for the failure message. |
| `atLeastOneRootRequired` | `Boolean` | `true` | Whether at least one node must exist for `fetchSemanticsNodes` to succeed. |

## Notes

- `fetchSemanticsNode` / `fetchSemanticsNodes` resolve the node(s) immediately and throw if the expected cardinality is not met; most tests instead use `assert*` / `perform*`, which call these internally.
- `filterToOne` is equivalent to `filter(matcher)` followed by an implicit single-node assertion.
- Package: `androidx.compose.ui.test`.

## Related

- [finders](./finders.md)
- [semantics-matcher](./semantics-matcher.md)
- [assertions](./assertions.md)
