# ComposeTestRule

JUnit4 `TestRule` that hosts Compose content under test and drives the semantics tree during a test. `createComposeRule()` creates a standalone rule; `createAndroidComposeRule<A>()` creates one backed by an `Activity` (needed to access the activity instance or for hybrid View/Compose apps); `createEmptyComposeRule()` creates a rule with no host and no `setContent` at all, for tests where content is set by something else (e.g. the app's own launched Activity).

## Signature / Usage

```kotlin
fun createComposeRule(): ComposeContentTestRule

inline fun <reified A : ComponentActivity> createAndroidComposeRule(): AndroidComposeTestRule<ActivityScenarioRule<A>, A>

fun createEmptyComposeRule(): ComposeTestRule

interface ComposeContentTestRule : ComposeTestRule {
    fun setContent(composable: @Composable () -> Unit)
}

interface ComposeTestRule : SemanticsNodeInteractionsProvider, TestRule {
    val mainClock: MainTestClock
    fun <T> runOnIdle(action: () -> T): T
    fun <T> runOnUiThread(action: () -> T): T
    fun waitForIdle()
    fun waitUntil(timeoutMillis: Long = 1_000L, condition: () -> Boolean)
    fun registerIdlingResource(idlingResource: IdlingResource)
    fun unregisterIdlingResource(idlingResource: IdlingResource)
}
```

```kotlin
class MyComposeTest {
    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun myTest() {
        composeTestRule.setContent {
            MyAppTheme {
                MainScreen(uiState = fakeUiState)
            }
        }

        composeTestRule.onNodeWithText("Continue").performClick()
        composeTestRule.onNodeWithText("Welcome").assertIsDisplayed()
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `mainClock` | `MainTestClock` | — | Virtual clock driving recomposition, animation, and gesture timing. See synchronization. |
| `setContent` | `@Composable () -> Unit` | — | Sets the Compose content hierarchy under test. Available only on `ComposeContentTestRule` (the rule returned by `createComposeRule` / `createAndroidComposeRule`), not the bare Activity-scenario rule. |

## Notes

- `createComposeRule()` requires no Activity; add `debugImplementation("androidx.compose.ui:ui-test-manifest:$compose_version")` so a stub `ComponentActivity` can be launched to host content.
- `createAndroidComposeRule<YourActivity>()` uses your own Activity, so `ui-test-manifest` is not needed; `setContent` calls your Activity's `setContent`.
- `createEmptyComposeRule()` returns a bare `ComposeTestRule` (no `setContent` method at all) — use it when some other component (your own launched Activity, a Fragment, etc.) sets the Compose content and the rule is only needed for its idling/synchronization behavior.
- `AndroidComposeTestRule<R : TestRule, A : ComponentActivity>` is the Android implementation of `ComposeContentTestRule`; it exposes `activity: A` for interacting with the hosting Activity.
- Artifact: `androidx.compose.ui:ui-test-junit4` (and `androidx.compose.ui:ui-test-manifest` as `debugImplementation` when using `createComposeRule()`).
- Test methods are automatically synchronized with Compose; see `synchronization.md` for `waitForIdle` / `mainClock` details.
- Google's migration guide additionally documents an alpha v2 factory family (`androidx.compose.ui.test.junit4.v2.createComposeRule`/`createAndroidComposeRule`/`createEmptyComposeRule`, plus rule-free `runComposeUiTest`) that defaults to `StandardTestDispatcher` instead of this page's `UnconfinedTestDispatcher` behavior; the factories documented above remain the fully-supported default. See compose-testing-v2.md.

## Related

- [finders](./finders.md)
- [synchronization](./synchronization.md)
- [espresso-interop](./espresso-interop.md)
- [compose-testing-v2](./compose-testing-v2.md)
