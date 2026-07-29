# SearchBar

A search field accepting user queries with dynamic suggestions or search results, driven by `SearchBarState` (created with `rememberSearchBarState`). Expands into `ExpandedFullScreenSearchBar` or `ExpandedDockedSearchBar` to show results.

## Signature / Usage

```kotlin
@Composable
public fun SearchBar(
    state: SearchBarState,
    inputField: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    shape: Shape = SearchBarDefaults.inputFieldShape,
    colors: SearchBarColors = SearchBarDefaults.colors(),
    tonalElevation: Dp = SearchBarDefaults.TonalElevation,
    shadowElevation: Dp = SearchBarDefaults.ShadowElevation,
)
```

```kotlin
val textFieldState = rememberTextFieldState()
val searchBarState = rememberSearchBarState()

SearchBar(
    state = searchBarState,
    inputField = {
        SearchBarDefaults.InputField(
            textFieldState = textFieldState,
            searchBarState = searchBarState,
            onSearch = { /* handle query */ },
            placeholder = { Text("Search") },
        )
    }
)

ExpandedFullScreenSearchBar(
    state = searchBarState,
    inputField = {
        SearchBarDefaults.InputField(
            textFieldState = textFieldState,
            searchBarState = searchBarState,
            onSearch = { /* handle query */ },
        )
    }
) {
    // search results content
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `SearchBarState` | — | Created via `rememberSearchBarState`; drives expand/collapse. |
| `inputField` | `@Composable () -> Unit` | — | The input field; typically `SearchBarDefaults.InputField`. |
| `modifier` | `Modifier` | `Modifier` | Applied to this search bar. |
| `shape` | `Shape` | `SearchBarDefaults.inputFieldShape` | Shape of the collapsed search bar container. |
| `colors` | `SearchBarColors` | `SearchBarDefaults.colors()` | Resolves colors for the container and content. |
| `tonalElevation` | `Dp` | `SearchBarDefaults.TonalElevation` | Tonal elevation of the container. |
| `shadowElevation` | `Dp` | `SearchBarDefaults.ShadowElevation` | Shadow elevation of the container. |

## Notes

- Experimental API (`@ExperimentalMaterial3Api`).
- `rememberSearchBarState(initialValue: SearchBarValue = SearchBarValue.Collapsed, animationSpecForExpand, animationSpecForCollapse): SearchBarState` creates the shared state driving both the collapsed `SearchBar` and its expanded counterpart.
- `SearchBarDefaults.InputField(textFieldState: TextFieldState, searchBarState: SearchBarState, onSearch, modifier, enabled, readOnly, textStyle, placeholder, leadingIcon, trailingIcon, prefix, suffix, inputTransformation, outputTransformation, scrollState, shape, colors, interactionSource, keyboardOptions, lineLimits = TextFieldLineLimits.SingleLine)` is the query field shared between `SearchBar` and the expanded variants.
- An older overload of `SearchBar` (`inputField`, `expanded: Boolean`, `onExpandedChange`, `content`) and `DockedSearchBar` still exist but are `@Deprecated` in favor of this `SearchBarState`-based API; official guide examples may still show the deprecated `expanded`/`onExpandedChange` pattern.
- A second, non-deprecated `SearchBar` overload also exists taking additional `windowInsets: WindowInsets` and `scrollBehavior: SearchBarScrollBehavior?` parameters (delegates to an internal `AppBarWithSearch`), for search bars embedded in a scrolling app bar.
- The results UI is rendered by a separate composable driven by the same `state`: `ExpandedFullScreenSearchBar` (full-screen results) or `ExpandedDockedSearchBar` (bounded panel, for large/tablet screens).
- Package: `androidx.compose.material3`.
- This is the Jetpack Compose (Kotlin) API — distinct from the same-named SwiftUI / Ark UI / Chakra UI / fandhe-frontend components.

## Related

- [ExpandedFullScreenSearchBar](./expandedfullscreensearchbar.md)
- [ExpandedDockedSearchBar](./expandeddockedsearchbar.md)
