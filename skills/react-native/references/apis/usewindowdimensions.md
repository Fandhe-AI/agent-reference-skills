---
source: https://reactnative.dev/docs/0.87/usewindowdimensions
---

# useWindowDimensions

Automatically updates all of its values when screen size or font scale changes.

## Signature / Usage

```tsx
import {useWindowDimensions} from 'react-native';

const {height, width} = useWindowDimensions();
```

## Properties

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

- 0.88: With the iOS UIScene lifecycle (SceneDelegate support), the app window is resizable and `useWindowDimensions()` updates with the current values (0.88 release blog).

## Related

- [Dimensions](./dimensions.md)
- [PixelRatio](./pixelratio.md)
