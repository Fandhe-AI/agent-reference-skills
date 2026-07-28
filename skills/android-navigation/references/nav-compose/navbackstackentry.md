# NavBackStackEntry

Represents a single entry on the `NavController` back stack: one instance of a destination, together with its arguments, lifecycle, saved state, and (for graph-scoped use cases) `ViewModelStore`.

## Signature / Usage

```kotlin
public class NavBackStackEntry :
    LifecycleOwner,
    ViewModelStoreOwner,
    HasDefaultViewModelProviderFactory,
    SavedStateRegistryOwner

public var destination: NavDestination
public val id: String
public val arguments: SavedState?
public val savedStateHandle: SavedStateHandle
override val lifecycle: Lifecycle
public var maxLifecycle: Lifecycle.State
public override val viewModelStore: ViewModelStore

public inline fun <reified T> NavBackStackEntry.toRoute(): T
```

```kotlin
composable<Profile> { backStackEntry: NavBackStackEntry ->
    val profile: Profile = backStackEntry.toRoute()
    ProfileScreen(profile)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `destination` | `NavDestination` | — | The destination associated with this entry. |
| `id` | `String` | — | Unique identifier for this specific entry instance. |
| `arguments` | `SavedState?` | — | The raw argument bundle for this entry. |
| `savedStateHandle` | `SavedStateHandle` | — | Per-entry state store, usable directly or via `SavedStateHandle.toRoute<T>()` in a `ViewModel`. |
| `lifecycle` | `Lifecycle` | — | Reflects the entry's position in the back stack (`CREATED` when backgrounded, `RESUMED` when visible). |
| `maxLifecycle` | `Lifecycle.State` | — | Upper bound applied to `lifecycle`, controlled by the hosting `NavController`. |
| `viewModelStore` | `ViewModelStore` | — | Scopes `ViewModel`s to this entry (or to the containing nested graph when retrieved from a graph route). |
| `toRoute<T>()` (extension) | `() -> T` | — | Reconstructs the typed route instance `T` from this entry. |

## Notes

- Retrieving a `ViewModel` scoped to a nested graph (rather than to a single destination) is done via `hiltViewModel` or `viewModel()` called with a graph route's `NavBackStackEntry`; see [hiltViewModel](./hiltviewmodel.md).
- Package: `androidx.navigation` (`navigation-common` artifact).

## Related

- [composable](./composable.md)
- [currentBackStackEntryAsState](./currentbackstackentryasstate.md)
- [hiltViewModel](./hiltviewmodel.md)
- [Type-Safe Routes](./type-safe-routes.md)
