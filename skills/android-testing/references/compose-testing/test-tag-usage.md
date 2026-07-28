# Modifier.testTag in tests

`Modifier.testTag` attaches a stable identifier to a composable so tests can find it independent of visible text or content description. Tests match it via `onNodeWithTag` / `hasTestTag`, and can inspect the pre-merge tree with `useUnmergedTree`.

## Signature / Usage

```kotlin
// Production code
Button(onClick = { }, modifier = Modifier.testTag("submitButton")) {
    Text("Submit")
}

// Test code
composeTestRule.onNodeWithTag("submitButton").performClick()
composeTestRule.onNode(hasTestTag("submitButton")).assertIsDisplayed()

// Access unmerged semantics (e.g. a Text's own node inside a merged parent)
composeTestRule.onNodeWithTag("row", useUnmergedTree = true)
    .onChildren()
    .filterToOne(hasText("World"))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `useUnmergedTree` | `Boolean` | `false` | When `true`, finders search the tree before semantics merging combines a parent's and children's semantics into one node. |

## Notes

- Parent composables often merge their descendants' semantics (e.g. a `Row` with a clickable modifier merges its children's text into one mergeable node); `useUnmergedTree = true` is needed to target a child directly by tag or text in that case.
- To make `Modifier.testTag` values readable by UiAutomator (outside Compose's own test APIs), set `testTagsAsResourceId = true` via `Modifier.semantics { testTagsAsResourceId = true }` on an ancestor, then use `By.res(tag)`. Requires Compose 1.2.0-alpha08+.
- The `Modifier.testTag` composable modifier itself (declaration, other params) is documented in `android-compose-ui`; this page covers only test-side usage.
- Package: `androidx.compose.ui.test`.

## Related

- [finders](./finders.md)
- [print-to-log](./print-to-log.md)
- [espresso-interop](./espresso-interop.md)
