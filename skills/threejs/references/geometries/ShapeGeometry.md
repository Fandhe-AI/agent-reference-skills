# ShapeGeometry

Creates a one-sided flat polygonal geometry from one or more `Shape` path objects. Use `ExtrudeGeometry` to add depth.

## Signature / Usage

```js
const shape = new THREE.Shape()
    .moveTo( 5, 1 )
    .absarc( 1, 1, 4, 0, Math.PI * 2, false );
const geometry = new THREE.ShapeGeometry( shape );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.DoubleSide } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `shapes` | Shape \| Shape[] | — | Shape or array of shapes to triangulate |
| `curveSegments` | number | `12` | Number of segments per shape curve |

## Notes

- Produces a flat, single-sided geometry lying in the XY plane.
- `.parameters` holds the constructor arguments; modifying it after instantiation does not update the geometry.
- `fromJSON( data, shapes )` requires both the serialized data and a shapes array for deserialization.
- Inherits from `BufferGeometry`.

## Related

- [ExtrudeGeometry](./ExtrudeGeometry.md)
- [CircleGeometry](./CircleGeometry.md)
