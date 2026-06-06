# CapsuleGeometry

A capsule geometry — a cylinder with hemispherical caps at each end.

## Signature / Usage

```js
const geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const capsule = new THREE.Mesh( geometry, material );
scene.add( capsule );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `radius` | number | `1` | Radius of the capsule |
| `height` | number | `1` | Height of the cylindrical middle section |
| `capSegments` | number | `4` | Number of curve segments used to build each hemispherical cap |
| `radialSegments` | number | `8` | Number of segmented faces around the circumference (minimum 3) |
| `heightSegments` | number | `1` | Number of rows of faces along the height of the middle section (minimum 1) |

## Notes

- `.parameters` holds the constructor arguments; modifying it after instantiation does not update the geometry.
- Use `CapsuleGeometry.fromJSON( data )` to deserialize.
- Inherits from `BufferGeometry`.

## Related

- [CylinderGeometry](./CylinderGeometry.md)
- [SphereGeometry](./SphereGeometry.md)
