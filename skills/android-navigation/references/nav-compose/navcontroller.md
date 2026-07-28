# NavController

Central API for navigation. Keeps track of the navigation graph and the back stack of destinations, and provides methods to move between them.

## Signature / Usage

```kotlin
public open var graph: NavGraph
public open val currentBackStackEntry: NavBackStackEntry?
public val currentBackStackEntryFlow: Flow<NavBackStackEntry>
public open val previousBackStackEntry: NavBackStackEntry?

@MainThread
public fun <T : Any> navigate(route: T, builder: NavOptionsBuilder.() -> Unit)

@MainThread
public fun <T : Any> navigate(
    route: T,
    navOptions: NavOptions? = null,
    navigatorExtras: Navigator.Extras? = null,
)

@MainThread
public open fun popBackStack(): Boolean
```

```kotlin
navController.navigate(route = FriendsList)

navController.navigate(route = FriendsList) {
    launchSingleTop = true
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `graph` | `NavGraph` | — | The topmost navigation graph associated with this controller. |
| `currentBackStackEntry` | `NavBackStackEntry?` | — | The topmost entry on the back stack. |
| `currentBackStackEntryFlow` | `Flow<NavBackStackEntry>` | — | Emits the currently active entry whenever it changes. |
| `previousBackStackEntry` | `NavBackStackEntry?` | — | The previous visible entry, skipping entries associated with a `NavGraph` itself. |
| `navigate(route, builder)` | `<T : Any>(T, NavOptionsBuilder.() -> Unit) -> Unit` | — | Navigates to a type-safe route, configuring `NavOptions` inline via DSL. |
| `navigate(route, navOptions, navigatorExtras)` | `<T : Any>(T, NavOptions?, Navigator.Extras?) -> Unit` | `null`, `null` | Navigates to a type-safe route with a pre-built `NavOptions`. |
| `popBackStack()` | `() -> Boolean` | — | Pops the current destination off the back stack; returns `false` if nothing was popped. |

## Notes

- Other `navigate()` overloads accept `String` routes, `NavDeepLinkRequest`, or a deep link `Uri` (Views/Fragments interop).
- Obtained in Compose via [rememberNavController](./remembernavcontroller.md); a `NavHost` associates a `NavController` with a single navigation graph.
- Prefer exposing navigation as lambda callbacks from composables rather than passing `NavController` itself, for testability and encapsulation.
- Package: `androidx.navigation`.

## Related

- [NavHost](./navhost.md)
- [NavHostController](./navhostcontroller.md)
- [NavOptions](./navoptions.md)
- [popBackStack](./popbackstack.md)
- [currentBackStackEntryAsState](./currentbackstackentryasstate.md)
