# ComposeTestRule

JUnit4 `TestRule` that hosts Compose content under test and drives the semantics tree during a test. `createComposeRule()` creates a standalone rule; `createAndroidComposeRule<A>()` creates one backed by an `Activity` (needed to access the activity instance or for hybrid View/Compose apps).

## Signature / Usage

```kotlin
fun createComposeRule(): ComposeContentTestRule

inline fun <reified A : ComponentActivity> createAndroidComposeRule(): AndroidComposeTestRule<ActivityScenarioRule<A>, A>

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
- `AndroidComposeTestRule<R : TestRule, A : ComponentActivity>` is the Android implementation of `ComposeContentTestRule`; it exposes `activity: A` for interacting with the hosting Activity.
- Artifact: `androidx.compose.ui:ui-test-junit4` (and `androidx.compose.ui:ui-test-manifest` as `debugImplementation` when using `createComposeRule()`).
- Test methods are automatically synchronized with Compose; see `synchronization.md` for `waitForIdle` / `mainClock` details.

## Related

- [finders](./finders.md)
- [synchronization](./synchronization.md)
- [espresso-interop](./espresso-interop.md)
