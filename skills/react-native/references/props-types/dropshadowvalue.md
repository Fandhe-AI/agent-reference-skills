---
source: https://reactnative.dev/docs/0.87/dropshadowvalue
---

# DropShadowValue Object Type

The `DropShadowValue` object is taken by the `filter` style prop for the `dropShadow` function. It is comprised of 2 or 3 lengths and an optional color. These values collectively define the drop shadow's color, position, and blurriness.

## Signature / Usage

```js
{
  offsetX: 10,
  offsetY: -3,
  standardDeviation: '15px',
  color: 'blue',
}
```

## Options / Props

| Name | Type | Optional | Description |
| --- | --- | --- | --- |
| `offsetX` | number \| string | No | The offset on the x-axis. This can be positive or negative. A positive value indicates right and negative indicates left. |
| `offsetY` | number \| string | No | The offset on the y-axis. This can be positive or negative. A positive value indicates up and negative indicates down. |
| `standardDeviation` | number \| string | Yes | Standard deviation used in the Gaussian blur algorithm. The larger the value the blurrier the shadow is. Only non-negative values are valid. The default is 0. |
| `color` | color | Yes | The color of the shadow. The default is `black`. |

## Notes

- Used by the `filter` style prop (see View Style Props). `dropShadow` is only supported on Android 12+.
- The docs text says a positive `offsetY` indicates up; the implementation follows the web/CSS semantics (positive `offsetY` moves the shadow down, e.g. OutsetBoxShadowDrawable offsets in y-down canvas coordinates).

## Related

- [View Style Props](./view-style-props.md)
- [Shadow Props](./shadow-props.md)
- [BoxShadowValue](./boxshadowvalue.md)
