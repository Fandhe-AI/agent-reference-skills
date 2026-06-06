# ArrowHelper

A 3D arrow object for visualizing directions. Composed of a line and a cone head.

## Signature / Usage

```js
const dir = new THREE.Vector3(1, 2, 0).normalize();
const origin = new THREE.Vector3(0, 0, 0);
const arrowHelper = new THREE.ArrowHelper(dir, origin, 1, 0xffff00);
scene.add(arrowHelper);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `dir` | `Vector3` | `(0,0,1)` | Normalized direction vector |
| `origin` | `Vector3` | `(0,0,0)` | Starting point of the arrow |
| `length` | `number` | `1` | Total length in world units |
| `color` | `number \| Color \| string` | `0xffff00` | Arrow color |
| `headLength` | `number` | `length * 0.2` | Length of the arrowhead |
| `headWidth` | `number` | `headLength * 0.2` | Width of the arrowhead |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.cone` | `Mesh` | The cone (arrowhead) part |
| `.line` | `Line` | The line (shaft) part |

## Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `.setColor()` | `(color)` | Sets the color of the arrow |
| `.setDirection()` | `(dir: Vector3)` | Sets the direction (must be normalized) |
| `.setLength()` | `(length, headLength?, headWidth?)` | Updates the arrow length and head dimensions |
| `.dispose()` | `()` | Frees GPU-related resources |

## Related

- [AxesHelper](./AxesHelper.md)
