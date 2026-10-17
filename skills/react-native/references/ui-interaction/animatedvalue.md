---
source: https://reactnative.dev/docs/0.87/animatedvalue
---

# Animated.Value

Standard value for driving animations. One `Animated.Value` can drive multiple properties in a synchronized fashion, but can only be driven by one mechanism at a time. Using a new mechanism (e.g. starting a new animation, or calling `setValue`) will stop any previous ones.

## Signature / Usage

```tsx
const fadeAnim = useAnimatedValue(0);
// or, in class components:
const value = new Animated.Value(0);
```

## Options / Props

| Method | Signature | Description |
|--------|-----------|-------------|
| `setValue()` | `setValue(value: number)` | Directly set the value. Stops any animations running on the value and updates all bound properties. |
| `setOffset()` | `setOffset(offset: number)` | Sets an offset applied on top of whatever value is set, whether via `setValue`, an animation, or `Animated.event`. Useful for compensating things like the start of a pan gesture. |
| `flattenOffset()` | `flattenOffset()` | Merges the offset value into the base value and resets the offset to zero. The final output is unchanged. |
| `extractOffset()` | `extractOffset()` | Sets the offset value to the base value, and resets the base value to zero. The final output is unchanged. |
| `addListener()` | `addListener(callback: (state: {value: number}) => void): string` | Adds an asynchronous listener so you can observe updates from animations. Returns a string identifier. The callback receives an object with a `value` key. |
| `removeListener()` | `removeListener(id: string)` | Unregister a listener; `id` must match the identifier returned by `addListener()`. |
| `removeAllListeners()` | `removeAllListeners()` | Remove all registered listeners. |
| `stopAnimation()` | `stopAnimation(callback?: (value: number) => void)` | Stops any running animation or tracking. `callback` is invoked with the final value. |
| `resetAnimation()` | `resetAnimation(callback?: (value: number) => void)` | Stops any animation and resets the value to its original. `callback` receives the original value. |
| `interpolate()` | `interpolate(config: InterpolationConfigType)` | Interpolates the value before updating the property, e.g. mapping 0-1 to 0-10. |
| `animate()` | `animate(animation, callback)` | Typically only used internally, but could be used by a custom Animation class. |

`interpolate` config keys: `inputRange` (array of numbers), `outputRange` (array of numbers or strings), `easing` (optional, a function that returns a number given an input number), `extrapolate`, `extrapolateLeft`, `extrapolateRight` (optional, `'extend'`, `'identity'`, or `'clamp'`).

## Notes

- There is no way to synchronously read the value because it might be driven natively; use `addListener`.
- This is the React Native `Animated` API; distinct from Motion for React (motion), Jetpack Compose animation (android-compose-graphics-animation) and SwiftUI animation (apple-swiftui).

## Related

- [Animated](./animated.md)
- [Animated.ValueXY](./animatedvaluexy.md)
- [Animations](./animations.md)
