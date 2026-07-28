# App Architecture Layers

The recommended modern Android app architecture organizes an app into three layers: the UI layer, an optional domain layer, and the data layer. Data flows down from data sources through the layers to the UI; events flow up in the opposite direction.

## Signature / Usage

```kotlin
// UI layer: displays state produced from the layers below
class NewsViewModel(
    private val newsRepository: NewsRepository,
) : ViewModel() {
    val uiState: StateFlow<NewsUiState> = newsRepository
        .getLatestNewsStream()
        .map { NewsUiState.Success(it) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), NewsUiState.Loading)
}
```

## Notes

- This is Android app architecture (Kotlin / Jetpack) guidance — distinct from the same-named concept in Feature-Sliced Design or the SwiftUI / Ark UI / Chakra UI skills.
- Layers: UI layer (displays data, handles interaction) → optional domain layer (reusable business logic) → data layer (business logic, exposes app data).
- The domain layer is optional; add it only to reduce complexity or share logic across ViewModels.
- Good architecture principles: separation of concerns, drive UI from data models, single source of truth (SSOT), unidirectional data flow (UDF).
- Don't put application data or state directly in app components (Activity, Service, BroadcastReceiver) — host UI only.
- Reduce dependencies on Android framework classes for testability; abstract them behind interfaces.

## Related

- [ui-layer](./ui-layer.md)
- [domain-layer](./domain-layer.md)
- [data-layer](./data-layer.md)
- [recommendations](./recommendations.md)
