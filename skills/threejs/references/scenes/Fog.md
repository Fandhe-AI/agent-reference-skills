# Fog

Defines linear fog that grows denser with distance from the camera. Assigned to `Scene.fog`.

## Signature / Usage

```js
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xcccccc, 10, 15);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `Color \| number` | — | The fog color |
| `near` | `number` | `1` | Distance from the camera at which fog begins |
| `far` | `number` | `1000` | Distance from the camera at which fog is fully opaque |
| `name` | `string` | `''` | Optional name for the fog instance |
| `isFog` | `boolean` (readonly) | `true` | Type-testing flag |

## Methods

- `clone()` — Returns a new `Fog` with copied values.
- `toJSON(meta)` — Serializes the fog to JSON.

## Notes

- Fog density increases linearly between `near` and `far`.
- For faster density falloff, use `FogExp2` instead.

## Related

- [FogExp2](./FogExp2.md)
- [Scene](./Scene.md)
