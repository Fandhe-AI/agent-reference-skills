# Architecture Recommendations

A consolidated set of strongly recommended, recommended, and optional practices across the UI, domain, and data layers, dependency injection, lifecycle, and testing.

## Signature / Usage

```kotlin
@HiltViewModel
class BookmarksViewModel @Inject constructor(
    newsRepository: NewsRepository,
) : ViewModel() {
    val feedState: StateFlow<NewsFeedUiState> = newsRepository
        .getNewsResourcesStream()
        .mapToFeedState()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), NewsFeedUiState.Loading)
}
```

## Notes

- Core principles: unidirectional data flow (UDF), separation of concerns, single source of truth — data flows down, events flow up, layers don't reach across boundaries.
- Data layer: create a repository even for a single data source; never expose data sources directly to the UI layer; use coroutines/`Flow`.
- UI layer: build with Jetpack Compose; collect state with `collectAsStateWithLifecycle()`; never send one-off events from ViewModel to UI, model them as state instead.
- ViewModel: keep independent of the Android lifecycle; never hold `Activity`/`Context`/`Resources` references; scope to a screen (not reusable components); expose a single `uiState` `StateFlow`.
- Dependency injection: prefer constructor injection; scope dependencies that are expensive or hold shared mutable state; use Hilt for multi-screen/`WorkManager`/navigation-scoped needs.
- Lifecycle: prefer lifecycle-aware Compose effects (`LifecycleStartEffect`, `LifecycleResumeEffect`, `repeatOnLifecycle`) over overriding Activity callbacks.
- Testing: prefer fakes over mocks; assert on `StateFlow.value`; use `SharingStarted.WhileSubscribed` in state-flow tests; test navigation as regression tests.
- Priority levels used throughout the guide: "strongly recommended" (implement unless incompatible), "recommended" (likely improves the app), "optional" (situational).

## Related

- [layers](./layers.md)
- [ui-layer](./ui-layer.md)
- [data-layer](./data-layer.md)
- [models-and-naming-conventions](./models-and-naming-conventions.md)
