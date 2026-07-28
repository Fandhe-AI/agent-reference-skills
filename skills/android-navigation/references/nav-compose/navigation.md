# navigation (nested graph)

`NavGraphBuilder` DSL function that adds a self-contained nested navigation graph to a parent `NavGraph`, grouping related destinations (e.g. a login or onboarding flow) behind a single route.

## Signature / Usage

```kotlin
public inline fun <reified T : Any> NavGraphBuilder.navigation(
    startDestination: Any,
    typeMap: Map<KType, NavType<*>> = emptyMap(),
    deepLinks: List<NavDeepLink> = emptyList(),
    noinline enterTransition: (AnimatedContentTransitionScope<NavBackStackEntry>.() -> EnterTransition?)? = null,
    noinline exitTransition: (AnimatedContentTransitionScope<NavBackStackEntry>.() -> ExitTransition?)? = null,
    noinline popEnterTransition: (AnimatedContentTransitionScope<NavBackStackEntry>.() -> EnterTransition?)? = enterTransition,
    noinline popExitTransition: (AnimatedContentTransitionScope<NavBackStackEntry>.() -> ExitTransition?)? = exitTransition,
    noinline sizeTransform: (AnimatedContentTransitionScope<NavBackStackEntry>.() -> SizeTransform?)? = null,
    noinline builder: NavGraphBuilder.() -> Unit,
)
```

```kotlin
NavHost(navController, startDestination = Title) {
    composable<Title> { TitleScreen(onPlayClicked = { navController.navigate(Game) }) }

    navigation<Game>(startDestination = Match) {
        composable<Match> { MatchScreen() }
        composable<InGame> { InGameScreen() }
    }
}

// Navigating targets a destination inside the nested graph directly:
navController.navigate(route = Match)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `T` (reified type param) | `Any` | — | The `@Serializable` route class/object identifying the nested graph itself. |
| `startDestination` | `Any` | — | Route of the first destination shown when the nested graph is entered. |
| `typeMap` | `Map<KType, NavType<*>>` | `emptyMap()` | Custom `NavType` mappings for arguments on the graph's route `T`. |
| `deepLinks` | `List<NavDeepLink>` | `emptyList()` | Deep links that resolve to this nested graph. |
| `enterTransition` / `exitTransition` / `popEnterTransition` / `popExitTransition` / `sizeTransform` | see [composable](./composable.md) | — | Transition overrides applied when entering/exiting the graph. |
| `builder` | `NavGraphBuilder.() -> Unit` | — | DSL block adding this graph's own destinations via `composable`, `dialog`, or nested `navigation`. |

## Notes

- Destinations inside a nested graph are not directly addressable from outside it; external code navigates to the graph's own route (or to a destination inside it, if intentionally exposed) rather than reaching in arbitrarily.
- Overloads accepting `route: KClass<T>` (separate from `startDestination`) and a legacy `String` startDestination/route pair also exist.
- Package: `androidx.navigation.compose`.

## Related

- [composable](./composable.md)
- [dialog](./dialog.md)
- [NavHost](./navhost.md)
- [Type-Safe Routes](./type-safe-routes.md)
