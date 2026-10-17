# HorizontalPager / VerticalPager (Wear)

Wear-specific pager composables that wrap the mobile `androidx.compose.foundation.pager.HorizontalPager` / `VerticalPager` internally while adding Wear behavior: rotary-input paging (`rotaryScrollableBehavior`), a `gestureInclusion` zone that yields the left-edge swipe to swipe-to-dismiss, and automatic `hierarchicalFocusGroup` wiring per page. Use with `rememberPagerState` and, at the screen level, `HorizontalPagerScaffold` / `VerticalPagerScaffold`.

## Signature / Usage

```kotlin
@Composable
public fun rememberPagerState(
    initialPage: Int = 0,
    initialPageOffsetFraction: Float = 0f,
    pageCount: () -> Int,
): PagerState
```

```kotlin
@Composable
public fun HorizontalPager(
    state: PagerState,
    modifier: Modifier = Modifier,
    contentPadding: PaddingValues = PaddingValues(0.dp),
    beyondViewportPageCount: Int = PagerDefaults.BeyondViewportPageCount,
    flingBehavior: TargetedFlingBehavior = PagerDefaults.snapFlingBehavior(state = state),
    userScrollEnabled: Boolean = true,
    gestureInclusion: GestureInclusion = PagerDefaults.gestureInclusion(state),
    reverseLayout: Boolean = false,
    key: ((index: Int) -> Any)? = null,
    rotaryScrollableBehavior: RotaryScrollableBehavior? = null,
    content: @Composable PagerScope.(page: Int) -> Unit,
)
```

```kotlin
val pagerState = rememberPagerState { 3 }

HorizontalPagerScaffold(pagerState = pagerState) {
    HorizontalPager(state = pagerState) { page ->
        ScreenScaffold { Text("Page $page") }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `PagerState` (`androidx.wear.compose.foundation.pager`) | — | Create with `rememberPagerState { pageCount }`. Distinct type from the mobile `androidx.compose.foundation.pager.PagerState`, though it wraps one internally. |
| `contentPadding` | `PaddingValues` | `PaddingValues(0.dp)` | Padding applied after clipping, e.g. to reveal part of neighboring pages. |
| `beyondViewportPageCount` | `Int` | `PagerDefaults.BeyondViewportPageCount` | Extra pages composed/laid out before and after the visible ones. |
| `userScrollEnabled` | `Boolean` | `true` | Disables user swipe/rotary paging; `PagerState.scroll` still works programmatically. |
| `gestureInclusion` | `GestureInclusion` | `PagerDefaults.gestureInclusion(state)` | Determines which touch gestures the pager claims; the default excludes a left-edge zone on the first page so system swipe-to-dismiss can take over. |
| `rotaryScrollableBehavior` | `RotaryScrollableBehavior?` | `null` (Horizontal) / `RotaryScrollableDefaults.snapBehavior(state)` (Vertical) | Enables rotary crown/bezel paging; pass `RotaryScrollableDefaults.snapBehavior(state)` to enable it on `HorizontalPager`. |
| `content` | `@Composable PagerScope.(page: Int) -> Unit` | — | Per-page content; receives the page index. |
| `AnimatedPage(pageIndex, pagerState) { ... }` | composable (`androidx.wear.compose.material3`) | — | Wraps each page inside the pager's page content lambda to apply Material 3 transition animations (scaling, rounded corner morphing, and scrim effects) based on the page's offset in `PagerState`. |
| `PagerScaffoldDefaults.snapWithSpringFlingBehavior(state)` | `TargetedFlingBehavior` | — | Pass as `flingBehavior` to apply Material 3 spring motion physics and responsive page snapping (`HighSnapPositionalThreshold`). |
| `PagerDefaults.snapFlingBehavior(state, maxFlingPages = 0, snapPositionalThreshold = PagerScaffoldDefaults.LowSnapPositionalThreshold)` | `TargetedFlingBehavior` | — | Low snap sensitivity for workouts; requires a deliberate drag across a larger part of the screen. With rotary snapping, also set `snapSensitivity = RotaryScrollableDefaults.LowSnapSensitivity` in `RotaryScrollableDefaults.snapBehavior`. |

## Notes

- Package: `androidx.wear.compose.foundation.pager` (artifact `androidx.wear.compose:compose-foundation`) — distinct from the mobile `androidx.compose.foundation.pager` package used inside its implementation, and from `androidx.paging.compose.Pager` (Paging 3).
- Each page automatically gets `Modifier.hierarchicalFocusGroup(state.currentPage == page)`, so nested `rotaryScrollable` children (e.g. a `ScalingLazyColumn` per page) receive focus correctly without extra wiring.
- Hierarchy from the pagination guide (2026-09-22), outer to inner: `AppScaffold` (one per app, anchors the global `TimeText`) > `HorizontalPagerScaffold` / `VerticalPagerScaffold` (manages the page indicator) > `HorizontalPager` / `VerticalPager` (`PagerState`, fling behavior) > `AnimatedPage` (scale and scrim per page) > `ScreenScaffold` (one per page: `ScrollIndicator`, `EdgeButton`) > page content. Always pass the `contentPadding` provided by `ScreenScaffold` to the page's content container (such as `TransformingLazyColumn`) to prevent clipping on circular displays.
- `VerticalPager` enables rotary page snapping by default (`RotaryScrollableDefaults.snapBehavior(state)`); `HorizontalPager` keeps `rotaryScrollableBehavior = null` so crown/bezel input scrolls vertical lists inside the active page.
- Pair with `HorizontalPagerScaffold` / `VerticalPagerScaffold` (from `androidx.wear.compose.material3`), which take this Wear `PagerState` to coordinate `TimeText` and the page indicator.

## Related

- [AppScaffold / ScreenScaffold / PagerScaffold](./scaffold.md)
- [Progress indicators (PageIndicator)](./progress-indicators.md)
- [Rotary input](./rotary-input.md)
