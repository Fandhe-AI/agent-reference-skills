# Migrate to Navigation 3

Guide for migrating a Wear Compose app from `SwipeDismissableNavHost` (Navigation 2, string routes) to `NavDisplay` + `rememberSwipeDismissableSceneStrategy()` (Navigation 3, type-safe `NavKey` back stack).

## Signature / Usage

```kotlin
// Before (Navigation 2)
val navController = rememberSwipeDismissableNavController()

SwipeDismissableNavHost(navController = navController, startDestination = "menu") {
    composable("menu") {
        GreetingScreen(onShowList = { navController.navigate("list") })
    }
    composable("list") { ListScreen() }
}
```

```kotlin
// After (Navigation 3)
@Serializable
sealed interface MigrationScreen : NavKey {
    @Serializable data object Landing : MigrationScreen
    @Serializable data object List : MigrationScreen
}

val backStack = rememberNavBackStack(MigrationScreen.Landing as NavKey)
val strategy = rememberSwipeDismissableSceneStrategy<NavKey>()

NavDisplay(
    backStack = backStack,
    sceneStrategies = listOf(strategy),
    entryProvider = entryProvider {
        entry<MigrationScreen.Landing> {
            GreetingScreen(onShowList = { backStack.add(MigrationScreen.List) })
        }
        entry<MigrationScreen.List> { ListScreen() }
    },
)
```

## Options / Props

| Action | Navigation 2 | Navigation 3 |
|------|------|-------------|
| Navigate forward | `navController.navigate("route")` | `backStack.add(ScreenKey)` |
| Navigate back | `navController.popBackStack()` | `backStack.removeLast()` |
| Clear stack | `navController.popBackStack(...)` | `backStack.clear()` |

## Notes

- Dependency swap: remove `androidx.wear.compose:compose-navigation`; add `androidx.navigation3:navigation3-runtime` (back stack state), `androidx.navigation3:navigation3-ui` (`NavDisplay`), `androidx.wear.compose:compose-navigation3` (Wear's `rememberSwipeDismissableSceneStrategy`), and `org.jetbrains.kotlinx:kotlinx-serialization-json` with the Kotlin serialization compiler plugin enabled.
- Every screen destination must implement the `NavKey` marker interface and be annotated `@Serializable` — required so the back stack (`NavBackStack`, a plain `MutableList<NavKey>`) can be serialized and restored across process death.
- Back stack is Compose-first: it's observable state, so `backStack.add(...)` / `.removeLast()` / `.clear()` trigger recomposition directly, replacing `NavController.navigate()` / `popBackStack()`.
- `rememberSwipeDismissableSceneStrategy<NavKey>()` supplies the Wear-specific swipe-to-dismiss / predictive-back scene to `NavDisplay`'s `sceneStrategies`; this is the Wear-only piece layered on the cross-platform Navigation 3 core.
- This guide is meant to be read together with the general cross-platform Navigation 2 → Navigation 3 migration guide, not as a standalone replacement for it.

## Related

- [NavDisplay / SwipeDismissableSceneStrategy (Navigation 3)](./navigation3.md)
- [SwipeDismissableNavHost](./swipe-dismissable-nav-host.md)
