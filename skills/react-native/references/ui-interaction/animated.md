---
source: https://reactnative.dev/docs/0.87/animated
---

# Animated

The `Animated` library is designed to make animations fluid, powerful, and painless to build and maintain. `Animated` focuses on declarative relationships between inputs and outputs, configurable transforms in between, and `start`/`stop` methods to control time-based animation execution.

## Signature / Usage

```tsx
import {Animated, useAnimatedValue} from 'react-native';

const fadeAnim = useAnimatedValue(0);

const fadeIn = () => {
  // Will change fadeAnim value to 1 in 5 seconds
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 5000,
    useNativeDriver: true,
  }).start();
};

<Animated.View style={{opacity: fadeAnim}} />
```

The core workflow is to create an `Animated.Value`, hook it up to one or more style attributes of an animated component, and drive updates via animations using `Animated.timing()`.

## Options / Props

Methods. When the given value is a `ValueXY` instead of a `Value`, each config option may be a vector of the form `{x: ..., y: ...}`.

| Method | Signature | Description |
|--------|-----------|-------------|
| `decay()` | `static decay(value, config): CompositeAnimation` | Animates a value from an initial velocity to zero based on a decay coefficient. Config: `velocity` (required), `deceleration` (default 0.997), `isInteraction` (default true), `useNativeDriver` (required). |
| `timing()` | `static timing(value, config): CompositeAnimation` | Animates a value along a timed easing curve. Config: `duration` (ms, default 500), `easing` (default `Easing.inOut(Easing.ease)`), `delay` (default 0), `isInteraction` (default true), `useNativeDriver` (required). |
| `spring()` | `static spring(value, config): CompositeAnimation` | Analytical spring model based on damped harmonic oscillation. Define only one of bounciness/speed, tension/friction, or stiffness/damping/mass. See config table below. |
| `add()` | `static add(a: Animated, b: Animated): AnimatedAddition` | Two Animated values added together. |
| `subtract()` | `static subtract(a: Animated, b: Animated): AnimatedSubtraction` | Subtracts the second from the first. |
| `divide()` | `static divide(a: Animated, b: Animated): AnimatedDivision` | Divides the first by the second. |
| `multiply()` | `static multiply(a: Animated, b: Animated): AnimatedMultiplication` | Two Animated values multiplied together. |
| `modulo()` | `static modulo(a: Animated, modulus: number): AnimatedModulo` | The (non-negative) modulo of the provided Animated value. |
| `diffClamp()` | `static diffClamp(a: Animated, min: number, max: number): AnimatedDiffClamp` | Limits between 2 values using the difference from the last value (`value = clamp(value + diff, min, max)`); useful with scroll events, e.g. showing the navbar when scrolling up. |
| `delay()` | `static delay(time: number): CompositeAnimation` | Starts an animation after the given delay. |
| `sequence()` | `static sequence(animations: CompositeAnimation[]): CompositeAnimation` | Starts in order, waiting for each to complete. If the current running animation is stopped, no following animations will be started. |
| `parallel()` | `static parallel(animations: CompositeAnimation[], config?: ParallelConfig): CompositeAnimation` | Starts all at the same time. By default, if one is stopped, they all are; override with `stopTogether`. |
| `stagger()` | `static stagger(time: number, animations: CompositeAnimation[]): CompositeAnimation` | Animations may overlap but are started in sequence with successive delays. |
| `loop()` | `static loop(animation: CompositeAnimation, config?: LoopAnimationConfig): CompositeAnimation` | Loops continuously. Config `iterations`: default `-1` (infinite). Loops without blocking the JS thread if the child animation uses `useNativeDriver: true`; pass `isInteraction: false` in the child config to avoid blocking `VirtualizedList` rows. |
| `event()` | `static event(argMapping: Mapping[], config?: EventConfig): (...args: any[]) => void` | Extracts values from each arg and calls `setValue` on the mapped outputs. Config: `listener` (optional async listener), `useNativeDriver` (required). |
| `forkEvent()` | `static forkEvent(event: AnimatedEvent, listener: Function): AnimatedEvent` | Advanced imperative API to add a JS listener to an existing `AnimatedEvent`. |
| `unforkEvent()` | `static unforkEvent(event: AnimatedEvent, listener: Function)` | Removes a forked listener. |
| `start()` | `animation.start(callback?: (result: {finished: boolean}) => void)` | CompositeAnimation instance method (returned by `Animated.timing()` etc.). Starts the animation; the callback receives `{finished: true}` on normal completion or `{finished: false}` if `stop()` was called first. |
| `stop()` | `animation.stop()` | CompositeAnimation instance method. Stops any running animation. |
| `reset()` | `animation.reset()` | CompositeAnimation instance method. Stops any running animation and resets the value to its original. |

