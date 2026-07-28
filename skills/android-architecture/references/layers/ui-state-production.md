# UI State Production

Describes the pipeline that turns inputs (user events, UI logic, data/domain layer streams) into observable UI state via a state holder. Mnemonic: state is, events happen.

## Signature / Usage

```kotlin
class InterestsViewModel(
    authorsRepository: AuthorsRepository,
    topicsRepository: TopicsRepository,
) : ViewModel() {
    val uiState = combine(
        authorsRepository.getAuthorsStream(),
        topicsRepository.getTopicsStream(),
    ) { authors, topics ->
        InterestsUiState.Interests(authors, topics)
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5_000),
        initialValue = InterestsUiState.Loading,
    )
}
```

## Notes

- Pipeline stages: inputs (one-shot suspend calls, `Flow` streams, or a mix) → state holder logic → output (`StateFlow` or Compose `State`).
- One-shot APIs can be exposed via `mutableStateOf` or `MutableStateFlow.update {}`; stream APIs are combined with `combine`/`stateIn`.
- Mixed one-shot + stream sources are unified by converting the one-shot value into a stream (e.g. a `MutableStateFlow` flag combined with a repository `Flow`).
- Use `stateIn(scope = viewModelScope, started = SharingStarted.WhileSubscribed(5_000), initialValue = ...)` to keep the pipeline lifecycle-aware and lazily started.
- Don't launch async work in `init {}`; expose an explicit `initialize()` guarded by a flag instead.
- Use atomic updates (`StateFlow.update {}`, `Snapshot.withMutableSnapshot {}`) for thread-safe state mutation.

## Related

- [ui-layer](./ui-layer.md)
- [ui-state-holders](./ui-state-holders.md)
- [ui-events](./ui-events.md)
