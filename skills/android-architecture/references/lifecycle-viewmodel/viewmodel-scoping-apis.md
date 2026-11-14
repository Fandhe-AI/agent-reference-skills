# ViewModel Scoping APIs

Kotlin property delegates for retrieving a `ViewModel` scoped to a chosen `ViewModelStoreOwner` — the current Activity/Fragment, a custom owner, the host Activity from a Fragment, or a Navigation graph — so multiple screens can share one instance.

## Signature / Usage

```kotlin
// Scope to the current owner (Activity or Fragment)
fun <VM : ViewModel> ComponentActivity.viewModels(...): Lazy<VM>
fun <VM : ViewModel> Fragment.viewModels(
    ownerProducer: () -> ViewModelStoreOwner = { this },
    ...
): Lazy<VM>

// Scope a Fragment's ViewModel to its host Activity
fun <VM : ViewModel> Fragment.activityViewModels(...): Lazy<VM>

// Scope a Fragment's ViewModel to a Navigation graph
fun <VM : ViewModel> Fragment.navGraphViewModels(@IdRes navGraphId: Int, ...): Lazy<VM>
```

```kotlin
class MyFragment : Fragment() {
    // Own instance, scoped to this Fragment
    val viewModel: MyViewModel by viewModels()

    // Shared with a parent Fragment
    val sharedWithParent: SharedViewModel by viewModels(
        ownerProducer = { requireParentFragment() }
    )

    // Shared with the host Activity
    val activityScoped: SharedViewModel by activityViewModels()

    // Shared with every destination in a Navigation graph
    val graphScoped: SharedViewModel by navGraphViewModels(R.id.nav_graph)
}
```

## Options / Props

| Name | Scope | Import | Artifact |
| --- | --- | --- | --- |
| `viewModels()` | Current owner (Activity/Fragment) | `androidx.activity.viewModels` / `androidx.fragment.app.viewModels` | `activity-ktx` / `fragment-ktx` |
| `viewModels(ownerProducer)` | Any `ViewModelStoreOwner` returned by the lambda (e.g. `requireParentFragment()`) | `androidx.fragment.app.viewModels` | `fragment-ktx` |
| `activityViewModels()` | Host `Activity` | `androidx.fragment.app.activityViewModels` | `fragment-ktx` |
| `navGraphViewModels(navGraphId)` | Navigation graph, shared by every destination in it | `androidx.navigation.navGraphViewModels` | `navigation-fragment` |
| `hiltNavGraphViewModels(navGraphId)` | Navigation graph, `@HiltViewModel`-aware equivalent of `navGraphViewModels` | `androidx.hilt.navigation.fragment.hiltNavGraphViewModels` | `hilt-navigation-fragment` |

## Notes

- `navGraphViewModels(id)` is equivalent to `viewModels { findNavController().getBackStackEntry(id) }` — both retrieve the `NavBackStackEntry` of the graph and use its `ViewModelStore`.
- In Compose, the same scoping choice is made by passing a `viewModelStoreOwner` argument to `viewModel()` (see viewModel() (Compose)) instead of using a property delegate; scoping a Compose ViewModel to a nested Navigation graph is done by passing that graph route's `NavBackStackEntry` — covered by the android-navigation skill (`hiltViewModel`, `NavBackStackEntry`).
- Package: `androidx.fragment.app` / `androidx.activity` / `androidx.navigation` (module varies per API, see table above).
- Navigation 3: `ViewModelStoreNavEntryDecorator` accepts a `ViewModelStoreOwner` (so the parent's `CreationExtras` and factory reach nested ViewModels), and `removeViewModelStoreOnPop` / `ViewModelStoreNavEntryDecoratorDefaults` are deprecated since 2.11.0-alpha03; all decorator state is cleared together on pop, and `rememberDecoratedNavEntries` keeps it outside a `NavDisplay`. Release notes for 2.11.0 also list a `rememberViewModelStoreNavEntryDecorator` overload taking a `ViewModelStoreProvider`.
- Source: https://developer.android.com/jetpack/androidx/releases/lifecycle (fetched 2026-11-14).

## Related

- [viewModel() (Compose)](./viewmodel-compose.md)
- [ViewModel](./viewmodel.md)
- [ViewModelProvider.Factory](./viewmodelprovider-factory.md)
- [ViewModelStoreProvider](./viewmodelstoreprovider.md)
