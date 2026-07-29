# ViewModelStoreProvider

Compose APIs for creating `ViewModelStore` instances scoped to an arbitrary UI position (e.g. a `HorizontalPager` page or a `LazyList` item) rather than the ambient `LocalViewModelStoreOwner`, so per-item ViewModels survive configuration changes but are cleared once removed from composition.

## Signature / Usage

```kotlin
// androidx.lifecycle.viewmodel (module lifecycle-viewmodel-savedstate)
public class ViewModelStoreProvider(
    parentOwner: ViewModelStoreOwner?,
    parentKey: Any? = null,
    defaultArgs: SavedState = savedState(),
    defaultCreationExtras: CreationExtras = parentOwner.defaultViewModelCreationExtras,
    defaultFactory: ViewModelProvider.Factory = parentOwner.defaultViewModelProviderFactory,
)

// androidx.lifecycle.viewmodel.compose (module lifecycle-viewmodel-compose)
@Composable
public fun rememberViewModelStoreProvider(
    parent: ViewModelStoreOwner? = checkNotNull(LocalViewModelStoreOwner.current),
    defaultArgs: SavedState = savedState(),
    defaultCreationExtras: CreationExtras = parent.defaultViewModelCreationExtras,
    defaultFactory: ViewModelProvider.Factory = parent.defaultViewModelProviderFactory,
): ViewModelStoreProvider

@Composable
public fun rememberViewModelStoreOwner(
    provider: ViewModelStoreProvider,
    savedStateRegistryOwner: SavedStateRegistryOwner? = LocalSavedStateRegistryOwner.current,
): ViewModelStoreOwner

@Composable
public fun rememberViewModelStoreOwner(
    key: Any?,
    provider: ViewModelStoreProvider,
    savedStateRegistryOwner: SavedStateRegistryOwner? = LocalSavedStateRegistryOwner.current,
): ViewModelStoreOwner
```

```kotlin
// Hoist the parent provider outside the Pager.
val provider = rememberViewModelStoreProvider()
val pagerState = rememberPagerState(pageCount = { 5 })

HorizontalPager(state = pagerState) { page ->
    // Create an owner scoped to the current page (key comes first in this overload).
    val storeOwner = rememberViewModelStoreOwner(key = page, provider = provider)

    // Provide the scoped owner to this composition.
    CompositionLocalProvider(LocalViewModelStoreOwner provides storeOwner) {
        // ViewModel is now scoped specifically to this page.
        val viewModel: PageViewModel = viewModel()
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `parent` (Composable `rememberViewModelStoreProvider`) | `ViewModelStoreOwner?` | `checkNotNull(LocalViewModelStoreOwner.current)` | Parent whose store retains the child across configuration changes. |
| `parentOwner` (`ViewModelStoreProvider` constructor) | `ViewModelStoreOwner?` | none — must always be passed explicitly | Parent whose store retains the child across configuration changes; an explicit `null` creates an independent root provider that must be cleared manually via `clearAllKeys()`. |
| `parentKey` | `Any?` | `null` | Identifier scoping the provider's own state within `parentOwner`; providers sharing the same key share state. |
| `key` (on `rememberViewModelStoreOwner`) | `Any?` | call-site composite key | Identifier for the child store within the provider; the same `key` + `provider` pair yields the same owner and shared ViewModels (e.g. across recompositions of the same Pager page). |
| `savedStateRegistryOwner` | `SavedStateRegistryOwner?` | `LocalSavedStateRegistryOwner.current` | Delegate for saved-state support in the scope; `null` disables it for ViewModels created there. |
| `defaultArgs` | `SavedState` | `savedState()` | Default arguments merged into `defaultCreationExtras` for ViewModels created in this scope; on Android, `SavedState` is a `Bundle` typealias. |
| `defaultCreationExtras` | `CreationExtras` | parent's default extras | Extra creation parameters made available to `defaultFactory`. |
| `defaultFactory` | `ViewModelProvider.Factory` | parent's default factory | Factory used to instantiate ViewModels created in this scope. |

## Notes

- Two artifacts: `ViewModelStoreProvider` itself lives in `androidx.lifecycle.viewmodel` (module `lifecycle-viewmodel-savedstate`); `rememberViewModelStoreProvider` / `rememberViewModelStoreOwner` are Composable wrappers in `androidx.lifecycle.viewmodel.compose` (module `lifecycle-viewmodel-compose`).
- Added in Lifecycle 2.11.0 (June 2026) as "Scoped ViewModels in Compose".
- Unlike most scoped owners, the `ViewModelStore` behind `rememberViewModelStoreOwner(provider, key)` is **not** automatically cleared just because that call site leaves the composition — it is cleared only when `ViewModelStoreProvider.clearKey`/`clearAllKeys` runs for that key, gated internally by the parent `Lifecycle` reaching at least `CREATED` (so rotation, which passes through `DESTROYED`, does not clear it, but permanent removal does).
- Must explicitly re-provide the returned owner via `CompositionLocalProvider(LocalViewModelStoreOwner provides storeOwner) { ... }` for `viewModel()` / `hiltViewModel()` to pick it up in descendants.

## Related

- [viewModel() (Compose)](./viewmodel-compose.md)
- [ViewModel Scoping APIs](./viewmodel-scoping-apis.md)
- [LocalLifecycleOwner](./locallifecycleowner.md)
