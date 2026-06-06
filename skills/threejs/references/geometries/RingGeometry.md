# RingGeometry

A flat 2D annular (ring/donut) shape in the XY plane, defined by inner and outer radii. Can represent a partial sector.

## Signature / Usage

```js
const geometry = new THREE.RingGeometry( 1, 5, 32 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `innerRadius` | number | `0.5` | Inner radius of the ring |
| `outerRadius` | number | `1` | Outer radius of the ring |
| `thetaSegments` | number | `32` | Number of circumference segments (minimum 3) |
| `phiSegments` | number | `1` | Number of segments along the ring's radial width (minimum 1) |
| `thetaStart` | number | `0` | Starting angle in radians |
| `thetaLength` | number | `Math.PI * 2` | Central angle of the sector in radians |

## Notes

- The geometry lies in the XY plane; use `THREE.DoubleSide` material or rotate as needed.
- `.parameters` holds the constructor arguments; modifying it after instantiation does not update the geometry.
- Use `RingGeometry.fromJSON( data )` to deserialize.

## Related

- [CircleGeometry](./CircleGeometry.md)
- [TorusGeometry](./TorusGeometry.md)
