# Assertions

Extension functions on `SemanticsNodeInteraction` and `SemanticsNodeInteractionCollection` that verify a node's (or collection's) state and fail the test with a descriptive message otherwise.

## Signature / Usage

```kotlin
fun SemanticsNodeInteraction.assert(matcher: SemanticsMatcher): SemanticsNodeInteraction
fun SemanticsNodeInteraction.assertExists(errorMessageOnFail: String? = null): SemanticsNodeInteraction
fun SemanticsNodeInteraction.assertDoesNotExist()
fun SemanticsNodeInteraction.assertIsDisplayed(): SemanticsNodeInteraction
fun SemanticsNodeInteraction.assertIsNotDisplayed(): SemanticsNodeInteraction
fun SemanticsNodeInteraction.assertIsEnabled(): SemanticsNodeInteraction
fun SemanticsNodeInteraction.assertIsNotEnabled(): SemanticsNodeInteraction
fun SemanticsNodeInteraction.assertIsSelected(): SemanticsNodeInteraction
fun SemanticsNodeInteraction.assertIsOn(): SemanticsNodeInteraction
fun SemanticsNodeInteraction.assertIsOff(): SemanticsNodeInteraction
fun SemanticsNodeInteraction.assertTextEquals(vararg text: String): SemanticsNodeInteraction
fun SemanticsNodeInteraction.assertContentDescriptionEquals(vararg value: String): SemanticsNodeInteraction

fun SemanticsNodeInteractionCollection.assertCountEquals(expectedSize: Int): SemanticsNodeInteractionCollection
fun SemanticsNodeInteractionCollection.assertAny(matcher: SemanticsMatcher): SemanticsNodeInteractionCollection
fun SemanticsNodeInteractionCollection.assertAll(matcher: SemanticsMatcher): SemanticsNodeInteractionCollection
```

```kotlin
composeTestRule.onNodeWithText("Welcome").assertIsDisplayed()

composeTestRule.onAllNodesWithContentDescription("Beatle").assertCountEquals(4)
composeTestRule.onAllNodesWithContentDescription("Beatle").assertAny(hasTestTag("Drummer"))
composeTestRule.onAllNodesWithContentDescription("Beatle").assertAll(hasClickAction())
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `matcher` | `SemanticsMatcher` | — | Condition checked for `assert` / `assertAny` / `assertAll`. |
| `text` / `value` | `vararg String` | — | Expected exact set of text / content-description values. |
| `expectedSize` | `Int` | — | Expected number of matched nodes for `assertCountEquals`. |
| `errorMessageOnFail` | `String?` | `null` | Custom message prefix shown when `assertExists` fails. |

## Notes

- Resolving a node (via `assert*`) requires it to exist in the semantics tree; `assertDoesNotExist()` is the only assertion that succeeds when zero nodes match.
- All single-node assertions return the `SemanticsNodeInteraction`, so calls chain fluently.
- Package: `androidx.compose.ui.test`. Artifact: `androidx.compose.ui:ui-test-junit4`.
- This is Jetpack Compose UI testing (Kotlin, `androidx.compose.ui.test`) — distinct from the same-named Playwright / Vitest / Storybook API.

## Related

- [finders](./finders.md)
- [semantics-matcher](./semantics-matcher.md)
- [actions](./actions.md)
