# Shape

Defines an arbitrary 2D shape plane using paths with optional holes. Extends `Path` (which extends `CurvePath` → `Curve`). Used with `ExtrudeGeometry` and `ShapeGeometry` to generate triangulated faces.

## Signature / Usage

```js
const heartShape = new THREE.Shape();
heartShape.moveTo( 25, 25 );
heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
heartShape.bezierCurveTo( -30, 0, -30, 35, -30, 35 );
heartShape.bezierCurveTo( -30, 55, -10, 77, 25, 95 );
heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );

const geometry = new THREE.ExtrudeGeometry( heartShape, { depth: 8, bevelEnabled: true } );
const mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial() );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `points` (constructor arg) | Array\<Vector2\> | — | Optional array of 2D points to initialize the shape from |
| `holes` | Array\<Path\> | `[]` | Hole definitions; must use the opposite winding order (CW/CCW) from the outer shape |
| `uuid` | string (readonly) | generated | Unique identifier for the shape |

## Methods

`extractPoints(divisions)`, `getPointsHoles(divisions)` (plus all `Path`/`CurvePath`/`Curve` methods: `moveTo`, `lineTo`, `bezierCurveTo`, `getPoints`, etc.)

## Notes

- Hole definitions must use the opposite winding order (clockwise/counterclockwise) compared to the outer shape, or triangulation produces incorrect results.
- Inheritance chain: `Curve` → `CurvePath` → `Path` → `Shape`.

## Related

- [Path](./Path.md)
- [ShapePath](./ShapePath.md)
- [ShapeGeometry](../geometries/ShapeGeometry.md)
- [ExtrudeGeometry](../geometries/ExtrudeGeometry.md)
