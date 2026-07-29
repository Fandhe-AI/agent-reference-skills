# NavigationRail

Container providing access to primary destinations in apps on tablet and desktop screens, displayed as a vertical column on the side of the screen.

## Signature / Usage

```kotlin
@Composable
fun NavigationRail(
    modifier: Modifier = Modifier,
    containerColor: Color = NavigationRailDefaults.ContainerColor,
    contentColor: Color = contentColorFor(containerColor),
    header: @Composable (ColumnScope.() -> Unit)? = null,
    windowInsets: WindowInsets = NavigationRailDefaults.windowInsets,
    content: @Composable ColumnScope.() -> Unit,
)
```

```kotlin
NavigationRail(modifier = Modifier.padding(contentPadding)) {
    Destination.entries.forEachIndexed { index, destination ->
        NavigationRailItem(
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
| `modifier` | `Modifier` | `Modifier` | Applied to this navigation rail. |
| `containerColor` | `Color` | `NavigationRailDefaults.ContainerColor` | Background color. |
| `contentColor` | `Color` | `contentColorFor(containerColor)` | Preferred content color. |
| `header` | `@Composable (ColumnScope.() -> Unit)?` | `null` | Optional content, such as a `FloatingActionButton` or logo, shown above the items. |
| `windowInsets` | `WindowInsets` | `NavigationRailDefaults.windowInsets` | Insets applied to the rail. |
| `content` | `@Composable ColumnScope.() -> Unit` | — | `NavigationRailItem`s to display. |

## Notes

- Package: `androidx.compose.material3`.
- Recommended for three to seven top-level destinations accessible anywhere in the app, on tablet or desktop layouts with ample horizontal space.

## Related

- [NavigationRailItem](./navigationrailitem.md)
- [NavigationBar](./navigationbar.md)
- [WideNavigationRail](./widenavigationrail.md)
