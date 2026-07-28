# hiltViewModel

Returns an existing `@HiltViewModel`-annotated `ViewModel`, or creates a new one, scoped to the given `ViewModelStoreOwner` — typically a `NavBackStackEntry` for a nested navigation graph, so the `ViewModel` is shared by every destination inside that graph.

## Signature / Usage

```kotlin
@Composable
inline fun <reified VM : ViewModel> hiltViewModel(
    viewModelStoreOwner: ViewModelStoreOwner =
        checkNotNull(LocalViewModelStoreOwner.current) {
            "No ViewModelStoreOwner was provided via LocalViewModelStoreOwner"
        },
    key: String? = null,
): VM
```

```kotlin
NavHost(navController, startDestination = Match) {
    navigation<Game>(startDestination = Match) {
        composable<Match> { backStackEntry ->
            // Scoped to the parent "Game" nested graph, shared with other destinations inside it
            val parentEntry = remember(backStackEntry) {
                navController.getBackStackEntry<Game>()
            }
            val gameViewModel: GameViewModel = hiltViewModel(parentEntry)

            MatchScreen(gameViewModel)
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `VM` (reified type param) | `ViewModel` | — | The `@HiltViewModel`-annotated ViewModel type to retrieve/create. |
| `viewModelStoreOwner` | `ViewModelStoreOwner` | `LocalViewModelStoreOwner.current` | Scope providing the `ViewModel`; pass a `NavBackStackEntry` (e.g. of a nested graph route) to scope it to that graph instead of the current destination. |
| `key` | `String?` | `null` | Optional key allowing multiple distinct instances of the same `VM` type within one owner. |

## Notes

- If no `viewModelStoreOwner` is passed, the `ViewModel` is scoped to the current destination's own `NavBackStackEntry` (the default `LocalViewModelStoreOwner`), not the whole navigation graph.
- The `androidx.hilt.navigation.compose.hiltViewModel` function (artifact `androidx.hilt:hilt-navigation-compose`) is `@Deprecated` in favor of `androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel`; the old artifact remains the one documented and commonly used in current official guides.
- The `@HiltViewModel` annotation itself and general `ViewModel`/`SavedStateHandle` usage are documented in the `android-architecture` skill (`lifecycle-viewmodel` category); this page covers only the navigation-graph-scoping usage.
- Package: `androidx.hilt.navigation.compose`.

## Related

- [NavBackStackEntry](./navbackstackentry.md)
- [navigation](./navigation.md)
