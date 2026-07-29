# Synchronization

Compose tests are synchronized with the UI by default: every `assert*` / `perform*` call on `ComposeTestRule` waits until the composition, its animations, and pending draw/layout passes are idle before proceeding. `MainTestClock` (`composeTestRule.mainClock`) is the virtual clock that drives this.

## Signature / Usage

```kotlin
interface MainTestClock {
    val currentTime: Long
    var autoAdvance: Boolean
    fun advanceTimeByFrame()
    fun advanceTimeBy(milliseconds: Long, ignoreFrameDuration: Boolean = false)
    fun advanceTimeUntil(timeoutMillis: Long = 1_000L, condition: () -> Boolean)
}

fun ComposeTestRule.waitForIdle()
fun ComposeTestRule.waitUntil(timeoutMillis: Long = 1_000L, condition: () -> Boolean)
fun ComposeTestRule.waitUntilAtLeastOneExists(matcher: SemanticsMatcher, timeoutMillis: Long = 1_000L)
fun ComposeTestRule.waitUntilDoesNotExist(matcher: SemanticsMatcher, timeoutMillis: Long = 1_000L)
fun ComposeTestRule.waitUntilExactlyOneExists(matcher: SemanticsMatcher, timeoutMillis: Long = 1_000L)
fun ComposeTestRule.waitUntilNodeCount(matcher: SemanticsMatcher, count: Int, timeoutMillis: Long = 1_000L)
```

```kotlin
@Test
fun counterTest() {
    val myCounter = mutableStateOf(0)
    composeTestRule.setContent { Text(myCounter.value.toString()) }

    myCounter.value = 1 // No recomposition happens yet

    // Triggers recomposition and waits for idle before asserting
    composeTestRule.onNodeWithText("1").assertExists()
}

// Manual clock control, e.g. for animation screenshots
composeTestRule.mainClock.autoAdvance = false
composeTestRule.mainClock.advanceTimeBy(500)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `autoAdvance` | `Boolean` | `true` | When `true`, the clock advances automatically so `waitForIdle` runs the composition to completion. Set `false` to step the clock manually. |
| `timeoutMillis` | `Long` | `1_000L` | Maximum time `waitUntil*` waits for `condition` before failing. |
| `condition` | `() -> Boolean` | — | Predicate `waitUntil` polls until it returns `true`. |
| `milliseconds` | `Long` | — | Duration `advanceTimeBy` moves the virtual clock forward. |

## Notes

- `MainTestClock` drives recompositions, animations, and gestures, but not Android's own measure/draw passes outside Compose.
- `waitUntil` (and its `waitUntil*Exists`/`waitUntilNodeCount` helpers) is for conditions depending on external work (network/data loading) that Compose's own idling can't detect.
- Register `IdlingResource`s via `composeTestRule.registerIdlingResource(...)` / `unregisterIdlingResource(...)` for custom background work, mirroring Espresso's `IdlingResource`.
- Avoid external `CountDownLatch`-based waits — they don't advance the virtual clock and can deadlock.
- Package: `androidx.compose.ui.test`.
- This synchronization model assumes v1's default `UnconfinedTestDispatcher`, under which a launched coroutine (e.g. inside `LaunchedEffect`) runs eagerly up to its first suspension point before the next line of test code executes. The alpha v2 APIs (`runComposeUiTest`/`createComposeRule` in the `.v2` packages) default to `StandardTestDispatcher` instead, so coroutines are only queued, not run — an assertion placed immediately after triggering one can see stale state unless it goes behind `waitForIdle()`/`runOnIdle()`, or the clock's underlying scheduler is advanced explicitly with `mainClock.scheduler.runCurrent()`. See compose-testing-v2.md.

## Related

- [compose-test-rule](./compose-test-rule.md)
- [actions](./actions.md)
- [compose-testing-v2](./compose-testing-v2.md)
