# ExposedDropdownMenu

The composable defining the popup list content shown inside an `ExposedDropdownMenuBox`. A scope-extension composable (`ExposedDropdownMenuBoxScope.ExposedDropdownMenu`).

## Signature / Usage

```kotlin
@Composable
public fun ExposedDropdownMenuBoxScope.ExposedDropdownMenu(
    expanded: Boolean,
    onDismissRequest: () -> Unit,
    modifier: Modifier = Modifier,
    scrollState: ScrollState = rememberScrollState(),
    matchAnchorWidth: Boolean = true,
    shape: Shape = MenuDefaults.shape,
    containerColor: Color = MenuDefaults.containerColor,
    tonalElevation: Dp = MenuDefaults.TonalElevation,
    shadowElevation: Dp = MenuDefaults.ShadowElevation,
    border: BorderStroke? = null,
    content: @Composable ColumnScope.() -> Unit,
)
```

```kotlin
ExposedDropdownMenuBox(expanded = expanded, onExpandedChange = { expanded = it }) {
    // anchor TextField here

    ExposedDropdownMenu(
        expanded = expanded,
        onDismissRequest = { expanded = false }
    ) {
        options.forEach { option ->
            DropdownMenuItem(
                text = { Text(option) },
                onClick = { selectedText = option; expanded = false }
            )
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `expanded` | `Boolean` | — | Whether the popup list is currently visible. |
| `onDismissRequest` | `() -> Unit` | — | Called when the user selects an item or dismisses the menu. |
| `modifier` | `Modifier` | `Modifier` | Applied to the menu content column. |
| `scrollState` | `ScrollState` | `rememberScrollState()` | Scroll state for long lists. |
| `matchAnchorWidth` | `Boolean` | `true` | Whether the popup width matches the anchor text field's width. |
| `shape` | `Shape` | `MenuDefaults.shape` | Shape of the popup surface. |
| `containerColor` | `Color` | `MenuDefaults.containerColor` | Background color of the popup surface. |
| `tonalElevation` | `Dp` | `MenuDefaults.TonalElevation` | Tonal elevation of the popup surface. |
| `shadowElevation` | `Dp` | `MenuDefaults.ShadowElevation` | Shadow elevation of the popup surface. |
| `border` | `BorderStroke?` | `null` | Optional border around the popup surface. |
| `content` | `@Composable ColumnScope.() -> Unit` | — | Menu content, typically `DropdownMenuItem`s. |

## Notes

- Must be called inside the `content` lambda of `ExposedDropdownMenuBox` (it is a `ExposedDropdownMenuBoxScope` extension function).
- Experimental API (`@ExperimentalMaterial3Api`).
- Package: `androidx.compose.material3`.

## Related

- [ExposedDropdownMenuBox](./exposeddropdownmenubox.md)
- [DropdownMenuItem](./dropdownmenuitem.md)
