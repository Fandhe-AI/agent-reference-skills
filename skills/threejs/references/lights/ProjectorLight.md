# ProjectorLight

A projector light version of `SpotLight`. Can only be used with `WebGPURenderer`.

## Signature / Usage

```js
const light = new THREE.ProjectorLight(0xffffff, 1);
light.map = projectionTexture;
scene.add(light);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `number \| Color \| string` | `0xffffff` | The light's color |
| `intensity` | `number` | `1` | Strength/intensity in candela (cd) |
| `distance` | `number` | `0` | Maximum range of the light; `0` means no limit |
| `angle` | `number` | `Math.PI/3` | Maximum angle of light dispersion from its direction (upper bound `Math.PI/2`) |
| `penumbra` | `number` | `0` | Percent of the spotlight cone attenuated due to penumbra, range `[0, 1]` |
| `decay` | `number` | `2` | Amount the light dims along the distance of the light |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `.aspect` | `number` | `null` | Aspect ratio of the light; set to `null` to use the texture's aspect ratio |

## Notes

- Inheritance chain: `EventDispatcher` → `Object3D` → `Light` → `SpotLight` → `ProjectorLight`.
- WebGPU only: requires `WebGPURenderer`; not usable with `WebGLRenderer`.

## Related

- [SpotLight](./SpotLight.md)
- [IESSpotLight](./IESSpotLight.md)
