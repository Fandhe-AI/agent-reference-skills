# Modifier.testTag

Attaches a string tag to a composable so it can be located in Compose UI tests, independent of visible text or content description.

## Signature / Usage

```kotlin
@Stable
fun Modifier.testTag(tag: String): Modifier
```

```kotlin
Button(
    onClick = { /* ... */ },
    modifier = Modifier.testTag("submit_button"),
) {
    Text("Submit")
}

// In a Compose UI test:
composeTestRule.onNodeWithTag("submit_button").performClick()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `tag` | `String` | — | Identifier looked up in tests via `onNodeWithTag`. |

## Notes

- `testTag` values are not exposed to accessibility services; use [semantics](./semantics.md) (`contentDescription`, `stateDescription`, etc.) for accessibility, and `testTag` purely for locating nodes in tests.
- By default the tag is only present in the unmerged semantics tree; query with `useUnmergedTree = true` if the tagged node is merged into a parent (e.g. inside a `clickable` with `mergeDescendants = true`).
- Package: `androidx.compose.ui.platform`.

## Related

- [semantics](./semantics.md)
