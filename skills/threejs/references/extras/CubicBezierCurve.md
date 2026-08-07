# CubicBezierCurve

A curve representing a 2D cubic Bezier curve. Extends `Curve`.

## Signature / Usage

```js
const curve = new THREE.CubicBezierCurve(
    new THREE.Vector2( -0, 0 ),
    new THREE.Vector2( -5, 15 ),
    new THREE.Vector2( 20, 15 ),
    new THREE.Vector2( 10, 0 )
);

const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const curveObject = new THREE.Line( geometry, material );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `v0` | Vector2 | — | Start point |
| `v1` | Vector2 | — | First control point |
| `v2` | Vector2 | — | Second control point |
| `v3` | Vector2 | — | End point |

## Notes

- `isCubicBezierCurve` is a readonly type-testing flag.
- Control points (`v1`, `v2`) shape the curve but do not lie on it.

## Related

- [CubicBezierCurve3](./CubicBezierCurve3.md)
- [QuadraticBezierCurve](./QuadraticBezierCurve.md)
