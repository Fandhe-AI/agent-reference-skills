# TopAppBar

Material Design small top app bar for displaying information and actions at the top of a screen. The default top app bar; use it when no larger variant is needed.

## Signature / Usage

```kotlin
@Composable
fun TopAppBar(
    title: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    navigationIcon: @Composable () -> Unit = {},
    actions: @Composable RowScope.() -> Unit = {},
    expandedHeight: Dp = TopAppBarDefaults.TopAppBarExpandedHeight,
    windowInsets: WindowInsets = TopAppBarDefaults.windowInsets,
    colors: TopAppBarColors = TopAppBarDefaults.topAppBarColors(),
    scrollBehavior: TopAppBarScrollBehavior? = null,
    contentPadding: PaddingValues = TopAppBarDefaults.ContentPadding,
)
```

```kotlin
TopAppBar(
    colors = TopAppBarDefaults.topAppBarColors(
        containerColor = MaterialTheme.colorScheme.primaryContainer,
        titleContentColor = MaterialTheme.colorScheme.primary,
    ),
    title = { Text("Small Top App Bar") }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `@Composable () -> Unit` | — | Title to be displayed in the app bar. |
| `modifier` | `Modifier` | `Modifier` | Applied to this top app bar. |
| `navigationIcon` | `@Composable () -> Unit` | `{}` | Navigation icon displayed at the start, typically an `IconButton` or `IconToggleButton`. |
| `actions` | `@Composable RowScope.() -> Unit` | `{}` | Row of actions displayed at the end, typically `IconButton`s. |
| `expandedHeight` | `Dp` | `TopAppBarDefaults.TopAppBarExpandedHeight` | Height of the app bar when fully expanded. |
| `windowInsets` | `WindowInsets` | `TopAppBarDefaults.windowInsets` | Insets applied to the bar. |
| `colors` | `TopAppBarColors` | `TopAppBarDefaults.topAppBarColors()` | Container/content colors for different states. |
| `scrollBehavior` | `TopAppBarScrollBehavior?` | `null` | Determines how the bar reacts to scrolling of content below it. |
| `contentPadding` | `PaddingValues` | `TopAppBarDefaults.ContentPadding` | Padding applied to the bar's content. |

## Notes

- Package: `androidx.compose.material3`.
- Also accepts a `title` + `subtitle` overload with an additional `titleHorizontalAlignment: Alignment.Horizontal = Alignment.Start` parameter.
- Size variants share the same parameter shape (`title`, `navigationIcon`, `actions`, `colors`, `scrollBehavior`, `windowInsets`):
  - `CenterAlignedTopAppBar` — horizontally centers the title.
  - `MediumTopAppBar` — adds `collapsedHeight` / `expandedHeight` (default `TopAppBarDefaults.MediumAppBarCollapsedHeight` / `MediumAppBarExpandedHeight`); title moves beneath the icon row when expanded.
  - `LargeTopAppBar` — same shape as `MediumTopAppBar` with `TopAppBarDefaults.LargeAppBarCollapsedHeight` / `LargeAppBarExpandedHeight`; more vertical space for the title.
  - `MediumFlexibleTopAppBar` / `LargeFlexibleTopAppBar` — add an optional `subtitle: (@Composable () -> Unit)?` and `titleHorizontalAlignment`, showing both title and subtitle when expanded.
  - `TwoRowsTopAppBar` — lower-level building block taking `title`/`subtitle` as `@Composable (expanded: Boolean) -> Unit` and explicit `collapsedHeight` / `expandedHeight`; used to implement the above variants.
- Pass `scrollBehavior` to make the bar collapse/expand/pin in response to scrolling — see [TopAppBarScrollBehavior](./topappbarscrollbehavior.md).
- Typically placed in `Scaffold`'s `topBar` slot.

## Related

- [TopAppBarScrollBehavior](./topappbarscrollbehavior.md)
- [BottomAppBar](./bottomappbar.md)
