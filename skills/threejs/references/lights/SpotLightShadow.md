# SpotLightShadow

Represents the shadow configuration of a `SpotLight`. Extends `LightShadow`.

## Signature / Usage

```js
const light = new THREE.SpotLight(0xffffff);
light.castShadow = true;

// light.shadow is a SpotLightShadow instance
light.shadow.focus = 1;
light.shadow.aspect = 1;
```

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `.aspect` | `number` | `1` | Texture aspect ratio |
| `.focus` | `number` | `1` | Focuses the shadow camera; the shadow camera's field of view is set as a percentage of the spotlight's field of view, in range `[0, 1]` |
| `.isSpotLightShadow` | `boolean` (readonly) | `true` | Always `true`; use for type testing |

## Notes

- Takes no constructor parameters; created automatically as `SpotLight.shadow`.
- `.camera`, `.mapSize`, `.bias`, and `.radius` are inherited from the base `LightShadow` class.

## Related

- [SpotLight](./SpotLight.md)
- [DirectionalLightShadow](./DirectionalLightShadow.md)
