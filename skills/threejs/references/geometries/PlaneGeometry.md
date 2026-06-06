# PlaneGeometry

A flat 2D rectangle lying in the XY plane, optionally subdivided into a grid of segments.

## Signature / Usage

```js
const geometry = new THREE.PlaneGeometry( 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `width` | number | `1` | Width along the X axis |
| `height` | number | `1` | Height along the Y axis |
| `widthSegments` | number | `1` | Number of segments along the X axis |
| `heightSegments` | number | `1` | Number of segments along the Y axis |

## Notes

- The plane faces the +Z direction by default; use `THREE.DoubleSide` material or rotate it as needed.
- `.parameters` holds the constructor arguments; modifying it after instantiation does not update the geometry.
- Use `PlaneGeometry.fromJSON( data )` to deserialize.
- Inherits from `BufferGeometry`.

## Related

- [BoxGeometry](./BoxGeometry.md)
- [ShapeGeometry](./ShapeGeometry.md)
