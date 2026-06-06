# TorusKnotGeometry

A geometry for a torus knot — a curve that winds around a torus surface `p` times in one direction and `q` times in the other.

## Signature / Usage

```js
const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const torusKnot = new THREE.Mesh( geometry, material );
scene.add( torusKnot );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `radius` | number | `1` | Radius of the torus knot |
| `tube` | number | `0.4` | Radius of the tube |
| `tubularSegments` | number | `64` | Number of tubular segments |
| `radialSegments` | number | `8` | Number of radial segments |
| `p` | number | `2` | How many times the geometry winds around its axis of rotational symmetry |
| `q` | number | `3` | How many times the geometry winds around a circle in the interior of the torus |

## Notes

- `p` and `q` must be coprime integers to produce a proper knot; non-coprime values produce a torus link instead.
- `.parameters` holds the constructor arguments; modifying it after instantiation does not update the geometry.
- Use `TorusKnotGeometry.fromJSON( data )` to deserialize.
- Inherits from `BufferGeometry`.

## Related

- [TorusGeometry](./TorusGeometry.md)
- [TubeGeometry](./TubeGeometry.md)
