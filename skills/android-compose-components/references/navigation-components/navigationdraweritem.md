# NavigationDrawerItem

Represents a single destination within a navigation drawer (used inside `ModalDrawerSheet`, `DismissibleDrawerSheet`, or `PermanentDrawerSheet`), supporting an icon, badge, and selected state.

## Signature / Usage

```kotlin
@Composable
fun NavigationDrawerItem(
    label: @Composable () -> Unit,
    selected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    icon: (@Composable () -> Unit)? = null,
    badge: (@Composable () -> Unit)? = null,
    shape: Shape = NavigationDrawerTokens.ActiveIndicatorShape.value,
    colors: NavigationDrawerItemColors = NavigationDrawerItemDefaults.colors(),
    interactionSource: MutableInteractionSource? = null,
)
```

```kotlin
NavigationDrawerItem(
    label = { Text(text = "Drawer Item") },
    selected = false,
    icon = { Icon(Icons.Outlined.Settings, contentDescription = null) },
    badge = { Text("20") },
    onClick = { /* handle click */ }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `@Composable () -> Unit` | — | Text label content. |
| `selected` | `Boolean` | — | Whether this item is currently selected. |
| `onClick` | `() -> Unit` | — | Called when this item is clicked. |
| `modifier` | `Modifier` | `Modifier` | Applied to this item. |
| `icon` | `(@Composable () -> Unit)?` | `null` | Optional leading icon. |
| `badge` | `(@Composable () -> Unit)?` | `null` | Optional trailing badge content, e.g. a count. |
| `shape` | `Shape` | `NavigationDrawerTokens.ActiveIndicatorShape.value` | Shape of the active indicator behind the item. |
| `colors` | `NavigationDrawerItemColors` | `NavigationDrawerItemDefaults.colors()` | Resolves colors in different states. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |

## Notes

- Package: `androidx.compose.material3`.
- Placed inside a drawer sheet composable (`ModalDrawerSheet`, `DismissibleDrawerSheet`, `PermanentDrawerSheet`), which is itself the content of `ModalNavigationDrawer`, `DismissibleNavigationDrawer`, or `PermanentNavigationDrawer`.

## Related

- [NavigationBarItem](./navigationbaritem.md)
- [NavigationRailItem](./navigationrailitem.md)
