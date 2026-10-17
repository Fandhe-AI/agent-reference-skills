---
source: https://reactnative.dev/docs/0.87/optimizing-flatlist-configuration
---

# Optimizing FlatList Configuration

Props and list-item techniques that improve `FlatList` (VirtualizedList) performance.

## Signature / Usage

```tsx
const renderItem = useCallback(({item}) => (
   <View key={item.key}>
      <Text>{item.title}</Text>
   </View>
 ), []);

return (
  // ...
  <FlatList data={items} renderItem={renderItem} />
  // ...
);
```

## Options / Props

| Name | Type | Default | Pros / Cons |
| --- | --- | --- | --- |
| `removeClippedSubviews` | Boolean | `true` on Android, otherwise `false` | Detaches off-viewport views from the native hierarchy, reducing main thread time. Can have bugs such as missing content (mainly on iOS) with transforms / absolute positioning; saves little memory because views are only detached. |
| `maxToRenderPerBatch` | Number | 10 | Items rendered per batch (a `VirtualizedList` prop passed through `FlatList`). Bigger means fewer blank areas but longer JS execution that can hurt responsiveness. |
| `updateCellsBatchingPeriod` | Number | 50 | Delay in milliseconds between batch renders. Less frequent batches may cause blank areas; more frequent ones may hurt responsiveness. |
| `initialNumToRender` | Number | 10 | Initial amount of items to render. A precise count that covers the screen boosts initial render; too low causes blank areas. |
| `windowSize` | Number | 21 | Window measured in viewport heights (10 above, 10 below, one in between). Bigger means fewer blank areas but more memory; smaller saves memory but risks blank areas. |

## Notes

- Terms: VirtualizedList (component behind `FlatList`), memory consumption, responsiveness, blank areas, viewport (visible area), window (area where items are mounted, much larger than the viewport).
- List item tips: use basic and light components (small thumbnails, little logic / nesting), use `memo()` with a comparison function, use cached optimized images (e.g. `@d11/react-native-fast-image`), use `getItemLayout` when items have equal height (or width), use `keyExtractor` or `key`, and avoid anonymous `renderItem` functions (wrap in `useCallback`; for class components move it out of `render`).
- Adapted (not in the official docs): the stray semicolon after the JSX inside `return (...)` in the official snippet is removed so the example parses.
- Distinct from web virtualization (tanstack-virtual) and Jetpack Compose LazyColumn (android-compose-ui).

## Related

- [Performance Overview](./performance.md)
- [Profiling](./profiling.md)
