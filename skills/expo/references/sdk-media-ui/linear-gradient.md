---
source: https://docs.expo.dev/versions/v58.0.0/sdk/linear-gradient/
---

# LinearGradient

`expo-linear-gradient`: a universal React component that renders a native view transitioning between multiple colors in a linear direction.

## Signature / Usage

```sh
npx expo install expo-linear-gradient
```

```tsx
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={styles.background}
      />
      <LinearGradient
        // Button Linear Gradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.button}>
        <Text style={styles.text}>Sign in with Facebook</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  button: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
  },
});
```

## Options / Props

`LinearGradient` supports Android, iOS, tvOS, Web and inherits `ViewProps`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| colors | readonly [ColorValue, ColorValue, ...ColorValue[]] | — | Colors representing gradient stops. At least two are required (for a single color use `style.backgroundColor` on a `View`). For TypeScript to know the array has 2+ values, provide it inline or typed `as const`. |
| dither (Android) | `boolean` | `true` | Enables or disables paint dithering, which can reduce color banding. `false` may improve rendering performance. |
| end | `LinearGradientPoint \| null` | — | End point. E.g. `{ x: 0.1, y: 0.2 }` ends 10% from the left and 20% from the bottom. On web, only changes the angle (CSS gradients do not support changing the end position). |
| locations | `readonly [number, number, ...number[]] \| null` | `[]` | Numbers from `0` to `1` (ascending), same length as `colors`, giving each color-stop location. If omitted, colors are distributed evenly. |
| start | `LinearGradientPoint \| null` | — | Start point. E.g. `{ x: 0.1, y: 0.2 }` starts 10% from the left and 20% from the top. On web, only changes the angle. |

### Types

- `LinearGradientPoint`: `NativeLinearGradientPoint` or object `{ x: number; y: number }` (each `0` to `1`, inclusive).
- `NativeLinearGradientPoint`: tuple `[x: number, y: number]`.

## Notes

- Platforms: Android, iOS, tvOS, Web, included in Expo Go. Source `https://github.com/expo/expo/tree/sdk-58/packages/expo-linear-gradient`. Pinned to Expo SDK 58 docs (modificationDate October 16, 2026).
- React Native also provides the `backgroundImage` style property on `View` (Android, iOS, web) supporting CSS gradient syntax such as `linear-gradient()` and `radial-gradient()`, as an alternative without an extra dependency.

## Related

- [BlurView](./blur-view.md)
