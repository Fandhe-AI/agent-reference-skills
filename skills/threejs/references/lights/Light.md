# Light

Abstract base class for all light types in Three.js. Provides the foundational `color` and `intensity` properties inherited by all concrete light implementations.

## Signature / Usage

```js
// Cannot be instantiated directly — use a concrete subclass:
const light = new THREE.DirectionalLight(0xffffff, 1);
scene.add(light);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `number \| Color \| string` | `0xffffff` | Constructor parameter: the light's color |
| `intensity` | `number` | `1` | Constructor parameter: the light's strength |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.color` | `Color` | The light's color |
| `.intensity` | `number` | The light's intensity/strength |
| `.isLight` | `boolean` (readonly) | Always `true`; use for type testing |

## Methods

| Name | Description |
|------|-------------|
| `.dispose()` | Frees GPU-related resources. Call when the light is no longer needed |

## Notes

- `Light` is abstract and cannot be instantiated directly.
- Always call `.dispose()` when removing a light from the scene to prevent memory leaks.
- Inherits from `Object3D` — supports `.position`, `.rotation`, `.add()`, etc.

## Related

- [AmbientLight](./AmbientLight.md)
- [DirectionalLight](./DirectionalLight.md)
- [PointLight](./PointLight.md)
- [SpotLight](./SpotLight.md)
- [HemisphereLight](./HemisphereLight.md)
- [RectAreaLight](./RectAreaLight.md)
- [LightProbe](./LightProbe.md)
