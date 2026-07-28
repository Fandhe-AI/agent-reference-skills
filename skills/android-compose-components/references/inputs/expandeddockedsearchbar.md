# ExpandedDockedSearchBar

Bounded results panel shown when a `SearchBar`'s `SearchBarState` expands, displaying results in a fixed-size surface rather than full screen. Preferred for large/tablet screens.

## Signature / Usage

```kotlin
@Composable
public fun ExpandedDockedSearchBar(
    state: SearchBarState,
    inputField: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    shape: Shape = SearchBarDefaults.dockedShape,
    colors: SearchBarColors = SearchBarDefaults.colors(),
    tonalElevation: Dp = SearchBarDefaults.TonalElevation,
    shadowElevation: Dp = SearchBarDefaults.ShadowElevation,
    properties: PopupProperties = PopupProperties(focusable = true, clippingEnabled = false),
    content: @Composable ColumnScope.() -> Unit,
)
```

```kotlin
ExpandedDockedSearchBar(
    state = searchBarState,
    inputField = {
        SearchBarDefaults.InputField(
            textFieldState = textFieldState,
            searchBarState = searchBarState,
            onSearch = { /* handle query */ },
        )
    }
) {
    LazyColumn {
        items(searchResults) { result -> ListItem(headlineContent = { Text(result) }) }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `SearchBarState` | — | Shared with the collapsed `SearchBar`; drives expand/collapse transition. |
| `inputField` | `@Composable () -> Unit` | — | The input field; typically `SearchBarDefaults.InputField`. |
| `modifier` | `Modifier` | `Modifier` | Applied to this expanded surface. |
| `shape` | `Shape` | `SearchBarDefaults.dockedShape` | Shape of the docked container. |
| `colors` | `SearchBarColors` | `SearchBarDefaults.colors()` | Resolves colors for the surface and content. |
| `tonalElevation` | `Dp` | `SearchBarDefaults.TonalElevation` | Tonal elevation of the surface. |
| `shadowElevation` | `Dp` | `SearchBarDefaults.ShadowElevation` | Shadow elevation of the surface. |
| `properties` | `PopupProperties` | `PopupProperties(focusable = true, clippingEnabled = false)` | Popup window properties. |
| `content` | `@Composable ColumnScope.() -> Unit` | — | Results content shown below the input field. |

## Notes

- Experimental API (`@ExperimentalMaterial3Api`).
- Package: `androidx.compose.material3`.

## Related

- [SearchBar](./searchbar.md)
- [ExpandedFullScreenSearchBar](./expandedfullscreensearchbar.md)
