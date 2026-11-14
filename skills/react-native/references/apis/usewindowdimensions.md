---
source: https://reactnative.dev/docs/0.88/usewindowdimensions
---

# useWindowDimensions

Automatically updates all of its values when screen size or font scale changes.

## Signature / Usage

```tsx
import {useWindowDimensions} from 'react-native';

const {height, width} = useWindowDimensions();
```

### Properties

| Name | Description |
| --- | --- |
| `fontScale` | The scale of the font currently used. Some operating systems let users scale font sizes larger or smaller. |
| `height` | The height in pixels of the window or screen your app occupies. |
| `scale` | The pixel ratio of the device. `1` means one point equals one pixel (usually PPI/DPI of 96, 76 on some platforms); `2` or `3` indicates a Retina or high DPI display. |
| `width` | The width in pixels of the window or screen your app occupies. |

```tsx
const {height, width, scale, fontScale} = useWindowDimensions();
```

## Notes

- The 0.88 docs note: changing the font size percentage can be leveraged to dynamically adjust the sizes of UI elements, such as padding, margins, and container heights, for a consistent and accessible experience; the page example sizes a box with `fontScale`:

```tsx
<View
  style={{
    width: 100 * fontScale,
    padding: 16 * fontScale,
    ...styles.box,
  }}>
  <Text style={{fontSize: 14 / fontScale}}>Dynamic Box</Text>
</View>
```

- 0.88: With the iOS UIScene lifecycle (SceneDelegate support), the app window is resizable and `useWindowDimensions()` updates with the current values ([0.88 release blog](https://reactnative.dev/blog/2026/10/19/react-native-0.88)).
- Source: https://reactnative.dev/docs/0.88/usewindowdimensions (react-native-website commit a459a29, retrieved 2026-11-14)

## Related

- [Dimensions](./dimensions.md)
- [PixelRatio](./pixelratio.md)
