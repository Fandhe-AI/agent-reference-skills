# Spherical

Represents a point in 3D space using spherical coordinates: radius, polar angle phi (from the y-up axis), and azimuthal angle theta (around the y-up axis).

## Signature / Usage

```js
const s = new THREE.Spherical(radius, phi, theta);

// Convert from Cartesian
s.setFromVector3(new THREE.Vector3(1, 1, 1));

// Convert back to Cartesian
const v = new THREE.Vector3().setFromSpherical(s);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| radius | number | 1 | Distance from origin |
| phi | number | 0 | Polar angle from y-axis (radians, 0 to π) |
| theta | number | 0 | Azimuthal angle around y-axis (radians) |

## Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `set(radius, phi, theta)` | Spherical | Sets all three components |
| `setFromVector3(v)` | Spherical | Converts from Cartesian Vector3 |
| `setFromCartesianCoords(x, y, z)` | Spherical | Converts from raw Cartesian coordinates |
| `makeSafe()` | Spherical | Clamps `phi` away from 0 and π to avoid poles |
| `clone()` / `copy(s)` | Spherical | Clone or copy |

## Notes

- phi = 0 points toward +y; phi = π points toward -y.
- Call `makeSafe()` when phi may reach 0 or π to prevent degenerate orientations (e.g. in camera controls).
- See official docs: https://threejs.org/docs/#api/en/math/Spherical

## Related

- [Cylindrical.md](./Cylindrical.md)
- [Vector3.md](./Vector3.md)
