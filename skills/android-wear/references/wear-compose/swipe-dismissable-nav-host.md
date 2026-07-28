# SwipeDismissableNavHost

Wear-specific replacement for `NavHost` that adds swipe-to-dismiss gesture navigation. Used inside `AppScaffold` together with `rememberSwipeDismissableNavController()`.

## Signature / Usage

```kotlin
@Composable
public fun SwipeDismissableNavHost(
    navController: NavHostController,
    startDestination: String,
    modifier: Modifier = Modifier,
    state: SwipeDismissableNavHostState,
    route: String? = null,
    builder: NavGraphBuilder.() -> Unit,
)
```

```kotlin
AppScaffold {
    val navController = rememberSwipeDismissableNavController()
    SwipeDismissableNavHost(navController = navController, startDestination = "message_list") {
        composable("message_list") {
            MessageList(onMessageClick = { id -> navController.navigate("message_detail/$id") })
        }
        composable("message_detail/{id}") {
            MessageDetail(id = it.arguments?.getString("id")!!)
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `navController` | `NavHostController` | — | Create via `rememberSwipeDismissableNavController()` (a `WearNavigator`-backed controller), not the mobile `rememberNavController()`. |
| `startDestination` | `String` | — | Initial route. |
| `modifier` | `Modifier` | `Modifier` | Applied to the host. |
| `state` | `SwipeDismissableNavHostState` | — | Manages swipe-dismiss transition state. |
| `builder` | `NavGraphBuilder.() -> Unit` | — | Declares destinations via `composable(route) { ... }`. |

## Notes

- Requires `androidx.wear.compose:compose-navigation`, not `androidx.navigation:navigation-compose`.
- Pair each destination with a `ScreenScaffold` inside a single top-level `AppScaffold`, so `TimeText` stays visible and animates correctly during swipe-to-dismiss transitions.
- Built on `BasicSwipeToDismissBox` from `androidx.wear.compose.foundation`.
- Package: `androidx.wear.compose.navigation` (artifact `androidx.wear.compose:compose-navigation`). Distinct from mobile `androidx.navigation.compose.NavHost`.

## Related

- [AppScaffold / ScreenScaffold / PagerScaffold](./scaffold.md)
- [SwipeToReveal / BasicSwipeToDismissBox](./swipe-to-reveal.md)
