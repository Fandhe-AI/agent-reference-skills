# Actions

Extension functions on `SemanticsNodeInteraction` that inject simulated user events (clicks, text input, scrolling, gestures) into the node under test.

## Signature / Usage

```kotlin
fun SemanticsNodeInteraction.performClick(): SemanticsNodeInteraction
fun SemanticsNodeInteraction.performTextInput(text: String): SemanticsNodeInteraction
fun SemanticsNodeInteraction.performTextClearance(): SemanticsNodeInteraction
fun SemanticsNodeInteraction.performTextReplacement(text: String): SemanticsNodeInteraction
fun SemanticsNodeInteraction.performImeAction(): SemanticsNodeInteraction

fun SemanticsNodeInteraction.performScrollTo(): SemanticsNodeInteraction
fun SemanticsNodeInteraction.performScrollToIndex(index: Int): SemanticsNodeInteraction
fun SemanticsNodeInteraction.performScrollToKey(key: Any): SemanticsNodeInteraction
fun SemanticsNodeInteraction.performScrollToNode(matcher: SemanticsMatcher): SemanticsNodeInteraction

fun SemanticsNodeInteraction.performTouchInput(block: TouchInjectionScope.() -> Unit): SemanticsNodeInteraction
fun SemanticsNodeInteraction.performMouseInput(block: MouseInjectionScope.() -> Unit): SemanticsNodeInteraction
fun SemanticsNodeInteraction.performKeyInput(block: KeyInjectionScope.() -> Unit): SemanticsNodeInteraction

fun <T : Function<Boolean>> SemanticsNodeInteraction.performSemanticsAction(
    key: SemanticsPropertyKey<AccessibilityAction<T>>,
    invocation: (T) -> Unit,
): SemanticsNodeInteraction

fun SemanticsNodeInteraction.requestFocus(): SemanticsNodeInteraction
```

```kotlin
composeTestRule.onNodeWithText("Submit").performClick()

composeTestRule.onNodeWithTag("emailInput")
    .performTextInput("user@example.com")

composeTestRule.onNodeWithTag("carousel")
    .performTouchInput { swipeLeft() }

composeTestRule.onNodeWithTag("list")
    .performScrollToIndex(5)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `String` | — | Text sent to the node as if typed via IME. |
| `index` | `Int` | — | Target item index for `LazyColumn`/`LazyRow`-style scrollables. |
| `key` | `Any` | — | Target item key (for keyed lazy list items). |
| `matcher` | `SemanticsMatcher` | — | Matcher identifying the target content to scroll to. |
| `block` | `TouchInjectionScope.() -> Unit` / `MouseInjectionScope.() -> Unit` / `KeyInjectionScope.() -> Unit` | — | Gesture/input DSL (e.g. `swipeLeft()`, `click(position)`, `down()`/`up()`). |

## Notes

- Actions cannot be chained inside a single `perform*` call; issue separate `perform*` calls in sequence instead.
- `performGesture { ... }` (using `GestureScope`) is deprecated in favor of `performTouchInput`.
- Each `perform*` call automatically waits for Compose to be idle first (see synchronization).
- Package: `androidx.compose.ui.test`. Artifact: `androidx.compose.ui:ui-test-junit4`.
- This is Jetpack Compose UI testing (Kotlin, `androidx.compose.ui.test`) — distinct from the same-named Playwright / Vitest / Storybook API.

## Related

- [finders](./finders.md)
- [assertions](./assertions.md)
- [synchronization](./synchronization.md)
