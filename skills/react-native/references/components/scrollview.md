---
source: https://reactnative.dev/docs/0.87/scrollview
---

# ScrollView

Component that wraps the platform ScrollView while providing integration with the touch locking "responder" system.

## Signature / Usage

```tsx
import {StyleSheet, Text, ScrollView, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
  },
  text: {
    fontSize: 42,
    padding: 12,
  },
});

export default App;
```

### ScrollView vs FlatList

`ScrollView` renders all its react child components at once, which has a performance downside for very long lists (slow rendering and increased memory usage). `FlatList` renders items lazily, when they are about to appear, and removes items that scroll way off screen. `FlatList` is also handy for separators between items, multiple columns, infinite scroll loading, and more.

## Options / Props

Inherits [View Props](./view.md#options--props).

| Name | Type | Default | Platform | Description |
| --- | --- | --- | --- | --- |
| StickyHeaderComponent | component, element | | | Component used to render sticky headers, to be used together with `stickyHeaderIndices`. Set it if your sticky header uses custom transforms (e.g. an animated and hidable header). Otherwise the default `ScrollViewStickyHeader` is used. |
| alwaysBounceHorizontal | bool | `true` when `horizontal={true}`; `false` otherwise | iOS | Bounces horizontally at the end even if the content is smaller than the scroll view. |
| alwaysBounceVertical | bool | `false` when `horizontal={true}`; `true` otherwise | iOS | Bounces vertically at the end even if the content is smaller than the scroll view. |
| automaticallyAdjustContentInsets | bool | `true` | iOS | Whether iOS automatically adjusts the content inset for scroll views placed behind a navigation bar or tab bar/toolbar. |
| automaticallyAdjustKeyboardInsets | bool | `false` | iOS | Whether the ScrollView automatically adjusts its `contentInset` and `scrollViewInsets` when the Keyboard changes its size. |
| automaticallyAdjustsScrollIndicatorInsets | bool | `true` | iOS | Whether iOS automatically adjusts the scroll indicator insets. |
| bounces | bool | `true` | iOS | Bounces at the end of the content if larger than the scroll view along the scroll axis. When `false`, disables all bouncing even if the `alwaysBounce*` props are `true`. |
| bouncesZoom | bool | `true` | iOS | When `true`, gestures can drive zoom past min/max and the zoom animates to the limit at gesture end; otherwise zoom does not exceed the limits. |
| canCancelContentTouches | bool | `true` | iOS | When `false`, once tracking starts, won't try to drag if the touch moves. |
| centerContent | bool | `false` | iOS | Automatically centers the content when it is smaller than the scroll view bounds. |
| contentContainerStyle | View Style | | | Styles applied to the scroll view content container which wraps all child views. |
| contentInset | object: `{top, left, bottom, right}` | `{top: 0, left: 0, bottom: 0, right: 0}` | iOS | Amount by which the content is inset from the edges of the scroll view. |
| contentInsetAdjustmentBehavior | enum(`'automatic'`, `'scrollableAxes'`, `'never'`, `'always'`) | `'never'` | iOS | How the safe area insets modify the content area (iOS 11 and later). |
| contentOffset | Point | `{x: 0, y: 0}` | | Manually set the starting scroll offset. |
| decelerationRate | enum(`'fast'`, `'normal'`), number | `'normal'` | | How quickly the scroll view decelerates after the user lifts their finger. `'normal'` 0.998 on iOS, 0.985 on Android; `'fast'` 0.99 on iOS, 0.9 on Android. |
| directionalLockEnabled | bool | `false` | iOS | Try to lock to only vertical or horizontal scrolling while dragging. |
| disableIntervalMomentum | bool | `false` | | The scroll view stops on the next index (relative to scroll position at release) regardless of gesture speed. Usable for pagination when the page is smaller than the scroll view. |
| disableScrollViewPanResponder | bool | `false` | | Disables the default JS pan responder, leaving full control over touches to child components. Useful with `snapToInterval`; do not use on regular ScrollView cases without it. |
| endFillColor | color | | Android | Fills the rest of the scrollview with a color when it takes up more space than its content, avoiding overdraw. An advanced optimization. |
| fadingEdgeLength | number; object: `{start: number, end: number}` | `0` | Android | Fades out the edges of the scroll content when greater than `0`. |
| horizontal | bool | `false` | | Children are arranged horizontally in a row instead of vertically in a column. |
| indicatorStyle | enum(`'default'`, `'black'`, `'white'`) | `'default'` | iOS | Style of the scroll indicators. `default` same as `black`; `black` good against a light background; `white` good against a dark background. |
| invertStickyHeaders | bool | `false` | | Sticky headers stick at the bottom instead of the top. Usually used with inverted ScrollViews. |
| keyboardDismissMode | Android: enum(`'none'`, `'on-drag'`); iOS: enum(`'none'`, `'on-drag'`, `'interactive'`) | `'none'` | | Whether the keyboard gets dismissed in response to a drag. `'interactive'` (iOS only) dismisses interactively with the drag; on Android it behaves as `'none'`. |
| keyboardShouldPersistTaps | enum(`'always'`, `'never'`, `'handled'`) | `'never'` | | When the keyboard stays visible after a tap. `never`: tapping outside the focused input dismisses the keyboard and children won't receive the tap. `always`: keyboard won't dismiss, children can catch taps. `handled`: won't dismiss when the tap was handled by children (or captured by an ancestor). |
| maintainVisibleContentPosition | object: `{minIndexForVisible: number, autoscrollToTopThreshold: number}` | | | Adjusts scroll position so the first visible child at or beyond `minIndexForVisible` does not change position. Useful for lists loading content in both directions (e.g. chat). Optional `autoscrollToTopThreshold` auto-scrolls to the top if the user was within the threshold of the top. |
| maximumZoomScale | number | `1.0` | iOS | Maximum allowed zoom scale. |
| minimumZoomScale | number | `1.0` | iOS | Minimum allowed zoom scale. |
| nestedScrollEnabled | bool | `false` | Android | Enables nested scrolling for Android API level 21+. |
| onContentSizeChange | function | | | Called when the scrollable content view changes; receives `(contentWidth, contentHeight)`. Implemented using onLayout on the content container. |
| onMomentumScrollBegin | function | | | Called when the momentum scroll starts. |
| onMomentumScrollEnd | function | | | Called when the momentum scroll ends. |
| onScroll | function | | | Fires at most once per frame during scrolling. Event shape below. |
| onScrollBeginDrag | function | | | Called when the user begins to drag the scroll view. |
| onScrollEndDrag | function | | | Called when the user stops dragging and it either stops or begins to glide. |
| onScrollToTop | function | | iOS | Fires when the scroll view scrolls to top after the status bar has been tapped. |
| overScrollMode | enum(`'auto'`, `'always'`, `'never'`) | `'auto'` | Android | Overrides the default overScroll mode. `auto`: only if content is large enough to meaningfully scroll; `always`; `never`. |
| pagingEnabled | bool | `false` | | Stops on multiples of the scroll view's size when scrolling. Usable for horizontal pagination. |
| persistentScrollbar | bool | `false` | Android | Scrollbars do not turn transparent when not in use. |
| pinchGestureEnabled | bool | `true` | iOS | Allows pinch gestures to zoom in and out. |
| refreshControl | element | | | A RefreshControl component for pull-to-refresh. Only works for vertical ScrollViews (`horizontal` must be `false`). |
| removeClippedSubviews | boolean | | | Offscreen child views are removed from their native backing superview. May improve scroll performance for large lists. On Android the default value is `true`. |
| scrollEnabled | bool | `true` | | When false, the view cannot be scrolled via touch interaction (it can still be scrolled by calling `scrollTo`). |
| scrollEventThrottle | number | `0` | | Limits how often scroll events fire, as a time interval in ms. Values <= `16` disable throttling, regardless of the refresh rate. |
| scrollIndicatorInsets | object: `{top, left, bottom, right}` | `{top: 0, left: 0, bottom: 0, right: 0}` | iOS | Inset of the scroll view indicators from the edges. Normally set to the same value as `contentInset`. |
| scrollPerfTag | string | | Android | Tag used to log scroll performance. Forces momentum events on. Needs a custom native FpsListener to be useful. |
| scrollsChildToFocus | bool | `true` | Android | Automatically scrolls to bring a focused child into view. |
| scrollToOverflowEnabled | bool | `false` | iOS | Allows programmatic scrolling beyond the content size. |
| scrollsToTop | bool | `true` | iOS | Scrolls to top when the status bar is tapped. |
| showsHorizontalScrollIndicator | bool | `true` | | Shows a horizontal scroll indicator. |
| showsVerticalScrollIndicator | bool | `true` | | Shows a vertical scroll indicator. |
| snapToAlignment | enum(`'start'`, `'center'`, `'end'`) | `'start'` | | With `snapToInterval`, alignment of the snapping: left/top (`start`), center, right/bottom (`end`). |
| snapToEnd | bool | `true` | | With `snapToOffsets`, whether the end of the list counts as a snap offset. |
| snapToInterval | number | | | Stops at multiples of this value. Typically used with `snapToAlignment` and `decelerationRate="fast"`. Overrides `pagingEnabled`. |
| snapToOffsets | array of number | | | Stops at the defined offsets. Typically used with `decelerationRate="fast"`. Overrides `pagingEnabled` and `snapToInterval`. |
| snapToStart | bool | `true` | | With `snapToOffsets`, whether the beginning of the list counts as a snap offset. |
| stickyHeaderHiddenOnScroll | bool | `false` | | Sticky header is hidden when scrolling down and docks at the top when scrolling up. |
| stickyHeaderIndices | array of number | | | Child indices that get docked to the top when scrolling, e.g. `[0]`. Not supported with `horizontal={true}`. |
| zoomScale | number | `1.0` | iOS | The current scale of the scroll view content. |

`onScroll` event shape (all values with unspecified type are numbers):

```js
{
  nativeEvent: {
    contentInset: {bottom, left, right, top},
    contentOffset: {x, y},
    contentSize: {height, width},
    layoutMeasurement: {height, width},
    velocity: {x, y},
    responderIgnoreScroll: boolean,
    zoomScale,
    // iOS only
    targetContentOffset: {x, y}
  }
}
```

### Methods

```tsx
flashScrollIndicators();

scrollTo(
  options?: {x?: number, y?: number, animated?: boolean} | number,
  deprecatedX?: number,
  deprecatedAnimated?: boolean,
);

scrollToEnd(options?: {animated?: boolean});
```

| Method | Description |
| --- | --- |
| flashScrollIndicators() | Displays the scroll indicators momentarily. |
| scrollTo() | Scrolls to a given x, y offset, either immediately or with a smooth animation. Example: `scrollTo({x: 0, y: 0, animated: true})`. The separate-argument signature is deprecated due to ambiguity (y before x) and should not be used. |
| scrollToEnd() | Scrolls to the bottom (vertical) or right (horizontal). Use `scrollToEnd({animated: true})` for smooth scrolling; if no options are passed, `animated` defaults to `true`. |

## Notes

- ScrollViews must have a bounded height in order to work. Bound the height by setting the height directly (discouraged) or ensure all parent views have bounded height. Forgetting to transfer `{flex: 1}` down the view stack can lead to errors.
- Doesn't yet support other contained responders from blocking this scroll view from becoming the responder.
- `removeClippedSubviews`: using this property may lead to bugs (missing content) in some circumstances - use at your own risk.
- `maintainVisibleContentPosition` caveats: reordering elements with this enabled will probably cause jumpiness (don't re-order the content of ScrollViews or Lists that use it); it uses `contentOffset` and `frame.origin` in native code, so occlusion and transforms are not taken into account.
- This is the React Native core `ScrollView` (imported from `react-native`, rendered as a native view). It is distinct from same-named parts in apple-swiftui / apple-uikit, android-compose-components / android-compose-ui, windows-winui-controls, and the web UI libraries ark-ui / chakra-ui / fandhe-frontend.

## Related

- [FlatList](./flatlist.md)
- [RefreshControl](./refreshcontrol.md)
- [View](./view.md)
- [VirtualView](./virtualview.md)
- [View Style Props](../props-types/view-style-props.md)
