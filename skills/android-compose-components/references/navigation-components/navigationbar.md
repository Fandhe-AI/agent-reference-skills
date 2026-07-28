# NavigationBar

Container that offers a persistent, convenient way to switch between primary destinations in an app, displayed at the bottom of the screen. Should contain three to five `NavigationBarItem` children.

## Signature / Usage

```kotlin
@Composable
fun NavigationBar(
    modifier: Modifier = Modifier,
    containerColor: Color = NavigationBarDefaults.containerColor,
    contentColor: Color = MaterialTheme.colorScheme.contentColorFor(containerColor),
    tonalElevation: Dp = NavigationBarDefaults.Elevation,
    windowInsets: WindowInsets = NavigationBarDefaults.windowInsets,
    content: @Composable RowScope.() -> Unit,
)
```

```kotlin
NavigationBar(windowInsets = NavigationBarDefaults.windowInsets) {
    Destination.entries.forEachIndexed { index, destination ->
        NavigationBarItem(
            selected = selectedDestination == index,
            onClick = { selectedDestination = index },
            icon = { Icon(destination.icon, contentDescription = destination.contentDescription) },
            label = { Text(destination.label) }
        )
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to this navigation bar. |
| `containerColor` | `Color` | `NavigationBarDefaults.containerColor` | Background color. |
| `contentColor` | `Color` | `MaterialTheme.colorScheme.contentColorFor(containerColor)` | Preferred content color, used unless overridden by an item's own colors. |
| `tonalElevation` | `Dp` | `NavigationBarDefaults.Elevation` | Elevation tint applied when using a surface `containerColor`. |
| `windowInsets` | `WindowInsets` | `NavigationBarDefaults.windowInsets` | Insets applied to the bar. |
| `content` | `@Composable RowScope.() -> Unit` | — | `NavigationBarItem`s to display, typically 3-5. |

## Notes

- Package: `androidx.compose.material3`.
- Use for 3-5 destinations of equal importance, in compact window sizes; destinations should stay consistent across screens.
- Typically placed in `Scaffold`'s `bottomBar` slot.

## Related

- [NavigationBarItem](./navigationbaritem.md)
- [NavigationRail](./navigationrail.md)
