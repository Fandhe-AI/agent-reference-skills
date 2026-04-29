# Iteration + An Introspective Example

## Iteration

Many CadQuery methods automatically iterate over every object on the stack, so explicit Python `for` loops are rarely needed. When the stack contains multiple points, faces, or edges, a subsequent drawing or modelling call runs once per stack item.

### Signature / Usage

```python
# vertices() pushes 4 vertices onto the stack for a rectangular face.
# circle() runs once per vertex → 4 circles created.
result = (
    cq.Workplane("XY")
    .box(1, 2, 3)
    .faces(">Z")
    .vertices()
    .circle(0.5)
    .extrude(0.25)
)
```

### each() for Custom Iteration

`each()` is the low-level iteration primitive. Use it when writing plugins or when the built-in methods do not cover the needed logic:

| Method | Signature | Description |
|--------|-----------|-------------|
| `each` | `each(callback, useLocalCoordinates=False, combine=True, clean=True)` | Call `callback(obj)` for each stack item and collect results |
| `eachpoint` | `eachpoint(callback, useLocalCoordinates=False)` | Call `callback` for each point/location on the stack |

### Notes on Iteration

- Methods like `circle()`, `rect()`, `hole()`, `cboreHole()`, `cskHole()`, `box()`, etc. all iterate over stack items implicitly.
- `rarray()` and `polarArray()` push multiple `Vector` points onto the stack precisely so that subsequent calls iterate over them.
- If the stack contains a single item, the method runs once — no special handling required.

---

## An Introspective Example

This example traces the internal state of a `Workplane` chain step-by-step, showing how `objects`, `parent`, `plane`, and the shared `CQContext` (with `pendingWires`, `pendingEdges`, and `tags`) evolve.

### Setup: Custom Repr Helpers

```python
import cadquery as cq

def tidy_repr(obj):
    return repr(obj).split(".")[-1].rstrip(">")

def _ctx_str(self):
    return (
        tidy_repr(self) + ":\n"
        + f"    pendingWires: {self.pendingWires}\n"
        + f"    pendingEdges: {self.pendingEdges}\n"
        + f"    tags: {self.tags}"
    )
cq.cq.CQContext.__str__ = _ctx_str

def _plane_str(self):
    return (
        tidy_repr(self) + ":\n"
        + f"    origin: {self.origin.toTuple()}\n"
        + f"    z direction: {self.zDir.toTuple()}"
    )
cq.occ_impl.geom.Plane.__str__ = _plane_str

def _wp_str(self):
    out = tidy_repr(self) + ":\n"
    out += f"  parent: {tidy_repr(self.parent)}\n" if self.parent else "  no parent\n"
    out += f"  plane: {self.plane}\n"
    out += f"  objects: {self.objects}\n"
    out += f"  modelling context: {self.ctx}"
    return out
cq.Workplane.__str__ = _wp_str
```

### The Part Being Built

```python
part = (
    cq.Workplane()
    .box(1, 1, 1)
    .tag("base")
    .wires(">Z")
    .toPending()
    .translate((0.1, 0.1, 1.0))
    .toPending()
    .loft()
    .faces(">>X", tag="base")
    .workplane(centerOption="CenterOfMass")
    .circle(0.2)
    .extrude(1)
)
```

### Step-by-Step State

| Step | Key observations |
|------|-----------------|
| `cq.Workplane()` | No parent. Empty `objects`. Empty `pendingWires`. Empty `tags`. |
| `.box(1,1,1)` | New node; `parent` = previous node. `objects` = `[Solid]`. Same `CQContext` shared. |
| `.tag("base")` | Returns the **same** node (no new node). `ctx.tags = {'base': <this Workplane>}`. |
| `.wires(">Z")` | New node. `objects` = `[Wire]` (top face wire). |
| `.toPending()` | Returns same node. Wire added to `ctx.pendingWires`. |
| `.translate((0.1,0.1,1.0))` | New node. `objects` = `[Wire]` (translated copy). `pendingWires` still has only first wire. |
| `.toPending()` | Returns same node. Second wire added to `ctx.pendingWires` (now 2 wires). |
| `.loft()` | New node. `objects` = `[Compound]`. `pendingWires` cleared. |
| `.faces(">>X", tag="base")` | Selects face from the **tagged** node (the original box), not the loft result. |
| `.workplane(centerOption="CenterOfMass")` | New node. `plane.zDir` now points in global X. `objects` cleared. |
| `.circle(0.2)` | New node. `objects` = `[Wire]`. Wire also in `pendingWires`. |
| `.extrude(1)` | New node. Extrudes pending wire. `pendingWires` cleared. `objects` = `[Compound]`. |

### Key Takeaways

- `tag()` and `toPending()` mutate the **current** node in-place; all other methods produce a new node.
- The single `CQContext` object (same memory address throughout) is shared across every node — this is how `pendingWires` accumulate across separate `toPending()` calls.
- Selection methods using `tag=` pull objects from the tagged node's `objects` list, not from the current node. This allows selecting geometry from earlier in the chain after the working plane has moved.
- After `loft()`, the resulting `Compound` contains exactly one solid (accessible via `findSolid().Solids()`).
- After `extrude(clean=True)` (the default), a further `clean()` node is created internally, so the final object is two steps down from the `circle()` node.

## Related

- [The Stack](./stack.md)
- [Chaining](./chaining.md)
- [The Context Solid](./context-solid.md)
- [2D Construction](./2d-construction.md)
- [3D Construction](./3d-construction.md)
