---
source: https://reactnative.dev/docs/0.87/shadow-props
---

# Shadow Props

There are 3 sets of shadow APIs in React Native: `boxShadow`, `dropShadow` (a `filter` function) and the `shadow*` props.

## Signature / Usage

Excerpt from the official example (the values come from `useState` hooks driven by sliders):

```tsx
<View
  style={[
    styles.square,
    {
      shadowOffset: {
        width: shadowOffsetWidth,
        height: -shadowOffsetHeight,
      },
      shadowOpacity,
      shadowRadius,
    },
  ]}
/>
```

with

```tsx
const styles = StyleSheet.create({
  square: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    height: 150,
    shadowColor: 'black',
    width: 150,
  },
});
```

## Options / Props

| Name | Type | Platform | Description |
| --- | --- | --- | --- |
| `boxShadow` | see View Style Props | | See View Style Props (`boxShadow`) for documentation. |
| `dropShadow` | see View Style Props | Android | See View Style Props (`filter`) for documentation. |
| `shadowColor` | color | | Sets the drop shadow color. |
| `shadowOffset` | object: `{width: number,height: number}` | iOS | Sets the drop shadow offset. |
| `shadowOpacity` | number | iOS | Sets the drop shadow opacity (multiplied by the color's alpha component). |
| `shadowRadius` | number | iOS | Sets the drop shadow blur radius. |

## Notes

- `boxShadow`: A View style prop and a spec-compliant implementation of the web style prop of the same name.
- `dropShadow`: A specific filter function available as part of the `filter` View style prop.
- Various `shadow` props (`shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`): These map directly to their native counterparts exposed by the platform-level APIs.
- Differences between `dropShadow` and `boxShadow`:
  - `dropShadow` exists as part of `filter`, whereas `boxShadow` is a standalone style prop.
  - `dropShadow` is an alpha mask, so only pixels with a positive alpha value will "cast" a shadow. `boxShadow` will cast around the border box of the element no matter it's contents (unless it is inset).
  - `dropShadow` is only available on Android, `boxShadow` is available on iOS and Android.
  - `dropShadow` cannot be inset like `boxShadow`.
  - `dropShadow` does not have the `spreadDistance` argument like `boxShadow`.
- Both `boxShadow` and `dropShadow` are generally more capable than the `shadow` props. The `shadow` props, however, map to native platform-level APIs, so if you only need a straightforward shadow these props are recommended. Only `shadowColor` works on both Android and iOS, all other `shadow` props only work on iOS.
- `shadowColor` only works on Android API 28 and above. For similar functionality on lower Android APIs, use the `elevation` property (see View Style Props).

## Related

- [View Style Props](./view-style-props.md)
- [BoxShadowValue](./boxshadowvalue.md)
- [DropShadowValue](./dropshadowvalue.md)
