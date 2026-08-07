# LineCurve3

A curve representing a 3D line segment. Extends `Curve`.

## Signature / Usage

```js
const start = new THREE.Vector3( 0, 0, 0 );
const end = new THREE.Vector3( 10, 5, 0 );
const curve = new THREE.LineCurve3( start, end );

const midpoint = curve.getPoint( 0.5 ); // Vector3(5, 2.5, 0)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `v1` | Vector3 | — | Start point |
| `v2` | Vector3 | — | End point |

## Notes

- `isLineCurve3` is a readonly type-testing flag.

## Related

- [LineCurve](./LineCurve.md)
- [Curve](./Curve.md)
