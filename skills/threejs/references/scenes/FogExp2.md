# FogExp2

Defines exponential-squared fog — clear near the camera, densifying quickly with distance. Assigned to `Scene.fog`.

## Signature / Usage

```js
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xcccccc, 0.002);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `Color \| number` | — | The fog color |
| `density` | `number` | `0.00025` | Rate at which fog densifies; higher values produce thicker fog |
| `name` | `string` | `''` | Optional name for the fog instance |
| `isFogExp2` | `boolean` (readonly) | `true` | Type-testing flag |

## Methods

- `clone()` — Returns a new `FogExp2` with copied values.
- `toJSON(meta?)` — Serializes the fog to JSON.

## Notes

- Unlike `Fog`, there is no `near`/`far` range — fog starts from the camera and grows based on `density`.
- Provides a more natural appearance than linear fog for outdoor environments.

## Related

- [Fog](./Fog.md)
- [Scene](./Scene.md)
