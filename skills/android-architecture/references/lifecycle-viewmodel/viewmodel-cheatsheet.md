# ViewModel APIs Cheat Sheet

Quick lookup of which `ViewModel`-retrieval API to use depending on UI toolkit (Views vs. Compose) and desired scope (current owner, parent Fragment, host Activity, or Navigation graph), and whether Hilt is used.

## Signature / Usage

```kotlin
// Views (Fragment), no DI
val viewModel: MyViewModel by viewModels()

// Compose, no DI
val viewModel: MyViewModel = viewModel()
```

## Options / Props

| Scope | Views (no Hilt) | Views (Hilt) | Compose (no Hilt) | Compose (Hilt) |
| --- | --- | --- | --- | --- |
| Current owner (Activity/Fragment) | `by viewModels()` | `by viewModels()` (`@AndroidEntryPoint` + `@HiltViewModel`) | `viewModel()` | `hiltViewModel()` |
| Custom/parent owner | `by viewModels(ownerProducer = { ... })` | same | `viewModel(viewModelStoreOwner = ...)` | `hiltViewModel(viewModelStoreOwner = ...)` |
| Parent Fragment shared with host Activity | `by activityViewModels()` | `by activityViewModels()` | `viewModel(viewModelStoreOwner = LocalActivity.current as ComponentActivity)` | — |
| Navigation graph | `by navGraphViewModels(navGraphId)` | `by hiltNavGraphViewModels(navGraphId)` | `viewModel(navController.getBackStackEntry(route))` | `hiltViewModel(navController.getBackStackEntry(route))` |

## Notes

- Distilled from the official cheat sheet, which is published as a PNG/PDF diagram rather than a text table; the artifacts and imports for each API are documented on their own pages in this category (and on the android-navigation skill for the Navigation-graph-scoped Compose APIs).
- A separate Views-only version of this cheat sheet exists upstream; the table above merges both the Views and Compose variants since this skill covers both toolkits. The official Compose chart (v1.1) itself lists only three entries — `viewModel()` (closest `ViewModelStoreOwner`), `viewModel(viewModelStoreOwner = ...)` (any owner, e.g. a Navigation graph's `NavBackStackEntry`), and `hiltViewModel()` — it has no dedicated "shared with host Activity" row; the Compose cell in that row here maps the Views-side scope onto the chart's generic any-owner pattern.
- The `LocalActivity.current as ComponentActivity` cast is required because `LocalActivity` (module `activity-compose` 1.10+) is typed `CompositionLocal<Activity?>`, and a plain `Activity` is not a `ViewModelStoreOwner` — only `ComponentActivity` (which implements it) is. `LocalActivity`'s own docs recommend preferring a more granular `CompositionLocal` (e.g. `LocalLifecycleOwner`) when one is available, and reaching for `LocalActivity` only as a fallback.
- When in doubt, prefer the delegate/function that names the target scope explicitly (`activityViewModels()`, `navGraphViewModels()`) over manually constructing a `ViewModelProvider` with a custom owner.

## Related

- [ViewModel Scoping APIs](./viewmodel-scoping-apis.md)
- [viewModel() (Compose)](./viewmodel-compose.md)
- [ViewModel](./viewmodel.md)
