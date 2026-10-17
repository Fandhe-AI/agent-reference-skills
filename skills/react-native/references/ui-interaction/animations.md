---
source: https://reactnative.dev/docs/0.87/animations
---

# Animations

React Native provides two complementary animation systems: `Animated` for granular and interactive control of specific values, and `LayoutAnimation` for animated global layout transactions.

## Signature / Usage

```tsx
import {useEffect, useRef} from 'react';
import {Animated, Text, View} from 'react-native';

const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};
```

Composing animations:

```tsx
Animated.sequence([
  // decay, then spring to start and twirl
  Animated.decay(position, {
    // coast to a stop
    velocity: {x: gestureState.vx, y: gestureState.vy}, // velocity from gesture release
    deceleration: 0.997,
    useNativeDriver: true,
  }),
  Animated.parallel([
    // after decay, in parallel:
    Animated.spring(position, {
      toValue: {x: 0, y: 0}, // return to start
      useNativeDriver: true,
    }),
    Animated.timing(twirl, {
      // and twirl
      toValue: 360,
      useNativeDriver: true,
    }),
  ]),
]).start(); // start the sequence group
```

Interpolation and event mapping:

```tsx
value.interpolate({
  inputRange: [-300, -100, 0, 100, 101],
  outputRange: [300, 0, 1, 0, 0],
});

onScroll={Animated.event(
  // scrollX = e.nativeEvent.contentOffset.x
  [{
    nativeEvent: {
      contentOffset: { x: scrollX }
    }
  }],
  {useNativeDriver: true}
)}
```

`LayoutAnimation` (the Android `UIManager` flag is only needed on the Legacy Architecture):

```tsx
UIManager.setLayoutAnimationEnabledExperimental?.(true);
LayoutAnimation.spring();
```

## Options / Props

| Topic | API | Description |
|-------|-----|-------------|
| Animatable components | `Animated.View`, `Animated.Text`, `Animated.Image`, `Animated.ScrollView`, `Animated.FlatList`, `Animated.SectionList` | Six exported types; make your own with `Animated.createAnimatedComponent()`. |
| Configuring | `Animated.timing()` | Animates a value over time using easing functions. Default is an easeInOut curve; pass `easing`, `duration`, `delay`. |
| Composing | `sequence()`, `parallel()`, `delay()` | Take an array of animations and automatically call `start()`/`stop()`. `Animated.parallel` has a `stopTogether` option (set `false` to disable stopping all when one stops). |
| Combining | `add`, `multiply`, `divide`, `modulo` | Combine two animated values into a new one; e.g. `Animated.divide(1, a)` inverts a scale. |
| Interpolation | `interpolate()` | Maps input ranges to output ranges; supports multiple segments, strings (`'0deg'`, colors), easing, and `extrapolate` / `extrapolateLeft` / `extrapolateRight` (`extend` default, or `clamp`). |
| Tracking | `toValue: <Animated.Value>` | Animated values can track other values; `ValueXY` handles 2D interactions. |
| Gestures | `Animated.event` | Maps gesture/scroll events to animated values; use `null` first for `PanResponder` handlers to skip the native event. |
| Current value | `stopAnimation(callback)`, `addListener(callback)` | The current value may only be known in the native runtime. |

## Notes

- Native driver: set `useNativeDriver: true` so the whole animation is sent to native before starting and runs on the UI thread. Animations without a `useNativeDriver` property default to false for legacy reasons, but emit a warning (and a typechecking error in TypeScript). Animated values are only compatible with one driver. The native driver also works with `Animated.event` (e.g. `ScrollView#onScroll`), but only with direct events and not bubbling events, so it does not work with `PanResponder`.
- Caveats: the main limitation is that you can only animate non-layout properties (`transform` and `opacity` work; Flexbox and position properties do not). Since 0.85: the New Animation Backend (experimental, opt-in via the experimental channel, available from 0.85.1) lets you animate Flexbox and position props with the native driver; the limitation no longer applies there. Per the 0.85 release blog.
- When an animation is running, it can prevent `VirtualizedList` components from rendering more rows. Use `isInteraction: false` in the animation config for long or looping animations.
- `setLayoutAnimationEnabledExperimental` is a no-op on the New Architecture (the only runtime since 0.82) and is typed optional in UIManager.d.ts; the 0.87 docs page shows an unguarded call.
- `isInteraction` / interaction handles are documented as on the 0.87 page; `InteractionManager` itself was removed in 0.87 (use `requestIdleCallback`), and the docs do not state the current effect of interaction handles.
- While using transform styles such as `rotateY`, `rotateX`, ensure the transform style `perspective` is in place; some animations may not render on Android without it.
- `LayoutAnimation` globally configures `create` and `update` animations for all views in the next render/layout cycle. It provides much less control than `Animated`.
- `setNativeProps` and `requestAnimationFrame` are additional notes; look into `setNativeProps`, `shouldComponentUpdate` or the native driver if animations drop below 60 frames per second. Monitor the frame rate with the In-App Dev Menu "FPS Monitor" tool.
- This is the React Native `Animated` API; distinct from Motion for React (motion), Jetpack Compose animation (android-compose-graphics-animation) and SwiftUI animation (apple-swiftui).

## Related

- [Animated](./animated.md)
- [Animated.Value](./animatedvalue.md)
- [Animated.ValueXY](./animatedvaluexy.md)
- [Easing](./easing.md)
- [LayoutAnimation](./layoutanimation.md)
- [PanResponder](./panresponder.md)
