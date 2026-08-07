# PointLightShadow

Represents the shadow configuration of a `PointLight`. Extends `LightShadow`.

## Signature / Usage

```js
const light = new THREE.PointLight(0xffffff, 1, 100);
light.castShadow = true;

// light.shadow is a PointLightShadow instance
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;
```

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.isPointLightShadow` | `boolean` (readonly) | Always `true`; use for type testing |

## Notes

- Takes no constructor parameters; created automatically as `PointLight.shadow`.
- Internally renders a cube shadow map (six faces); frustum and map size settings are inherited from the base `LightShadow` class.

## Related

- [PointLight](./PointLight.md)
- [DirectionalLightShadow](./DirectionalLightShadow.md)
