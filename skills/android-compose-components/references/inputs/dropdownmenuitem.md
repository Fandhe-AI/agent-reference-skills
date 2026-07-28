# DropdownMenuItem

A single selectable row inside a `DropdownMenu` (or `ExposedDropdownMenu`), with optional leading/trailing icons.

## Signature / Usage

```kotlin
@Composable
public expect fun DropdownMenuItem(
    text: @Composable () -> Unit,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    leadingIcon: @Composable (() -> Unit)? = null,
    trailingIcon: @Composable (() -> Unit)? = null,
    enabled: Boolean = true,
    colors: MenuItemColors = MenuDefaults.itemColors(),
    contentPadding: PaddingValues = MenuDefaults.DropdownMenuItemContentPadding,
    interactionSource: MutableInteractionSource? = null,
)
```

```kotlin
DropdownMenuItem(
    text = { Text("Settings") },
    leadingIcon = { Icon(Icons.Outlined.Settings, contentDescription = null) },
    onClick = { /* action */ }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `@Composable () -> Unit` | — | Primary text shown for this menu item. |
| `onClick` | `() -> Unit` | — | Called when the item is selected. |
| `modifier` | `Modifier` | `Modifier` | Applied to this item. |
| `leadingIcon` | `@Composable (() -> Unit)?` | `null` | Icon at the start of the item. |
| `trailingIcon` | `@Composable (() -> Unit)?` | `null` | Icon at the end of the item. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `colors` | `MenuItemColors` | `MenuDefaults.itemColors()` | Resolves colors in different states. |
| `contentPadding` | `PaddingValues` | `MenuDefaults.DropdownMenuItemContentPadding` | Spacing between the item bounds and content. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |

## Notes

- Declared as `expect fun` (platform-specific `actual` implementations).
- Use `HorizontalDivider()` between groups of `DropdownMenuItem`s to section a menu.
- Package: `androidx.compose.material3`.

## Related

- [DropdownMenu](./dropdownmenu.md)
- [ExposedDropdownMenu](./exposeddropdownmenu.md)
