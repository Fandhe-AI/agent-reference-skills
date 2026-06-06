# CylinderGeometry

A geometry for a cylinder (or truncated cone) with configurable top/bottom radii, height, and segmentation.

## Signature / Usage

```js
const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const cylinder = new THREE.Mesh( geometry, material );
scene.add( cylinder );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `radiusTop` | number | `1` | Radius of the cylinder at the top |
| `radiusBottom` | number | `1` | Radius of the cylinder at the bottom |
| `height` | number | `1` | Height of the cylinder |
| `radialSegments` | number | `32` | Number of segmented faces around the circumference |
| `heightSegments` | number | `1` | Number of rows of faces along the height |
| `openEnded` | boolean | `false` | Whether the ends are open (`true`) or capped (`false`) |
| `thetaStart` | number | `0` | Start angle for the first segment, in radians |
| `thetaLength` | number | `Math.PI * 2` | Central angle of the circular sector, in radians |

## Notes

- Setting `radiusTop` to `0` produces a cone shape (see also `ConeGeometry`).
- `.parameters` holds the constructor arguments; modifying it after instantiation does not update the geometry.
- Use `CylinderGeometry.fromJSON( data )` to deserialize.
- Inherits from `BufferGeometry`.

## Related

- [ConeGeometry](./ConeGeometry.md)
- [CapsuleGeometry](./CapsuleGeometry.md)
