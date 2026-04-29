# Boolean Operations

Boolean operations on 2D and 3D shapes, available as operators (`+`, `-`, `*`, `/`) and as free functions.

## Signature / Usage

```python
from cadquery.func import *

c1 = cylinder(1, 2)
c2 = cylinder(0.5, 3)

f1 = plane(2, 2).move(z=1)
f2 = plane(1, 1).move(z=1)

e1 = segment((0,-2.5, 1), (0,2.5,1))

# union
r1 = c2 + c1
r2 = fuse(f1, f2)

# difference
r3 = c1 - c2
r4 = cut(f1, f2)

# intersection
r5 = c1 * c2
r6 = intersect(f1, f2)

# splitting
r7 = (c1 / f1).solids('<Z')
r8 = split(f2, e1).faces('<X')
```

## Options / Props

| Function | Signature | Description |
|----------|-----------|-------------|
| `fuse` | `fuse(s1, s2, *shapes, tol=0.0, glue=None)` | Union of two or more shapes. |
| `cut` | `cut(s1, s2, tol=0.0, glue=None)` | Subtract `s2` from `s1`. |
| `intersect` | `intersect(s1, s2, tol=0.0, glue=None)` | Intersection of two shapes. |
| `split` | `split(s1, s2, tol=0.0)` | Split `s1` using `s2` as a tool. |
| `imprint` | `imprint(*shapes, tol=0.0, glue="full", history=None)` | Imprint (non-destructive merge) of arbitrary number of shapes. |
| `+` | `s1 + s2` | Operator alias for `fuse`. |
| `-` | `s1 - s2` | Operator alias for `cut`. |
| `*` | `s1 * s2` | Operator alias for `intersect`. |
| `/` | `s1 / s2` | Operator alias for `split`. |
| `setThreads` | `setThreads(n: int)` | Set the number of parallel threads used by boolean operations. |

### `glue` parameter (GlueLiteral)

| Value | Effect |
|-------|--------|
| `None` | No glue (default). |
| `"full"` | Full glue — assume shapes touch but don't overlap. |
| `"shift"` | Shift glue. |

## Notes

- Boolean operations are **slow**; avoid running them in a loop.
- To union many solids efficiently, first combine them into a `compound`, then perform a single `fuse`.
- Boolean operations work on both 2D (faces) and 3D (solids) shapes.
- `tol` enables "fuzzy mode" to handle near-coincident geometry.
- `imprint` uses `glue="full"` by default and supports an optional `history` dict for tracking modified shapes.

## Related

- [Primitives](./primitives.md)
- [Shape Construction](./shape-construction.md)
- [Operations](./operations.md)
