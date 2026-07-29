# TestNavHostController

`NavHostController` subclass from `androidx.navigation:navigation-testing` for verifying navigation logic in isolation, without rendering a real `NavHost` UI. Used in Compose UI tests to assert the current destination/route after simulated user actions, and in Fragment instrumented tests via `FragmentScenario` to assert `NavController` state.

## Signature / Usage

```kotlin
public open class TestNavHostController(context: Context) : NavHostController(context)
```

```kotlin
class NavigationTest {

    @get:Rule
    val composeTestRule = createComposeRule()
    lateinit var navController: TestNavHostController

    @Before
    fun setupAppNavHost() {
        composeTestRule.setContent {
            navController = TestNavHostController(LocalContext.current)
            navController.navigatorProvider.addNavigator(ComposeNavigator())
            AppNavHost(navController = navController)
        }
    }

    @Test
    fun appNavHost_verifyStartDestination() {
        composeTestRule
            .onNodeWithContentDescription("Start Screen")
            .assertIsDisplayed()
    }

    @Test
    fun appNavHost_clickProfile_navigatesToProfile() {
        composeTestRule.onNodeWithContentDescription("Go to Profile")
            .performClick()

        assertTrue(
            navController.currentBackStackEntry?.destination?.hasRoute<Profile>() ?: false
        )
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `context` | `Context` | — | Constructor param; pass `LocalContext.current` inside `composeTestRule.setContent { }`. |

## Notes

- Requires `androidTestImplementation("androidx.navigation:navigation-testing:$navVersion")`.
- The `NavHost` under test must accept a `NavHostController` as a parameter (e.g. `AppNavHost(navController: NavHostController)`) so a `TestNavHostController` can be substituted for the real one.
- For Compose navigation, register `ComposeNavigator` (and any other navigators used, e.g. `DialogNavigator`) on `navController.navigatorProvider` before setting content — otherwise navigation to `composable`/`dialog` destinations throws `IllegalStateException: Navigator ... is not a valid navigator`.
- Assert navigation by triggering the real UI action (click, etc.) and then reading `navController.currentBackStackEntry?.destination`; prefer `hasRoute<T>()` for type-safe routes over comparing raw route strings.
- Decouple screens from `NavController` by passing navigation as lambda callbacks (e.g. `navigateToFriendProfile: (String) -> Unit`) — this lets individual screen composables be tested without any `NavHost`/`TestNavHostController` at all.
- Fragment-based navigation is tested the same way via `FragmentScenario`, injecting a `TestNavHostController` as the fragment's `NavController` and asserting on it after simulating a click.

## Related

- [NavHostController](./navhostcontroller.md)
- [NavController](./navcontroller.md)
- [Type-Safe Routes](./type-safe-routes.md)
