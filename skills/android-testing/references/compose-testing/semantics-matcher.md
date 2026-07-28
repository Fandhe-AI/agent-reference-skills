# SemanticsMatcher

Predicate over a `SemanticsNode`, used with `onNode` / `onAllNodes` and `assert()`. The package provides prebuilt matcher factory functions and combinators (`and`, `or`) as well as hierarchical matchers that look at parent/sibling/ancestor/descendant nodes.

## Signature / Usage

```kotlin
fun hasText(text: String, substring: Boolean = false, ignoreCase: Boolean = false): SemanticsMatcher
fun hasContentDescription(value: String, substring: Boolean = false, ignoreCase: Boolean = false): SemanticsMatcher
fun hasTestTag(testTag: String): SemanticsMatcher
fun isEnabled(): SemanticsMatcher
fun isNotEnabled(): SemanticsMatcher
fun isSelected(): SemanticsMatcher
fun isNotSelected(): SemanticsMatcher
fun isOn(): SemanticsMatcher
fun isOff(): SemanticsMatcher
fun isToggleable(): SemanticsMatcher
fun isFocusable(): SemanticsMatcher
fun hasClickAction(): SemanticsMatcher
fun isRoot(): SemanticsMatcher
fun isDialog(): SemanticsMatcher
fun isPopup(): SemanticsMatcher
fun isEditable(): SemanticsMatcher

fun hasParent(matcher: SemanticsMatcher): SemanticsMatcher
fun hasAnySibling(matcher: SemanticsMatcher): SemanticsMatcher
fun hasAnyAncestor(matcher: SemanticsMatcher): SemanticsMatcher
fun hasAnyDescendant(matcher: SemanticsMatcher): SemanticsMatcher
```

```kotlin
composeTestRule.onNode(hasText("Button") and hasClickAction()).performClick()

composeTestRule.onNode(hasParent(hasText("Button"))).assertIsDisplayed()

composeTestRule.onNode(matcher).assert(hasText("Button") or hasText("Button2"))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `text` / `value` | `String` | — | Value to compare against the node's text / content description. |
| `substring` | `Boolean` | `false` | Substring rather than exact match. |
| `ignoreCase` | `Boolean` | `false` | Case-insensitive match. |
| `testTag` | `String` | — | Value set via `Modifier.testTag`. |
| `matcher` | `SemanticsMatcher` | — | Nested matcher applied to the related node (parent / sibling / ancestor / descendant). |

## Notes

- `SemanticsMatcher` instances combine with `and` / `or` (infix functions) and negate with `not` (unary operator).
- Custom matchers can be built directly: `SemanticsMatcher(description) { node -> /* Boolean */ }`.
- Package: `androidx.compose.ui.test`. File: `Filters.kt`.

## Related

- [finders](./finders.md)
- [assertions](./assertions.md)
