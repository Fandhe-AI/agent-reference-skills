---
source: https://reactnative.dev/docs/0.87/flexbox
---

# Layout with Flexbox

A component can specify the layout of its children using the Flexbox algorithm. Flexbox is designed to provide a consistent layout on different screen sizes. You will normally use a combination of `flexDirection`, `alignItems`, and `justifyContent` to achieve the right layout.

## Signature / Usage

```tsx
import {StyleSheet, View} from 'react-native';

const Flex = () => {
  return (
    <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: 'column',
        },
      ]}>
      <View style={{flex: 1, backgroundColor: 'red'}} />
      <View style={{flex: 2, backgroundColor: 'darkorange'}} />
      <View style={{flex: 3, backgroundColor: 'green'}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default Flex;
```

## Options / Props

| Style | Values | Description |
|-------|--------|-------------|
| `flex` | number | Defines how items "fill" over the available space along the main axis. Space is divided according to each element's flex property (flex 1, 2, 3 = 1/6, 2/6, 3/6 of the space). |
| `flexDirection` | `column` (default), `row`, `column-reverse`, `row-reverse` | Direction in which the children of a node are laid out (main axis). |
| `direction` | `'inherit'` (default), `'ltr'`, `'rtl'` | Direction in which children and text in a hierarchy are laid out. Also affects what edge `start` and `end` refer to; by default `start` is left and `end` is right. |
| `justifyContent` | `flex-start` (default), `flex-end`, `center`, `space-between`, `space-around`, `space-evenly` | How to align children within the main axis of their container. |
| `alignItems` | `stretch` (default), `flex-start`, `flex-end`, `center`, `baseline` | How to align children along the cross axis of their container. For `stretch` to have an effect, children must not have a fixed dimension along the secondary axis. |
| `alignSelf` | same options as `alignItems`, plus `auto` | Applied to a single child to change its alignment within its parent; overrides any option set by the parent with `alignItems`. |
| `alignContent` | `flex-start` (default), `flex-end`, `stretch` (default value when using Yoga on the web), `center`, `space-between`, `space-around`, `space-evenly` | Distribution of lines along the cross-axis. Only has effect when items are wrapped to multiple lines using `flexWrap`. |
| `flexWrap` | `wrap`, `nowrap`, `wrap-reverse` | Controls what happens when children overflow the size of the container along the main axis. By default, children are forced into a single line (which can shrink elements). |
| `flexBasis` | number or `'auto'` | Axis-independent way of providing the default size of an item along the main axis; the size before any `flexGrow` and `flexShrink` calculations are performed. |
| `flexGrow` | number >= 0 (default 0) | How much remaining space within a container is distributed among its children along the main axis. |
| `flexShrink` | number >= 0 (default 0; on the web, the default is 1) | How to shrink children along the main axis when the total size of the children overflows the container. |
| `rowGap` | number or percentage string | Size of the gap (gutter) between an element's rows. |
| `columnGap` | number or percentage string | Size of the gap (gutter) between an element's columns. |
| `gap` | number or percentage string | Shorthand for `rowGap` and `columnGap`. |
| `width` / `height` | `auto` (default), pixels, percentage | Width and height of an element's content area. `auto`: React Native calculates the size based on content. |
| `position` | `relative` (default), `absolute`, `static` (New Architecture only) | How the element is positioned relative to itself, its parent, or its containing block. |

## Notes

- Caution: Flexbox works the same way in React Native as it does in CSS on the web, with a few exceptions. The defaults are different, with `flexDirection` defaulting to `column` instead of `row`, `alignContent` defaulting to `flex-start` instead of `stretch`, `flexShrink` defaulting to `0` instead of `1`, the `flex` parameter only supporting a single number.
- `space-around` compared to `space-between`: space is distributed to the beginning of the first child and end of the last child. `space-evenly`: the spacing between each pair of adjacent items, the main-start edge and the first item, and the main-end edge and the last item, are all exactly the same.
- `alignItems: baseline` aligns children along a common baseline. Individual children can be set to be the reference baseline for their parents.
- `flexGrow`: a container distributes any remaining space among its children weighted by the children's `flexGrow` values. `flexShrink` can be thought of like `flexGrow` if any overflowing size is considered to be negative remaining space; a container shrinks its children weighted by the children's `flexShrink` values.
- `flexBasis` is similar to setting `width` when the parent has `flexDirection: row` or `height` when the parent has `flexDirection: column`.
- Gap properties accept numeric values (in points) or percentage strings (e.g. `'10%'` on the New Architecture). Use `flexWrap` and `alignContent` along with `gap` to add consistent spacing between items.
- `position: relative`: the element is positioned according to the normal flow of the layout, then offset based on `top`, `right`, `bottom`, `left`; the offset does not affect the position of any sibling or parent elements. `position: absolute`: the element doesn't take part in the normal layout flow and is positioned relative to its containing block.
- Containing block: if the element has a `position` type of `relative` or `static`, its containing block is its parent. If `absolute`, it is the nearest ancestor with a `position` type other than `static` or with a `transform`. Percentage lengths applied to absolutely positioned elements are calculated relative to the containing block.
- The 0.87 flexbox page writes LTR/RTL in prose and describes LTR as the default layout direction; the `direction` style values are lowercase `'inherit'` (default, root follows the locale) | `'ltr'` | `'rtl'` (see Layout Props for the full enums).
- Yoga playground for experimenting: https://www.yogalayout.dev/playground. The full list of props that control layout is documented in layout-props.

## Related

- [Style](./style.md)
- [Height and Width](./height-and-width.md)
- [Transforms](./transforms.md)
