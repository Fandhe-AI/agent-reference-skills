# Saving UI States

Overview comparing the three techniques for persisting UI state across configuration changes, system-initiated process death, and full app dismissal: in-memory `ViewModel` fields, `SavedStateHandle` (saved state), and persistent storage (database/DataStore/network).

## Signature / Usage

```kotlin
class SearchViewModel(private val savedStateHandle: SavedStateHandle) : ViewModel() {
    // Minimal data needed to restore the screen after process death
    private val query = savedStateHandle.getStateFlow("query", "")

    // Larger, derived UI state: cheap to recompute, doesn't need to survive process death
    val searchResults: StateFlow<List<Song>> = query
        .flatMapLatest { q -> repository.search(q) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())
}
```

## Options / Props

Comparison of the three tiers, from fastest/least durable to slowest/most durable:

| Aspect | ViewModel | Saved state (`SavedStateHandle`) | Persistent storage |
| --- | --- | --- | --- |
| Storage location | In memory | In memory (serialized to a `Bundle` on stop) | Disk or network |
| Survives configuration change | Yes | Yes | Yes |
| Survives system-initiated process death | No | Yes | Yes |
| Survives user-initiated full dismissal | No | No | Yes |
| Data limitations | Any object, limited by available memory | Primitives and simple/small objects only | Limited by disk/network |
| Read/write cost | Fast (memory) | Slower (serialization) | Slowest (disk/network I/O) |

## Notes

- Recommended split of responsibility: persistent storage owns all durable app data; the `ViewModel` holds the current screen's derived UI state (recomputed cheaply from repositories); `SavedStateHandle` holds only the minimal identifiers needed to reload that state after process death (e.g. a search query or selected id), not the derived results themselves.
- `onSaveInstanceState(Bundle)` (the pre-`ViewModel` Activity/Fragment callback) is the same underlying mechanism as `SavedStateHandle` — both are only invoked while the component is stopped and are backed by a `Bundle`, so both share its size limits and serialization cost; `SavedStateHandle` is the modern, `ViewModel`-integrated way to write to that saved state rather than overriding the callback directly.
- Don't put large or complex objects (e.g. bitmaps) into saved state; store an id or key instead and reload the object from persistent storage.
- See `SavedStateHandle` for the API used to read/write saved state from within a `ViewModel`.
- In Compose, saved state for composables is `rememberSerializable` (KotlinX Serialization, for `@Serializable` types) or `rememberSaveable` (primitives or when `@Serializable` is not used); in a `ViewModel` it is `SavedStateHandle`. Both appear in the "saved state" column above and share the serialization cost.
- To reload data after process death, the guide suggests `SavedStateHandle` for `ViewModel` state, and `rememberSerializable` for UI-related data that does not need to live in the `ViewModel`.
- Source: https://developer.android.com/topic/libraries/architecture/saving-states (fetched 2026-11-14).

## Related

- [SavedStateHandle](./savedstatehandle.md)
- [ViewModel](./viewmodel.md)
- [SavedStateRegistry](./savedstateregistry.md)
