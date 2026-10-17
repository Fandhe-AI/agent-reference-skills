---
source: https://reactnative.dev/docs/0.87/boxshadowvalue
---

# BoxShadowValue Object Type

The `BoxShadowValue` object is taken by the `boxShadow` style prop. It is comprised of 2-4 lengths, an optional color, and an optional `inset` boolean. These values collectively define the box shadow's color, position, size, and blurriness.

## Signature / Usage

```js
{
  offsetX: 10,
  offsetY: -3,
  blurRadius: '15px',
  spreadDistance: '10px',
  color: 'red',
  inset: true,
}
```

## Options / Props

| Name | Type | Optional | Description |
| --- | --- | --- | --- |
| `offsetX` | number \| string | No | The offset on the x-axis. This can be positive or negative. A positive value indicates right and negative indicates left. |
| `offsetY` | number \| string | No | The offset on the y-axis. This can be positive or negative. A positive value indicates up and negative indicates down. |
| `blurRadius` | number \| string | Yes | Radius used in the Gaussian blur algorithm. The larger the value the blurrier the shadow is. Only non-negative values are valid. The default is 0. |
| `spreadDistance` | number \| string | Yes | How much larger or smaller the shadow grows or shrinks. A positive value will grow the shadow, a negative value will shrink the shadow. |
| `color` | color | Yes | The color of the shadow. The default is `black`. |
| `inset` | boolean | Yes | Whether the shadow is inset or not. Inset shadows will appear around the inside of the element's border box as opposed to the outside. |

## Notes

- Used by the `boxShadow` style prop (see View Style Props).
- The docs text says a positive `offsetY` indicates up; the implementation follows the web/CSS semantics (positive `offsetY` moves the shadow down, e.g. OutsetBoxShadowDrawable offsets in y-down canvas coordinates).

## Related

- [View Style Props](./view-style-props.md)
- [Shadow Props](./shadow-props.md)
- [DropShadowValue](./dropshadowvalue.md)
