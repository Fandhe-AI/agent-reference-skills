# CircleGeometry

A flat 2D circle (disk) built from triangular segments radiating from a central point. Can also represent a partial sector.

## Signature / Usage

```js
const geometry = new THREE.CircleGeometry( 5, 32 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const circle = new THREE.Mesh( geometry, material );
scene.add( circle );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `radius` | number | `1` | Radius of the circle |
| `segments` | number | `32` | Number of triangular segments (minimum 3) |
| `thetaStart` | number | `0` | Start angle for the first segment, in radians |
| `thetaLength` | number | `Math.PI * 2` | Central angle of the sector in radians; default produces a full circle |

## Notes

- The geometry lies in the XY plane, facing the +Z direction.
- A low `segments` count (e.g. 3, 4, 5, 6) produces regular polygons.
- `.parameters` holds the constructor arguments; modifying it after instantiation does not update the geometry.
- Use `CircleGeometry.fromJSON( data )` to deserialize.

## Related

- [RingGeometry](./RingGeometry.md)
- [ShapeGeometry](./ShapeGeometry.md)
