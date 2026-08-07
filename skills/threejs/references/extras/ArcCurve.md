# ArcCurve

A curve representing a circular arc. Extends `EllipseCurve` with `xRadius === yRadius`.

## Signature / Usage

```js
// Circular arc centered at (0, 0), radius 10, from 0 to Math.PI/2 radians
const arc = new THREE.ArcCurve( 0, 0, 10, 0, Math.PI / 2, false );
const points = arc.getPoints( 50 );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aX` | number | `0` | X center of the arc |
| `aY` | number | `0` | Y center of the arc |
| `aRadius` | number | `1` | Radius of the arc |
| `aStartAngle` | number | `0` | Start angle in radians (from positive X axis) |
| `aEndAngle` | number | `Math.PI * 2` | End angle in radians |
| `aClockwise` | boolean | `false` | Whether the arc is drawn clockwise |

## Notes

- `isArcCurve` is a readonly type-testing flag.
- Internally sets `xRadius` and `yRadius` to the same value in `EllipseCurve`.

## Related

- [EllipseCurve](./EllipseCurve.md)
- [Curve](./Curve.md)
