# LineCurve

A curve representing a 2D line segment. Extends `Curve`.

## Signature / Usage

```js
const start = new THREE.Vector2( 0, 0 );
const end = new THREE.Vector2( 10, 5 );
const line = new THREE.LineCurve( start, end );

const midpoint = line.getPoint( 0.5 );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `v1` | Vector2 | — | Start point |
| `v2` | Vector2 | — | End point |

## Notes

- `isLineCurve` is a readonly type-testing flag.
- Used internally by `ShapePath.lineTo()`.

## Related

- [LineCurve3](./LineCurve3.md)
- [Path](./Path.md)
