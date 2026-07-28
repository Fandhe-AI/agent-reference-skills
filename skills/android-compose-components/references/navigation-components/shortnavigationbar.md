# ShortNavigationBar

Material Design short navigation bar, a more compact bottom-navigation container variant offering a persistent way to switch between primary destinations.

## Signature / Usage

```kotlin
@Composable
fun ShortNavigationBar(
    modifier: Modifier = Modifier,
    containerColor: Color = ShortNavigationBarDefaults.containerColor,
    contentColor: Color = ShortNavigationBarDefaults.contentColor,
    windowInsets: WindowInsets = ShortNavigationBarDefaults.windowInsets,
    arrangement: ShortNavigationBarArrangement = ShortNavigationBarDefaults.arrangement,
    content: @Composable () -> Unit,
)
```

```kotlin
ShortNavigationBar {
    Destination.entries.forEachIndexed { index, destination ->
        ShortNavigationBarItem(
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
| `containerColor` | `Color` | `ShortNavigationBarDefaults.containerColor` | Background color. |
| `contentColor` | `Color` | `ShortNavigationBarDefaults.contentColor` | Preferred content color. |
| `windowInsets` | `WindowInsets` | `ShortNavigationBarDefaults.windowInsets` | Insets applied to the bar. |
| `arrangement` | `ShortNavigationBarArrangement` | `ShortNavigationBarDefaults.arrangement` | How items are distributed horizontally within the bar. |
| `content` | `@Composable () -> Unit` | — | `ShortNavigationBarItem`s to display. |

## Notes

- Package: `androidx.compose.material3`.
- Unlike `NavigationBar`, `content` is not scoped to `RowScope` — item layout is controlled via `arrangement` instead.

## Related

- [ShortNavigationBarItem](./shortnavigationbaritem.md)
- [NavigationBar](./navigationbar.md)
