---
source: https://reactnative.dev/docs/0.87/targetevent
---

# TargetEvent Object Type

`TargetEvent` object is returned in the callback as a result of focus change, for example `onFocus` or `onBlur` in the `TextInput` component.

## Signature / Usage

```js
{
    target: 1127
}
```

## Options / Props

| Name | Type | Optional | Description |
| --- | --- | --- | --- |
| `target` | number, `null`, `undefined` | No | The node id of the element receiving the TargetEvent. |

## Notes

- Used by `TextInput`, `TouchableWithoutFeedback`.

## Related

- [TextInput](../components/textinput.md)
- [LayoutEvent](./layoutevent.md)
- [PressEvent](./pressevent.md)
