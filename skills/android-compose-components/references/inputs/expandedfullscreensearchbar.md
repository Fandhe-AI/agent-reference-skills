# ExpandedFullScreenSearchBar

Full-screen results surface shown when a `SearchBar`'s `SearchBarState` expands, hosting the same `inputField` plus scrollable result content.

## Signature / Usage

```kotlin
@Composable
public fun ExpandedFullScreenSearchBar(
    state: SearchBarState,
    inputField: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    collapsedShape: Shape = SearchBarDefaults.inputFieldShape,
    colors: SearchBarColors = SearchBarDefaults.colors(),
    tonalElevation: Dp = SearchBarDefaults.TonalElevation,
    shadowElevation: Dp = SearchBarDefaults.ShadowElevation,
    windowInsets: @Composable () -> WindowInsets = { SearchBarDefaults.fullScreenWindowInsets },
    properties: DialogProperties = DialogProperties(),
    content: @Composable ColumnScope.() -> Unit,
)
```

```kotlin
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
    LazyColumn {
        items(searchResults) { result -> ListItem(headlineContent = { Text(result) }) }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `SearchBarState` | — | Shared with the collapsed `SearchBar`; drives expand/collapse transition. |
| `inputField` | `@Composable () -> Unit` | — | The input field; typically `SearchBarDefaults.InputField`, same instance as the collapsed bar's. |
| `modifier` | `Modifier` | `Modifier` | Applied to this expanded surface. |
| `collapsedShape` | `Shape` | `SearchBarDefaults.inputFieldShape` | Shape used during the collapse/expand animation's start/end. |
| `colors` | `SearchBarColors` | `SearchBarDefaults.colors()` | Resolves colors for the surface and content. |
| `tonalElevation` | `Dp` | `SearchBarDefaults.TonalElevation` | Tonal elevation of the surface. |
| `shadowElevation` | `Dp` | `SearchBarDefaults.ShadowElevation` | Shadow elevation of the surface. |
| `windowInsets` | `@Composable () -> WindowInsets` | `{ SearchBarDefaults.fullScreenWindowInsets }` | Insets applied to the full-screen surface. |
| `properties` | `DialogProperties` | `DialogProperties()` | Platform dialog window properties. |
| `content` | `@Composable ColumnScope.() -> Unit` | — | Scrollable results content shown below the input field. |

## Notes

- Experimental API (`@ExperimentalMaterial3Api`).
- Renders as a full-screen dialog surface; use `ExpandedDockedSearchBar` for a bounded panel on large/tablet screens.
- Package: `androidx.compose.material3`.

## Related

- [SearchBar](./searchbar.md)
- [ExpandedDockedSearchBar](./expandeddockedsearchbar.md)
