# StateFlow

`StateFlow` is a hot, observable state-holder flow that always has a current value, accessible via `.value`. `MutableStateFlow` is the writable variant, typically exposed as read-only `StateFlow` from a `ViewModel`.

## Signature / Usage

```kotlin
class MutableStateFlow<T>(initialValue: T) : StateFlow<T>

suspend fun <T> Flow<T>.stateIn(
    scope: CoroutineScope,
    started: SharingStarted,
    initialValue: T
): StateFlow<T>
```

```kotlin
class LatestNewsViewModel(private val newsRepository: NewsRepository) : ViewModel() {
    private val _uiState = MutableStateFlow(LatestNewsUiState.Success(emptyList()))
    val uiState: StateFlow<LatestNewsUiState> = _uiState

    init {
        viewModelScope.launch {
            newsRepository.favoriteLatestNews.collect { news ->
                _uiState.value = LatestNewsUiState.Success(news)
            }
        }
    }
}
```

```kotlin
// Deriving a StateFlow from a cold Flow
val uiState: StateFlow<Result> = repository.fetchDataFlow()
    .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), Result.Loading)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initialValue` | `T` | — | Required initial state (unlike `LiveData`, which has none). |
| `scope` (`stateIn`) | `CoroutineScope` | — | Scope the shared coroutine runs in; should outlive collectors. |
| `started` (`stateIn`) | `SharingStarted` | — | `WhileSubscribed()`, `Eagerly`, or `Lazily` — controls when the upstream producer starts/stops. |

## Notes

- `StateFlow` is hot: it stays in memory and holds its latest value as long as it is referenced, independent of collectors.
- `StateFlow` automatically conflates and applies `distinctUntilChanged` semantics — setting `.value` to an equal value does not trigger a new emission.
- Collect a `StateFlow` from the UI with a lifecycle-aware mechanism (`repeatOnLifecycle` / `collectAsStateWithLifecycle`, owned by `android-architecture`/`android-compose-ui`) rather than a bare `launch { collect { } }`, to avoid work while the UI is stopped.
- Expose only the read-only `StateFlow` type from a class and keep the backing `MutableStateFlow` private, to centralize where state mutation happens.

## Related

- [SharedFlow](./sharedflow.md)
- [Flow basics](./flow-basics.md)
- [Testing coroutines and Flow](./testing-coroutines-flow.md)
