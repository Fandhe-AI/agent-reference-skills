# Compose testing cheatsheet

One-page summary of the Compose testing API (cheat sheet v1.1.0): finders, assertions, matchers, selectors, actions, test rules, and debug helpers.

## Signature / Usage

```kotlin
@get:Rule
val testRule = createComposeRule()
// or, when an Activity is needed:
// val testRule = createAndroidComposeRule<Activity>()

testRule.setContent { }
testRule.onNodeWithTag("tag").performClick()
```

## Options / Props

### Finders

| Single node | Multiple nodes |
|-------------|----------------|
| `onNode(matcher)` | `onAllNodes(matcher)` |
| `onNodeWithContentDescription` | `onAllNodesWithContentDescription` |
| `onNodeWithTag` | `onAllNodesWithTag` |
| `onNodeWithText` | `onAllNodesWithText` |
| `onRoot` | — |

Option: `useUnmergedTree: Boolean`.

### Assertions

- `assert(matcher)`, `assertExists`, `assertDoesNotExist`
- `assertContentDescriptionContains`, `assertContentDescriptionEquals`
- `assertIs[Not]Displayed`, `assertIs[Not]Enabled`, `assertIs[Not]Selected`, `assertIs[Not]Focused`
- `assertIsOn`, `assertIsOff`, `assertIsToggleable`, `assertIsSelectable`
- `assertTextEquals`, `assertTextContains`, `assertValueEquals`, `assertRangeInfoEquals`
- `assertHas[No]ClickAction`

Collections: `assertAll`, `assertAny`, `assertCountEquals(Int)`.

Bounds: `assert[Width|Height]IsEqualTo`, `assertIsEqualTo`, `assert[Width|Height]IsAtLeast`, `assertTouch[Width|Height]IsEqualTo`, `assertTopPositionInRootIsEqualTo`, `assertLeftPositionInRootIsEqualTo`, `getAlignmentLinePosition(BaseLine)`, `getUnclippedBoundsInRoot`.

### Matchers

- General: `has[No]ClickAction`, `hasContentDescription[Exactly]`, `hasImeAction`, `hasProgressBarRangeInfo`, `has[No]ScrollAction`, `hasScrollTo[Index|Key|Node]Action`, `hasSetTextAction`, `hasStateDescription`, `hasTestTag`, `hasText[Exactly]`
- State: `is[Not]Dialog`, `is[Not]Enabled`, `is[Not]Focused`, `is[Not]Selected`, `isHeading`, `isOff`, `isOn`, `isPopup`, `isSelectable`, `isToggleable`, `isFocusable`, `isRoot`
- Hierarchical: `hasParent`, `hasAnyChild`, `hasAnySibling`, `hasAnyDescendant`, `hasAnyAncestor`

### Selectors

`filter(matcher)`, `filterToOne(matcher)`, `onAncestors`, `onChild`, `onChildAt`, `onChildren`, `onFirst`, `onLast`, `onParent`, `onSibling`, `onSiblings`.

### Actions

- `performClick`, `performScrollTo`, `performSemanticsAction`, `performKeyPress`, `performImeAction`
- `performTextClearance`, `performTextInput`, `performTextReplacement`
- `performMultiModalInput`
- `performTouchInput` with touch input: `click`, `doubleClick`, `longClick`, `pinch`, `swipe`, `swipe[Down|Left|Right|Up]`, `swipeWithVelocity`
- Touch input partial: `down`, `moveTo`, `movePointerTo`, `moveBy`, `movePointerBy`, `move`, `up`, `cancel`

### Test rules and Debug

| Group | Members |
|-------|---------|
| ComposeTestRule (`createComposeRule()`) | `setContent { }`, `density`, `runOnIdle { }`, `runOnUiThread { }`, `waitForIdle()`, `waitUntil { }`, `awaitIdle()`, `[un]registerIdlingResource()`, `mainClock.autoAdvance`, `mainClock.currentTime`, `mainClock.advanceTimeBy()`, `mainClock.advanceTimeByFrame()`, `mainClock.advanceTimeUntil { }` |
| AndroidComposeTestRule (`createAndroidComposeRule<Activity>()`) | all `ComposeTestRule` members, plus `activity`, `activityRule` |
| Debug | `printToString()`, `printToLog()`, `captureToImage()` |

## Notes

- The cheat sheet writes `onNode(...).*` as shorthand for chaining finders with assertions/actions.
- Source is the official cheat sheet image (v1.1.0), published at `goo.gle/compose-testing`; it lists names only, with no signatures. See the linked pages for signatures.
- The cheat sheet's page URL is `https://developer.android.com/develop/ui/compose/testing/testing-cheatsheet`.

## Related

- [finders](./finders.md)
- [assertions](./assertions.md)
- [actions](./actions.md)
- [semantics-matcher](./semantics-matcher.md)
- [compose-test-rule](./compose-test-rule.md)
- [synchronization](./synchronization.md)
- [debug](./debug.md)
