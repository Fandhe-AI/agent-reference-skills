# Color

Represents an RGB color in the linear working color space (`LinearSRGBColorSpace`). Inputs from sRGB sources (hex literals, CSS strings) are automatically converted.

## Signature / Usage

```js
// Multiple constructor forms
const c1 = new THREE.Color(0xff0000);          // hex integer
const c2 = new THREE.Color('rgb(255,0,0)');    // CSS string
const c3 = new THREE.Color('skyblue');         // X11 name
const c4 = new THREE.Color('hsl(0,100%,50%)'); // HSL string
const c5 = new THREE.Color(1, 0, 0);           // r, g, b floats (0–1)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| r | number | 1 | Red channel (0–1, linear) |
| g | number | 1 | Green channel (0–1, linear) |
| b | number | 1 | Blue channel (0–1, linear) |

## Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `set(r, g, b)` | Color | General setter; accepts same forms as constructor |
| `setHex(hex, colorSpace?)` | Color | Sets from a hexadecimal integer |
| `setRGB(r, g, b, colorSpace?)` | Color | Sets from float RGB values |
| `setHSL(h, s, l, colorSpace?)` | Color | Sets from HSL values |
| `getHex(colorSpace?)` | number | Returns color as a hex integer |
| `getHexString(colorSpace?)` | string | Returns color as a hex string (e.g. `"ff0000"`) |
| `getHSL(target, colorSpace?)` | Object | Returns `{h, s, l}` object |
| `lerp(color, alpha)` | Color | Linear interpolation in RGB space |
| `lerpHSL(color, alpha)` | Color | Interpolation through hue space |
| `add(color)` / `multiply(color)` | Color | Component-wise add or multiply |
| `convertSRGBToLinear()` / `convertLinearToSRGB()` | Color | Color-space conversion in place |
| `clone()` / `copy(color)` | Color | Clone or copy |
| `equals(c)` | boolean | Equality test |

## Notes

- Default constructor produces white `(1, 1, 1)`.
- Three.js color management (`THREE.ColorManagement`) is enabled by default; disable it only when you need legacy behavior.
- `lerpHSL` produces more perceptually natural transitions than `lerp`.
- See official docs for full method list: https://threejs.org/docs/#api/en/math/Color

## Related

- [MathUtils.md](./MathUtils.md)
