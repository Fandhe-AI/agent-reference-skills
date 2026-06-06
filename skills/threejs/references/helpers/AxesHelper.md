# AxesHelper

Displays the three coordinate axes as colored lines: X = red, Y = green, Z = blue.

## Signature / Usage

```js
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `1` | Length of each axis line |

## Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `.setColors()` | `(xColor, yColor, zColor) → AxesHelper` | Override the default axis colors; returns `this` |
| `.dispose()` | `()` | Frees GPU-related resources |

## Notes

- Default colors: X = `0xff0000` (red), Y = `0x00ff00` (green), Z = `0x0000ff` (blue).

## Related

- [ArrowHelper](./ArrowHelper.md)
- [GridHelper](./GridHelper.md)
