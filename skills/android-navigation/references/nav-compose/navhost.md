# NavHost

Composable that fills the navigation host area and displays the current destination of a `NavGraph` built with the `builder` DSL.

## Signature / Usage

```kotlin
@Composable
public fun NavHost(
    navController: NavHostController,
    startDestination: Any,
    modifier: Modifier = Modifier,
    contentAlignment: Alignment = Alignment.TopStart,
    route: KClass<*>? = null,
    typeMap: Map<KType, NavType<*>> = emptyMap(),
    enterTransition: (AnimatedContentTransitionScope<NavBackStackEntry>.() -> EnterTransition),
    exitTransition: (AnimatedContentTransitionScope<NavBackStackEntry>.() -> ExitTransition),
    popEnterTransition: (AnimatedContentTransitionScope<NavBackStackEntry>.() -> EnterTransition),
    popExitTransition: (AnimatedContentTransitionScope<NavBackStackEntry>.() -> ExitTransition),
    predictivePopEnterTransition: (AnimatedContentTransitionScope<NavBackStackEntry>.(Int) -> EnterTransition),
    predictivePopExitTransition: (AnimatedContentTransitionScope<NavBackStackEntry>.(Int) -> ExitTransition),
    sizeTransform: (AnimatedContentTransitionScope<NavBackStackEntry>.() -> SizeTransform?)? = null,
    builder: NavGraphBuilder.() -> Unit,
)
```

```kotlin
val navController = rememberNavController()

NavHost(navController = navController, startDestination = Profile) {
    composable<Profile> { ProfileScreen() }
    composable<FriendsList> { FriendsListScreen() }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `navController` | `NavHostController` | — | The controller managing this host's navigation. |
| `startDestination` | `Any` | — | Route object/class of the first destination shown. Can also be `String` or `KClass<*>` in other overloads. |
| `modifier` | `Modifier` | `Modifier` | Applied to the host layout. |
| `contentAlignment` | `Alignment` | `Alignment.TopStart` | Alignment of destination content within the host. |
| `route` | `KClass<*>?` | `null` | Route class for the graph as a whole, when building nested/type-safe graphs. |
| `typeMap` | `Map<KType, NavType<*>>` | `emptyMap()` | Custom `NavType` mappings for non-standard argument types used in route classes. |
| `enterTransition` / `exitTransition` / `popEnterTransition` / `popExitTransition` | `AnimatedContentTransitionScope<NavBackStackEntry>.() -> EnterTransition/ExitTransition` | — | Animations played when navigating forward/back. |
| `predictivePopEnterTransition` / `predictivePopExitTransition` | `...(Int) -> EnterTransition/ExitTransition` | — | Animations for Android predictive back gestures. |
| `sizeTransform` | `AnimatedContentTransitionScope<NavBackStackEntry>.() -> SizeTransform?` | `null` | Controls how the host resizes between destinations of different sizes. |
| `builder` | `NavGraphBuilder.() -> Unit` | — | DSL block registering destinations via `composable`, `navigation`, `dialog`. |

## Notes

- An overload accepting a pre-built `NavGraph` (created with `NavController.createGraph()`) exists in place of `startDestination` + `builder`.
- `anim`/XML-style animation blocks are not supported in Compose; use the `enterTransition`/`exitTransition` lambdas instead.
- Package: `androidx.navigation.compose`.

## Related

- [NavController](./navcontroller.md)
- [rememberNavController](./remembernavcontroller.md)
- [composable](./composable.md)
- [navigation](./navigation.md)
- [dialog](./dialog.md)
