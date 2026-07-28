# printToLog

Debug helper that dumps a node's (or a collection's) semantics subtree to logcat, useful for inspecting what finders can see, especially when a test unexpectedly fails to match a node.

## Signature / Usage

```kotlin
fun SemanticsNodeInteraction.printToLog(tag: String, maxDepth: Int = Int.MAX_VALUE)
fun SemanticsNodeInteractionCollection.printToLog(tag: String, maxDepth: Int = Int.MAX_VALUE)
```

```kotlin
// Print the merged semantics tree from the root
composeTestRule.onRoot().printToLog("TAG")

// Print the unmerged semantics tree (before parent-child merging)
composeTestRule.onRoot(useUnmergedTree = true).printToLog("TAG")
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `tag` | `String` | — | Logcat tag used for the printed output. |
| `maxDepth` | `Int` | `Int.MAX_VALUE` | Maximum subtree depth to print. |

## Notes

- Combine with `onRoot(useUnmergedTree = true)` to see nodes before semantics merging hides child text/labels used by `useUnmergedTree = true` finders.
- Output includes each node's semantics properties (text, role, actions, etc.), which helps pick the right matcher.
- Package: `androidx.compose.ui.test`.

## Related

- [finders](./finders.md)
- [test-tag-usage](./test-tag-usage.md)
