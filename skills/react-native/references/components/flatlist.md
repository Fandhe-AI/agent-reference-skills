---
source: https://reactnative.dev/docs/0.87/flatlist
---

# FlatList

A performant interface for rendering basic, flat lists. A convenience wrapper around `VirtualizedList`.

## Signature / Usage

Features: fully cross-platform; optional horizontal mode; configurable viewability callbacks; header, footer and separator support; Pull to Refresh; scroll loading; ScrollToIndex support; multiple column support. For section support, use SectionList.

**JavaScript**

```js
import {View, FlatList, StyleSheet, Text, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

**TypeScript**

```tsx
type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);
```

(The TypeScript version uses the same imports, `DATA` and `styles` as the JavaScript version.)

To render multiple columns, use the `numColumns` prop. Using this approach instead of a `flexWrap` layout can prevent conflicts with the item height logic.

Selectable example: pass `extraData={selectedId}` so `FlatList` re-renders when the state changes (it is a `PureComponent`), and `keyExtractor` to use the `id`s for the react keys.

**JavaScript**

```js
import {useState} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [selectedId, setSelectedId] = useState();

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
```

**TypeScript**

```tsx
type ItemData = {
  id: string;
  title: string;
};

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [selectedId, setSelectedId] = useState<string>();

  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  // ... same JSX as the JavaScript version
};
```

## Options / Props

Inherits [VirtualizedList Props](./virtualizedlist.md#options--props).

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| renderItem | `({item, index, separators}) => JSX.Element` | Yes | Takes an item from `data` and renders it into the list. `item`: the item from `data`; `index`: its index in `data`; `separators`: `highlight()`, `unhighlight()`, `updateProps(select: 'leading' \| 'trailing', newProps)` to set whatever props change the rendering of the leading or trailing separator when `highlight`/`unhighlight` (which set `highlighted: boolean`) are insufficient. |
| data | ArrayLike | Yes | An array (or array-like list) of items to render. Other data types can be used by targeting `VirtualizedList` directly. |
| ItemSeparatorComponent | component, function, element | No | Rendered in between each item, but not at the top or bottom. By default `highlighted` and `leadingItem` props are provided. |
| ListEmptyComponent | component, element | No | Rendered when the list is empty. |
| ListFooterComponent | component, element | No | Rendered at the bottom of all the items. |
| ListFooterComponentStyle | View Style | No | Styling for internal View for `ListFooterComponent`. |
| ListHeaderComponent | component, element | No | Rendered at the top of all the items. |
| ListHeaderComponentStyle | View Style | No | Styling for internal View for `ListHeaderComponent`. |
| columnWrapperStyle | View Style | No | Optional custom style for multi-item rows generated when `numColumns > 1`. |
| extraData | any | No | A marker property for telling the list to re-render (it implements `PureComponent`). Put anything outside `data` that your `renderItem`, Header, Footer, etc. depend on here and treat it immutably. |
| getItemLayout | `(data, index) => {length: number, offset: number, index: number}` | No | Optional optimization that skips measurement of dynamic content if you know item sizes ahead of time. Efficient for fixed size items, e.g. `getItemLayout={(data, index) => ({length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index})}`. Include separator length in the offset calculation if you specify `ItemSeparatorComponent`. |
| horizontal | boolean | No | If `true`, renders items next to each other horizontally instead of stacked vertically. |
| initialNumToRender | number (default `10`) | No | How many items to render in the initial batch. These items are never unmounted as part of the windowed rendering. |
| initialScrollIndex | number | No | Start at this index instead of the top. Disables the "scroll to top" optimization. Requires `getItemLayout`. |
| inverted | boolean | No | Reverses the direction of scroll. Uses scale transforms of `-1`. |
| keyExtractor | `(item: ItemT, index: number) => string` | No | Extracts a unique key for a given item. The default extractor checks `item.key`, then `item.id`, then falls back to the index. |
| numColumns | number | No | Multiple columns can only be rendered with `horizontal={false}` and will zig-zag like a `flexWrap` layout. Items should all be the same height; masonry layouts are not supported. |
| onRefresh | `() => void` | No | If provided, a standard RefreshControl is added for "Pull to Refresh". Also set the `refreshing` prop correctly. |
| onViewableItemsChanged | `(callback: {changed: ViewToken[], viewableItems: ViewToken[]}) => void` | No | Called when the viewability of rows changes, as defined by `viewabilityConfig`. |
| progressViewOffset | number | No | Set when an offset is needed for the loading indicator to show correctly. |
| refreshing | boolean | No | Set this true while waiting for new data from a refresh. |
| removeClippedSubviews | boolean | No | Offscreen child views are removed from their native backing superview. May improve scroll performance for large lists. On Android the default value is `true`. |
| viewabilityConfig | ViewabilityConfig | No | See `ViewabilityHelper.js`. |
| viewabilityConfigCallbackPairs | array of ViewabilityConfigCallbackPair | No | List of `ViewabilityConfig`/`onViewableItemsChanged` pairs. |

`ViewabilityConfig` properties:

| Property | Type | Description |
| --- | --- | --- |
| minimumViewTime | number | Minimum time (ms) an item must be physically viewable before the viewability callback fires. A high number means scrolling through content without stopping will not mark it as viewable. |
| viewAreaCoveragePercentThreshold | number | Percent of viewport that must be covered for a partially occluded item to count as "viewable", 0-100. Fully visible items are always viewable. 0 means a single pixel makes the item viewable; 100 means the item must be entirely visible or cover the entire viewport. |
| itemVisiblePercentThreshold | number | Like `viewAreaCoveragePercentThreshold`, but considers the percent of the item that is visible, rather than the fraction of the viewable area it covers. |
| waitForInteraction | boolean | Nothing is considered viewable until the user scrolls or `recordInteraction` is called after render. |

At least one of `viewAreaCoveragePercentThreshold` or `itemVisiblePercentThreshold` is required. Set it in the `constructor` to avoid `Error: Changing viewabilityConfig on the fly is not supported`:

```tsx
constructor (props) {
  super(props)

  this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 95
  }
}
```

```tsx
<FlatList
    viewabilityConfig={this.viewabilityConfig}
  ...
