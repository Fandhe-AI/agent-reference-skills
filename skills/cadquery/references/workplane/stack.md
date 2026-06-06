# The Stack

Each `Workplane` object holds a list of current geometric objects (`objects`) that represent the results of the most recent operation. Together with the parent chain, this forms the "stack" — the mechanism by which CadQuery tracks what you are working on at any point in a method chain.

## Overview

- Every method call (selector, drawing, or modelling) returns a **new** `Workplane` whose `objects` list contains the results of that step.
- The new `Workplane` stores a reference to the previous one in its `parent` attribute, forming a linked chain.
- Several methods traverse the parent chain to find context solids, tagged objects, or pending wires.

## Signature / Usage

```python
# Navigate backward through the stack with end()
top_face_verts = (
    cq.Workplane("XY")
    .box(1, 2, 3)
    .faces(">Z")
    .vertices()
)
# go back one level to the faces() result
face_wp = top_face_verts.end()
```

## Stack Access Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `val` | `val()` | Return the first object on the stack |
| `vals` | `vals()` | Return all objects as a list |
| `all` | `all()` | Return list of all `Workplane` objects wrapping each stack item |
| `first` | `first()` | New `Workplane` with only the first stack object |
| `item` | `item(i)` | New `Workplane` with only the ith stack object |
| `last` | `last()` | New `Workplane` with only the last stack object |
| `size` | `size()` | Number of objects currently on the stack |
| `add` | `add(obj)` | Add a shape, list of shapes, or another `Workplane` to the stack |
| `end` | `end(n=1)` | Return the nth ancestor `Workplane` in the parent chain |
| `newObject` | `newObject(objlist)` | Return a new `Workplane` with the given object list as its stack |
| `pushPoints` | `pushPoints(pntList)` | Push a list of points (as `Vector` or tuples) onto the stack |
| `copyWorkplane` | `copyWorkplane(obj)` | Copy the workplane (plane and center) from another `Workplane` object |

## Notes

- `end(1)` (default) moves one level up; `end(2)` moves two levels up, etc.
- The `parent` chain is purely navigational — all nodes in a chain share the **same** `CQContext` object, so pending wires and tags are visible everywhere in the chain regardless of which node you are on.
- `tag()` and `toPending()` return the **same** Workplane object (no new node); all other methods return a new node.
- Use `findSolid()` to retrieve the nearest solid by traversing the parent chain — this is what 3D operations use internally to locate the context solid.

## Related

- [Chaining](./chaining.md)
- [The Context Solid](./context-solid.md)
- [Iteration](./iteration.md)
- [Overview](./overview.md)
