# LatheGeometry

Creates a geometry with axial symmetry by rotating a set of 2D points around the Y axis. Useful for vase, bowl, or spindle shapes.

## Signature / Usage

```js
const points = [];
for ( let i = 0; i < 10; i++ ) {
    points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
}
const geometry = new THREE.LatheGeometry( points );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const lathe = new THREE.Mesh( geometry, material );
scene.add( lathe );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `points` | Array\<Vector2 \| Vector3\> | — | 2D profile points to revolve; x-coordinate of each point must be > 0 |
| `segments` | number | `12` | Number of circumference segments |
| `phiStart` | number | `0` | Starting angle in radians |
| `phiLength` | number | `Math.PI * 2` | Radian range of the lathed section; `2 * PI` = closed surface |

## Notes

- The profile is revolved around the Y axis.
- Each point's X coordinate must be greater than zero; a value of 0 collapses to the axis and may produce degenerate geometry.
- `.parameters` holds the constructor arguments; modifying it after instantiation does not update the geometry.
- Use `LatheGeometry.fromJSON( data )` to deserialize.

## Related

- [TubeGeometry](./TubeGeometry.md)
- [ExtrudeGeometry](./ExtrudeGeometry.md)
