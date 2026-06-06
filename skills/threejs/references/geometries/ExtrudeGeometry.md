# ExtrudeGeometry

Creates a 3D geometry by extruding a 2D `Shape` along a path or straight depth. Supports beveling and custom UV generation.

## Signature / Usage

```js
const shape = new THREE.Shape();
shape.moveTo( 0, 0 );
shape.lineTo( 0, 8 );
shape.lineTo( 12, 8 );
shape.lineTo( 12, 0 );
shape.lineTo( 0, 0 );

const geometry = new THREE.ExtrudeGeometry( shape, { depth: 4, bevelEnabled: false } );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `shapes` | Shape \| Shape[] | — | Shape or array of shapes to extrude |
| `curveSegments` | number | `12` | Number of points on curves |
| `steps` | number | `1` | Subdivisions along the extrusion depth |
| `depth` | number | `1` | Depth to extrude the shape |
| `bevelEnabled` | boolean | `true` | Apply beveling to the shape |
| `bevelThickness` | number | `0.2` | Depth the bevel goes into the original shape |
| `bevelSize` | number | `bevelThickness - 0.1` | Distance from the shape outline the bevel extends |
| `bevelOffset` | number | `0` | Distance from the shape outline where the bevel starts |
| `bevelSegments` | number | `3` | Number of bevel layers |
| `extrudePath` | Curve | `null` | 3D spline path to extrude along (bevels not supported with this option) |
| `UVGenerator` | Object | — | Custom UV generator object |

## Notes

- `.parameters` holds the constructor arguments; modifying it after instantiation does not update the geometry.
- When `extrudePath` is set, beveling is ignored.
- Inherits from `BufferGeometry`.

## Related

- [ShapeGeometry](./ShapeGeometry.md)
