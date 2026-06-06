# Layers

Controls which of 32 layers (0–31) an object or camera belongs to using a bitmask. An object is visible to a camera only when they share at least one layer.

All `Object3D` instances expose a `layers` property of this type.

## Signature / Usage

```js
// Camera: see only layers 0 and 1
camera.layers.enable(1);

// Object: place on layer 1 only
mesh.layers.set(1);

// Object: visible on both layer 0 and 2
mesh.layers.enable(0);
mesh.layers.enable(2);
```

## Constructor

```js
new Layers()
```

Initializes with membership set to layer `0` only.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `mask` | number | Bitmask of active layers |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `set(layer)` | void | Set membership to `layer` only (clears all others) |
| `enable(layer)` | void | Add membership of `layer` |
| `enableAll()` | void | Add membership to all 32 layers |
| `disable(layer)` | void | Remove membership of `layer` |
| `disableAll()` | void | Remove membership from all layers |
| `toggle(layer)` | void | Toggle membership of `layer` |
| `isEnabled(layer)` | boolean | `true` if `layer` is enabled |
| `test(layers)` | boolean | `true` if this and `layers` share at least one layer |

## Notes

- Layers are 0-indexed; valid range is `0` to `31`.
- The default state (layer 0 only) means objects and cameras are always visible to each other unless layers are explicitly changed.
- `Raycaster.layers` uses the same mechanism to filter which objects are tested.

## Related

- [Object3D](./Object3D.md)
- [Raycaster](./Raycaster.md)
