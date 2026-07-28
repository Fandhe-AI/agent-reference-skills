# DockedSearchBar

Bounded search bar variant that displays results in a fixed panel below the input field, rather than floating full-width. Preferred for large/tablet screens.

## Signature / Usage

```kotlin
@ExperimentalMaterial3Api
@Composable
public fun DockedSearchBar(
    inputField: @Composable () -> Unit,
    expanded: Boolean,
    onExpandedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    shape: Shape = SearchBarDefaults.dockedShape,
    colors: SearchBarColors = SearchBarDefaults.colors(),
    tonalElevation: Dp = SearchBarDefaults.TonalElevation,
    shadowElevation: Dp = SearchBarDefaults.ShadowElevation,
    content: @Composable ColumnScope.() -> Unit,
)
```

```kotlin
DockedSearchBar(
    inputField = {
        SearchBarDefaults.InputField(
            query = query,
            onQueryChange = onQueryChange,
            onSearch = { expanded = false },
            expanded = expanded,
            onExpandedChange = { expanded = it },
        )
    },
    expanded = expanded,
    onExpandedChange = { expanded = it },
) {
    // search results content
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `inputField` | `@Composable () -> Unit` | — | The input field; typically `SearchBarDefaults.InputField`. |
| `expanded` | `Boolean` | — | Whether the results panel is shown. |
| `onExpandedChange` | `(Boolean) -> Unit` | — | Called when the expanded state should change. |
| `modifier` | `Modifier` | `Modifier` | Applied to this search bar. |
| `shape` | `Shape` | `SearchBarDefaults.dockedShape` | Shape of the docked container. |
| `colors` | `SearchBarColors` | `SearchBarDefaults.colors()` | Resolves colors for the container and content. |
| `tonalElevation` | `Dp` | `SearchBarDefaults.TonalElevation` | Tonal elevation of the container. |
| `shadowElevation` | `Dp` | `SearchBarDefaults.ShadowElevation` | Shadow elevation of the container. |
| `content` | `@Composable ColumnScope.() -> Unit` | — | Content shown below the input field when `expanded`. |

## Notes

- Experimental API (`@ExperimentalMaterial3Api`) and `@Deprecated` in the latest androidx-main source in favor of `SearchBar` (state-based) + `ExpandedDockedSearchBar`; kept for compatibility, and the official guide still documents this `expanded`/`onExpandedChange` pattern as current.
- Package: `androidx.compose.material3`.

## Related

- [SearchBar](./searchbar.md)
- [ExpandedDockedSearchBar](./expandeddockedsearchbar.md)
