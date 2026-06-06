# Scene

A container that holds all 3D objects, lights, fog, and background settings to be rendered. Inherits from `Object3D`.

## Signature / Usage

```js
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
scene.add(mesh);
renderer.render(scene, camera);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `background` | `Color \| Texture \| null` | `null` | Scene background — accepts a uniform color, flat texture, cube texture, or equirectangular texture (skybox) |
| `backgroundBlurriness` | `number` | `0` | Blurriness of the background (0–1). Only affects environment maps assigned to `background` |
| `backgroundIntensity` | `number` | `1` | Attenuates background texture color |
| `backgroundRotation` | `Euler` | `(0,0,0)` | Rotation of background in radians (environment maps only) |
| `environment` | `Texture \| null` | `null` | Environment map applied to all physical materials in the scene; cannot overwrite an existing `envMap` material property |
| `environmentIntensity` | `number` | `1` | Attenuates the environment map color |
| `environmentRotation` | `Euler` | `(0,0,0)` | Rotation of the environment map in radians (physical materials) |
| `fog` | `Fog \| FogExp2 \| null` | `null` | Fog definition affecting all rendered objects |
| `isScene` | `boolean` (readonly) | `true` | Type-testing flag |
| `overrideMaterial` | `Material \| null` | `null` | Forces all objects to render with this material; excluded per-object via `Material#allowOverride = false` |

## Notes

- Scene inherits all `Object3D` methods such as `add()`, `remove()`, and `getObjectByName()`.
- Setting `environment` does not override a material's own `envMap` property.

## Related

- [Fog](./Fog.md)
- [FogExp2](./FogExp2.md)
