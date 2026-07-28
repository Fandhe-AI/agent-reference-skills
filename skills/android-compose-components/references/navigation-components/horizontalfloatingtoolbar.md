# HorizontalFloatingToolbar

A horizontal floating toolbar that displays navigation and key actions in a `Row`, floating above content and optionally collapsing/expanding in response to scroll.

## Signature / Usage

```kotlin
@Composable
fun HorizontalFloatingToolbar(
    expanded: Boolean,
    modifier: Modifier = Modifier,
    colors: FloatingToolbarColors = FloatingToolbarDefaults.standardFloatingToolbarColors(),
    contentPadding: PaddingValues = FloatingToolbarDefaults.ContentPadding,
    scrollBehavior: FloatingToolbarScrollBehavior? = null,
    shape: Shape = FloatingToolbarDefaults.ContainerShape,
    leadingContent: @Composable (RowScope.() -> Unit)? = null,
    trailingContent: @Composable (RowScope.() -> Unit)? = null,
    expandedShadowElevation: Dp = FloatingToolbarDefaults.ContainerExpandedElevation,
    collapsedShadowElevation: Dp = FloatingToolbarDefaults.ContainerCollapsedElevation,
    content: @Composable RowScope.() -> Unit,
)
```

```kotlin
HorizontalFloatingToolbar(
    expanded = true,
    leadingContent = { Icon(Icons.Filled.Add, contentDescription = null) },
    trailingContent = { Icon(Icons.Filled.MoreVert, contentDescription = null) },
) {
    IconButton(onClick = { }) {
        Icon(Icons.Filled.Edit, contentDescription = "Edit")
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `expanded` | `Boolean` | — | Whether the toolbar shows its expanded (full) or collapsed state. |
| `modifier` | `Modifier` | `Modifier` | Applied to this toolbar. |
| `colors` | `FloatingToolbarColors` | `FloatingToolbarDefaults.standardFloatingToolbarColors()` | Container/content colors. |
| `contentPadding` | `PaddingValues` | `FloatingToolbarDefaults.ContentPadding` | Padding applied to the content row. |
| `scrollBehavior` | `FloatingToolbarScrollBehavior?` | `null` | Determines how the toolbar reacts to scrolling of content. |
| `shape` | `Shape` | `FloatingToolbarDefaults.ContainerShape` | Shape of the container. |
| `leadingContent` | `@Composable (RowScope.() -> Unit)?` | `null` | Optional content shown before `content`. |
| `trailingContent` | `@Composable (RowScope.() -> Unit)?` | `null` | Optional content shown after `content`. |
| `expandedShadowElevation` | `Dp` | `FloatingToolbarDefaults.ContainerExpandedElevation` | Shadow elevation while expanded. |
| `collapsedShadowElevation` | `Dp` | `FloatingToolbarDefaults.ContainerCollapsedElevation` | Shadow elevation while collapsed. |
| `content` | `@Composable RowScope.() -> Unit` | — | Main toolbar content, laid out in a `Row`. |

## Notes

- Package: `androidx.compose.material3`.
- A second overload accepts a `floatingActionButton: @Composable () -> Unit` parameter to place an adjacent FAB, plus `floatingActionButtonPosition: FloatingToolbarHorizontalFabPosition = FloatingToolbarHorizontalFabPosition.End`, `animationSpec: FiniteAnimationSpec<Float> = FloatingToolbarDefaults.animationSpec()`, and elevation defaults suffixed `WithFab` (`ContainerExpandedElevationWithFab` / `ContainerCollapsedElevationWithFab`) in place of the standard ones.
- Use `rememberFloatingToolbarState(initialOffsetLimit, initialOffset, initialContentOffset)` together with a `FloatingToolbarScrollBehavior` (from `FloatingToolbarDefaults`) to collapse/expand the toolbar on scroll, similar to `TopAppBarScrollBehavior`.

## Related

- [VerticalFloatingToolbar](./verticalfloatingtoolbar.md)
- [TopAppBarScrollBehavior](./topappbarscrollbehavior.md)
