# NavigationRailItem

Represents a single selectable destination within a `NavigationRail`, displaying an icon and an optional label.

## Signature / Usage

```kotlin
@Composable
fun NavigationRailItem(
    selected: Boolean,
    onClick: () -> Unit,
    icon: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    label: @Composable (() -> Unit)? = null,
    alwaysShowLabel: Boolean = true,
    colors: NavigationRailItemColors = NavigationRailItemDefaults.colors(),
    interactionSource: MutableInteractionSource? = null,
)
```

```kotlin
NavigationRailItem(
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
| `colors` | `NavigationRailItemColors` | `NavigationRailItemDefaults.colors()` | Resolves colors in different states. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |

## Notes

- Package: `androidx.compose.material3`. Only usable as a child of `NavigationRail`.

## Related

- [NavigationRail](./navigationrail.md)
- [NavigationBarItem](./navigationbaritem.md)
