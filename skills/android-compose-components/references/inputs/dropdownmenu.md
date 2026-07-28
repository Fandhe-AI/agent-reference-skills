# DropdownMenu

Displays a list of choices on a temporary surface, typically anchored to a button or icon.

## Signature / Usage

```kotlin
@Composable
public expect fun DropdownMenu(
    expanded: Boolean,
    onDismissRequest: () -> Unit,
    modifier: Modifier = Modifier,
    offset: DpOffset = DpOffset(0.dp, 0.dp),
    scrollState: ScrollState = rememberScrollState(),
    properties: PopupProperties = MenuDefaults.DefaultMenuProperties,
    shape: Shape = MenuDefaults.shape,
    containerColor: Color = MenuDefaults.containerColor,
    tonalElevation: Dp = MenuDefaults.TonalElevation,
    shadowElevation: Dp = MenuDefaults.ShadowElevation,
    border: BorderStroke? = null,
    content: @Composable ColumnScope.() -> Unit,
)
```

```kotlin
var expanded by remember { mutableStateOf(false) }
Box {
    IconButton(onClick = { expanded = !expanded }) {
        Icon(Icons.Default.MoreVert, contentDescription = "More options")
    }
    DropdownMenu(
        expanded = expanded,
        onDismissRequest = { expanded = false }
    ) {
        DropdownMenuItem(text = { Text("Option 1") }, onClick = { })
        DropdownMenuItem(text = { Text("Option 2") }, onClick = { })
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `expanded` | `Boolean` | — | Whether the menu is currently visible. |
| `onDismissRequest` | `() -> Unit` | — | Called when the user selects an item or dismisses the menu (e.g. tap outside). |
| `modifier` | `Modifier` | `Modifier` | Applied to the menu content column. |
| `offset` | `DpOffset` | `DpOffset(0.dp, 0.dp)` | Offset of the menu from its anchor. |
| `scrollState` | `ScrollState` | `rememberScrollState()` | Scroll state for long menus. |
| `properties` | `PopupProperties` | `MenuDefaults.DefaultMenuProperties` | Popup window properties (focusable, dismiss behavior). |
| `shape` | `Shape` | `MenuDefaults.shape` | Shape of the menu surface. |
| `containerColor` | `Color` | `MenuDefaults.containerColor` | Background color of the menu surface. |
| `tonalElevation` | `Dp` | `MenuDefaults.TonalElevation` | Tonal elevation of the menu surface. |
| `shadowElevation` | `Dp` | `MenuDefaults.ShadowElevation` | Shadow elevation of the menu surface. |
| `border` | `BorderStroke?` | `null` | Optional border around the menu surface. |
| `content` | `@Composable ColumnScope.() -> Unit` | — | Menu content, typically `DropdownMenuItem`s and `HorizontalDivider`s. |

## Notes

- Place `DropdownMenu` inside a `Box` anchored above the trigger (e.g. `IconButton`); it is automatically scrollable when content overflows.
- For a menu paired with a text field showing the selected value, use `ExposedDropdownMenuBox` instead.
- Declared as `expect fun` (platform-specific `actual` implementations).
- Package: `androidx.compose.material3`.

## Related

- [DropdownMenuItem](./dropdownmenuitem.md)
- [ExposedDropdownMenuBox](./exposeddropdownmenubox.md)
