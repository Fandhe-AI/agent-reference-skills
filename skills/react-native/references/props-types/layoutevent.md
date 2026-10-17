---
source: https://reactnative.dev/docs/0.87/layoutevent
---

# LayoutEvent Object Type

`LayoutEvent` object is returned in the callback as a result of component layout change, for example `onLayout` in `View` component.

## Signature / Usage

```js
{
    layout: {
        width: 520,
        height: 70.5,
        x: 0,
        y: 42.5
    },
    target: 1127
}
```

## Options / Props

| Name | Type | Optional | Description |
| --- | --- | --- | --- |
| `height` | number | No | Height of the component after the layout changes. |
| `width` | number | No | Width of the component after the layout changes. |
| `x` | number | No | Component X coordinate inside the parent component. |
| `y` | number | No | Component Y coordinate inside the parent component. |
| `target` | number, `null`, `undefined` | No | The node id of the element receiving the LayoutEvent. |

## Notes

- Used by `Image`, `Pressable`, `ScrollView`, `Text`, `TextInput`, `TouchableWithoutFeedback`, `View`.
- In the example, `height`, `width`, `x` and `y` are nested under `layout`.

## Related

- [View](../components/view.md)
- [PressEvent](./pressevent.md)
- [TargetEvent](./targetevent.md)
