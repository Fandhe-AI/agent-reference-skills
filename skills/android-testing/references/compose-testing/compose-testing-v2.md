# Compose Testing v2 APIs

The current, recommended replacement for the v1 JUnit4 rule/`runComposeUiTest` APIs documented elsewhere in this category — the v1 factories are now `@Deprecated` and official guidance is to migrate. The defining behavioral change: v2 drives composition with `StandardTestDispatcher` by default instead of v1's `UnconfinedTestDispatcher`, so launched coroutines are queued on a scheduler rather than run eagerly — closer to plain `kotlinx.coroutines.test.runTest` semantics, at the cost of needing an explicit `waitForIdle()` / clock advance before asserting on their result.

## Signature / Usage

```kotlin
// androidx.compose.ui.test.v2
fun runComposeUiTest(block: suspend ComposeUiTest.() -> Unit): TestResult
fun runComposeUiTest(config: ComposeUiTestConfig, block: suspend ComposeUiTest.() -> Unit): TestResult
inline fun <reified A : ComponentActivity> runAndroidComposeUiTest(
    noinline block: suspend AndroidComposeUiTest<A>.() -> Unit,
): TestResult
inline fun <reified A : ComponentActivity> runAndroidComposeUiTest(
    config: ComposeUiTestConfig,
    noinline block: suspend AndroidComposeUiTest<A>.() -> Unit,
): TestResult
fun runEmptyComposeUiTest(block: ComposeUiTest.() -> Unit): TestResult

// androidx.compose.ui.test.junit4.v2
fun createComposeRule(config: ComposeUiTestConfig): ComposeContentTestRule
inline fun <reified A : ComponentActivity> createAndroidComposeRule(
    config: ComposeUiTestConfig,
): AndroidComposeTestRule<ActivityScenarioRule<A>, A>
fun <A : ComponentActivity> createAndroidComposeRule(
    activityClass: Class<A>,
    config: ComposeUiTestConfig,
): AndroidComposeTestRule<ActivityScenarioRule<A>, A>
fun createEmptyComposeRule(config: ComposeUiTestConfig): ComposeTestRule
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

### Migrate to ComposeUiTestConfig

```kotlin
val testConfig = ComposeUiTestConfig(
    effectContext = EmptyCoroutineContext,
    runTestContext = EmptyCoroutineContext,
    testTimeout = 30.seconds
)

@get:Rule
val rule = createComposeRule(config = testConfig)

// OR

    runComposeUiTest(config = testConfig) {}
```

### Set the input mode

```kotlin
@get:Rule
val rule = createComposeRule(
    config = ComposeUiTestConfig(inputMode = InputMode.Keyboard)
)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `runComposeUiTest` | `(block) -> TestResult` / `(config, block) -> TestResult` | block-only overload resolves to `ComposeUiTestConfig()` defaults; `config` overload has none | Top-level, rule-free entry point (`androidx.compose.ui.test.v2`); launches a default host itself. The `config` overload must be passed explicitly. |
| `runAndroidComposeUiTest<A>` | `inline fun <reified A : ComponentActivity>` | — | Reified Android variant of `runComposeUiTest` that launches a specific `ComponentActivity` subclass `A`; the type parameter is inferred from the call site (e.g. `runAndroidComposeUiTest<MyActivity> { ... }`), no `Class<A>` argument needed for the v2 config-based overloads. |
| `runEmptyComposeUiTest` | `(block: ComposeUiTest.() -> Unit) -> TestResult` | — | Rule-free variant with no automatic content host, for tests where content is set by something else. |
| `createComposeRule` / `createAndroidComposeRule` (v2) | `ComposeContentTestRule` / `AndroidComposeTestRule<ActivityScenarioRule<A>, A>` | — (`config` required) | JUnit4 `@get:Rule`-style equivalents, under `androidx.compose.ui.test.junit4.v2`, replacing the deprecated v1 factories of the same name in `androidx.compose.ui.test.junit4`. `createAndroidComposeRule` has both a reified `<A>` overload (activity class inferred, e.g. `createAndroidComposeRule<MyActivity>(config)`) and a `Class<A>` overload. |
| `createEmptyComposeRule` (v2) | `ComposeTestRule` | — (`config` required) | Rule variant with no automatic content host, for tests that set content on their own Activity/View. |
| `ComposeUiTestConfig` | class (`effectContext`, `runTestContext`, `testTimeout`, `inputMode`) | `inputMode = InputMode.Touch` | Groups the environment settings that used to be separate parameters on each v1 factory. Set `ComposeUiTestConfig(inputMode = InputMode.Keyboard)` for keyboard-dependent tests. |

## Notes

- Import path matters: v1 `createComposeRule`/`createAndroidComposeRule`/`createEmptyComposeRule` live in `androidx.compose.ui.test.junit4`; their v2 counterparts live in the sibling `androidx.compose.ui.test.junit4.v2` package, and `runComposeUiTest`/`runAndroidComposeUiTest` (v2) live in `androidx.compose.ui.test.v2` — importing the wrong one silently keeps v1 (`UnconfinedTestDispatcher`) semantics.
- Common migration pitfall: launching work and asserting immediately after (e.g. `viewModel.loadData(); assertEquals(Success, ...)`) fails under v2 because the coroutine hasn't run yet. Fix with `composeTestRule.waitForIdle()`, `composeTestRule.runOnIdle { ... }`, or — to inspect an intermediate state without advancing the virtual clock — `composeTestRule.mainClock.scheduler.runCurrent()`.
- Avoid wrapping v1 assertions in an outer `runTest { ... }` block as a workaround: it creates a second, unrelated `TestCoroutineScheduler` whose `advanceTimeBy` does not advance the Compose test clock.
- Status: v1 rule factories (`createComposeRule`/`createAndroidComposeRule`/`createEmptyComposeRule` in `androidx.compose.ui.test.junit4`) and `runComposeUiTest`/`runAndroidComposeUiTest`/`runEmptyComposeUiTest` (non-`.v2`, in `androidx.compose.ui.test`) — the APIs the rest of this category documents — are now `@Deprecated`. Google's official migration guide states migration to v2 is "strongly recommended" to align with standard coroutine behavior and avoid future compatibility issues; the only preserved v1 behavior is that deprecated overloads keep using `UnconfinedTestDispatcher` so existing tests don't silently break.
- Versions: the v2 testing API changes are in `androidx.compose.ui:ui-test-junit4` / `androidx.compose.ui:ui-test` 1.11.0-alpha03+. `ComposeUiTestConfig` is included starting in 1.13 (`ui-test-junit4:1.13.0-alpha01+` and `ui-test:1.13.0-alpha01+`).
- Migrate to `ComposeUiTestConfig`: setup-function overloads that accept individual `effectContext`, `runTestContext`, or `testTimeout` parameters are deprecated; pass a single config object instead (see "Migrate to ComposeUiTestConfig" under Signature / Usage).
- Default input mode: v2 setup functions enforce `InputMode.Touch` at the start of each test for determinism and to prevent state leakage, overriding ambient device state and pre-test instrumentation setup. Tests that rely on non-touch input (e.g. keyboard focus) can fail during migration; specify the mode in `ComposeUiTestConfig` — per class via the rule, or per test via `runComposeUiTest(ComposeUiTestConfig(inputMode = InputMode.Keyboard)) { ... }` (see "Set the input mode" under Signature / Usage).

## Related

- [compose-test-rule](./compose-test-rule.md)
- [synchronization](./synchronization.md)
