---
source: https://docs.expo.dev/versions/v58.0.0/sdk/glass-effect/
---

# GlassEffect

`expo-glass-effect`: React components that render the native iOS liquid glass effect using `UIVisualEffectView`, with customizable glass styles and tint color.

## Signature / Usage

```sh
npx expo install expo-glass-effect
```

```jsx
import { StyleSheet, View, Image } from 'react-native';
import { GlassView } from 'expo-glass-effect';

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={{
          uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
        }}
      />

      {/* Basic Glass View */}
      <GlassView style={styles.glassView} />

      {/* Glass View with clear style */}
      <GlassView style={styles.tintedGlassView} glassEffectStyle="clear" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  glassView: {
    position: 'absolute',
    top: 100,
    left: 50,
    width: 200,
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  tintedGlassView: {
    position: 'absolute',
    top: 250,
    left: 50,
    width: 200,
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
```

`GlassContainer` groups several `GlassView`s (props `spacing`, `style`; children such as `<GlassView style={...} isInteractive />`); see the `GlassContainer` props table below.

Animated style change (recommended way to fade the glass effect without modifying `opacity`):

```jsx
<GlassView
  glassEffectStyle={{
    style: visible ? 'clear' : 'none',
    animate: true,
    animationDuration: 0.5,
  }}
/>
```

Availability checks:

```tsx
import { isLiquidGlassAvailable, isGlassEffectAPIAvailable } from 'expo-glass-effect';

isLiquidGlassAvailable();
isGlassEffectAPIAvailable();
```

## Options / Props

### GlassView (iOS, tvOS; inherits ViewProps)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| colorScheme | `'auto' \| 'light' \| 'dark'` | `'auto'` | Color scheme of the glass appearance. Overrides system appearance when the app has its own theme toggle. |
| glassEffectStyle | `GlassStyle \| GlassEffectStyleConfig` | `'regular'` | Style: `'clear'`, `'regular'`, `'none'`, or a config object for animation behavior. |
| isInteractive | `boolean` | `false` | Whether the glass effect is interactive. |
| ref | `Ref<View>` | — | View ref. |
| tintColor | `ColorValue` | — | Tint color applied to the glass effect. |

### GlassContainer (iOS, tvOS; inherits ViewProps)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| spacing | `number` | `undefined` | Distance at which glass elements start affecting each other; controls when they begin to merge. |
| ref | `Ref<View>` | — | View ref. |

### Types

- `GlassStyle`: `'clear'` | `'regular'` | `'none'`
- `GlassColorScheme`: `'auto'` | `'light'` | `'dark'`
- `GlassEffectStyleConfig`: `style` (`GlassStyle`, required), `animate` (`boolean`, default `false`), `animationDuration` (`number`, seconds; system default if omitted).

### Methods

| Name | Platforms | Returns | Description |
| --- | --- | --- | --- |
| isGlassEffectAPIAvailable() | iOS | `boolean` | Whether the Liquid Glass API is available at runtime. Check before using `GlassView` / `GlassContainer` since some iOS 26 beta versions lack it, which can cause crashes (expo/expo issue 40911). |
| isLiquidGlassAvailable() | iOS, tvOS | `boolean` | Whether the app is using Liquid Glass design (components available). Also `true` if the user enabled accessibility settings limiting the effect; use `AccessibilityInfo.isReduceTransparencyEnabled()` to check that. |

## Notes

- Platforms: iOS, tvOS, included in Expo Go. Source package `expo-glass-effect` (Expo SDK 58 docs, modificationDate October 02, 2026).
- `GlassView` is only available on iOS 26 and above; it falls back to a regular `View` on unsupported platforms.
- `isLiquidGlassAvailable` validates system and compiler versions and the Info.plist `UIDesignRequiresCompatibility` setting.
- Apple does not recommend `opacity` below `1` on `GlassView` or its parent views; at very low opacity the glass effect does not render. Workaround (iOS 26.1+ per the original example): animate a wrapper view's opacity with Reanimated while toggling `glassEffectStyle` between the desired style and `'none'` (e.g. `fadeOpacity.value > 0.02 ? 'regular' : 'none'` via `useAnimatedProps` on `Animated.createAnimatedComponent(GlassView)`).
- Distinct from native SwiftUI / UIKit glass APIs (see the apple-swiftui and apple-uikit skills); this page documents the React Native wrapper only.

## Related

- [BlurView](./blur-view.md)
- [Expo UI SwiftUI](./expo-ui-swift-ui.md)
