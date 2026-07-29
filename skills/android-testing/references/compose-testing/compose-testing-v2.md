# Compose Testing v2 APIs

An experimental (alpha) alternative to the v1 JUnit4 rule/`runComposeUiTest` APIs documented elsewhere in this category. The defining behavioral change: v2 drives composition with `StandardTestDispatcher` by default instead of v1's `UnconfinedTestDispatcher`, so launched coroutines are queued on a scheduler rather than run eagerly — closer to plain `kotlinx.coroutines.test.runTest` semantics, at the cost of needing an explicit `waitForIdle()` / clock advance before asserting on their result.

## Signature / Usage

```kotlin
// androidx.compose.ui.test.v2
fun runComposeUiTest(
    config: ComposeUiTestConfig = ComposeUiTestConfig(),
    block: suspend ComposeUiTest.() -> Unit,
): TestResult

// androidx.compose.ui.test.junit4.v2
fun createComposeRule(config: ComposeUiTestConfig = ComposeUiTestConfig()): ComposeContentTestRule
fun <A : ComponentActivity> createAndroidComposeRule(
    activityClass: Class<A>,
    config: ComposeUiTestConfig = ComposeUiTestConfig(),
): AndroidComposeTestRule<ActivityScenarioRule<A>, A>
fun createEmptyComposeRule(config: ComposeUiTestConfig = ComposeUiTestConfig()): ComposeTestRule
```

```kotlin
@Test
fun testWithCoroutines() = runComposeUiTest {
    setContent {
        var status by remember { mutableStateOf("Loading...") }
        LaunchedEffect(Unit) {
            delay(1000)
            status = "Done!"
        }
        Text(text = status)
    }

    onNodeWithText("Loading...").assertIsDisplayed()
    // Coroutines are queued, not run eagerly: advance the clock explicitly.
    mainClock.advanceTimeBy(1000 + 16 /* one frame */)
    onNodeWithText("Done!").assertIsDisplayed()
}
```

## Options / Props

| Name | Description |
| --- | --- |
| `runComposeUiTest` | Top-level, rule-free entry point (`androidx.compose.ui.test.v2`); launches a default host itself. |
| `runAndroidComposeUiTest<A>` | Android variant of `runComposeUiTest` that launches a specific `ComponentActivity` subclass. |
| `createComposeRule` / `createAndroidComposeRule` (v2) | JUnit4 `@get:Rule`-style equivalents, under `androidx.compose.ui.test.junit4.v2`, so both styles can opt in independently of the v1 factories in `androidx.compose.ui.test.junit4`. |
| `createEmptyComposeRule` (v2) | Rule variant with no automatic content host, for tests that set content on their own Activity/View. |
| `ComposeUiTestConfig` | Groups the `effectContext`, `runTestContext`/test timeout, and other environment settings that used to be separate parameters on each factory. |

## Notes

- Import path matters: v1 `createComposeRule`/`createAndroidComposeRule`/`createEmptyComposeRule` live in `androidx.compose.ui.test.junit4`; their v2 counterparts live in the sibling `androidx.compose.ui.test.junit4.v2` package, and `runComposeUiTest`/`runAndroidComposeUiTest` (v2) live in `androidx.compose.ui.test.v2` — importing the wrong one silently keeps v1 (`UnconfinedTestDispatcher`) semantics.
- Common migration pitfall: launching work and asserting immediately after (e.g. `viewModel.loadData(); assertEquals(Success, ...)`) fails under v2 because the coroutine hasn't run yet. Fix with `composeTestRule.waitForIdle()`, `composeTestRule.runOnIdle { ... }`, or — to inspect an intermediate state without advancing the virtual clock — `composeTestRule.mainClock.scheduler.runCurrent()`.
- Avoid wrapping v1 assertions in an outer `runTest { ... }` block as a workaround: it creates a second, unrelated `TestCoroutineScheduler` whose `advanceTimeBy` does not advance the Compose test clock.
- Status: alpha (introduced around `androidx.compose.ui:ui-test-junit4`/`ui-test` `1.11.0-alpha03`). v1 rule factories and `runComposeUiTest`/`runAndroidComposeUiTest` remain fully supported and are what the rest of this category documents; v2 is opt-in, not a hard replacement.

## Related

- [compose-test-rule](./compose-test-rule.md)
- [synchronization](./synchronization.md)
