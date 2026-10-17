---
source: https://reactnative.dev/docs/0.87/animatedvaluexy
---

# Animated.ValueXY

2D Value for driving 2D animations, such as pan gestures. Almost identical API to normal `Animated.Value`, but multiplexed. Contains two regular `Animated.Value`s under the hood.

## Signature / Usage

```tsx
const pan = useRef(new Animated.ValueXY()).current;

const panResponder = PanResponder.create({
  onStartShouldSetPanResponder: () => true,
  onPanResponderMove: Animated.event(
    [
      null,
      {
        dx: pan.x, // x,y are Animated.Value
        dy: pan.y,
      },
    ],
    {useNativeDriver: false},
  ),
  onPanResponderRelease: () => {
    Animated.spring(
      pan, // Auto-multiplexed
      {toValue: {x: 0, y: 0}, useNativeDriver: false}, // Back to zero
    ).start();
  },
});

<Animated.View
  {...panResponder.panHandlers}
  style={[pan.getLayout(), styles.box]}
/>
```

## Options / Props

| Method | Signature | Description |
|--------|-----------|-------------|
| `setValue()` | `setValue(value: {x: number; y: number})` | Directly set the value. Stops any animations running on the value and updates all bound properties. |
| `setOffset()` | `setOffset(offset: {x: number; y: number})` | Sets an offset applied on top of whatever value is set. Useful for compensating things like the start of a pan gesture. |
| `flattenOffset()` | `flattenOffset()` | Merges the offset value into the base value and resets the offset to zero. |
| `extractOffset()` | `extractOffset()` | Sets the offset value to the base value, and resets the base value to zero. |
| `addListener()` | `addListener(callback: (value: {x: number; y: number}) => void)` | Adds an asynchronous listener. Returns a string identifier. |
| `removeListener()` | `removeListener(id: string)` | Unregister a listener by the identifier returned from `addListener()`. |
| `removeAllListeners()` | `removeAllListeners()` | Remove all registered listeners. |
| `stopAnimation()` | `stopAnimation(callback?: (value: {x: number; y: number}) => void)` | Stops any running animation or tracking; `callback` receives the final value. |
| `resetAnimation()` | `resetAnimation(callback?: (value: {x: number; y: number}) => void)` | Stops any animation and resets the value to its original. |
| `getLayout()` | `getLayout(): {left: Animated.Value, top: Animated.Value}` | Converts `{x, y}` into `{left, top}` for use in style, e.g. `style={this.state.anim.getLayout()}`. |
| `getTranslateTransform()` | `getTranslateTransform(): [{translateX: Animated.Value}, {translateY: Animated.Value}]` | Converts `{x, y}` into a useable translation transform, e.g. `style={{transform: this.state.anim.getTranslateTransform()}}`. |

## Notes

- `ValueXY` is a handy way to deal with 2D interactions, such as panning or dragging; it is a drop-in replacement for `Value` in many cases.
- The 0.87 docs example uses `useNativeDriver: true` for the spring; `getLayout()` binds `left`/`top`, which the native driver only accepts with the experimental Shared Animation Backend, so this page uses `false`.
- This is the React Native `Animated` API; distinct from Motion for React (motion), Jetpack Compose animation (android-compose-graphics-animation) and SwiftUI animation (apple-swiftui).

## Related

- [Animated](./animated.md)
- [Animated.Value](./animatedvalue.md)
- [PanResponder](./panresponder.md)
