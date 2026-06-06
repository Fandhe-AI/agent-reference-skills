# TorusGeometry

A geometry for a torus (donut) shape, defined by the outer radius and tube radius.

## Signature / Usage

```js
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `radius` | number | `1` | Radius from the torus center to the center of the tube |
| `tube` | number | `0.4` | Radius of the tube; must be smaller than `radius` |
| `radialSegments` | number | `12` | Number of radial segments |
| `tubularSegments` | number | `48` | Number of tubular segments |
| `arc` | number | `Math.PI * 2` | Central angle of the torus in radians |

## Notes

- `.parameters` holds the constructor arguments; modifying it after instantiation does not update the geometry.
- Use `TorusGeometry.fromJSON( data )` to deserialize.
- Inherits from `BufferGeometry`.

## Related

- [TorusKnotGeometry](./TorusKnotGeometry.md)
- [RingGeometry](./RingGeometry.md)
