# HorizontalPager / VerticalPager / rememberPagerState

Pagers that lazily lay out uniformly-sized pages and use snap-fling animation to settle on a page, similar to `ViewPager2`.

## Signature / Usage

```kotlin
@Composable
public fun HorizontalPager(
    state: PagerState,
    modifier: Modifier = Modifier,
    contentPadding: PaddingValues = PaddingValues(0.dp),
    pageSize: PageSize = PageSize.Fill,
    beyondViewportPageCount: Int = PagerDefaults.BeyondViewportPageCount,
    pageSpacing: Dp = 0.dp,
    verticalAlignment: Alignment.Vertical = Alignment.CenterVertically,
    flingBehavior: TargetedFlingBehavior = PagerDefaults.flingBehavior(state = state),
    userScrollEnabled: Boolean = true,
    reverseLayout: Boolean = false,
    key: ((index: Int) -> Any)? = null,
    snapPosition: SnapPosition = SnapPosition.Start,
    overscrollEffect: OverscrollEffect? = rememberOverscrollEffect(),
    pageContent: @Composable PagerScope.(page: Int) -> Unit,
)

@Composable
public fun rememberPagerState(
    initialPage: Int = 0,
    initialPageOffsetFraction: Float = 0f,
    pageCount: () -> Int,
): PagerState
```

```kotlin
val pagerState = rememberPagerState(pageCount = { pages.size })

HorizontalPager(state = pagerState) { page ->
    PageContent(pages[page])
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `PagerState` | — | From `rememberPagerState`; drives current page and scrolling. |
| `modifier` | `Modifier` | `Modifier` | Applied to the layout. |
| `contentPadding` | `PaddingValues` | `PaddingValues(0.dp)` | Padding around content; use to reveal adjacent pages. |
| `pageSize` | `PageSize` | `PageSize.Fill` | Size strategy for pages (`PageSize.Fill` or `PageSize.Fixed(size)`). |
| `beyondViewportPageCount` | `Int` | `PagerDefaults.BeyondViewportPageCount` | Number of pages composed beyond the visible viewport. |
| `pageSpacing` | `Dp` | `0.dp` | Space between pages. |
| `verticalAlignment` (Horizontal) / `horizontalAlignment` (Vertical) | `Alignment.Vertical` / `Horizontal` | `CenterVertically` / `CenterHorizontally` | Cross-axis alignment of pages. |
| `flingBehavior` | `TargetedFlingBehavior` | `PagerDefaults.flingBehavior(state)` | Fling/snap behavior. |
| `userScrollEnabled` | `Boolean` | `true` | Whether user gestures can scroll. |
| `reverseLayout` | `Boolean` | `false` | Reverses layout direction. |
| `key` | `((index: Int) -> Any)?` | `null` | Stable key per page. |
| `snapPosition` | `SnapPosition` | `SnapPosition.Start` | Where a settled page snaps within the viewport. |
| `pageContent` | `@Composable PagerScope.(page: Int) -> Unit` | — | Content for each page. |

`rememberPagerState`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initialPage` | `Int` | `0` | Initial `currentPage`. |
| `initialPageOffsetFraction` | `Float` | `0f` | Initial offset from the snapped position, range -0.5..0.5. |
| `pageCount` | `() -> Int` | — | Lambda returning the (observable) total page count. |

## Notes

- Distinct from the Paging 3 `Pager` class (`androidx.paging.Pager`) documented in the `android-architecture` skill — that one produces paginated data streams, this one lays out swipeable pages.
- `PagerState` key members: `currentPage: Int` (closest page to snapped position), `currentPageOffsetFraction: Float` (-0.5..0.5), `pageCount: Int`, `suspend fun animateScrollToPage(page, pageOffsetFraction, animationSpec)`, `suspend fun scrollToPage(page, pageOffsetFraction)`.
- `VerticalPager` mirrors `HorizontalPager` with `horizontalAlignment` in place of `verticalAlignment`.
- Package: `androidx.compose.foundation.pager`.

## Related

- [LazyRow](./lazyrow.md)
- [scroll](./scroll.md)
