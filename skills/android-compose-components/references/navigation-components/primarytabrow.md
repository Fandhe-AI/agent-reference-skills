# PrimaryTabRow

Material Design primary tabs row for displaying the main content destinations of a screen, placed at the top of the content pane under a top app bar. Fixed tabs show all tabs simultaneously.

## Signature / Usage

```kotlin
@Composable
fun PrimaryTabRow(
    selectedTabIndex: Int,
    modifier: Modifier = Modifier,
    containerColor: Color = TabRowDefaults.primaryContainerColor,
    contentColor: Color = TabRowDefaults.primaryContentColor,
    indicator: @Composable TabIndicatorScope.() -> Unit = {
        TabRowDefaults.PrimaryIndicator(
            modifier = Modifier.tabIndicatorOffset(selectedTabIndex, matchContentSize = true),
            width = Dp.Unspecified,
        )
    },
    divider: @Composable () -> Unit = { HorizontalDivider() },
    tabs: @Composable () -> Unit,
)
```

```kotlin
PrimaryTabRow(selectedTabIndex = selectedDestination) {
    Destination.entries.forEachIndexed { index, destination ->
        Tab(
            selected = selectedDestination == index,
            onClick = { selectedDestination = index },
            text = { Text(destination.label) }
        )
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `selectedTabIndex` | `Int` | — | Index of the currently selected tab. |
| `modifier` | `Modifier` | `Modifier` | Applied to this tab row. |
| `containerColor` | `Color` | `TabRowDefaults.primaryContainerColor` | Background color. |
| `contentColor` | `Color` | `TabRowDefaults.primaryContentColor` | Preferred content color. |
| `indicator` | `@Composable TabIndicatorScope.() -> Unit` | `TabRowDefaults.PrimaryIndicator(modifier = Modifier.tabIndicatorOffset(selectedTabIndex, matchContentSize = true), width = Dp.Unspecified)` | Visual indicator under the selected tab. |
| `divider` | `@Composable () -> Unit` | `{ HorizontalDivider() }` | Divider rendered under the tab row. |
| `tabs` | `@Composable () -> Unit` | — | The `Tab` (or `LeadingIconTab`) children. |

## Notes

- Package: `androidx.compose.material3`.
- `SecondaryTabRow` has an identical signature (same parameters) but defaults `containerColor`/`contentColor` to `TabRowDefaults.secondaryContainerColor`/`secondaryContentColor` and its `indicator` default uses `TabRowDefaults.SecondaryIndicator(Modifier.tabIndicatorOffset(selectedTabIndex, matchContentSize = false))`; used within a content area to further separate related content when a screen needs more than one level of tabs.
- `PrimaryScrollableTabRow` / `SecondaryScrollableTabRow` are scrollable variants for longer label sets that don't fit on screen, adding `scrollState: ScrollState = rememberScrollState()`, `edgePadding: Dp = TabRowDefaults.ScrollableTabRowEdgeStartPadding`, and `minTabWidth: Dp = TabRowDefaults.ScrollableTabRowMinTabWidth`.
- The plain `TabRow` and `ScrollableTabRow` composables are `@Deprecated`, replaced by `PrimaryTabRow`/`SecondaryTabRow` and `PrimaryScrollableTabRow`/`SecondaryScrollableTabRow` respectively; prefer the new variants.

## Related

- [Tab](./tab.md)
- [LeadingIconTab](./leadingicontab.md)
