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
- Package: `androidx.lifecycle` (module `lifecycle-viewmodel`).

## Related

- [viewModel() (Compose)](./viewmodel-compose.md)
- [ViewModelProvider.Factory](./viewmodelprovider-factory.md)
- [viewModelScope](./viewmodelscope.md)
- [AndroidViewModel](./androidviewmodel.md)
- [SavedStateHandle](./savedstatehandle.md)
