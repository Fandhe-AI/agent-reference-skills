# TubeGeometry

Creates a tube geometry by sweeping a circle along a 3D `Curve` path.

## Signature / Usage

```js
class CustomSinCurve extends THREE.Curve {
    getPoint( t, optionalTarget = new THREE.Vector3() ) {
        const tx = t * 3 - 1.5;
        const ty = Math.sin( 2 * Math.PI * t );
        const tz = 0;
        return optionalTarget.set( tx, ty, tz );
    }
}

const path = new CustomSinCurve( 10 );
const geometry = new THREE.TubeGeometry( path, 20, 2, 8, false );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `path` | Curve | `QuadraticBezierCurve3` | A 3D curve defining the tube's path |
| `tubularSegments` | number | `64` | Number of segments along the tube |
| `radius` | number | `1` | Radius of the tube |
| `radialSegments` | number | `8` | Number of segments making up the cross-section |
| `closed` | boolean | `false` | Whether the tube ends are connected |

## Notes

- Requires a custom `Curve` subclass that implements `getPoint( t )`.
- `.parameters` holds the constructor arguments; modifying it after instantiation does not update the geometry.
- Use `TubeGeometry.fromJSON( data )` to deserialize.
- Inherits from `BufferGeometry`.

## Related

- [TorusKnotGeometry](./TorusKnotGeometry.md)
- [LatheGeometry](./LatheGeometry.md)
