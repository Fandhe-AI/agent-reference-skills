---
source: https://reactnative.dev/docs/0.87/dimensions
---

# Dimensions

Get the application window's (and screen's) width and height.

## Signature / Usage

```tsx
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
```

```tsx
static addEventListener(
  type: 'change',
  handler: ({
    window,
    screen,
  }: DimensionsPayload) => void,
): EventSubscription;

static get(dim: string): DisplayMetrics | DisplayMetricsAndroid;
```

### Methods

| Method | Description |
| --- | --- |
| `addEventListener()` | Add an event handler. `change` fires when a property within the `Dimensions` object changes; the argument is a `DimensionsPayload`. |
| `get()` | `dim` (string, required): name of dimension as defined when calling `set`. Initial dimensions are set before `runApplication` is called so they should be available before any other require's are run, but may be updated later. Example: `const {height, width} = Dimensions.get('window');` |

### Type Definitions

`DimensionsPayload`:

| Name | Type | Description |
| --- | --- | --- |
| window | DisplayMetrics | Size of the visible application window. |
| screen | DisplayMetrics | Size of the device's screen. |
| windowPhysicalPixels | DisplayMetricsAndroid | Physical pixels for the Android window. |
| screenPhysicalPixels | DisplayMetricsAndroid | Physical pixels for the Android screen. |

`DisplayMetrics` (object): `width` (number), `height` (number), `scale` (number), `fontScale` (number). `DisplayMetricsAndroid` includes all `DisplayMetrics` properties plus `densityDpi` (number).

## Notes

- `useWindowDimensions` is the preferred API for React components. Unlike `Dimensions`, it updates as the window's dimensions update.
- Dimensions are available immediately but may change (device rotation, foldable devices, etc.), so rendering logic or styles that depend on them should call `get()` on every render rather than caching the value (e.g. use inline styles rather than a value set in a `StyleSheet`).
- Android: the `window` dimension is reduced by the size of the status bar (if not translucent) and bottom navigation bar.
- Since 0.86: `Dimensions` window values are accurate on Android versions prior to 15 when edge-to-edge is enabled ([0.86 release blog](https://reactnative.dev/blog/2026/06/11/react-native-0.86)).
- 0.88: With the iOS UIScene lifecycle (SceneDelegate support), the app window is resizable; `Dimensions.get()` and `useWindowDimensions()` update with the current values ([0.88 release blog](https://reactnative.dev/blog/2026/10/19/react-native-0.88)).

## Related

- [useWindowDimensions](./usewindowdimensions.md)
- [PixelRatio](./pixelratio.md)
