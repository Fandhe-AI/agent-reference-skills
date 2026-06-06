# SpotLight

Emits light from a single point in a cone shape, like a stage spotlight. Can cast shadows.

## Signature / Usage

```js
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(100, 1000, 100);
spotLight.castShadow = true;
scene.add(spotLight);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `number \| Color \| string` | `0xffffff` | The light's color |
| `intensity` | `number` | `1` | Strength in candela (cd) |
| `distance` | `number` | `0` | Maximum range; `0` = no limit |
| `angle` | `number` | `Math.PI/3` | Max angle of cone dispersion (≤ `Math.PI/2`) |
| `penumbra` | `number` | `0` | Fraction of cone edge softened [0, 1] |
| `decay` | `number` | `2` | How fast light dims with distance |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.angle` | `number` | Max cone angle in radians |
| `.decay` | `number` | Attenuation rate with distance |
| `.distance` | `number` | Cutoff range; `0` = infinite |
| `.isSpotLight` | `boolean` (readonly) | Always `true`; use for type testing |
| `.map` | `Texture` | Texture to modulate light color (cookie effect); requires `castShadow = true` |
| `.penumbra` | `number` | Cone edge softness [0, 1] |
| `.power` | `number` | Luminous power in lumens (lm); updating also changes `.intensity` |
| `.shadow` | `SpotLightShadow` | Shadow configuration |
| `.target` | `Object3D` | The point the spotlight aims at; must be added to scene to change position |

## Notes

- Direction is computed from `.position` to `.target.position`.
- Add the target to the scene to reposition it: `scene.add(spotLight.target)`.
- `.map` requires `castShadow = true` to function.
- Keep `decay` at `2` for physically correct rendering.

## Related

- [Light](./Light.md)
- [PointLight](./PointLight.md)
- [DirectionalLight](./DirectionalLight.md)
- [SpotLightHelper](../helpers/SpotLightHelper.md)
