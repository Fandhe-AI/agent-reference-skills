# WideNavigationRail

Material Design navigation rail providing access to primary destinations on tablet, desktop, and large-screen layouts. Displays multiple `WideNavigationRailItem`s with an optional header, and can collapse to an icon-only rail or expand to show labels next to icons; the transition is driven by a `WideNavigationRailState`.

## Signature / Usage

```kotlin
@Composable
fun WideNavigationRail(
    modifier: Modifier = Modifier,
    state: WideNavigationRailState = rememberWideNavigationRailState(),
    shape: Shape = WideNavigationRailDefaults.shape,
    colors: WideNavigationRailColors = WideNavigationRailDefaults.colors(),
    header: @Composable (() -> Unit)? = null,
    windowInsets: WindowInsets = WideNavigationRailDefaults.windowInsets,
    arrangement: Arrangement.Vertical = WideNavigationRailDefaults.arrangement,
    contentPadding: PaddingValues = WideNavigationRailDefaults.ContentPadding,
    content: @Composable () -> Unit,
)
```

```kotlin
val state = rememberWideNavigationRailState()

WideNavigationRail(state = state) {
    items.forEachIndexed { index, item ->
        WideNavigationRailItem(
            railExpanded = state.targetValue == WideNavigationRailValue.Expanded,
            selected = selectedItem == index,
            onClick = { selectedItem = index },
            icon = { Icon(item.icon, contentDescription = null) },
            label = { Text(item.label) },
        )
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to this navigation rail. |
| `state` | `WideNavigationRailState` | `rememberWideNavigationRailState()` | Controls and observes the collapsed/expanded state; see `WideNavigationRailValue.Collapsed` / `Expanded`, `state.expand()`, `state.collapse()`, `state.isAnimating`. |
| `shape` | `Shape` | `WideNavigationRailDefaults.shape` | Shape of the rail container. |
| `colors` | `WideNavigationRailColors` | `WideNavigationRailDefaults.colors()` | Container/content colors. |
| `header` | `@Composable (() -> Unit)?` | `null` | Optional content, such as a menu `IconButton` or `FloatingActionButton`, shown above the items. |
| `windowInsets` | `WindowInsets` | `WideNavigationRailDefaults.windowInsets` | Insets applied to the rail. |
| `arrangement` | `Arrangement.Vertical` | `WideNavigationRailDefaults.arrangement` | Vertical arrangement of the header and items. |
| `contentPadding` | `PaddingValues` | `WideNavigationRailDefaults.ContentPadding` | Padding applied around the rail's content. |
| `content` | `@Composable () -> Unit` | — | `WideNavigationRailItem`s to display. |

## Notes

- Package: `androidx.compose.material3`. Fully stable as of Compose Material3 1.5.0-alpha20 (its remaining `@ExperimentalMaterial3ExpressiveApi` surface was removed at that release); available non-experimental starting with the 1.4.0 stable line.
- Distinct component from `NavigationRail` — it adds a collapsible/expandable state (`WideNavigationRailState`), a header slot positioned above items, and item icon/label layout that adapts to the expanded state (see `WideNavigationRailItem`).
- `ModalWideNavigationRail` is a variant with the same item-hosting shape that overlays content with a scrim while expanded instead of pushing the layout, for use on top of existing content: `ModalWideNavigationRail(modifier, state, hideOnCollapse: Boolean = false, collapsedShape, expandedShape, colors, header, expandedHeaderTopPadding: Dp = 0.dp, windowInsets, arrangement, expandedProperties: ModalWideNavigationRailProperties = WideNavigationRailDefaults.ModalExpandedProperties, contentPadding, content)`. `hideOnCollapse` fully hides the rail off-screen instead of showing a collapsed icon-only rail.
- `rememberWideNavigationRailState(initialValue: WideNavigationRailValue = WideNavigationRailValue.Collapsed)` creates and remembers the state; `state.targetValue` / `state.currentValue` expose the animating and settled `WideNavigationRailValue`.

## Related

- [WideNavigationRailItem](./widenavigationrailitem.md)
- [NavigationRail](./navigationrail.md)
