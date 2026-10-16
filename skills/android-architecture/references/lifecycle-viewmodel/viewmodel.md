# ViewModel

Business-logic / screen-level state holder that caches state and survives configuration changes (e.g. screen rotation). Destroyed when its `ViewModelStoreOwner` (Activity, NavBackStackEntry, composable scope, ...) is permanently removed.

## Signature / Usage

```kotlin
expect abstract class ViewModel {
    constructor()
    constructor(viewModelScope: CoroutineScope)
    constructor(vararg closeables: AutoCloseable)
    constructor(viewModelScope: CoroutineScope, vararg closeables: AutoCloseable)
}
```

```kotlin
class DiceRollViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(DiceUiState())
    val uiState: StateFlow<DiceUiState> = _uiState.asStateFlow()

    fun rollDice() {
        _uiState.update { it.copy(firstDieValue = Random.nextInt(1, 7)) }
    }

    override fun onCleared() {
        // cleanup
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onCleared()` | `() -> Unit` (override) | no-op | Called when the ViewModel is no longer used and about to be destroyed; place cleanup logic here. |
| `clear()` | `@MainThread fun clear()` | — | Clears all resources and marks the ViewModel as cleared. A cleared ViewModel must not be reused. |
| `addCloseable(key: String, closeable: AutoCloseable)` | function | — | Adds a keyed `AutoCloseable`; replacing a key immediately closes the old resource. Closed before `onCleared()`. |
| `addCloseable(closeable: AutoCloseable)` | function | — | Adds an unkeyed `AutoCloseable`, closed before `onCleared()`. |
| `getCloseable(key: String): T?` | function | `null` | Returns the `AutoCloseable` resource registered under `key`, or `null`. |

## Notes

- Only instantiate via `ViewModelProvider` / `viewModel()`; a bare constructor call bypasses scoping and lifecycle management.
- If a `viewModelScope: CoroutineScope` is passed to the constructor, it replaces the default `viewModelScope` and is canceled before `onCleared()`.
- Since Lifecycle 2.11.0 (first in 2.11.0-alpha01), `onCleared()` is annotated `@EmptySuper` (`@EmptySuper protected open fun onCleared()`), so overrides do not need to call `super.onCleared()`.
- Clearing sequence (from the KDoc): (1) close resources added with a key via `addCloseable`, (2) close resources added via the constructor, (3) close resources added without a key via `addCloseable`, (4) invoke `onCleared()`.
- Since 2.11.0-alpha01, `ViewModelStore.toString()` lists the stored keys for debugging, in the format `<ClassName>@<hash>(keys=...)`.
- Package: `androidx.lifecycle` (module `lifecycle-viewmodel`).
- Source (primary, signatures and KDoc): Google Maven sources jar https://dl.google.com/android/maven2/androidx/lifecycle/lifecycle-viewmodel/2.11.0/lifecycle-viewmodel-2.11.0-sources.jar (`commonMain/androidx/lifecycle/ViewModel.kt`, `ViewModelStore`).
- Release notes: https://developer.android.com/jetpack/androidx/releases/lifecycle (2.11.0-alpha01). The API reference pages on developer.android.com are not fetchable, so the sources jar above is the basis for this page.

## Related

- [viewModel() (Compose)](./viewmodel-compose.md)
- [ViewModelProvider.Factory](./viewmodelprovider-factory.md)
- [viewModelScope](./viewmodelscope.md)
- [AndroidViewModel](./androidviewmodel.md)
- [SavedStateHandle](./savedstatehandle.md)