```

renderItem with separators:

```tsx
<FlatList
  ItemSeparatorComponent={
    Platform.OS !== 'android' &&
    (({highlighted}) => (
      <View
        style={[style.separator, highlighted && {marginLeft: 0}]}
      />
    ))
  }
  data={[{title: 'Title Text', key: 'item1'}]}
  renderItem={({item, index, separators}) => (
    <TouchableHighlight
      key={item.key}
      onPress={() => this._onPress(item)}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}>
      <View style={{backgroundColor: 'white'}}>
        <Text>{item.title}</Text>
      </View>
    </TouchableHighlight>
  )}
/>
```

### Methods

```tsx
flashScrollIndicators();
getNativeScrollRef(): React.ElementRef<typeof ScrollViewComponent>;
getScrollResponder(): ScrollResponderMixin;
getScrollableNode(): any;
scrollToEnd(params?: {animated?: boolean});
scrollToIndex: (params: {
  index: number;
  animated?: boolean;
  viewOffset?: number;
  viewPosition?: number;
});
scrollToItem(params: {
  animated?: ?boolean,
  item: Item,
  viewPosition?: number,
});
scrollToOffset(params: {
  offset: number;
  animated?: boolean;
});
```

| Method | Description |
| --- | --- |
| flashScrollIndicators() | Displays the scroll indicators momentarily. |
| getNativeScrollRef() | Provides a reference to the underlying scroll component. |
| getScrollResponder() | Provides a handle to the underlying scroll responder. |
| getScrollableNode() | Provides a handle to the underlying scroll node. |
| scrollToEnd() | Scrolls to the end of the content. May be janky without `getItemLayout`. `animated` defaults to `true`. |
| scrollToIndex() | Scrolls to the item at the index so that `viewPosition` 0 places it at the top, 1 at the bottom, 0.5 centered. `params`: `animated` (default `true`), `index` (required), `viewOffset` (fixed pixel offset), `viewPosition`. Cannot scroll outside the render window without `getItemLayout`. |
| scrollToItem() | Requires a linear scan through data; use `scrollToIndex` if possible. `params`: `animated`, `item` (required), `viewPosition`. Cannot scroll outside the render window without `getItemLayout`. |
| scrollToOffset() | Scroll to a specific content pixel offset. `offset` (required) is the x-value when `horizontal` is true, otherwise the y-value; `animated` defaults to `true`. |

## Notes

- Internal state is not preserved when content scrolls out of the render window. Make sure all your data is captured in the item data or external stores like Flux, Redux, or Relay.
- This is a `PureComponent`: it will not re-render if `props` remain shallow-equal. Make sure everything your `renderItem` depends on is passed as a prop (e.g. `extraData`) that is not `===` after updates, including the `data` prop and parent component state.
- Content is rendered asynchronously offscreen, so it is possible to scroll faster than the fill rate and momentarily see blank content.
- By default, the list looks for a `key` prop on each item and uses that for the React key; alternatively provide a custom `keyExtractor`.
- `removeClippedSubviews`: using this property may lead to bugs (missing content) in some circumstances - use at your own risk.
- 0.88: TypeScript declarations are added for `FlatList`'s `strictMode` prop (the [0.88 release blog](https://reactnative.dev/blog/2026/10/19/react-native-0.88) states only that the declaration was added).
- This is a React Native core component (imported from `react-native`, rendered as native views). It is distinct from web virtual-scroll libraries (tanstack-virtual) and Compose Lazy layouts (android-compose-ui LazyColumn), and from same-named UI parts in apple-swiftui / apple-uikit, android-compose-components, windows-winui-controls, and ark-ui / chakra-ui / fandhe-frontend.

## Related

- [VirtualizedList](./virtualizedlist.md)
- [SectionList](./sectionlist.md)
- [ScrollView](./scrollview.md)
- ViewToken
- Optimizing FlatList Configuration
