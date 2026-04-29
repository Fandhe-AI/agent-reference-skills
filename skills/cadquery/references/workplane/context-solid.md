# The Context Solid

The context solid is the first solid created in a Workplane chain. CadQuery automatically tracks it, and subsequent solid-creating operations are Booleans-combined with it by default — you do not need to manually merge each new feature.

## Overview

- The first call to a solid-producing method (e.g., `box()`, `extrude()`, `revolve()`) sets the context solid.
- Every subsequent solid-producing call with `combine=True` (the default) automatically unions, cuts, or intersects the new solid with the context solid.
- The context solid is found at runtime by walking the parent chain and returning the nearest `Solid` or `Compound` via `findSolid()`.

## Signature / Usage

```python
# The box becomes the context solid. The extruded circle (boss) is
# automatically combined with it — no explicit union needed.
result = (
    cq.Workplane("XY")
    .box(1, 2, 3)
    .faces(">Z")
    .circle(0.25)
    .extrude(1)
)
```

## Opting Out

Pass `combine=False` to create a solid separately, without merging it into the context solid:

```python
standalone_cylinder = cq.Workplane("XY").box(1,2,3).faces(">Z").circle(0.25).extrude(1, combine=False)
```

## Relevant Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `findSolid` | `findSolid(searchStack=True, searchParents=True)` | Traverse the chain and return the nearest solid/compound |
| `extrude` | `extrude(until, combine=True, ...)` | `combine=True` merges result into context solid |
| `cut` | `cut(toCut, combine=True, ...)` | Subtract from context solid |
| `union` | `union(toUnion=None, ...)` | Union with context solid |
| `intersect` | `intersect(toIntersect=None, ...)` | Intersect with context solid |
| `hole` | `hole(diameter, depth=None, ...)` | Cut a hole into the context solid |

## Notes

- If `combine=True` and no context solid exists yet, the new solid becomes the context solid.
- `findSolid()` raises an exception if no solid is found in the chain.
- The context solid is **not** a separate stored attribute — it is retrieved dynamically by walking the parent chain each time it is needed.
- After a boolean operation, the resulting `Compound` (containing all merged solids) replaces the previous solid in `objects`.

## Related

- [The Stack](./stack.md)
- [Chaining](./chaining.md)
- [3D Construction](./3d-construction.md)
- [Iteration](./iteration.md)
