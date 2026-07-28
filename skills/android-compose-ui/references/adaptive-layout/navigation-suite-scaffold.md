# NavigationSuiteScaffold

Scaffold that automatically swaps between a navigation bar, navigation rail, and navigation drawer based on the current window size class and posture, wrapping the app's main content.

## Signature / Usage

```kotlin
@Composable
public fun NavigationSuiteScaffold(
    navigationItems: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    navigationSuiteType: NavigationSuiteType =
        NavigationSuiteScaffoldDefaults.navigationSuiteType(WindowAdaptiveInfoDefault),
    navigationSuiteColors: NavigationSuiteColors = NavigationSuiteDefaults.colors(),
    containerColor: Color = NavigationSuiteScaffoldDefaults.containerColor,
    contentColor: Color = NavigationSuiteScaffoldDefaults.contentColor,
    state: NavigationSuiteScaffoldState = rememberNavigationSuiteScaffoldState(),
    navigationItemVerticalArrangement: Arrangement.Vertical = NavigationSuiteDefaults.verticalArrangement,
    primaryActionContent: @Composable (() -> Unit) = {},
    primaryActionContentHorizontalAlignment: Alignment.Horizontal =
        NavigationSuiteScaffoldDefaults.primaryActionContentAlignment,
    content: @Composable () -> Unit,
)

// Item DSL used inside navigationItems
public fun NavigationSuiteScope.item(
    selected: Boolean,
    onClick: () -> Unit,
    icon: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    label: @Composable (() -> Unit)? = null,
    alwaysShowLabel: Boolean = true,
    badge: (@Composable () -> Unit)? = null,
    colors: NavigationSuiteItemColors? = null,
    interactionSource: MutableInteractionSource? = null,
)
```

```kotlin
var currentDestination by rememberSaveable { mutableStateOf(AppDestinations.HOME) }

NavigationSuiteScaffold(
    navigationItems = {
        AppDestinations.entries.forEach {
            item(
                icon = { Icon(it.icon, contentDescription = null) },
                label = { Text(stringResource(it.label)) },
                selected = it == currentDestination,
                onClick = { currentDestination = it },
            )
        }
    },
) {
    when (currentDestination) {
        AppDestinations.HOME -> HomeDestination()
        else -> {}
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `navigationItems` | `@Composable () -> Unit` | — | `NavigationSuiteScope.item(...)` calls describing each destination. |
| `modifier` | `Modifier` | `Modifier` | Applied to the scaffold. |
| `navigationSuiteType` | `NavigationSuiteType` | `NavigationSuiteScaffoldDefaults.navigationSuiteType(...)` | Which navigation component to render (bar/rail/drawer variants). |
| `navigationSuiteColors` | `NavigationSuiteColors` | `NavigationSuiteDefaults.colors()` | Colors for the navigation component. |
| `containerColor` | `Color` | `NavigationSuiteScaffoldDefaults.containerColor` | Background color of the scaffold. |
| `contentColor` | `Color` | `NavigationSuiteScaffoldDefaults.contentColor` | Preferred content color for `content`. |
| `state` | `NavigationSuiteScaffoldState` | `rememberNavigationSuiteScaffoldState()` | Controls show/hide animation of the navigation component. |
| `navigationItemVerticalArrangement` | `Arrangement.Vertical` | `NavigationSuiteDefaults.verticalArrangement` | Vertical arrangement of items in rail/drawer layouts. |
| `primaryActionContent` | `@Composable (() -> Unit)` | `{}` | Optional primary action (e.g. FAB) shown alongside navigation items. |
| `primaryActionContentHorizontalAlignment` | `Alignment.Horizontal` | `NavigationSuiteScaffoldDefaults.primaryActionContentAlignment` | Alignment of `primaryActionContent`. |
| `content` | `@Composable () -> Unit` | — | Main app content. |

## Notes

- Module: `androidx.compose.material3:material3-adaptive-navigation-suite`.
- Current `androidx-main` source exposes `NavigationSuiteType` values `ShortNavigationBarCompact`, `ShortNavigationBarMedium`, `WideNavigationRailCollapsed`, `WideNavigationRailExpanded`, plus legacy `NavigationBar`, `NavigationRail`, `NavigationDrawer`, and `None`; the officially published guide (pre-`WideNavigationRail` update) instead shows a simpler `navigationSuiteItems` parameter name and a `NavigationBar` / `NavigationRail` / `NavigationDrawer` / `PermanentNavigationDrawer` enum — check the installed library version's API surface before relying on either exact shape.
- `NavigationSuiteScaffoldDefaults.navigationSuiteType(adaptiveInfo)` is the current recommended way to compute the type from `WindowAdaptiveInfo`; `calculateFromAdaptiveInfo` is kept for the older, non-extended type set.
- Default behavior: compact width/height or tabletop posture → navigation bar; larger windows → navigation rail/drawer.
- Package: `androidx.compose.material3.adaptive.navigationsuite`.

## Related

- [WindowAdaptiveInfo](./window-adaptive-info.md)
