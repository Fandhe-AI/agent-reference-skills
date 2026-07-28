# UI Layer

The UI layer is the visual representation of application state as retrieved from the data layer. It displays that data and is the primary point of user interaction.

## Signature / Usage

```kotlin
data class NewsUiState(
    val isSignedIn: Boolean = false,
    val isPremium: Boolean = false,
    val newsItems: List<NewsItemUiState> = listOf(),
    val userMessages: List<Message> = listOf(),
)

class NewsViewModel(
    private val repository: NewsRepository,
) : ViewModel() {
    var uiState by mutableStateOf(NewsUiState())
        private set

    fun fetchArticles(category: String) {
        viewModelScope.launch {
            val newsItems = repository.newsItemsForCategory(category)
            uiState = uiState.copy(newsItems = newsItems)
        }
    }
}
```

## Notes

- UI state is an immutable snapshot of everything the UI needs to render; named `[Functionality]UiState` by convention (e.g., `NewsUiState`).
- Unidirectional data flow (UDF): data/UI state flows down from data layer through the state holder to the UI; user events flow up from the UI to the state holder.
- Business logic (product requirements, e.g. bookmarking) belongs in domain/data layers; UI logic (how to display state, e.g. navigation, toasts) belongs in the UI layer itself.
- ViewModel work must be main-safe; use coroutines for background operations and only observe state while the composable is visible.

## Related

- [layers](./layers.md)
- [ui-state-holders](./ui-state-holders.md)
- [ui-events](./ui-events.md)
- [ui-state-production](./ui-state-production.md)
