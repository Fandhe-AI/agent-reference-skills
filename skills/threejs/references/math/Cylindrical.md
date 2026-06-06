# Cylindrical

Represents a point in 3D space using cylindrical coordinates: radius (distance from origin in the x-z plane), angle theta (around the y-axis from +z), and height y.

## Signature / Usage

```js
const c = new THREE.Cylindrical(radius, theta, y);

// Convert from Cartesian
c.setFromVector3(new THREE.Vector3(1, 2, 1));

// Convert back to Cartesian
const v = new THREE.Vector3().setFromCylindrical(c);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| radius | number | 1 | Distance from origin in the x-z plane |
| theta | number | 0 | Counterclockwise angle from +z axis (radians) |
| y | number | 0 | Height above the x-z plane |

## Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `set(radius, theta, y)` | Cylindrical | Sets all three components |
| `setFromVector3(v)` | Cylindrical | Converts from a Cartesian Vector3 |
| `setFromCartesianCoords(x, y, z)` | Cylindrical | Converts from raw Cartesian coordinates |
| `clone()` / `copy(c)` | Cylindrical | Clone or copy |

## Notes

- See official docs: https://threejs.org/docs/#api/en/math/Cylindrical

## Related

- [Spherical.md](./Spherical.md)
- [Vector3.md](./Vector3.md)
