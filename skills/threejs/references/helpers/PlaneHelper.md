# PlaneHelper

Visualizes a mathematical `Plane` object as a grid of lines in 3D space.

## Signature / Usage

```js
const plane = new THREE.Plane(new THREE.Vector3(1, 1, 0.2), 3);
const helper = new THREE.PlaneHelper(plane, 1, 0xffff00);
scene.add(helper);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `plane` | `Plane` | — | The mathematical plane to visualize |
| `size` | `number` | `1` | Side length of the plane helper |
| `hex` | `number \| Color \| string` | `0xffff00` | Helper color |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.plane` | `Plane` | The plane being visualized |
| `.size` | `number` | The side length of the helper |

## Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `.dispose()` | `()` | Frees GPU-related resources |

## Related

- [Box3Helper](./Box3Helper.md)
- [AxesHelper](./AxesHelper.md)
