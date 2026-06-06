# SphereGeometry

A sphere geometry built from horizontal and vertical segments. Supports partial spheres via angle sweeps.

## Signature / Usage

```js
const geometry = new THREE.SphereGeometry( 15, 32, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `radius` | number | `1` | Sphere radius |
| `widthSegments` | number | `32` | Number of horizontal segments (minimum 3) |
| `heightSegments` | number | `16` | Number of vertical segments (minimum 2) |
| `phiStart` | number | `0` | Horizontal starting angle in radians |
| `phiLength` | number | `Math.PI * 2` | Horizontal sweep angle size in radians |
| `thetaStart` | number | `0` | Vertical starting angle in radians |
| `thetaLength` | number | `Math.PI` | Vertical sweep angle size in radians |

## Notes

- Higher `widthSegments` and `heightSegments` values produce a smoother sphere at the cost of more geometry.
- Partial spheres (e.g. hemispheres) are created by reducing `thetaLength` or `phiLength`.
- `.parameters` holds the constructor arguments; modifying it after instantiation does not update the geometry.
- Use `SphereGeometry.fromJSON( data )` to deserialize.
- Inherits from `BufferGeometry`.

## Related

- [IcosahedronGeometry](./IcosahedronGeometry.md)
- [CapsuleGeometry](./CapsuleGeometry.md)
