# ShortNavigationBarItem

Represents a single destination within a `ShortNavigationBar`. Labels are always shown, both when selected and unselected, and the icon can be positioned at the top or start of the item.

## Signature / Usage

```kotlin
@Composable
fun ShortNavigationBarItem(
    selected: Boolean,
    onClick: () -> Unit,
    icon: @Composable () -> Unit,
    label: @Composable (() -> Unit)?,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    iconPosition: NavigationItemIconPosition = NavigationItemIconPosition.Top,
    colors: NavigationItemColors = ShortNavigationBarItemDefaults.colors(),
    interactionSource: MutableInteractionSource? = null,
)
```

```kotlin
ShortNavigationBarItem(
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
| `icon` | `@Composable () -> Unit` | — | Icon content. |
| `label` | `@Composable (() -> Unit)?` | — | Text label; required parameter (nullable, no default). |
| `modifier` | `Modifier` | `Modifier` | Applied to this item. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `iconPosition` | `NavigationItemIconPosition` | `NavigationItemIconPosition.Top` | Whether the icon is placed above (`Top`) or beside (`Start`) the label. |
| `colors` | `NavigationItemColors` | `ShortNavigationBarItemDefaults.colors()` | Resolves colors in different states. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |

## Notes

- Package: `androidx.compose.material3`. Only usable as a child of `ShortNavigationBar`.
- Labels are always displayed (when provided) regardless of selection state, unlike `NavigationBarItem`'s `alwaysShowLabel` toggle.

## Related

- [ShortNavigationBar](./shortnavigationbar.md)
- [NavigationBarItem](./navigationbaritem.md)
