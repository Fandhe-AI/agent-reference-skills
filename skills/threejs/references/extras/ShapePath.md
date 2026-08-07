# ShapePath

Utility class that converts a series of paths into an array of `Shape` objects. Primarily used with fonts and SVG content (e.g. `SVGLoader`).

## Signature / Usage

```js
const shapePath = new THREE.ShapePath();
shapePath.moveTo( 0, 0 );
shapePath.lineTo( 10, 0 );
shapePath.lineTo( 10, 10 );
shapePath.lineTo( 0, 10 );

const shapes = shapePath.toShapes();
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | Color | `new Color()` | Color associated with the shape path |
| `currentPath` | Path \| null | `null` | The path currently being generated |
| `subPaths` | Array\<Path\> | `[]` | Array of generated sub-paths |
| `userData` | Object | `{}` | Custom data storage, primarily used by `SVGLoader` for style information |

## Methods

`moveTo(x, y)`, `lineTo(x, y)`, `quadraticCurveTo(aCPx, aCPy, x, y)`, `bezierCurveTo(aCP1x, aCP1y, aCP2x, aCP2y, x, y)`, `splineThru(points)`, `toShapes()`

## Notes

- All path-construction methods return a reference to the `ShapePath` instance, enabling method chaining.
- `moveTo()` starts a new sub-path stored in `subPaths` and sets it as `currentPath`.
- `toShapes()` converts the accumulated sub-paths into `Shape` instances.

## Related

- [Shape](./Shape.md)
- [Path](./Path.md)
