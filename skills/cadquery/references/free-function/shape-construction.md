# Shape Construction

Assembling lower-dimensional shapes (edges, wires, faces) into higher-level shapes (wires, faces, shells, solids, compounds).

## Signature / Usage

```python
from cadquery.func import *

e1 = segment((0,0), (1,0))
e2 = segment((1,0), (1,1))

# wire from edges
r1 = wire(e1, e2)

c1 = circle(1)

# face from a planar wire
r2 = face(c1)

# solid from faces
f1 = plane(1,1)
f2 = f1.moved(z=1)
f3 = extrude(f1.wires(), (0,0,1))

r3 = solid(f1, f2, *f3)

# compound from shapes
s1 = circle(1).moved(ry=90)
s2 = plane(1,1).move(rx=90).move(y=2)
s3 = cone(1, 1.5).move(y=4)

r4 = compound(s1, s2, s3)
```

## Options / Props

| Function | Signature | Returns | Description |
|----------|-----------|---------|-------------|
| `wire` | `wire(*s: Shape)` / `wire(s: Sequence[Shape])` | `Wire` | Build wire from edges (or shapes containing edges). |
| `face` | `face(*s: Shape)` / `face(s: Sequence[Shape])` | `Face` | Build planar face from edges or wires. |
| `shell` | `shell(*s: Shape, tol=1e-6, manifold=True, ctx=None, history=None)` | `Shell` | Sew faces into a shell. `ctx` enables local sewing against a context shape. |
| `shell` | `shell(s: Sequence[Shape], tol=1e-6, manifold=True, ctx=None, history=None)` | `Shell` | Sequence overload. |
| `solid` | `solid(s1, *sn, tol=1e-6, history=None)` | `Compound \| Solid` | Build solid from faces or shells. |
| `solid` | `solid(s: Sequence[Shape], inner=None, tol=1e-6, history=None)` | `Solid` | Build solid with optional inner (void) faces. |
| `compound` | `compound(*s: Shape)` / `compound(s: Sequence[Shape])` | `Compound` | Group shapes without merging. |
| `fill` | `fill(s: Shape, constraints=())` | `Shape` | Fill edges/wire into a face, optionally satisfying point/edge constraints. |
| `cap` | `cap(s: Shape, ctx: Shape, constraints=())` | `Shape` | Fill edges/wire with G1 curvature continuity to the context shape. |
| `clean` | `clean(s: Shape)` | `Shape` | Remove superfluous edges and faces (unify same-domain geometry). |

## Notes

- `shell()` with `ctx` performs *local sewing* — only the indicated context elements are considered, which is faster for large models.
- `solid()` automatically sews faces into a shell if no shell is provided.
- `cap()` sets `SetResolParam(2, 15, 5)` for higher quality surface filling; use it for top/bottom caps on lofted or swept surfaces.
- `clean()` uses `ShapeUpgrade_UnifySameDomain` and disallows internal edges.

## Related

- [Primitives](./primitives.md)
- [Operations](./operations.md)
- [Adding Features Manually](./adding-features.md)
