# QuadraticBezierCurve

A curve representing a 2D quadratic Bezier curve. Extends `Curve`.

## Signature / Usage

```js
const curve = new THREE.QuadraticBezierCurve(
    new THREE.Vector2( -10, 0 ),
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
| `v1` | Vector2 | — | Control point |
| `v2` | Vector2 | — | End point |

## Notes

- `isQuadraticBezierCurve` is a readonly type-testing flag.

## Related

- [QuadraticBezierCurve3](./QuadraticBezierCurve3.md)
- [CubicBezierCurve](./CubicBezierCurve.md)
