# WideNavigationRailItem

Represents a single selectable destination within a `WideNavigationRail` or `ModalWideNavigationRail`, displaying an icon and a text label whose position adapts to the rail's collapsed/expanded state.

## Signature / Usage

```kotlin
@Composable
fun WideNavigationRailItem(
    selected: Boolean,
    onClick: () -> Unit,
    icon: @Composable () -> Unit,
    label: @Composable (() -> Unit)?,
    railExpanded: Boolean,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    iconPosition: NavigationItemIconPosition = WideNavigationRailItemDefaults.iconPositionFor(railExpanded),
    colors: NavigationItemColors = WideNavigationRailItemDefaults.colors(),
    interactionSource: MutableInteractionSource? = null,
    indicatorPadding: PaddingValues = WideNavigationRailItemDefaults.indicatorPadding(railExpanded = railExpanded),
)
```

```kotlin
WideNavigationRailItem(
    railExpanded = state.targetValue == WideNavigationRailValue.Expanded,
    selected = selectedItem == index,
    onClick = { selectedItem = index },
    icon = { Icon(item.icon, contentDescription = null) },
    label = { Text(item.label) },
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `Boolean` | — | Whether this item is currently selected. |
| `onClick` | `() -> Unit` | — | Called when this item is clicked. |
| `icon` | `@Composable () -> Unit` | — | Icon content, typically an `Icon`. |
| `label` | `@Composable (() -> Unit)?` | — | Text label; unlike `NavigationRailItem`, always shown (top or start of the icon) rather than optional-hidden. |
| `railExpanded` | `Boolean` | — | Whether the hosting rail is expanded; typically `state.targetValue == WideNavigationRailValue.Expanded` from the rail's `WideNavigationRailState`. Drives the default `iconPosition` and `indicatorPadding`. |
| `modifier` | `Modifier` | `Modifier` | Applied to this item. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `iconPosition` | `NavigationItemIconPosition` | `WideNavigationRailItemDefaults.iconPositionFor(railExpanded)` | `Top` when collapsed, `Start` when expanded, by default. |
| `colors` | `NavigationItemColors` | `WideNavigationRailItemDefaults.colors()` | Resolves colors in different states. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |
| `indicatorPadding` | `PaddingValues` | `WideNavigationRailItemDefaults.indicatorPadding(railExpanded = railExpanded)` | Padding around the selection indicator. |

## Notes

- Package: `androidx.compose.material3`. Only usable as a child of `WideNavigationRail` or `ModalWideNavigationRail`, not of the plain `NavigationRail`.
- Distinct type from `NavigationRailItem`: it requires `railExpanded` and always renders a label, animating the icon between a top position (collapsed rail) and a leading position (expanded rail).

## Related

- [WideNavigationRail](./widenavigationrail.md)
- [NavigationRailItem](./navigationrailitem.md)
