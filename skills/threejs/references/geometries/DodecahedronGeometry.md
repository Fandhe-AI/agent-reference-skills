# DodecahedronGeometry

A geometry for a dodecahedron — a polyhedron with 12 pentagonal faces. Setting `detail > 0` subdivides the faces to approximate a sphere.

## Signature / Usage

```js
const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const dodecahedron = new THREE.Mesh( geometry, material );
scene.add( dodecahedron );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `radius` | number | `1` | Radius of the dodecahedron |
| `detail` | number | `0` | Subdivision level; values > 0 add vertices and round the shape |

## Notes

- Inherits from `PolyhedronGeometry` (EventDispatcher → BufferGeometry → PolyhedronGeometry → DodecahedronGeometry).
- `.parameters` holds the constructor arguments; modifying it after instantiation does not update the geometry.
- Use `DodecahedronGeometry.fromJSON( data )` to deserialize.

## Related

- [PolyhedronGeometry](./PolyhedronGeometry.md)
- [IcosahedronGeometry](./IcosahedronGeometry.md)
- [OctahedronGeometry](./OctahedronGeometry.md)
- [TetrahedronGeometry](./TetrahedronGeometry.md)
