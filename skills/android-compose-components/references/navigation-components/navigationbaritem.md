# NavigationBarItem

Represents a single destination within a `NavigationBar`, handling the visual selected/unselected state and click interactions.

## Signature / Usage

```kotlin
@Composable
fun RowScope.NavigationBarItem(
    selected: Boolean,
    onClick: () -> Unit,
    icon: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    label: @Composable (() -> Unit)? = null,
    alwaysShowLabel: Boolean = true,
    colors: NavigationBarItemColors = NavigationBarItemDefaults.colors(),
    interactionSource: MutableInteractionSource? = null,
)
```

```kotlin
NavigationBarItem(
    selected = selectedDestination == index,
    onClick = { selectedDestination = index },
    icon = { Icon(destination.icon, contentDescription = destination.contentDescription) },
    label = { Text(destination.label) }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `Boolean` | — | Whether this item is currently selected. |
| `onClick` | `() -> Unit` | — | Called when this item is clicked. |
| `icon` | `@Composable () -> Unit` | — | Icon content, typically an `Icon`. |
| `modifier` | `Modifier` | `Modifier` | Applied to this item. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `label` | `@Composable (() -> Unit)?` | `null` | Optional text label. |
| `alwaysShowLabel` | `Boolean` | `true` | When `false`, the label is only shown when the item is selected. |
| `colors` | `NavigationBarItemColors` | `NavigationBarItemDefaults.colors()` | Resolves colors in different states. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |

## Notes

- Package: `androidx.compose.material3`. Only usable as a child of `NavigationBar` (scoped to `RowScope`).
- With three items, icon and label are both shown; with four or five items, only the selected destination shows its label unless `alwaysShowLabel = true`.

## Related

- [NavigationBar](./navigationbar.md)
- [NavigationRailItem](./navigationrailitem.md)
