---
source: https://reactnative.dev/blog/2026/04/07/react-native-0.85
---

# React Native 0.85

Release blog (dated 2026-04-07): New Animation Backend, Jest preset moved to a dedicated package, Metro TLS support, DevTools improvements.

## Signature / Usage

Animating layout props with the native driver (requires the experimental channel, available starting from 0.85.1):

```jsx
import {
  Animated,
  Button,
  View,
  useAnimatedValue,
} from 'react-native';

function MyComponent() {
  const width = useAnimatedValue(100);

  const toggle = () => {
    Animated.timing(width, {
      toValue: 300,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={{width, height: 100, backgroundColor: 'blue'}}
      />
      <Button title="Expand" onPress={toggle} />
    </View>
  );
}
```

Jest preset migration:

```diff
- preset: 'react-native',
+ preset: '@react-native/jest-preset',
```

Metro TLS:

```js
const fs = require('fs');

config.server.tls = {
  ca: fs.readFileSync('path/to/ca'),
  cert: fs.readFileSync('path/to/cert'),
  key: fs.readFileSync('path/to/key'),
};
```

## Options / Props

Breaking changes:

| Change | Detail |
| --- | --- |
| Jest preset | Extracted from `react-native` into `@react-native/jest-preset` |
| Node.js | Drops EOL versions and releases before v20.19.4: v20 (>=20.19.4) supported; v21 not; v22 supported; v23 not; v24+ supported |
| `StyleSheet.absoluteFillObject` | Removed; use `StyleSheet.absoluteFill` or your own absolute positioning styles |
| `Pressable` | No longer unmounts event listeners in hidden `Activity` |
| C++ | Removed deprecated type aliases (`ShadowNode::Shared`, `::Weak`, `::Unshared`, `::ListOfWeak`, `::ListOfShared`, `SharedImageManager`, `ContextContainer::Shared`) |
| Android | `receiveTouches` re-added to `RCTEventEmitter` as a no-op; `ReactTextUpdate` internal; `ReactZIndexedViewGroup` and `UIManagerHelper` deprecated; `CatalystInstanceImpl` removed; `NativeViewHierarchyManager` fully stubbed |
| iOS | `RCTHostRuntimeDelegate` deprecated and merged into `RCTHostDelegate` |

Other changes: Metro `^0.84.0`; React consumes Hermes `250829098.0.10`; `YogaNode` migrated to Kotlin on Android; `AccessibilityInfo.setAccessibilityFocus` deprecated in favor of `AccessibilityInfo.sendAccessibilityEvent`; `reactNativeDevServerIp` Gradle property.

## Notes

- Node.js: the list above is reproduced as published in the 0.85 post; the 0.84 post states a v22.11+ minimum and 0.87 requires >= 22.13.0, so use Node 22.13+ for 0.87 / 0.88.
- New Animation Backend: a shared internal engine built with Software Mansion that powers how animations are applied for both Animated and Reanimated. In Animated, layout props can now be animated with the native driver (the limitation in the animations docs caveats no longer applies). Opt in via the experimental release level; this feature is available starting from 0.85.1.
- DevTools: multiple simultaneous CDP connections (React Native DevTools, VS Code, AI agents), native tabs on macOS (Window > Merge All Windows), restored request payload previews on Android.
- Metro dev server can accept a TLS configuration object enabling HTTPS (and WSS for Fast Refresh) in development.
- 0.85 was the latest stable at the time of the post and 0.82.x moves to unsupported. Expo SDK 56 includes React Native 0.85.
- 0.88: 0.85.x is stated to move to unsupported once 0.88 became latest stable.
- Distinct from the motion skill (web animation library), android-compose-graphics-animation, and apple-swiftui for animation APIs.

## Related

- [react-native-0.84.md](./react-native-0.84.md)
- [react-native-0.86.md](./react-native-0.86.md)
- [../ui-interaction/animated.md](../ui-interaction/animated.md)
- [../debugging-performance/testing-overview.md](../debugging-performance/testing-overview.md)
- ../workflow/release-levels.md
