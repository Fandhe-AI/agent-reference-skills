# SphericalHarmonics3

Third-order spherical harmonics (SH) representation used by `LightProbe` to encode low-frequency environmental lighting. Stores 9 `Vector3` coefficients (one per color channel).

## Signature / Usage

```js
const sh = new THREE.SphericalHarmonics3();

// Evaluate radiance in a direction
const normal = new THREE.Vector3(0, 1, 0);
const color = new THREE.Vector3();
sh.getAt(normal, color); // linear RGB result in `color`

// Blend two probes
sh.lerp(otherSH, 0.5);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| coefficients | Array\<Vector3\> | Array of 9 Vector3 SH coefficients |

## Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `set(coefficients)` | SphericalHarmonics3 | Sets all 9 coefficients |
| `zero()` | SphericalHarmonics3 | Resets all coefficients to zero |
| `getAt(normal, target)` | Vector3 | Returns radiance in the given direction |
| `getIrradianceAt(normal, target)` | Vector3 | Returns irradiance (radiance convolved with cosine lobe) |
| `add(sh)` | SphericalHarmonics3 | Adds another SH in place |
| `addScaledSH(sh, s)` | SphericalHarmonics3 | Adds a scaled SH (`sh * s`) in one operation |
| `scale(s)` | SphericalHarmonics3 | Multiplies all coefficients by scalar |
| `lerp(sh, alpha)` | SphericalHarmonics3 | Linear interpolation (alpha 0–1) |
| `fromArray(array, offset?)` | SphericalHarmonics3 | Loads coefficients from a flat number array |
| `toArray(array?, offset?)` | Array\<number\> | Serializes coefficients to a flat array |
| `clone()` / `copy(sh)` | SphericalHarmonics3 | Clone or copy |

## Notes

- `getIrradianceAt` is the typical call for diffuse lighting; `getAt` gives the raw radiance.
- `SphericalHarmonics3.getBasisAt(normal, shBasis)` evaluates the 9 SH basis functions (static utility).
- See official docs: https://threejs.org/docs/#api/en/math/SphericalHarmonics3

## Related

- [Spherical.md](./Spherical.md)
- [Vector3.md](./Vector3.md)
