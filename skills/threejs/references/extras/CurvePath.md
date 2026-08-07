# CurvePath

Extends `Curve` with an array of connected sub-curves while retaining the `Curve` API. Base class for `Path` and, by extension, `Shape`.

## Signature / Usage

```js
const curvePath = new THREE.CurvePath();
curvePath.add( new THREE.LineCurve( new THREE.Vector2( 0, 0 ), new THREE.Vector2( 0, 1 ) ) );
curvePath.add( new THREE.LineCurve( new THREE.Vector2( 0, 1 ), new THREE.Vector2( 1, 1 ) ) );

const points = curvePath.getPoints( 10 );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `autoClose` | boolean | `false` | Whether the path should automatically be closed with a line curve |
| `curves` | Array\<Curve\> | `[]` | Array of curves that make up the path |

## Methods

`add(curve)`, `closePath()`, `getCurveLengths()`, `getPoint(t, optionalTarget)` (overrides `Curve#getPoint`)

## Notes

- Simply an ordered array of `Curve` instances, but exposes the same interpolation API as a single curve.
- `getPoint(t)` distributes `t` proportionally across the length of each sub-curve.

## Related

- [Curve](./Curve.md)
- [Path](./Path.md)
