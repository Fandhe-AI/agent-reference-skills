# ExposedDropdownMenuBox

Anchors a text field to a dropdown menu of choices, showing the currently selected item in the field. Displays a list of options on a temporary surface when the anchor is tapped.

## Signature / Usage

```kotlin
@Composable
public fun ExposedDropdownMenuBox(
    expanded: Boolean,
    onExpandedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    content: @Composable ExposedDropdownMenuBoxScope.() -> Unit,
)
```

```kotlin
var expanded by remember { mutableStateOf(false) }
var selectedText by remember { mutableStateOf(options[0]) }

ExposedDropdownMenuBox(
    expanded = expanded,
    onExpandedChange = { expanded = it }
) {
    TextField(
        value = selectedText,
        onValueChange = {},
        readOnly = true,
        trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded) },
        modifier = Modifier.menuAnchor(MenuAnchorType.PrimaryNotEditable)
    )
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
| `expanded` | `Boolean` | — | Whether the dropdown menu is currently visible. |
| `onExpandedChange` | `(Boolean) -> Unit` | — | Called when the box is clicked or the menu should collapse/expand. |
| `modifier` | `Modifier` | `Modifier` | Applied to the box. |
| `content` | `@Composable ExposedDropdownMenuBoxScope.() -> Unit` | — | Scope providing `Modifier.menuAnchor(...)`; contains the anchor `TextField`/`OutlinedTextField` and the `ExposedDropdownMenu`. |

## Notes

- Experimental API (`@ExperimentalMaterial3Api`).
- Anchor the text field with `Modifier.menuAnchor(MenuAnchorType.PrimaryNotEditable)` (read-only field) or `MenuAnchorType.PrimaryEditable` (editable, autocomplete-style field).
- `ExposedDropdownMenuDefaults.TrailingIcon(expanded, modifier)` renders the standard rotating chevron; `ExposedDropdownMenuDefaults.textFieldColors(...)` / `outlinedTextFieldColors(...)` provide matching `TextFieldColors`.
- Package: `androidx.compose.material3`.

## Related

- [ExposedDropdownMenu](./exposeddropdownmenu.md)
- [DropdownMenu](./dropdownmenu.md)
- [TextField](./textfield.md)
