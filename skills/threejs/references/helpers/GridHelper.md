# GridHelper

Displays a 2D grid of lines centered at the origin, useful as a ground-plane reference.

## Signature / Usage

```js
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `10` | Total size of the grid |
| `divisions` | `number` | `10` | Number of grid divisions on each side |
| `color1` | `number \| Color \| string` | `0x444444` | Color of the center lines |
| `color2` | `number \| Color \| string` | `0x888888` | Color of the regular grid lines |

## Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `.dispose()` | `()` | Frees GPU-related resources |

## Related

- [PolarGridHelper](./PolarGridHelper.md)
- [AxesHelper](./AxesHelper.md)
