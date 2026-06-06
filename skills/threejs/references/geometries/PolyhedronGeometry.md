# PolyhedronGeometry

Base class for polyhedral geometry. Takes flat arrays of vertices and face indices, projects them onto a sphere, and subdivides to the desired detail level. Used by `DodecahedronGeometry`, `IcosahedronGeometry`, `OctahedronGeometry`, and `TetrahedronGeometry`.

## Signature / Usage

```js
const vertices = [
    1, 1, 1,   -1, -1, 1,   -1, 1, -1,   1, -1, -1
];
const indices = [
    2, 1, 0,   0, 3, 2,   1, 3, 0,   2, 3, 1
];
const geometry = new THREE.PolyhedronGeometry( vertices, indices, 6, 2 );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `vertices` | number[] | — | Flat array of vertex positions (x, y, z triplets) |
| `indices` | number[] | — | Flat array of face indices (triplets referencing the vertices array) |
| `radius` | number | `1` | Radius to project vertices onto |
| `detail` | number | `0` | Subdivision level; higher values add more vertices and smooth the surface |

## Notes

- After construction all vertices are projected onto a sphere of the given `radius`.
- Inherits from `BufferGeometry`.
- `.parameters` holds the constructor arguments; modifying it after instantiation does not update the geometry.
- Use `PolyhedronGeometry.fromJSON( data )` to deserialize.

## Related

- [DodecahedronGeometry](./DodecahedronGeometry.md)
- [IcosahedronGeometry](./IcosahedronGeometry.md)
- [OctahedronGeometry](./OctahedronGeometry.md)
- [TetrahedronGeometry](./TetrahedronGeometry.md)
