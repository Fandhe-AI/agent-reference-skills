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
| `rings` | `number` | `16` | Number of concentric rings |
| `divisions` | `number` | `64` | Number of line segments per circle ring |
| `color1` | `number \| Color \| string` | `0x444444` | First grid color |
| `color2` | `number \| Color \| string` | `0x888888` | Second grid color |

## Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `.dispose()` | `()` | Frees GPU-related resources |

## Related

- [GridHelper](./GridHelper.md)
- [AxesHelper](./AxesHelper.md)
