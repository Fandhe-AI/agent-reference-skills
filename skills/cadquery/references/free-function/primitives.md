# Primitives

1D, 2D, and 3D primitive shape constructors available in `cadquery.func`.

## Signature / Usage

```python
from cadquery.func import *

e = segment((0,0), (0,1))   # Edge
c = circle(1)               # Edge
f = plane(1, 1.5)           # Face
b = box(1, 1, 1)            # Solid

result = compound(e, c.move(2), f.move(4), b.move(6))
```

## Options / Props

| Function | Signature | Returns | Description |
|----------|-----------|---------|-------------|
| `vertex` | `vertex(x, y, z)` / `vertex(p: VectorLike)` | `Vertex` | Construct a vertex from coordinates or VectorLike. |
| `segment` | `segment(p1: VectorLike, p2: VectorLike)` | `Edge` | Line segment between two points. |
| `polyline` | `polyline(*pts: VectorLike)` | `Wire` | Open polyline through the given points. |
| `polygon` | `polygon(*pts: VectorLike)` | `Wire` | Closed polygon through the given points. |
| `rect` | `rect(w: float, h: float)` | `Wire` | Axis-aligned rectangle centred at the origin. |
| `spline` | `spline(*pts: VectorLike, tol=1e-6, periodic=False)` | `Edge` | Interpolating spline through points. |
| `spline` | `spline(pts, tgts=None, params=None, tol=1e-6, periodic=False, scale=True)` | `Edge` | Spline with optional tangents and parameter list. |
| `circle` | `circle(r: float)` | `Edge` | Circle of radius `r` in the XY plane. |
| `ellipse` | `ellipse(r1: float, r2: float)` | `Edge` | Ellipse with semi-axes `r1`, `r2` in the XY plane. |
| `plane` | `plane(w: Real, l: Real)` | `Face` | Finite planar face of width `w` and length `l`. |
| `plane` | `plane()` | `Face` | Infinite planar face (crude approximation). |
| `box` | `box(w: float, l: float, h: float)` | `Solid` | Solid box, centred in XY, base at Z=0. |
| `cylinder` | `cylinder(d: float, h: float)` | `Solid` | Solid cylinder of diameter `d` and height `h`. |
| `sphere` | `sphere(d: float)` | `Solid` | Solid sphere of diameter `d`. |
| `torus` | `torus(d1: float, d2: float)` | `Solid` | Solid torus: `d1` = outer diameter, `d2` = tube diameter. |
| `cone` | `cone(d: Real, h: Real)` | `Solid` | Full cone (apex at top) of base diameter `d` and height `h`. |
| `cone` | `cone(d1: Real, d2: Real, h: Real)` | `Solid` | Truncated cone of base diameter `d1`, top diameter `d2`, height `h`. |
| `compound` | `compound(*s: Shape)` / `compound(s: Sequence[Shape])` | `Compound` | Group multiple shapes without merging. |

## Notes

- All primitive solids are centred at the origin (XY plane); `box` is centred in XY with the bottom face at Z=0.
- `cone(d, h)` is a convenience overload that calls `cone(d, 0.0, h)`.
- `plane()` with no arguments creates an infinite face — not all OCCT operations handle truly infinite faces correctly.
- Use `.move()` / `.moved()` to position primitives after construction.

## Related

- [Placement](./placement.md)
- [Shape Construction](./shape-construction.md)
- [Boolean Operations](./boolean-operations.md)
