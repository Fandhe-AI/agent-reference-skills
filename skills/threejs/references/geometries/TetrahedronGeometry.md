# TetrahedronGeometry

A geometry for a tetrahedron — a polyhedron with 4 equilateral triangular faces. Setting `detail > 0` subdivides faces to approximate a sphere.

## Signature / Usage

```js
const geometry = new THREE.TetrahedronGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const tetrahedron = new THREE.Mesh( geometry, material );
scene.add( tetrahedron );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `radius` | number | `1` | Radius of the tetrahedron |
| `detail` | number | `0` | Subdivision level; values > 0 add vertices and round the shape |

## Notes

- Inherits from `PolyhedronGeometry` (EventDispatcher → BufferGeometry → PolyhedronGeometry → TetrahedronGeometry).
- `.parameters` holds the constructor arguments; modifying it after instantiation does not update the geometry.
- Use `TetrahedronGeometry.fromJSON( data )` to deserialize.

## Related

- [PolyhedronGeometry](./PolyhedronGeometry.md)
- [IcosahedronGeometry](./IcosahedronGeometry.md)
- [OctahedronGeometry](./OctahedronGeometry.md)
- [DodecahedronGeometry](./DodecahedronGeometry.md)
