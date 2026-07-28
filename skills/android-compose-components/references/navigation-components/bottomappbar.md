# BottomAppBar

Material Design bottom app bar that displays navigation and key actions across the bottom of the screen, optionally embedding a `FloatingActionButton`.

## Signature / Usage

```kotlin
@Composable
fun BottomAppBar(
    actions: @Composable RowScope.() -> Unit,
    modifier: Modifier = Modifier,
    floatingActionButton: @Composable (() -> Unit)? = null,
    containerColor: Color = BottomAppBarDefaults.containerColor,
    contentColor: Color = contentColorFor(containerColor),
    tonalElevation: Dp = BottomAppBarDefaults.ContainerElevation,
    contentPadding: PaddingValues = BottomAppBarDefaults.ContentPadding,
    windowInsets: WindowInsets = BottomAppBarDefaults.windowInsets,
    scrollBehavior: BottomAppBarScrollBehavior? = null,
)
```

```kotlin
BottomAppBar(
    actions = {
        IconButton(onClick = { }) {
            Icon(Icons.Filled.Check, contentDescription = "Localized description")
        }
    },
    floatingActionButton = {
        FloatingActionButton(
            onClick = { },
            containerColor = BottomAppBarDefaults.bottomAppBarFabColor,
            elevation = FloatingActionButtonDefaults.bottomAppBarFabElevation()
        ) {
            Icon(Icons.Filled.Add, "Localized description")
        }
    }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `@Composable RowScope.() -> Unit` | — | Icons displayed at the start of the bar, typically `IconButton`s for key navigation/actions. |
| `modifier` | `Modifier` | `Modifier` | Applied to this bottom app bar. |
| `floatingActionButton` | `@Composable (() -> Unit)?` | `null` | Optional FAB shown at the end of the bar. |
| `containerColor` | `Color` | `BottomAppBarDefaults.containerColor` | Background color. |
| `contentColor` | `Color` | `contentColorFor(containerColor)` | Preferred color for content inside the bar. |
| `tonalElevation` | `Dp` | `BottomAppBarDefaults.ContainerElevation` | Elevation tint applied when using a surface `containerColor`. |
| `contentPadding` | `PaddingValues` | `BottomAppBarDefaults.ContentPadding` | Padding applied to the content row. |
| `windowInsets` | `WindowInsets` | `BottomAppBarDefaults.windowInsets` | Insets applied to the bar. |
| `scrollBehavior` | `BottomAppBarScrollBehavior?` | `null` | Determines how the bar reacts to scrolling of content above it. |

## Notes

- Package: `androidx.compose.material3`.
- A `content: @Composable RowScope.() -> Unit`-only overload (no `actions`/`floatingActionButton` slots) exists for fully custom layouts, taking the same `modifier`/`containerColor`/`contentColor`/`tonalElevation`/`contentPadding`/`windowInsets`/`scrollBehavior` parameters.
- `FlexibleBottomAppBar` is a variant with configurable `horizontalArrangement: Arrangement.Horizontal = BottomAppBarDefaults.FlexibleHorizontalArrangement` and `expandedHeight: Dp = BottomAppBarDefaults.FlexibleBottomAppBarHeight` in place of `tonalElevation`, for custom action layouts.
- Typically placed in `Scaffold`'s `bottomBar` slot.

## Related

- [TopAppBar](./topappbar.md)
- [TopAppBarScrollBehavior](./topappbarscrollbehavior.md)
