---
source: https://reactnative.dev/docs/0.87/panresponder
---

# PanResponder

`PanResponder` reconciles several touches into a single gesture. It makes single-touch gestures resilient to extra touches, and can be used to recognize basic multi-touch gestures. By default, `PanResponder` holds an interaction handle to block long-running JS events from interrupting active gestures.

## Signature / Usage

```tsx
const ExampleComponent = () => {
  const panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) =>
        true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
        true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) =>
        true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    }),
  ).current;

  return <View {...panResponder.panHandlers} />;
};
```

## Options / Props

`create()`:

```tsx
static create(config: PanResponderCallbacks): PanResponderInstance;
```

| Name | Type | Required | Description |
|------|------|----------|-------------|
| config | object | Yes | Enhanced versions of all the responder callbacks, replacing the word `Responder` with `PanResponder`; each receives the `PressEvent` and the `gestureState`. |

`config` callbacks: `onMoveShouldSetPanResponder`, `onMoveShouldSetPanResponderCapture`, `onStartShouldSetPanResponder`, `onStartShouldSetPanResponderCapture`, `onPanResponderReject`, `onPanResponderGrant`, `onPanResponderStart`, `onPanResponderEnd`, `onPanResponderRelease`, `onPanResponderMove`, `onPanResponderTerminate`, `onPanResponderTerminationRequest`, `onShouldBlockNativeResponder` — all `(e, gestureState) => {...}`.

`gestureState` fields:

| Field | Description |
|-------|-------------|
| `stateID` | ID of the gestureState, persisted as long as there's at least one touch on screen |
| `moveX`, `moveY` | the latest screen coordinates of the recently-moved touch |
| `x0`, `y0` | the screen coordinates of the responder grant |
| `dx`, `dy` | accumulated distance of the gesture since the touch started |
| `vx`, `vy` | current velocity of the gesture |
| `numberActiveTouches` | Number of touches currently on screen |

## Notes

- Interaction handles are documented as on the 0.87 page; `InteractionManager` itself was removed in 0.87 (use `requestIdleCallback`), and the docs do not state the current effect of interaction handles.
- It provides a predictable wrapper of the responder handlers provided by the gesture responder system. For each handler, it provides a new `gestureState` object alongside the native event object (`onPanResponderMove: (event, gestureState) => {}`). A native event is a synthetic touch event of the form `PressEvent`.
- In general, for events that have capture equivalents, the gestureState is updated once in the capture phase and can be used in the bubble phase as well.
- Be careful with `onStartShould*` callbacks. They only reflect updated `gestureState` for start/end events that bubble/capture to the Node. Once the node is the responder, every start/end event is processed by the gesture and `gestureState` is updated accordingly. `numberActiveTouches` may not be totally accurate unless you are the responder.
- `Animated.event` with `useNativeDriver: true` does not work with `PanResponder` because native `Animated.event` supports direct events only; see Animations.

## Related

- [Gesture Responder System](./gesture-responder-system.md)
- [Animated.ValueXY](./animatedvaluexy.md)
- [PressEvent](../props-types/pressevent.md)
