---
source: https://reactnative.dev/docs/0.87/virtualizedlist
---

# VirtualizedList

Base implementation for the more convenient FlatList and SectionList components. Use it only if you need more flexibility than FlatList provides, e.g. for use with immutable data instead of plain arrays.

## Signature / Usage

Virtualization maintains a finite render window of active items and replaces all items outside of the render window with appropriately sized blank space. The window adapts to scrolling behavior, and items are rendered incrementally with low-pri (after any running interactions) if they are far from the visible area, or with hi-pri otherwise.

**JavaScript**

```js
import {View, VirtualizedList, StyleSheet, Text, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const getItem = (_data, index) => ({
  id: `item-${index}`,
  title: `Item ${index + 1}`,
});

const getItemCount = _data => 50;

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <VirtualizedList
        initialNumToRender={4}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

**TypeScript**

```tsx
type ItemData = {
  id: string;
  title: string;
};

const getItem = (_data: unknown, index: number): ItemData => ({
  id: `item-${index}`,
  title: `Item ${index + 1}`,
});

const getItemCount = (_data: unknown) => 50;

type ItemProps = {
  title: string;
};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <VirtualizedList
        initialNumToRender={4}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);
```

(The TypeScript version uses the same imports and `styles` as the JavaScript version.)

## Options / Props

Inherits [ScrollView Props](./scrollview.md#options--props).

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| data | any | | No | Opaque data type passed to `getItem` and `getItemCount` to retrieve items. |
| getItem | `(data: any, index: number) => any` | | Yes | A generic accessor for extracting an item from any sort of data blob. |
| getItemCount | `(data: any) => number` | | Yes | Determines how many items are in the data blob. |
| renderItem | `(info: any) => ?React.Element<any>` | | Yes | Takes an item from `data` and renders it into the list. |
| CellRendererComponent | `React.ComponentType<CellRendererProps>` | | No | Customizes how cells rendered by `renderItem`/`ListItemComponent` are wrapped when placed into the underlying ScrollView. Must accept event handlers which notify VirtualizedList of changes within the cell. |
| ItemSeparatorComponent | component, function, element | | No | Rendered in between each item, but not at the top or bottom. By default `highlighted` and `leadingItem` props are provided. `renderItem` provides `separators.highlight`/`unhighlight`; custom props via `separators.updateProps`. |
| ListEmptyComponent | component, element | | No | Rendered when the list is empty. |
| ListItemComponent | component, function | | No | Each data item is rendered using this element. Can be a React Component Class, or a render function. |
| ListFooterComponent | component, element | | No | Rendered at the bottom of all the items. |
| ListFooterComponentStyle | ViewStyleProp | | No | Styling for internal View for `ListFooterComponent`. |
| ListHeaderComponent | component, element | | No | Rendered at the top of all the items. |
| ListHeaderComponentStyle | View Style | | No | Styling for internal View for `ListHeaderComponent`. |
| debug | boolean | | No | Turns on extra logging and visual overlays to aid with debugging, with a significant perf hit. |
| disableVirtualization | boolean | | No | Deprecated. Virtualization provides significant performance and memory optimizations, but fully unmounts react instances outside of the render window. You should only need to disable this for debugging purposes. |
| extraData | any | | No | A marker property for telling the list to re-render (it implements `PureComponent`). If any of your `renderItem`, Header, Footer, etc. functions depend on anything outside of the `data` prop, stick it here and treat it immutably. |
| getItemLayout | `(data: any, index: number) => {length: number, offset: number, index: number}` | | No | Optional optimization that skips measurement of dynamic content if item sizes are known ahead of time. |
| horizontal | boolean | | No | If `true`, renders items next to each other horizontally instead of stacked vertically. |
| initialNumToRender | number | `10` | No | How many items to render in the initial batch. Should be enough to fill the screen but not much more. These items are never unmounted as part of the windowed rendering. |
| initialScrollIndex | number | | No | Start at this index instead of the first item. Disables the "scroll to top" optimization that keeps the first `initialNumToRender` items always rendered. Requires `getItemLayout`. |
| inverted | boolean | | No | Reverses the direction of scroll. Uses scale transforms of `-1`. |
| keyExtractor | `(item: any, index: number) => string` | | No | Extracts a unique key for a given item. The default extractor checks `item.key`, then `item.id`, then falls back to the index. |
| maxToRenderPerBatch | number | | No | Maximum number of items to render in each incremental render batch. More at once gives a better fill rate, but responsiveness may suffer. |
| onEndReached | `(info: {distanceFromEnd: number}) => void` | | No | Called once when the scroll position gets within `onEndReachedThreshold` from the logical end of the list. |
| onEndReachedThreshold | number | `2` | No | How far from the end (in units of visible length of the list) the trailing edge must be to trigger `onEndReached`. A value of 0.5 triggers it when the end of the content is within half the visible length. |
| onRefresh | `() => void` | | No | If provided, a standard `RefreshControl` is added for "Pull to Refresh". Also set the `refreshing` prop correctly. |
| onScrollToIndexFailed | `(info: {index: number, highestMeasuredFrameIndex: number, averageItemLength: number}) => void` | | No | Handles failures when scrolling to an index that has not been measured yet. Recommended: compute your own offset and `scrollTo` it, or scroll as far as possible and try again after more items have been rendered. |
| onStartReached | `(info: {distanceFromStart: number}) => void` | | No | Called once when the scroll position gets within `onStartReachedThreshold` from the logical start of the list. |
| onStartReachedThreshold | number | `2` | No | How far from the start (in units of visible length) the leading edge must be to trigger `onStartReached`. |
| onViewableItemsChanged | `(callback: {changed: ViewToken[], viewableItems: ViewToken[]}) => void` | | No | Called when the viewability of rows changes, as defined by `viewabilityConfig`. |
| persistentScrollbar | bool | | No | Persistent scrollbar. |
| progressViewOffset | number | | No | Set when an offset is needed for the loading indicator to show correctly. |
| refreshControl | element | | No | A custom refresh control element. Overrides the default internal `<RefreshControl>`; `onRefresh` and `refreshing` are then ignored. Only works for vertical VirtualizedList. |
| refreshing | boolean | | No | Set this true while waiting for new data from a refresh. |
| removeClippedSubviews | boolean | | No | Offscreen child views are removed from their native backing superview. May improve scroll performance for large lists. On Android the default value is `true`. |
| renderScrollComponent | `(props: object) => element` | | No | Render a custom scroll component, e.g. with a differently styled `RefreshControl`. |
| viewabilityConfig | ViewabilityConfig | | No | See `ViewabilityHelper.js` for flow type and further documentation. |
| viewabilityConfigCallbackPairs | array of ViewabilityConfigCallbackPair | | No | List of `ViewabilityConfig`/`onViewableItemsChanged` pairs. A specific `onViewableItemsChanged` is called when its corresponding `ViewabilityConfig`'s conditions are met. |
| updateCellsBatchingPeriod | number | | No | Time between low-pri item render batches, e.g. for items quite a ways off screen. Same fill rate/responsiveness tradeoff as `maxToRenderPerBatch`. |
| windowSize | number | | No | Maximum number of items rendered outside of the visible area, in units of visible lengths. `windowSize={21}` (the default) renders the visible screen area plus up to 10 screens above and 10 below. Reducing it reduces memory consumption but increases the chance fast scrolling reveals blank areas. |

### Methods

```tsx
flashScrollIndicators();
getScrollableNode(): any;
getScrollRef():
  | React.ElementRef<typeof ScrollView>
  | React.ElementRef<typeof View>
  | null;
