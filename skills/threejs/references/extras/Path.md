# Path

A 2D path representation extending `CurvePath`. Provides Canvas 2D-style methods (`moveTo`, `lineTo`, `arc`, Bezier curves) for building paths and shape contours.

## Signature / Usage

```js
const path = new THREE.Path();
path.lineTo( 0, 0.8 );
path.quadraticCurveTo( 0, 1, 0.2, 1 );
path.lineTo( 1, 1 );

const points = path.getPoints();
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial( { color: 0xffffff } );
const line = new THREE.Line( geometry, material );
scene.add( line );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `points` (constructor arg) | Array\<Vector2\> | — | Optional array of 2D points to initialize the path from |
| `currentPoint` | Vector2 | — | Current offset of the path; any new curve added starts here |

## Methods

`moveTo(x, y)`, `lineTo(x, y)`, `quadraticCurveTo(aCPx, aCPy, x, y)`, `bezierCurveTo(aCP1x, aCP1y, aCP2x, aCP2y, x, y)`, `splineThru(points)`, `arc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise)`, `absarc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise)`, `ellipse(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation)`, `absellipse(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation)`, `setFromPoints(points)`

## Notes

- All drawing methods return a reference to the `Path` instance, enabling method chaining.
- `arc`/`ellipse` add relative to `currentPoint`; `absarc`/`absellipse` use absolute coordinates.
- Extends `CurvePath`, which in turn extends `Curve`.

## Related

- [CurvePath](./CurvePath.md)
- [Shape](./Shape.md)
- [ShapePath](./ShapePath.md)
