---
source: https://docs.expo.dev/versions/v58.0.0/sdk/blur-view/
---

# BlurView

`expo-blur`: a React component that blurs everything underneath the view. Common usage is navigation bars, tab bars, and modals.

## Signature / Usage

```sh
npx expo install expo-blur
```

```tsx
import { BlurView, BlurTargetView } from 'expo-blur';
import { useRef } from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function App() {
  const targetRef = useRef<View | null>(null);
  const text = 'Hello, my container is blurring contents underneath!';

  return (
    <View style={styles.container}>
      <BlurTargetView ref={targetRef} style={styles.background}>
        {[...Array(20).keys()].map(i => (
          <View
            key={`box-${i}`}
            style={[styles.box, i % 2 === 1 ? styles.boxOdd : styles.boxEven]}
          />
        ))}
      </BlurTargetView>
      <BlurView
        blurTarget={targetRef}
        intensity={100}
        style={styles.blurContainer}
        blurMethod="dimezisBlurView">
        <Text style={styles.text}>{text}</Text>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurContainer: {
    flex: 1,
    padding: 20,
    margin: 16,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 20,
  },
  background: {
    flex: 1,
    flexWrap: 'wrap',
    ...StyleSheet.absoluteFill,
  },
  box: {
    width: '25%',
    height: '20%',
  },
  boxEven: {
    backgroundColor: 'orangered',
  },
  boxOdd: {
    backgroundColor: 'gold',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});
```

On iOS and web (legacy usage), `<BlurView intensity={100} style={...}>` alone blurs; on Android without `blurTarget` it renders a semi-transparent view.

## Options / Props

### BlurView

Supported platforms: Android, iOS, tvOS, Web. Inherits `ViewProps`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| blurMethod (Android) | `BlurMethod` | `'none'` | Blur method to use on Android. |
| blurReductionFactor (Android) | `number` | `4` | A number by which the blur intensity will be divided on Android. Fine-tunes perceived intensity to match iOS when using experimental blur methods. |
| blurTarget (Android) | `RefObject<View \| null>` | — | A ref to a `BlurTargetView`, which this `BlurView` will blur as its background. |
| intensity | `number` | `50` | A number from `1` to `100` to control the intensity of the blur effect. Can be animated with `react-native-reanimated`. |
| tint | `BlurTint` | `'default'` | A tint mode applied to the view. Every tint adds a translucent color layer on top of the blur; no value renders the blur alone. |

### BlurTargetView

Supported platforms: Android, iOS, tvOS, Web. Inherits `ViewProps`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| ref | `RefObject<View \| null>` | — | Ref passed to `BlurView`'s `blurTarget`. |

### Types

`BlurMethod` (Android): `'none'` | `'dimezisBlurView'` | `'dimezisBlurViewSdk31Plus'`

- `'none'`: renders a semi-transparent view instead of a blur effect.
- `'dimezisBlurView'`: native blur view based on the Dimezis BlurView library. May decrease performance on Android SDK 30 and below.
- `'dimezisBlurViewSdk31Plus'`: same as above on Android SDK 31+, falls back to `'none'` on older versions.

`BlurTint`: `'light'` | `'dark'` | `'default'` | `'extraLight'` | `'regular'` | `'prominent'` | `'systemUltraThinMaterial'` | `'systemThinMaterial'` | `'systemMaterial'` | `'systemThickMaterial'` | `'systemChromeMaterial'` | `'systemUltraThinMaterialLight'` | `'systemThinMaterialLight'` | `'systemMaterialLight'` | `'systemThickMaterialLight'` | `'systemChromeMaterialLight'` | `'systemUltraThinMaterialDark'` | `'systemThinMaterialDark'` | `'systemMaterialDark'` | `'systemThickMaterialDark'` | `'systemChromeMaterialDark'`

## Notes

- Platforms: Android, iOS, tvOS, Web, included in Expo Go. Package `expo-blur`, source `https://github.com/expo/expo/tree/sdk-58/packages/expo-blur`. Pinned to Expo SDK 58 docs (modificationDate September 15, 2026).
- In SDK 55 and later, `expo-blur` is stable on Android, but `BlurView` requires wrapping the content to blur in a `BlurTargetView` and passing its ref to `BlurView`. One `BlurTargetView` can serve multiple `BlurView`s as long as they fit within its bounds (more efficient than several targets).
- Known issue: the blur effect does not update when `BlurView` is rendered before dynamic content such as `FlatList`. Render `BlurView` after the dynamic content component (`<View><FlatList /><BlurView /></View>`).
- Android performance: efficient blur uses the `RenderNode` API (Android SDK 31 / Android 12.0+); older versions use the much less efficient `RenderScript`. Use `dimezisBlurViewSdk31Plus` to avoid the penalty (falls back to `none`).
- `borderRadius` is not applied when provided explicitly on Android and iOS; use `overflow: 'hidden'` since `BlurView` inherits `<View>` props.

## Related

- [GlassEffect](./glass-effect.md)
- [LinearGradient](./linear-gradient.md)
