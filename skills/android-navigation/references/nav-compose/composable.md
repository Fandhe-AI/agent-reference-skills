# composable

`NavGraphBuilder` DSL function that adds a composable destination, associated with a type-safe route class, to a `NavGraph`.

## Signature / Usage

```kotlin
public inline fun <reified T : Any> NavGraphBuilder.composable(
    typeMap: Map<KType, NavType<*>> = emptyMap(),
    deepLinks: List<NavDeepLink> = emptyList(),
    noinline enterTransition: (AnimatedContentTransitionScope<NavBackStackEntry>.() -> EnterTransition?)? = null,
    noinline exitTransition: (AnimatedContentTransitionScope<NavBackStackEntry>.() -> ExitTransition?)? = null,
    noinline popEnterTransition: (AnimatedContentTransitionScope<NavBackStackEntry>.() -> EnterTransition?)? = enterTransition,
    noinline popExitTransition: (AnimatedContentTransitionScope<NavBackStackEntry>.() -> ExitTransition?)? = exitTransition,
    noinline sizeTransform: (AnimatedContentTransitionScope<NavBackStackEntry>.() -> SizeTransform?)? = null,
    noinline content: @Composable AnimatedContentScope.(NavBackStackEntry) -> Unit,
)
```

```kotlin
NavHost(navController, startDestination = Profile) {
    composable<Profile> { backStackEntry ->
        val profile: Profile = backStackEntry.toRoute()
        ProfileScreen(profile)
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `T` (reified type param) | `Any` | — | The `@Serializable` route class/object identifying this destination. |
| `typeMap` | `Map<KType, NavType<*>>` | `emptyMap()` | Custom `NavType` mappings for non-standard argument types in `T`. |
| `deepLinks` | `List<NavDeepLink>` | `emptyList()` | Deep links that resolve to this destination. |
| `enterTransition` / `exitTransition` / `popEnterTransition` / `popExitTransition` | `AnimatedContentTransitionScope<NavBackStackEntry>.() -> EnterTransition?/ExitTransition?` | `null` / inherits | Per-destination transition overrides. |
| `sizeTransform` | `AnimatedContentTransitionScope<NavBackStackEntry>.() -> SizeTransform?` | `null` | Per-destination resize animation. |
| `content` | `@Composable AnimatedContentScope.(NavBackStackEntry) -> Unit` | — | The destination's composable content, receiving its `NavBackStackEntry`. |

## Notes

- A `String`-route overload (`composable(route: String, arguments: List<NamedNavArgument> = emptyList(), ...)`) exists for the legacy string-route style; type-safe routes are the current recommendation (Navigation 2.8+).
- Use `NavBackStackEntry.toRoute<T>()` inside `content` to reconstruct the typed route instance, including its arguments.
- Backed by `ComposeNavigator` (`@Navigator.Name("composable")`), registered automatically by [rememberNavController](./remembernavcontroller.md); app code is not expected to instantiate it directly.
- Package: `androidx.navigation.compose`.

## Related

- [Type-Safe Routes](./type-safe-routes.md)
- [navigation](./navigation.md)
- [dialog](./dialog.md)
- [NavBackStackEntry](./navbackstackentry.md)