getScrollResponder () => ScrollResponderMixin | null;
scrollToEnd(params?: {animated?: boolean});
scrollToIndex(params: {
  index: number;
  animated?: boolean;
  viewOffset?: number;
  viewPosition?: number;
});
scrollToItem(params: {
  item: ItemT;
  animated?: boolean;
  viewOffset?: number;
  viewPosition?: number;
);
scrollToOffset(params: {
  offset: number;
  animated?: boolean;
});
```

| Method | Description |
| --- | --- |
| getScrollResponder() | Provides a handle to the underlying scroll responder. `this._scrollRef` might not be a `ScrollView`, so check that it responds to `getScrollResponder` before calling it. |
| scrollToEnd() | Scrolls to the end of the content. May be janky without `getItemLayout`. `animated` defaults to `true`. |
| scrollToIndex() | `index` (number, required); `animated`, `viewOffset`, `viewPosition` (optional). |
| scrollToItem() | `item` (required); `animated`, `viewOffset`, `viewPosition` (optional). |
| scrollToOffset() | Scroll to a specific content pixel offset. `offset` is the x-value if `horizontal` is true, otherwise the y-value. `animated` is `true` by default. |

## Notes

- Internal state is not preserved when content scrolls out of the render window. Make sure all your data is captured in the item data or external stores like Flux, Redux, or Relay.
- This is a `PureComponent`: it will not re-render if `props` are shallow-equal. Make sure everything your `renderItem` depends on is passed as a prop (e.g. `extraData`) that is not `===` after updates, including the `data` prop and parent component state.
- Content is rendered asynchronously offscreen, so it is possible to scroll faster than the fill rate and momentarily see blank content. This tradeoff can be adjusted per application.
- By default, the list looks for a `key` prop on each item and uses that for the React key; alternatively provide a custom `keyExtractor`.
- `removeClippedSubviews`: using this property may lead to bugs (missing content) in some circumstances - use at your own risk.
- `disableVirtualization` is marked Deprecated in the original docs.
- 0.88: TypeScript declarations are added for `FlatList`'s `strictMode` prop and `VirtualizedList`'s `ListItemComponent` (the [0.88 release blog](https://reactnative.dev/blog/2026/10/19/react-native-0.88) states only that declarations were added).
- The official example derives `id` from `Math.random()` inside `getItem`, which changes keys on every access; the snippet here uses an index-derived id so `keyExtractor` returns stable keys.
- This is a React Native core component (imported from `react-native`, rendered as native views). It is distinct from web virtual-scroll libraries (tanstack-virtual) and Compose Lazy layouts (android-compose-ui LazyColumn), and from same-named UI parts in apple-swiftui / apple-uikit, android-compose-components, windows-winui-controls, and ark-ui / chakra-ui / fandhe-frontend.

## Related

- [FlatList](./flatlist.md)
- [SectionList](./sectionlist.md)
- [ScrollView](./scrollview.md)
- ViewToken
- Optimizing FlatList Configuration
