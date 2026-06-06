# IcosahedronGeometry

A geometry for an icosahedron — a polyhedron with 20 equilateral triangular faces. Setting `detail > 0` subdivides faces to approximate a sphere.

## Signature / Usage

```js
const geometry = new THREE.IcosahedronGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const icosahedron = new THREE.Mesh( geometry, material );
scene.add( icosahedron );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `radius` | number | `1` | Radius of the icosahedron |
| `detail` | number | `0` | Subdivision level; values > 0 add vertices and round the shape |

## Notes

- Inherits from `PolyhedronGeometry` (EventDispatcher → BufferGeometry → PolyhedronGeometry → IcosahedronGeometry).
- `.parameters` holds the constructor arguments; modifying it after instantiation does not update the geometry.
- Use `IcosahedronGeometry.fromJSON( data )` to deserialize.

## Related

- [PolyhedronGeometry](./PolyhedronGeometry.md)
- [DodecahedronGeometry](./DodecahedronGeometry.md)
- [OctahedronGeometry](./OctahedronGeometry.md)
- [TetrahedronGeometry](./TetrahedronGeometry.md)
