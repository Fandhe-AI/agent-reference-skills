# RectAreaLight

Emits light uniformly from a rectangular plane surface. Useful for simulating bright windows, monitors, or strip lighting. Does not support shadows.

## Signature / Usage

```js
// WebGLRenderer — initialize the uniform library once
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
RectAreaLightUniformsLib.init();

const rectLight = new THREE.RectAreaLight(0xffffff, 1, 10, 10);
rectLight.position.set(5, 5, 0);
rectLight.lookAt(0, 0, 0);
scene.add(rectLight);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `number \| Color \| string` | `0xffffff` | The light's color |
| `intensity` | `number` | `1` | The light's strength |
| `width` | `number` | `10` | Width of the light plane |
| `height` | `number` | `10` | Height of the light plane |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.width` | `number` | Width of the light surface |
| `.height` | `number` | Height of the light surface |
| `.power` | `number` | Luminous power in lumens (lm); changing also updates `.intensity` |
| `.isRectAreaLight` | `boolean` (readonly) | Always `true`; use for type testing |

## Notes

- No shadow support.
- Only works with `MeshStandardMaterial` and `MeshPhysicalMaterial` (PBR materials).
- Requires `RectAreaLightUniformsLib.init()` (WebGLRenderer) or `RectAreaLightTexturesLib.init()` (WebGPURenderer) before use.
- Use `.lookAt()` to aim the light plane.

## Related

- [Light](./Light.md)
- [DirectionalLight](./DirectionalLight.md)
