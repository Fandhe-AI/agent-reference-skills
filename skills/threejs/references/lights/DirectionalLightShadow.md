# DirectionalLightShadow

Represents the shadow configuration of a `DirectionalLight`. Extends `LightShadow`.

## Signature / Usage

```js
const light = new THREE.DirectionalLight(0xffffff, 1);
light.castShadow = true;

// light.shadow is a DirectionalLightShadow instance
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;
```

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.isDirectionalLightShadow` | `boolean` (readonly) | Always `true`; use for type testing |

## Notes

- Takes no constructor parameters; created automatically as `DirectionalLight.shadow`.
- Shadow camera frustum (`.camera.near/far/left/right/top/bottom`), `.mapSize`, `.bias`, and `.radius` are inherited from the base `LightShadow` class.

## Related

- [DirectionalLight](./DirectionalLight.md)
- [SpotLightShadow](./SpotLightShadow.md)
