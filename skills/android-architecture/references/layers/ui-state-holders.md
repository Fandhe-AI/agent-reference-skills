# UI State Holders

A state holder is a class responsible for storing UI state and the logic to produce it, letting the UI simply bind to state instead of hosting logic inline.

## Signature / Usage

```kotlin
@HiltViewModel
class AuthorViewModel @Inject constructor(
    savedStateHandle: SavedStateHandle,
    private val authorsRepository: AuthorsRepository,
    newsRepository: NewsRepository,
) : ViewModel() {
    val uiState: StateFlow<AuthorScreenUiState> = /* ... */

    // Business logic
    fun followAuthor(followed: Boolean) { /* ... */ }
}

@Stable
class NiaAppState(
    val navController: NavHostController,
    val windowSizeClass: WindowSizeClass,
) {
    // UI logic
    val shouldShowBottomBar: Boolean
        get() = windowSizeClass.widthSizeClass == WindowWidthSizeClass.Compact
}
```

## Notes

- Two UI state kinds: screen UI state (what to display, e.g. `NewsUiState`) and UI element state (properties intrinsic to a widget, e.g. `ScaffoldState`).
- Two logic kinds: business logic (product requirements, delegated to domain/data layers) and UI logic (how to display state — navigation, scrolling), handled in the UI layer.
- Business-logic state holders (typically `ViewModel`) survive Activity recreation, are cached by Navigation on the back stack, and are unique to one UI. See `../lifecycle-viewmodel/viewmodel.md`.
- UI-logic state holders (typically plain `@Stable` classes) do not survive recreation, may reference lifecycle/Resources APIs directly, and are often reusable across UIs.
- Choose ViewModel when business logic or cross-recreation persistence is needed; choose a plain class for shorter-lived, UI-only state.
- Never pass a ViewModel instance down into child composables; pass only the state/callbacks it needs, and propagate events up to the SSOT composable.
- State holders can depend on other state holders as long as the dependency has an equal or shorter lifetime; pass state holders' data, not the ViewModel itself.

## Related

- [ui-layer](./ui-layer.md)
- [ui-events](./ui-events.md)
- [ui-state-production](./ui-state-production.md)
