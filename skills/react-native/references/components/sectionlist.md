---
source: https://reactnative.dev/docs/0.87/sectionlist
---

# SectionList

A performant interface for rendering sectioned lists. A convenience wrapper around `VirtualizedList`.

## Signature / Usage

Features: fully cross-platform; configurable viewability callbacks; list header, list footer, item separator, section header and section separator support; heterogeneous data and item rendering; Pull to Refresh; scroll loading.

```tsx
import {StyleSheet, Text, View, SectionList, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default App;
```

## Options / Props

Inherits [VirtualizedList Props](./virtualizedlist.md#options--props) (and thereby ScrollView props) that are not explicitly listed here.

| Name | Type | Default | Platform | Required | Description |
| --- | --- | --- | --- | --- | --- |
| renderItem | function | | | Yes | Default renderer for every item in every section. Can be over-ridden per section. Should return a React element. Receives an object with keys: `item` (the item object from the section's `data`), `index` (index within the section), `section` (the full section object), `separators` (`highlight()`, `unhighlight()`, `updateProps(select, newProps)` where `select` is 'leading' or 'trailing'). |
| sections | array of Section | | | Yes | The actual data to render, akin to the `data` prop in `FlatList`. |
| extraData | any | | | No | A marker property for telling the list to re-render (it implements `PureComponent`). If any of your `renderItem`, Header, Footer, etc. functions depend on anything outside of the `data` prop, stick it here and treat it immutably. |
| initialNumToRender | number | `10` | | No | How many items to render in the initial batch. Should be enough to fill the screen but not much more. These items are never unmounted as part of the windowed rendering. |
| inverted | boolean | `false` | | No | Reverses the direction of scroll. Uses scale transforms of -1. |
| ItemSeparatorComponent | component, function, element | | | No | Rendered in between each item, but not at the top or bottom. By default, `highlighted`, `section`, and `[leading/trailing][Item/Section]` props are provided. `renderItem` provides `separators.highlight`/`unhighlight`; custom props can be added with `separators.updateProps`. |
| keyExtractor | `(item: object, index: number) => string` | | | No | Extracts a unique key for a given item. Used for caching and as the React key to track re-ordering. The default extractor checks `item.key`, then `item.id`, then falls back to the index. Each overall section still needs its own key. |
| ListEmptyComponent | component, element | | | No | Rendered when the list is empty. |
| ListFooterComponent | component, element | | | No | Rendered at the very end of the list. |
| ListHeaderComponent | component, element | | | No | Rendered at the very beginning of the list. |
| onRefresh | function | | | No | If provided, a standard RefreshControl is added for "Pull to Refresh". Also set the `refreshing` prop correctly. To offset the RefreshControl from the top, use `progressViewOffset={100}`. |
| onViewableItemsChanged | `(callback: {changed: ViewToken[], viewableItems: ViewToken[]}) => void` | | | No | Called when the viewability of rows changes, as defined by the `viewabilityConfig` prop. |
| refreshing | boolean | `false` | | No | Set this true while waiting for new data from a refresh. |
| removeClippedSubviews | boolean | | | No | Offscreen child views are removed from their native backing superview. May improve scroll performance for large lists. On Android the default value is `true`. |
| renderSectionFooter | `(info: {section: Section}) => element or null` | | | No | Rendered at the bottom of each section. |
| renderSectionHeader | `(info: {section: Section}) => element or null` | | | No | Rendered at the top of each section. These stick to the top of the `ScrollView` by default on iOS. See `stickySectionHeadersEnabled`. |
| SectionSeparatorComponent | component, element | | | No | Rendered at the top and bottom of each section (unlike `ItemSeparatorComponent`, which is only between items). Also receives `highlighted`, `[leading/trailing][Item/Section]`, and custom props from `separators.updateProps`. |
| stickySectionHeadersEnabled | boolean | `false` on Android; `true` on iOS | | No | Makes section headers stick to the top of the screen until the next one pushes it off. Only enabled by default on iOS because that is the platform standard. |

### Methods

```tsx
flashScrollIndicators(); // iOS
recordInteraction();
scrollToLocation(params: SectionListScrollParams);
```

| Method | Description |
| --- | --- |
| flashScrollIndicators() (iOS) | Displays the scroll indicators momentarily. |
| recordInteraction() | Tells the list an interaction has occurred, which should trigger viewability calculations, e.g. if `waitForInteractions` is true and the user has not scrolled. Typically called by taps on items or by navigation actions. |
| scrollToLocation() | Scrolls to the item at the specified `sectionIndex` and `itemIndex` (within the section), positioned using `viewPosition` (`0` top, possibly covered by a sticky header; `1` bottom; `0.5` centered). `params` (object, required) keys: `animated` (boolean, default `true`), `itemIndex` (number, required), `sectionIndex` (number, required), `viewOffset` (number, fixed pixel offset e.g. to compensate for sticky headers), `viewPosition` (number). |

### Type Definitions

#### Section

An object that identifies the data to be rendered for a given section.

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| data | array | Yes | The data for rendering items in this section. Array of objects, much like `FlatList`'s data prop. |
| key | string | No | Optional key to keep track of section re-ordering. If you don't plan on re-ordering sections, the array index will be used by default. |
| renderItem | function | No | Optionally define an arbitrary item renderer for this section, overriding the default `renderItem` for the list. |
| ItemSeparatorComponent | component, element | No | Optionally define an arbitrary item separator for this section, overriding the default for the list. |
| keyExtractor | function | No | Optionally define an arbitrary key extractor for this section, overriding the default `keyExtractor`. |

## Notes

- Internal state is not preserved when content scrolls out of the render window. Make sure all your data is captured in the item data or external stores like Flux, Redux, or Relay.
- This is a `PureComponent`: it will not re-render if `props` remain shallow-equal. Make sure everything your `renderItem` depends on is passed as a prop (e.g. `extraData`) that is not `===` after updates, including the `data` prop and parent component state.
- Content is rendered asynchronously offscreen, so it's possible to scroll faster than the fill rate and momentarily see blank content. This is a tradeoff that can be adjusted per application.
- By default, the list looks for a `key` prop on each item and uses that for the React key; alternatively provide a custom `keyExtractor`.
- `removeClippedSubviews`: using this property may lead to bugs (missing content) in some circumstances - use at your own risk.
- You cannot scroll to locations outside the render window without specifying the `getItemLayout` or `onScrollToIndexFailed` prop.
- If you don't need section support and want a simpler interface, use FlatList.
- This is a React Native core component (imported from `react-native`, rendered as native views). It is distinct from web virtual-scroll libraries (tanstack-virtual) and Compose Lazy layouts (android-compose-ui LazyColumn), and from same-named UI parts in apple-swiftui / apple-uikit, android-compose-components, windows-winui-controls, and ark-ui / chakra-ui / fandhe-frontend.

## Related

- [FlatList](./flatlist.md)
- [VirtualizedList](./virtualizedlist.md)
- [ScrollView](./scrollview.md)
- [ViewToken](../props-types/viewtoken.md)
