# PolarGridHelper

Displays a polar (circular) grid of lines for visualizing scenes in polar coordinates.

## Signature / Usage

```js
const helper = new THREE.PolarGridHelper(10, 16, 8, 64);
scene.add(helper);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `radius` | `number` | `10` | Radius of the polar grid |
| `sectors` | `number` | `16` | Number of radial sectors |
| `rings` | `number` | `8` | Number of concentric rings |
| `divisions` | `number` | `64` | Number of line segments per circle ring |
| `color1` | `number \| Color \| string` | `0x444444` | First grid color |
| `color2` | `number \| Color \| string` | `0x888888` | Second grid color |

## Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `.dispose()` | `()` | Frees GPU-related resources |

## Notes

- Corrected from the JSDoc: the `rings` default is `8` (the r186 JSDoc and this page said `16`; the signature default is `8`).
- Source: https://threejs.org/docs/pages/PolarGridHelper.html (three.js r187, `src/helpers/PolarGridHelper.js`; JSDoc from tag r187 / commit 7e89746)

## Related

- [GridHelper](./GridHelper.md)
- [AxesHelper](./AxesHelper.md)
