# FloatingActionButtonMenu

Expandable menu of items shown alongside a toggleable FAB, giving users additional choices after clicking the FAB.

## Signature / Usage

```kotlin
@Composable
fun FloatingActionButtonMenu(
    expanded: Boolean,
    button: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    horizontalAlignment: Alignment.Horizontal = Alignment.End,
    content: @Composable FloatingActionButtonMenuScope.() -> Unit,
)
```

```kotlin
var expanded by remember { mutableStateOf(false) }

FloatingActionButtonMenu(
    expanded = expanded,
    button = {
        ToggleFloatingActionButton(checked = expanded, onCheckedChange = { expanded = it }) {
            Icon(if (expanded) Icons.Filled.Close else Icons.Filled.Add, contentDescription = null)
        }
    },
) {
    FloatingActionButtonMenuItem(
        onClick = { /* action */ },
        icon = { Icon(Icons.Filled.Edit, contentDescription = null) },
        text = { Text("Edit") },
    )
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `expanded` | `Boolean` | — | Whether the menu is expanded, triggering the staggered show/hide animation. |
| `button` | `@Composable () -> Unit` | — | Composable that triggers show/hide via `expanded`, typically a `ToggleFloatingActionButton`. |
| `modifier` | `Modifier` | `Modifier` | Applied to this menu. |
| `horizontalAlignment` | `Alignment.Horizontal` | `Alignment.End` | Horizontal alignment of the menu items. |
| `content` | `@Composable FloatingActionButtonMenuScope.() -> Unit` | — | Menu content, typically a sequence of `FloatingActionButtonMenuItem`. |

## Notes

- `FloatingActionButtonMenuItem(onClick, text, icon, modifier, containerColor = MaterialTheme.colorScheme.primaryContainer, contentColor = contentColorFor(containerColor))` is an extension on `FloatingActionButtonMenuScope` used as each row inside the menu.
- `ToggleFloatingActionButton(checked, onCheckedChange, modifier, containerColor, contentAlignment = Alignment.TopEnd, containerSize, containerCornerRadius, content)` is the companion toggleable FAB that animates container size, corner radius, and color, and is passed as the `button` slot.
- Not experimental — no `@ExperimentalMaterial3Api` / `@ExperimentalMaterial3ExpressiveApi` annotation on these public composables.
- Package: `androidx.compose.material3`.

## Related

- [FloatingActionButton](./floatingactionbutton.md)
- [ExtendedFloatingActionButton](./extendedfloatingactionbutton.md)
