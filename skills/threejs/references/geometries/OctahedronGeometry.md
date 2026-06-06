# OctahedronGeometry

A geometry for an octahedron — a polyhedron with 8 equilateral triangular faces. Setting `detail > 0` subdivides faces to approximate a sphere.

## Signature / Usage

```js
const geometry = new THREE.OctahedronGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const octahedron = new THREE.Mesh( geometry, material );
scene.add( octahedron );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `radius` | number | `1` | Radius of the octahedron |
| `detail` | number | `0` | Subdivision level; values > 0 add vertices and round the shape |

## Notes

- Inherits from `PolyhedronGeometry` (EventDispatcher → BufferGeometry → PolyhedronGeometry → OctahedronGeometry).
- `.parameters` holds the constructor arguments; modifying it after instantiation does not update the geometry.
- Use `OctahedronGeometry.fromJSON( data )` to deserialize.

## Related

- [PolyhedronGeometry](./PolyhedronGeometry.md)
- [IcosahedronGeometry](./IcosahedronGeometry.md)
- [DodecahedronGeometry](./DodecahedronGeometry.md)
- [TetrahedronGeometry](./TetrahedronGeometry.md)
