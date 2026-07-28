# viewModelScope

Built-in `CoroutineScope` extension property attached to every `ViewModel`; coroutines launched in it are canceled automatically when the ViewModel is cleared.

## Signature / Usage

```kotlin
val ViewModel.viewModelScope: CoroutineScope
```

```kotlin
class MyViewModel : ViewModel() {
    init {
        viewModelScope.launch {
            // canceled automatically when the ViewModel is cleared
        }
    }
}
```

## Notes

- `coroutineContext` combines a `SupervisorJob` (children fail independently) with `Dispatchers.Main.immediate` (falls back to `EmptyCoroutineContext` where `Dispatchers.Main` is unavailable, e.g. plain JVM/Linux targets).
- Use `withContext(Dispatchers.IO)` etc. inside launched coroutines for background work.
- Can be replaced by passing a custom `CoroutineScope` (e.g. a `TestScope` for testing) to the `ViewModel(viewModelScope: CoroutineScope)` constructor overload.
- Package: `androidx.lifecycle` (module `lifecycle-viewmodel`).

## Related

- [ViewModel](./viewmodel.md)
- [collectAsStateWithLifecycle](./collectasstatewithlifecycle.md)
