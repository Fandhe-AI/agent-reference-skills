# BoxHelper

Displays the world-axis-aligned bounding box of a 3D object as a wireframe. Automatically resizes on `.update()`.

## Signature / Usage

```js
const object = new THREE.Mesh(geometry, material);
const boxHelper = new THREE.BoxHelper(object, 0xffff00);
scene.add(boxHelper);

// Update if the object moves or changes
boxHelper.update();
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `object` | `Object3D` | — | The 3D object to wrap with a bounding box |
| `color` | `number \| Color \| string` | `0xffff00` | Wireframe color |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.object` | `Object3D` | The object being visualized |

## Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `.update()` | `()` | Recalculates the bounding box to match the current object geometry and children |
| `.setFromObject()` | `(object: Object3D) → BoxHelper` | Resets the helper to wrap a different object |
| `.dispose()` | `()` | Frees GPU-related resources |

## Notes

- Requires the object to have geometry; does not work with sprites.
- Call `.update()` each frame if the object is animated or transformed.

## Related

- [Box3Helper](./Box3Helper.md)
- [AxesHelper](./AxesHelper.md)
