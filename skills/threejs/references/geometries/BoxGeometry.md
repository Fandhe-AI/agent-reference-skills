# BoxGeometry

A geometry for a rectangular cuboid (box/cube) shape. All faces are quads by default.

## Signature / Usage

```js
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `width` | number | `1` | Length of edges along the X axis |
| `height` | number | `1` | Length of edges along the Y axis |
| `depth` | number | `1` | Length of edges along the Z axis |
| `widthSegments` | number | `1` | Number of segmented rectangular faces along the width |
| `heightSegments` | number | `1` | Number of segmented rectangular faces along the height |
| `depthSegments` | number | `1` | Number of segmented rectangular faces along the depth |

## Notes

- `.parameters` holds the constructor arguments used to build the geometry; modifying it after instantiation does not update the geometry.
- Use `BoxGeometry.fromJSON( data )` to deserialize from a JSON object.
- Inherits from `BufferGeometry` (EventDispatcher → BufferGeometry → BoxGeometry).

## Related

- [CylinderGeometry](./CylinderGeometry.md)
- [PlaneGeometry](./PlaneGeometry.md)
