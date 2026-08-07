# QuadraticBezierCurve3

A curve representing a 3D quadratic Bezier curve. Extends `Curve`.

## Signature / Usage

```js
const v0 = new THREE.Vector3( 0, 0, 0 );
const v1 = new THREE.Vector3( 10, 15, 0 ); // control point
const v2 = new THREE.Vector3( 20, 0, 0 );

const curve = new THREE.QuadraticBezierCurve3( v0, v1, v2 );
const point = curve.getPoint( 0.5 );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `v0` | Vector3 | — | Start point |
| `v1` | Vector3 | — | Control point |
| `v2` | Vector3 | — | End point |

## Notes

- `isQuadraticBezierCurve3` is a readonly type-testing flag.

## Related

- [QuadraticBezierCurve](./QuadraticBezierCurve.md)
- [CubicBezierCurve3](./CubicBezierCurve3.md)
