# AppScaffold / ScreenScaffold / PagerScaffold

Top-level structural composables that lay out a Wear OS screen and coordinate visibility/transitions of `TimeText`, `ScrollIndicator`, and page indicators. One `AppScaffold` wraps the whole activity/nav host; one `ScreenScaffold` (or `HorizontalPagerScaffold` / `VerticalPagerScaffold`) wraps each screen/page.

## Signature / Usage

```kotlin
@Composable
public fun AppScaffold(
    modifier: Modifier = Modifier,
    timeText: @Composable () -> Unit = { TimeText() },
    containerColor: Color = MaterialTheme.colorScheme.background,
    contentColor: Color = contentColorFor(containerColor),
    content: @Composable BoxScope.() -> Unit,
)
```

```kotlin
@Composable
public fun ScreenScaffold(
    scrollState: TransformingLazyColumnState,
    modifier: Modifier = Modifier,
    contentPadding: PaddingValues = ScreenScaffoldDefaults.contentPadding,
    timeText: (@Composable () -> Unit)? = null,
    scrollIndicator: (@Composable BoxScope.() -> Unit)? = { ScrollIndicator(scrollState) },
    overscrollEffect: OverscrollEffect? = rememberOverscrollEffect(),
    content: @Composable BoxScope.(PaddingValues) -> Unit,
)
```

```kotlin
@Composable
public fun HorizontalPagerScaffold(
    pagerState: PagerState,
    modifier: Modifier = Modifier,
    pageIndicator: (@Composable BoxScope.() -> Unit)? = { HorizontalPageIndicator(pagerState) },
    pageIndicatorAnimationSpec: AnimationSpec<Float>? = null,
    content: @Composable () -> Unit,
)
```

```kotlin
AppScaffold {
    val navController = rememberSwipeDismissableNavController()
    SwipeDismissableNavHost(navController = navController, startDestination = "list") {
        composable("list") {
            val columnState = rememberTransformingLazyColumnState()
            ScreenScaffold(scrollState = columnState) { contentPadding ->
                TransformingLazyColumn(state = columnState, contentPadding = contentPadding) {
                    item { Text("Hello") }
                }
            }
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to the scaffold. |
| `timeText` (AppScaffold) | `@Composable () -> Unit` | `{ TimeText() }` | Default `TimeText` shown at the app level; overridable per-screen via `ScreenScaffold.timeText`. |
| `containerColor` / `contentColor` (AppScaffold) | `Color` | theme background / matching content color | Background and default content color for the app. |
| `scrollState` (ScreenScaffold) | `ScalingLazyListState` \| `TransformingLazyColumnState` \| `LazyListState` \| `ScrollState` | — | Drives show/hide of `TimeText` / `ScrollIndicator` as the screen scrolls. Overloads exist for each state type, and for a generic `ScrollInfoProvider`. |
| `edgeButton` (ScreenScaffold overload) | `@Composable BoxScope.() -> Unit` | — | Special bottom slot that grows/shrinks to take space after scrollable content; use with `EdgeButton`. |
| `contentPadding` | `PaddingValues` | `ScreenScaffoldDefaults.contentPadding` | Padding passed through to `content`. |
| `scrollIndicator` | `(@Composable BoxScope.() -> Unit)?` | `{ ScrollIndicator(scrollState) }` | Scroll position indicator at screen edge; pass `null` to hide. |
| `pagerState` (Pager scaffolds) | `PagerState` | — | Drives the coordinated page indicator. |
| `pageIndicator` | `(@Composable BoxScope.() -> Unit)?` | `{ HorizontalPageIndicator(pagerState) }` / `VerticalPageIndicator` | Page indicator slot. |
| `content` | composable lambda | — | Screen content; `ScreenScaffold.content` receives resolved `PaddingValues`. |

## Notes

- Declare exactly one `AppScaffold` per activity/NavHost, and one `ScreenScaffold` (or Pager scaffold) per destination/page so `TimeText` stays visible and animates correctly across swipe-to-dismiss / navigation transitions.
- `ScreenScaffold` has many overloads keyed by scroll-state type (`ScalingLazyListState`, `TransformingLazyColumnState`, `LazyListState`, `ScrollState`, `ScrollInfoProvider`); the `ScrollState` overload does not support the `edgeButton` slot.
- `HorizontalPagerScaffold` / `VerticalPagerScaffold` pair with `HorizontalPager` / `VerticalPager` from `androidx.compose.foundation.pager`.
- Package: `androidx.wear.compose.material3` (artifact `androidx.wear.compose:compose-material3`).

## Related

- [TimeText](./time-text.md)
- [TransformingLazyColumn / ScalingLazyColumn](./lists.md)
- [EdgeButton](./edge-button.md)
- [Progress indicators (PageIndicator)](./progress-indicators.md)
