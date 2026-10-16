# ShapeUtils

Utility functions for shapes.

## Signature / Usage

```js
ShapeUtils.area( contour : Array<Vector2> ) : number
ShapeUtils.isClockWise( pts : Array<Vector2> ) : boolean
ShapeUtils.triangulateShape( contour : Array<Vector2>, holes : Array<Array<Vector2>> ) : Array<Array<number>>
```

## Methods

| Name | Description | Returns |
|------|-------------|---------|
| `area(contour)` | Calculates the area of a 2D contour polygon | The area |
| `isClockWise(pts)` | Whether the contour uses a clockwise winding order | boolean |
| `triangulateShape(contour, holes)` | Triangulates the shape; `holes` is an array of arrays of 2D points | For each face an array with three indices |

## Notes

- Source: https://threejs.org/docs/pages/ShapeUtils.html (three.js r186, `src/extras/ShapeUtils.js`)

## Related

- [Shape](./Shape.md)
- [Earcut](./Earcut.md)
