---
source: https://reactnative.dev/docs/0.87/gesture-responder-system
---

# Gesture Responder System

The gesture responder system manages the lifecycle of gestures in your app. A touch can go through several phases as the app determines what the user's intention is (scrolling, sliding on a widget, or tapping), and there can be multiple simultaneous touches. It lets components negotiate these touch interactions without any additional knowledge about their parent or child components.

## Signature / Usage

```text
View.props.onStartShouldSetResponder: evt => true,
View.props.onMoveShouldSetResponder: evt => true,
View.props.onResponderGrant: evt => {}
View.props.onResponderReject: evt => {}
View.props.onResponderMove: evt => {}
View.props.onResponderRelease: evt => {}
View.props.onResponderTerminationRequest: evt => true
View.props.onResponderTerminate: evt => {}
View.props.onStartShouldSetResponderCapture: evt => true,
View.props.onMoveShouldSetResponderCapture: evt => true,
```

## Options / Props

| Handler | Description |
|---------|-------------|
| `onStartShouldSetResponder` | Does this view want to become responder on the start of a touch? |
| `onMoveShouldSetResponder` | Called for every touch move on the View when it is not the responder: does this view want to "claim" touch responsiveness? |
| `onResponderGrant` | The View is now responding for touch events. This is the time to highlight and show the user what is happening. |
| `onResponderReject` | Something else is the responder right now and will not release it. |
| `onResponderMove` | The user is moving their finger. |
| `onResponderRelease` | Fired at the end of the touch, i.e. "touchUp". |
| `onResponderTerminationRequest` | Something else wants to become responder. Should this view release the responder? Returning true allows release. |
| `onResponderTerminate` | The responder has been taken from the View, by other views after `onResponderTerminationRequest`, or by the OS without asking (happens with control center / notification center on iOS). |
| `onStartShouldSetResponderCapture` / `onMoveShouldSetResponderCapture` | Capture phase: a parent that wants to prevent the child from becoming responder returns true. |

`evt` is a synthetic touch event with `nativeEvent`: `changedTouches` (array of all touch events that have changed since the last event), `identifier` (ID of the touch), `locationX` / `locationY` (position relative to the element), `pageX` / `pageY` (position relative to the root element), `target` (node id of the element receiving the touch event), `timestamp` (useful for velocity calculation), `touches` (array of all current touches on the screen).

## Notes

- Best practices: every action should have feedback/highlighting (show the user what is handling their touch and what will happen when they release) and cancel-ability (the user can abort mid-touch by dragging their finger away).
- The responder system can be complicated to use, so an abstract `Touchable` implementation is provided for things that should be "tappable". Use `TouchableHighlight` anywhere you would use a button or link on web.
- 0.87 removed the undocumented `Touchable` root export from `react-native`; the TouchableHighlight / TouchableOpacity / TouchableWithoutFeedback components remain, and Pressable is the more future-proof option.
- `onStartShouldSetResponder` and `onMoveShouldSetResponder` are called with a bubbling pattern, where the deepest node is called first, so the deepest component becomes responder when multiple Views return true. Before bubbling, the capture phase fires `on*ShouldSetResponderCapture`.
- For higher-level gesture interpretation, see PanResponder.
- 0.88: the touch responder system is unchanged by the Web-based event dispatching default, per the 0.88 release blog.

## Related

- [PanResponder](./panresponder.md)
- [Handling Touches](./handling-touches.md)
- [PressEvent](../props-types/pressevent.md)
