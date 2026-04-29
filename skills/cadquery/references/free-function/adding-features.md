# Adding Features Manually

Add holes, protrusions, and custom features to faces and solids without boolean operations, using face-level mutation methods (`addHole`, `replace`, `remove`) and explicit `shell()` construction.

## Signature / Usage

### Hole through a box (no boolean ops)

```python
from cadquery.func import *

w = 1
r = 0.9*w/2

b = box(w, w, w)
b_bot = b.faces('<Z')
b_top = b.faces('>Z')

inner = extrude(circle(r), (0,0,w))

b_bot_hole = b_bot.addHole(inner.edges('<Z'))
b_top_hole = b_top.addHole(inner.edges('>Z'))

result = solid(
    b.remove(b_top, b_bot).faces(),  # side faces
    b_bot_hole,                       # bottom with hole
    inner,                            # inner cylinder face
    b_top_hole,                       # top with hole
)
```

### Protrusion with local sewing

```python
from cadquery.func import *

w = 1
h = 0.1
r = 0.9*w/2

b = box(w, w, w)
b_top = b.faces('>Z')

feat_side = extrude(circle(r).moved(b_top.Center()), (0,0,h))
feat_top = face(feat_side.edges('>Z'))
feat = shell(feat_side, feat_top)  # sew into a shell

b_top_hole = b_top.addHole(feat.edges('<Z'))
b = b.replace(b_top, b_top_hole)

# local sewing — only two faces are taken into account
sh = shell(b_top_hole, feat.faces('<Z'), ctx=(b, feat))
result = solid(sh)
```

## Options / Props

| Method / Function | Signature | Description |
|-------------------|-----------|-------------|
| `Face.addHole` | `.addHole(wire_or_edge)` | Return a copy of the face with an inner wire (hole) added. |
| `Solid.remove` | `.remove(*faces)` | Return the solid's remaining faces after removing the specified ones. |
| `Solid.replace` | `.replace(old, new)` | Return a copy of the solid with `old` face replaced by `new`. |
| `shell` | `shell(*s, tol=1e-6, manifold=True, ctx=None, history=None)` | Sew faces into a shell; `ctx` limits sewing to adjacent faces in the context shape. |
| `solid` | `solid(s1, *sn, tol=1e-6)` | Reconstruct a solid from individual faces or shells. |

## Notes

- This approach avoids `fuse` / `cut` and can be significantly faster for complex shapes.
- `addHole` accepts an edge or wire that lies on (or coincides with) the boundary of the inner feature.
- Local sewing (`ctx=`) requires a **two-step** approach: first build the `shell`, then pass it to `solid()`.
- `ctx` can be a single `Shape` or a sequence of shapes; only the faces adjacent to the sewn edges in the context are considered.
- Use `.faces('<Z')`, `.edges('>Z')` etc. (CQ selectors) to pick specific sub-shapes.

## Related

- [Shape Construction](./shape-construction.md)
- [Operations](./operations.md)
- [Boolean Operations](./boolean-operations.md)
