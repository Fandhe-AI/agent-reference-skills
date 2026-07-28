# Type-Safe Routes

Navigation 2.8+ recommended pattern: define destinations as `@Serializable` Kotlin classes/objects instead of string route templates, giving compile-time-checked routes and arguments.

## Signature / Usage

```kotlin
// Route without arguments
@Serializable
object Home

// Route with typed arguments
@Serializable
data class Profile(val id: String)
```

```kotlin
NavHost(navController, startDestination = Home) {
    composable<Home> {
        HomeScreen(onNavigateToProfile = { id -> navController.navigate(Profile(id)) })
    }
    composable<Profile> { backStackEntry ->
        val profile: Profile = backStackEntry.toRoute()
        ProfileScreen(profile.id)
    }
}
```

## Notes

- Route type selection: use an `object` for routes without arguments; a `data class` for routes with arguments; pass a `KClass<T>` when only the class itself (no arguments, or all-default arguments) is needed.
- `NavBackStackEntry.toRoute<T>()` reconstructs the route instance (including arguments) from the current entry.
- `SavedStateHandle.toRoute<T>()` retrieves the same typed route inside a `ViewModel`.
- Custom argument types require supplying a `NavType` via the `typeMap` parameter of `composable` / `navigation` / `dialog`.
- Superseded string-route + `navArgument` style is still supported but no longer the recommended default.
- Available since Navigation 2.8.0.

## Related

- [composable](./composable.md)
- [navigation](./navigation.md)
- [NavBackStackEntry](./navbackstackentry.md)
- [NavType](./navtype.md)
