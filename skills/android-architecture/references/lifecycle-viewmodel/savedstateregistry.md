# SavedStateRegistry

Interface for plugging custom components into the saved-state mechanism, letting them contribute and consume state around process recreation. `rememberSaveable` and `SavedStateHandle` build on top of it.

## Signature / Usage

```kotlin
expect class SavedStateRegistry {
    val isRestored: Boolean
    fun consumeRestoredStateForKey(key: String): SavedState?
    fun registerSavedStateProvider(key: String, provider: SavedStateProvider)
    fun getSavedStateProvider(key: String): SavedStateProvider?
    fun unregisterSavedStateProvider(key: String)
}

fun interface SavedStateProvider {
    fun saveState(): SavedState
}
```

```kotlin
class SearchManager(registryOwner: SavedStateRegistryOwner) : SavedStateRegistry.SavedStateProvider {
    private var query: String? = null

    init {
        registryOwner.lifecycle.addObserver(LifecycleEventObserver { _, event ->
            if (event == Lifecycle.Event.ON_CREATE) {
                val registry = registryOwner.savedStateRegistry
                registry.registerSavedStateProvider("search_manager", this)
                query = registry.consumeRestoredStateForKey("search_manager")?.getString("query")
            }
        })
    }

    override fun saveState() = bundleOf("query" to query)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isRestored` | `Boolean` | — | `true` once prior state has been restored and is safe to consume. |
| `consumeRestoredStateForKey(key)` | function | — | Returns and clears the restored state for `key`; subsequent calls return `null`. Must be called at/after `ON_CREATE`. |
| `registerSavedStateProvider(key, provider)` | function | — | Registers a `SavedStateProvider`; throws `IllegalArgumentException` if `key` is already registered. |
| `getSavedStateProvider(key)` | function | — | Returns the provider registered under `key`, or `null`. |
| `unregisterSavedStateProvider(key)` | function | — | Removes a previously registered provider. |
| `SavedStateProvider.saveState()` | function | — | Called before destruction to capture state for later restoration. |

## Notes

- `rememberSaveable` internally uses `SavedStateRegistry` and shares the same `Bundle`/size limitations (primitives and small objects only).
- Registry lifetime matches its owning component; a fresh instance is created on Activity/Fragment recreation.
- Package: `androidx.savedstate` (module `savedstate`).

## Related

- [SavedStateHandle](./savedstatehandle.md)
- [LifecycleEventObserver](./lifecycleeventobserver.md)
