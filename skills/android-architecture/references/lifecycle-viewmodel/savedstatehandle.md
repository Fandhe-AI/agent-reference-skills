# SavedStateHandle

Key-value map passed to a `ViewModel` that persists small, transient UI state (scroll position, selected id, in-progress text) across process death, unlike plain ViewModel fields which only survive configuration changes.

## Signature / Usage

```kotlin
expect class SavedStateHandle {
    constructor()
    constructor(initialState: Map<String, Any?>)
}

class SavedStateViewModel(private val state: SavedStateHandle) : ViewModel() {
    private val _query = state.getMutableStateFlow("query", "")
    val query: StateFlow<String> = _query.asStateFlow()

    fun setQuery(newQuery: String) {
        _query.value = newQuery // also updates the SavedStateHandle
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `get(key)` / `set(key, value)` | `operator fun <T> get/set` | — | Read/write a value by key. |
| `contains(key)` | `operator fun contains(key: String): Boolean` | — | Whether `key` currently has a value. |
| `remove(key)` | `fun <T> remove(key: String): T?` | — | Removes and returns the value for `key`. |
| `keys()` | `fun keys(): Set<String>` | — | All keys currently held. |
| `getStateFlow(key, initialValue)` | `fun <T> getStateFlow(...): StateFlow<T>` | — | Read-only `StateFlow` view of a key. |
| `getMutableStateFlow(key, initialValue)` | `fun <T> getMutableStateFlow(...): MutableStateFlow<T>` | — | Read/write `MutableStateFlow`; writes propagate back into the handle. |
| `setSavedStateProvider(key, provider)` | function | — | Registers a `SavedStateProvider` for non-Parcelable/complex state, saved lazily on demand. |
| `clearSavedStateProvider(key)` | function | — | Unregisters a previously set provider. |

## Notes

- Supported types directly: primitives, `String`, `Parcelable`, `Serializable`, `Bundle`, `CharSequence`, `Binder`, arrays/`ArrayList`/`SparseArray` of the above.
- For `@Serializable` data classes use `savedStateHandle.saved { ... }` (kotlinx-serialization support); for Compose `Saver`-based state use `savedStateHandle.saveable { ... }`.
- In Compose, values are only flushed to the saved state when the hosting Activity is stopped.
- Automatically injected by the default `ViewModelProvider.Factory` — no manual factory needed for ViewModels that take only a `SavedStateHandle`.
- Package: `androidx.lifecycle` (module `lifecycle-viewmodel-savedstate`).

## Related

- [ViewModel](./viewmodel.md)
- [ViewModelProvider.Factory](./viewmodelprovider-factory.md)
- [SavedStateRegistry](./savedstateregistry.md)
