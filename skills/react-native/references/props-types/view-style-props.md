---
source: https://reactnative.dev/docs/0.87/view-style-props
---

# View Style Props

Style props accepted by the `style` prop of `View`.

## Signature / Usage

```tsx
import {View, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <View style={styles.top} />
      <View style={styles.middle} />
      <View style={styles.bottom} />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    margin: 10,
  },
  top: {
    flex: 0.3,
    backgroundColor: 'grey',
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.3,
    backgroundColor: 'beige',
    borderWidth: 5,
  },
  bottom: {
    flex: 0.3,
    backgroundColor: 'pink',
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default App;
```

## Options / Props

Percentage radius type: `number, string (percentage value)`. Color type: color.

| Name | Type | Platform | Description |
| --- | --- | --- | --- |
| `backfaceVisibility` | enum(`'visible'`, `'hidden'`) | | |
| `backgroundColor` | color | | |
| `backgroundImage` | string, array of objects: `{type: 'linear-gradient', direction: string, colorStops: object[] }`, `{type: 'radial-gradient', shape: string, position: object, size: string, colorStops: object[] }` | | Draws a `linear-gradient()` and `radial-gradient()` using a web-like syntax. See example below. |
| `borderBottomColor` | color | | |
| `borderBlockColor` | color | | |
| `borderBlockEndColor` | color | | |
| `borderBlockStartColor` | color | | |
| `borderBottomEndRadius` | number, string (percentage value) | | |
| `borderBottomLeftRadius` | number, string (percentage value) | | |
| `borderBottomRightRadius` | number, string (percentage value) | | |
| `borderBottomStartRadius` | number, string (percentage value) | | |
| `borderStartEndRadius` | number, string (percentage value) | | |
| `borderStartStartRadius` | number, string (percentage value) | | |
| `borderEndEndRadius` | number, string (percentage value) | | |
| `borderEndStartRadius` | number, string (percentage value) | | |
| `borderBottomWidth` | number | | |
| `borderColor` | color | | |
| `borderCurve` | enum(`'circular'`, `'continuous'`) | iOS | On iOS 13+, it is possible to change the corner curve of borders. |
| `borderEndColor` | color | | |
| `borderLeftColor` | color | | |
| `borderLeftWidth` | number | | |
| `borderRadius` | number, string (percentage value) | | If the rounded border is not visible, try applying `overflow: 'hidden'` as well. |
| `borderRightColor` | color | | |
| `borderRightWidth` | number | | |
| `borderStartColor` | color | | |
| `borderStyle` | enum(`'solid'`, `'dotted'`, `'dashed'`) | | |
| `borderTopColor` | color | | |
| `borderTopEndRadius` | number, string (percentage value) | | |
| `borderTopLeftRadius` | number, string (percentage value) | | |
| `borderTopRightRadius` | number, string (percentage value) | | |
| `borderTopStartRadius` | number, string (percentage value) | | |
| `borderTopWidth` | number, string (percentage value) | | |
| `borderWidth` | number | | |
| `boxShadow` | array of BoxShadowValue objects \| string | | Adds a shadow effect to an element, with the ability to control the position, color, size, and blurriness of the shadow. Spec-compliant implementation of the web style prop of the same name. Shadows can be composed so a single `boxShadow` can comprise multiple shadows. Takes either a string which mimics the web syntax or an array of BoxShadowValue objects. |
| `cursor` | enum(`'auto'`, `'pointer'`) | iOS | On iOS 17+, setting to `pointer` allows hover effects when a pointer (such as a trackpad or stylus on iOS, or the users' gaze on visionOS) is over the view. |
| `elevation` | number | Android | Sets the elevation of a view, using Android's underlying elevation API. This adds a drop shadow to the item and affects z-order for overlapping views. Only supported on Android 5.0+, has no effect on earlier versions. |
| `experimental_backgroundPosition` | string \| array of objects `{top: string, left: string, right: string, bottom: string}` | | Experimental. Controls where the background gradient is placed inside the view. |
| `experimental_backgroundRepeat` | enum(`'repeat'`, `'space'`, `'round'`, `'no-repeat'`) \| array of objects `{x: string, y: string}` | | Experimental. Controls whether the background gradient is repeated, and how. |
| `experimental_backgroundSize` | string \| array of objects `{x: number, y: number}` | | Experimental. Controls the size of the background gradient. |
| `filter` | array of objects: `{brightness: number\|string}`, `{opacity: number\|string}`, `{blur: number\|string}`, `{contrast: number\|string}`, `{dropShadow: DropShadowValue\|string}`, `{grayscale: number\|string}`, `{hueRotate: number\|string}`, `{invert: number\|string}`, `{sepia: number\|string}`, `{saturate: number\|string}` or string | | Adds a graphical filter to the `View`. See filter functions below. |
| `mixBlendMode` | enum(`'normal'`, `'multiply'`, `'screen'`, `'overlay'`, `'darken'`, `'lighten'`, `'color-dodge'`, `'color-burn'`, `'hard-light'`, `'soft-light'`, `'difference'`, `'exclusion'`, `'hue'`, `'saturation'`, `'color'`, `'luminosity'`, `'plus-lighter'`) | | Controls how the `View` blends its colors with the other elements in its stacking context. |
| `opacity` | number | | |
| `outlineColor` | color | | Sets the color of an element's outline. |
| `outlineOffset` | number | | Sets the amount of space between an outline and the bounds of an element. Does not affect layout. |
| `outlineStyle` | enum(`'solid'`, `'dotted'`, `'dashed'`) | | Sets the style of an element's outline. |
| `outlineWidth` | number | | The width of an outline which is drawn around an element, outside the border. Does not affect layout. |
| `pointerEvents` | enum(`'auto'`, `'box-none'`, `'box-only'`, `'none'`) | | Controls whether the `View` can be the target of touch events. |

`backgroundImage` examples:

```tsx
// Simple usage:
<View style={{ backgroundImage: 'linear-gradient(45deg, blue, red)' }} />

<View style={{ backgroundImage: 'radial-gradient(ellipse farthest-corner at 30% 40%, red, blue)' }} />

// Also with PlatformColor:
<View
style={{
  backgroundImage: [
    {
      type: 'linear-gradient',
      direction: 'to bottom',
      colorStops: [
        {
          color: Platform.select({
            ios: PlatformColor('systemTealColor'),
            android: PlatformColor('@android:color/holo_purple'),
            default: 'blue',
          }),
          positions: ['0%'],
        },
        {color: 'green', positions: ['100%']},
      ],
    },
  ],
}}
/>
```

`experimental_background*` example:

```tsx
<View
  style={{
    experimental_backgroundImage:
      'radial-gradient(circle, #ff6b6b, #4ecdc4)',
    experimental_backgroundPosition: 'center',
    experimental_backgroundRepeat: 'no-repeat',
    experimental_backgroundSize: '50px 50px',
  }}
/>
```

`filter` functions:

- Work across all platforms: `brightness` (non-negative number or percentage), `opacity` (non-negative number or percentage).
- Android only: `blur` (Gaussian blur radius, any non-negative DIP value, no percents), `contrast`, `dropShadow` (optional color and 2 or 3 lengths: `offsetX`, `offsetY`, optional standard deviation; see DropShadowValue), `grayscale`, `hueRotate` (angle in `deg` or `rad`), `invert`, `sepia`, `saturate`.
- `filter` applies to descendants of the `View` as well as the `View` itself, and implies `overflow: hidden`.

`pointerEvents` values:

- `'auto'`: The View can be the target of touch events.
- `'none'`: The View is never the target of touch events.
- `'box-none'`: The View is never the target of touch events but its subviews can be.
- `'box-only'`: The view can be the target of touch events but its subviews cannot be.

`mixBlendMode` values: `normal`, `multiply`, `screen`, `overlay`, `darken`, `lighten`, `color-dodge`, `color-burn`, `hard-light`, `soft-light`, `difference`, `exclusion`, `hue`, `saturation`, `color`, `luminosity`, `plus-lighter` (see MDN `mix-blend-mode` for each blending function). For more granular control over what should be blending together see `isolation` in Layout Props.

## Notes

- `boxShadow`, `filter`, `mixBlendMode`, `outlineColor`, `outlineOffset`, `outlineStyle` and `outlineWidth` are only available on the New Architecture. `boxShadow` outset shadows are only supported on Android 9+; inset shadows only on Android 10+. `mixBlendMode` also requires Android 10+. `blur` and `dropShadow` filter functions are only supported on Android 12+.
- Due to issues with performance and spec compliance, `brightness` and `opacity` are the only two filter functions available on iOS. There are plans to explore some potential workarounds using SwiftUI instead of UIKit for this implementation.
- The `experimental_background*` props are Experimental: "This API is experimental. Experimental APIs may contain bugs and are likely to change in a future version of React Native. Don't use them in production."
- The official `experimental_background*` example uses `experimental_backgroundImage`; the prop documented on this page is `backgroundImage` (unprefixed), so prefer `backgroundImage` together with the experimental_background* props.
- 0.88: `backgroundSize`, `backgroundPosition` and `backgroundRepeat` lose their `experimental_` prefix and are now stable (the prefixed names still work). The prefixed `experimental_backgroundSize`, `experimental_backgroundPosition` and `experimental_backgroundRepeat` are deprecated in favour of their unprefixed names; the prefixed names still work as aliases.

## Related

- [Layout Props](./layout-props.md)
- [Shadow Props](./shadow-props.md)
- [Text Style Props](./text-style-props.md)
- [BoxShadowValue](./boxshadowvalue.md)
- [DropShadowValue](./dropshadowvalue.md)
