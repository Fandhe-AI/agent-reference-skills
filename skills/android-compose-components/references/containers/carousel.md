# HorizontalMultiBrowseCarousel

Horizontal carousel that displays many differently-sized items at once for quick browsing of small content like album art or thumbnails.

## Signature / Usage

```kotlin
@Composable
fun HorizontalMultiBrowseCarousel(
    state: CarouselState,
    preferredItemWidth: Dp,
    modifier: Modifier = Modifier,
    itemSpacing: Dp = 0.dp,
    flingBehavior: TargetedFlingBehavior = CarouselDefaults.singleAdvanceFlingBehavior(state = state),
    userScrollEnabled: Boolean = true,
    minSmallItemWidth: Dp = CarouselDefaults.MinSmallItemSize,
    maxSmallItemWidth: Dp = CarouselDefaults.MaxSmallItemSize,
    contentPadding: PaddingValues = PaddingValues(0.dp),
    content: @Composable CarouselItemScope.(itemIndex: Int) -> Unit,
)
```

```kotlin
HorizontalMultiBrowseCarousel(
    state = rememberCarouselState { items.count() },
    preferredItemWidth = 186.dp,
    itemSpacing = 8.dp,
    contentPadding = PaddingValues(horizontal = 16.dp)
) { i ->
    Image(
        painter = painterResource(id = items[i].imageResId),
        contentDescription = items[i].contentDescription,
        modifier = Modifier.height(205.dp).maskClip(MaterialTheme.shapes.extraLarge),
        contentScale = ContentScale.Crop
    )
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `CarouselState` | — | Manages current item index and scroll position. Create with `rememberCarouselState`. |
| `preferredItemWidth` | `Dp` | — | Ideal width for large items; actual width adapts to available space. |
| `modifier` | `Modifier` | `Modifier` | Applied to the carousel. |
| `itemSpacing` | `Dp` | `0.dp` | Space between adjacent items. |
| `flingBehavior` | `TargetedFlingBehavior` | `CarouselDefaults.singleAdvanceFlingBehavior(state = state)` | Fling/snap behavior after a scroll gesture. |
| `userScrollEnabled` | `Boolean` | `true` | Whether the user can scroll the carousel. |
| `minSmallItemWidth` | `Dp` | `CarouselDefaults.MinSmallItemSize` | Minimum width for small (peeking) items. |
| `maxSmallItemWidth` | `Dp` | `CarouselDefaults.MaxSmallItemSize` | Maximum width for small (peeking) items. |
| `contentPadding` | `PaddingValues` | `PaddingValues(0.dp)` | Padding around the carousel content. |
| `content` | `@Composable CarouselItemScope.(itemIndex: Int) -> Unit` | — | Renders the item at `itemIndex`. |

## Notes

- `HorizontalUncontainedCarousel` is a sibling composable sharing the same package/state model but with fixed-size items: `state`, `itemWidth: Dp` (fixed, replaces `preferredItemWidth`), `modifier`, `itemSpacing`, `flingBehavior = CarouselDefaults.noSnapFlingBehavior()`, `userScrollEnabled`, `contentPadding`, `content`. Items extend beyond the screen edge without clipping instead of resizing to fit.
- `rememberCarouselState(initialItem: Int = 0, itemCount: () -> Int): CarouselState` creates and remembers the shared `CarouselState`.
- Four visual layouts (multi-browse, uncontained, hero, full-screen) are described in the guide, but only multi-browse and uncontained have dedicated composables; hero/full-screen are achieved by configuring item sizing.
- Package: `androidx.compose.material3.carousel`.

## Related

- [PullToRefreshBox](./pulltorefreshbox.md)
