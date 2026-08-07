# CubicBezierCurve3

A curve representing a 3D cubic Bezier curve. Extends `Curve`.

## Signature / Usage

```js
const v0 = new THREE.Vector3( 0, 0, 0 );
const v1 = new THREE.Vector3( 0, 10, 0 );
const v2 = new THREE.Vector3( 10, 10, 0 );
const v3 = new THREE.Vector3( 10, 0, 0 );

const curve = new THREE.CubicBezierCurve3( v0, v1, v2, v3 );
const point = curve.getPoint( 0.5 );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `v0` | Vector3 | — | Start point |
| `v1` | Vector3 | — | First control point |
| `v2` | Vector3 | — | Second control point |
| `v3` | Vector3 | — | End point |

## Notes

- `isCubicBezierCurve3` is a readonly type-testing flag.
- Control points (`v1`, `v2`) shape the curve but do not lie on it.

## Related

- [CubicBezierCurve](./CubicBezierCurve.md)
- [QuadraticBezierCurve3](./QuadraticBezierCurve3.md)
