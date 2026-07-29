# Developing for different screen sizes

Wear devices ship in a range of screen shapes/sizes (small round, large round, square). `androidx.wear.compose.ui.tooling.preview` provides multi-preview annotations to check a composable across those shapes and font scales at design time; at runtime, prefer percentage-based sizing/padding and `LocalConfiguration` width breakpoints over fixed `dp` values so layouts adapt correctly.

## Signature / Usage

```kotlin
@WearPreviewDevices
@WearPreviewFontScales
@Composable
fun MyScreenPreview() {
    MyScreen()
}
```

```kotlin
const val LARGE_DISPLAY_BREAKPOINT = 225

@Composable
fun isLargeDisplay() = LocalConfiguration.current.screenWidthDp >= LARGE_DISPLAY_BREAKPOINT

@Composable
fun MyScreen() {
    val contentPadding = if (isLargeDisplay()) 16.dp else 10.dp
    ScreenScaffold { paddingValues ->
        // use contentPadding / paddingValues instead of a single fixed dp value
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `@WearPreviewDevices` | multi-preview annotation | — | Renders on both `WearDevices.SMALL_ROUND` and `WearDevices.LARGE_ROUND`. |
| `@WearPreviewFontScales` | multi-preview annotation | — | Renders one composable at 6 font scales (0.94x–1.24x) on a small round device, to check text truncation/reflow. |
| `@WearPreviewSmallRound` / `@WearPreviewLargeRound` | single-preview annotation | — | Shortcut for one specific round shape/size. |
| `@WearPreviewSquare` | single-preview annotation | — | Shortcut for a square Wear device shape. |

## Notes

- These are `@Preview` multi-preview annotations (compose tooling only); they don't affect runtime behavior. Import from `androidx.wear.compose.ui.tooling.preview` (artifact `androidx.wear.compose:compose-ui-tooling`).
- At runtime, favor percentage-based/responsive padding (e.g. via `ScreenScaffold`'s resolved `contentPadding`, or a manually computed width breakpoint as above) over hardcoded `dp` paddings, so content doesn't clip or float awkwardly on larger round displays.
- `TransformingLazyColumn` / `ScalingLazyColumn` already adapt their edge item scaling to the available screen size; combine with a width breakpoint check only for content that needs a structurally different layout on larger screens (e.g. an extra column or larger `Image`).

## Related

- [AppScaffold / ScreenScaffold / PagerScaffold](./scaffold.md)
- [TransformingLazyColumn / ScalingLazyColumn](./lists.md)
