# Tutorial

Introduction to building `Shape` objects using the free function API by sequentially constructing faces and assembling them into a solid.

## Signature / Usage

```python
from cadquery.func import *

dh = 2
r = 1

# construct edges
edge1 = circle(r)
edge2 = circle(1.5*r).moved(z=dh)
edge3 = circle(r).moved(z=1.5*dh)

# loft the side face
side = loft(edge1, edge2, edge3)

# bottom face
bottom = fill(side.edges('<Z'))

# top face with continuous curvature
top = cap(side.edges('>Z'), side, [(0,0,1.6*dh)])

# assemble into a solid
s = solid(side, bottom, top)

# construct the final result — two copies placed at different locations
result = s.moved((-3*r, 0, 0), (3*r, 0, 0))
```

## Notes

- The free function API has **no hidden state**; all operations are free functions except placement and selection.
- Placement and pattern creation are achieved via the various overloads of `.moved()` / `.move()` on `Shape`.
- `cap()` attempts to maintain curvature continuity with respect to the context shape; `fill()` does not.
- Passing multiple `VectorLike` arguments to `moved()` creates a `Compound` of copies placed at each location.
- The API is **experimental and may change**.

## Related

- [Primitives](./primitives.md)
- [Shape Construction](./shape-construction.md)
- [Operations](./operations.md)
- [Placement](./placement.md)
