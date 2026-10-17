---
source: https://reactnative.dev/docs/0.87/pressevent
---

# PressEvent Object Type

`PressEvent` object is returned in the callback as a result of user press interaction, for example `onPress` in `Button` component.

## Signature / Usage

```js
{
    changedTouches: [PressEvent],
    identifier: 1,
    locationX: 8,
    locationY: 4.5,
    pageX: 24,
    pageY: 49.5,
    target: 1127,
    timestamp: 85131876.58868201,
    touches: []
}
```

## Options / Props

| Name | Type | Optional | Platform | Description |
| --- | --- | --- | --- | --- |
| `changedTouches` | array of PressEvents | No | | Array of all PressEvents that have changed since the last event. |
| `force` | number | Yes | iOS | Amount of force used during the 3D Touch press. Returns the float value in range from `0.0` to `1.0`. |
| `identifier` | number | No | | Unique numeric identifier assigned to the event. |
| `locationX` | number | No | | Touch origin X coordinate inside touchable area (relative to the element). |
| `locationY` | number | No | | Touch origin Y coordinate inside touchable area (relative to the element). |
| `pageX` | number | No | | Touch origin X coordinate on the screen (relative to the root view). |
| `pageY` | number | No | | Touch origin Y coordinate on the screen (relative to the root view). |
| `target` | number, `null`, `undefined` | No | | The node id of the element receiving the PressEvent. |
| `timestamp` | number | No | | Timestamp value when a PressEvent occurred. Value is represented in milliseconds. |
| `touches` | array of PressEvents | No | | Array of all current PressEvents on the screen. |

## Notes

- Used by `Button`, `PanResponder`, `Pressable`, `ScrollView`, `Text`, `TextInput`, `TouchableHighlight`, `TouchableOpacity`, `TouchableNativeFeedback`, `TouchableWithoutFeedback`, `View`.
- 0.88: Event dispatching now goes through the W3C `EventTarget` API by default. The 0.88 release blog states that event props keep the same names, receive the same synthetic event objects (`nativeEvent`, `persist()` and the rest) and run in the same order, and that the touch responder system is unchanged.

## Related

- [LayoutEvent](./layoutevent.md)
- [TargetEvent](./targetevent.md)
- [Button](../components/button.md)
- [Pressable](../components/pressable.md)
