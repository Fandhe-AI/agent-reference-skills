# EllipseCurve

A curve representing a 2D ellipse. Extends `Curve`. Set `xRadius === yRadius` to produce a circle.

## Signature / Usage

```js
const curve = new THREE.EllipseCurve(
  0, 0,            // center x, y
  10, 10,          // xRadius, yRadius
  0, 2 * Math.PI,  // start angle, end angle
  false,           // clockwise
  0                // rotation
);

const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const ellipse = new THREE.Line( geometry, material );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aX` | number | `0` | X center of the ellipse |
| `aY` | number | `0` | Y center of the ellipse |
| `xRadius` | number | `1` | Radius in the x direction |
| `yRadius` | number | `1` | Radius in the y direction |
| `aStartAngle` | number | `0` | Start angle in radians (from positive X axis) |
| `aEndAngle` | number | `Math.PI * 2` | End angle in radians |
| `aClockwise` | boolean | `false` | Whether the ellipse is drawn clockwise |
| `aRotation` | number | `0` | Rotation of the ellipse counterclockwise from the positive X axis, in radians |

## Notes

- `isEllipseCurve` is a readonly type-testing flag.
- Angles are specified in radians.

## Related

- [ArcCurve](./ArcCurve.md)
- [Curve](./Curve.md)
