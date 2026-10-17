# Interpolations

Spline and Bézier functions used internally by concrete curve classes. Bezier formulas are from https://en.wikipedia.org/wiki/B%C3%A9zier_curve.

## Signature / Usage

```js
CatmullRom( t : number, p0 : number, p1 : number, p2 : number, p3 : number ) : number
CubicBezier( t : number, p0 : number, p1 : number, p2 : number, p3 : number ) : number
QuadraticBezier( t : number, p0 : number, p1 : number, p2 : number ) : number
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `t` | number | The interpolation factor |
| `p0`..`p3` | number | The first to fourth control points (`QuadraticBezier` takes `p0`..`p2`) |

## Methods

- `CatmullRom`: computes a point on a Catmull-Rom spline.
- `CubicBezier`: computes a point on a Cubic Bezier curve.
- `QuadraticBezier`: computes a point on a Quadratic Bezier curve.

## Notes

- All three are documented as module-inner functions (`(inner)`) in `src/extras/core/Interpolations.js`, intended for internal use by curve classes.
- Source: https://threejs.org/docs/pages/module-Interpolations.html (three.js r186, `src/extras/core/Interpolations.js`)

## Related

- [Curve](./Curve.md)
- [CatmullRomCurve3](./CatmullRomCurve3.md)
- [CubicBezierCurve](./CubicBezierCurve.md)
- [QuadraticBezierCurve](./QuadraticBezierCurve.md)
