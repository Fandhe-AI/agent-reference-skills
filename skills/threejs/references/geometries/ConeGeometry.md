# ConeGeometry

A geometry for a cone shape. Extends `CylinderGeometry` with `radiusTop` fixed to `0`.

## Signature / Usage

```js
const geometry = new THREE.ConeGeometry( 5, 20, 32 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const cone = new THREE.Mesh( geometry, material );
scene.add( cone );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `radius` | number | `1` | Radius of the cone base |
| `height` | number | `1` | Height of the cone |
| `radialSegments` | number | `32` | Number of segmented faces around the circumference |
| `heightSegments` | number | `1` | Number of rows of faces along the height |
| `openEnded` | boolean | `false` | Whether the base of the cone is open (`true`) or capped (`false`) |
| `thetaStart` | number | `0` | Start angle for the first segment, in radians |
| `thetaLength` | number | `Math.PI * 2` | Central angle of the circular sector, in radians |

## Notes

- Inherits from `CylinderGeometry` (EventDispatcher → BufferGeometry → CylinderGeometry → ConeGeometry).
- `.parameters` holds the constructor arguments; modifying it after instantiation does not update the geometry.
- Use `ConeGeometry.fromJSON( data )` to deserialize.

## Related

- [CylinderGeometry](./CylinderGeometry.md)