`spring()` config:

| Option | Default | Description |
|--------|---------|-------------|
| `friction` | 7 | Controls "bounciness"/overshoot. |
| `tension` | 40 | Controls speed. |
| `speed` | 12 | Controls speed of the animation. |
| `bounciness` | 8 | Controls bounciness. |
| `stiffness` | 100 | The spring stiffness coefficient. |
| `damping` | 10 | How the spring's motion is damped due to friction. |
| `mass` | 1 | The mass of the object attached to the end of the spring. |
| `velocity` | 0 | Initial velocity of the object attached to the spring. |
| `overshootClamping` | false | Whether the spring should be clamped and not bounce. |
| `restDisplacementThreshold` | 0.001 | Displacement from rest below which the spring is at rest. |
| `restSpeedThreshold` | 0.001 | Speed (pixels per second) at which the spring is at rest. |
| `delay` | 0 | Start after delay (ms). |
| `isInteraction` | true | Whether this animation creates an "interaction handle". |
| `useNativeDriver` | required | Uses the native driver when true. |

Properties:

| Property | Description |
|----------|-------------|
| `Value` | Standard value class for driving animations; typically `useAnimatedValue(0)` or `new Animated.Value(0)` in class components. |
| `ValueXY` | 2D value class for driving 2D animations, such as pan gestures. |
| `Interpolation` | Exported to use the Interpolation type in flow. |
| `Node` | Exported for ease of type checking. All animated values derive from this class. |
| `createAnimatedComponent` | Make any React component Animatable. Used to create `Animated.View`, etc. |
| `attachNativeEvent` | Imperative API to attach an animated value to an event on a view. Prefer `Animated.event` with `useNativeDriver: true`. |

## Notes

- Don't modify the animated value directly. Use the `useRef` Hook to return a mutable ref object whose `current` property persists throughout the component lifecycle.
- `Animated` exports the animatable components `Animated.Image`, `Animated.ScrollView`, `Animated.Text`, `Animated.View`, `Animated.FlatList`, `Animated.SectionList`. They bind animated values to properties and do targeted native updates, avoiding React render and reconciliation per frame, and clean up on unmount.
- The 0.87 docs page shows `loop(animation: CompositeAnimation[])` and `static start/stop/reset`; Animated.d.ts takes a single CompositeAnimation and defines start/stop/reset as CompositeAnimation instance methods. `loop` config also accepts `resetBeforeIteration` (default true).
- `isInteraction` / interaction handles are documented as on the 0.87 page; `InteractionManager` itself was removed in 0.87 (use `requestIdleCallback`), and the docs do not state the current effect of interaction handles.
- Using the native driver: specify `useNativeDriver: true`; see the Animations guide.
- Since 0.85: a new Shared Animation Backend powers how animations are applied for both Animated and Reanimated; per the 0.85 release blog, layout props can be animated with the native driver in Animated (experimental channel, available from 0.85.1).
- This is the React Native `Animated` API; distinct from Motion for React (motion), Jetpack Compose animation (android-compose-graphics-animation) and SwiftUI animation (apple-swiftui).

## Related

- [Animations](./animations.md)
- [Animated.Value](./animatedvalue.md)
- [Animated.ValueXY](./animatedvaluexy.md)
- [Easing](./easing.md)
- [PanResponder](./panresponder.md)
