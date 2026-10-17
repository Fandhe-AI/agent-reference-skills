---
source: https://reactnative.dev/docs/0.87/height-and-width
---

# Height and Width

A component's height and width determine its size on the screen.

## Signature / Usage

```tsx
import {View} from 'react-native';

const FlexDimensionsBasics = () => {
  return (
    // Try removing the `flex: 1` on the parent View.
    // The parent will not have dimensions, so the children can't expand.
    // What if you add `height: 300` instead of `flex: 1`?
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'powderblue'}} />
      <View style={{flex: 2, backgroundColor: 'skyblue'}} />
      <View style={{flex: 3, backgroundColor: 'steelblue'}} />
    </View>
  );
};

export default FlexDimensionsBasics;
```

## Options / Props

| Approach | Style | Description |
|----------|-------|-------------|
| Fixed dimensions | `width`, `height` | All dimensions in React Native are unitless, and represent density-independent pixels. |
| Flex dimensions | `flex` | Component expands and shrinks dynamically based on available space. Normally `flex: 1`, which fills all available space, shared evenly amongst other components with the same parent. The larger the `flex` given, the higher the ratio of space a component takes compared to its siblings. |
| Percentage dimensions | `width: '66%'`, `height: '15%'` | Percentage values fill a portion of the parent without the `flex` layout. Require a parent with a defined size. |

## Notes

- Fixed dimensions: setting dimensions this way is common for components whose size should always be fixed to a number of points and not calculated based on screen size.
- Caution: There is no universal mapping from points to physical units of measurement. This means that a component with fixed dimensions might not have the same physical size, across different devices and screen sizes. However, this difference is unnoticeable for most use cases.
- A component can only expand to fill available space if its parent has dimensions greater than `0`. If a parent does not have either a fixed `width` and `height` or `flex`, the parent will have dimensions of `0` and the `flex` children will not be visible.
- Similar to flex dimensions, percentage dimensions require parent with a defined size.

## Related

- [Style](./style.md)
- [Layout with Flexbox](./flexbox.md)
