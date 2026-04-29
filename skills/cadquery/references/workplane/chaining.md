# Chaining

CadQuery's fluent API is built on method chaining: every `Workplane` method returns a `Workplane` object, so operations can be written as a single expression without intermediate variables.

## Overview

- Each method call creates a new `Workplane` node whose `parent` points to the node it was called on.
- The chain reads naturally from top to bottom, mirroring the modelling sequence.
- The shared `CQContext` (modelling context) is propagated through every node in the chain, so pending wires, pending edges, and named tags are visible to all nodes.

## Signature / Usage

```python
result = (
    cq.Workplane("XY")
    .box(1, 2, 3)
    .faces(">Z")
    .workplane()
    .circle(0.25)
    .extrude(1)
)
```

## Tagging and Back-References

To reference an earlier point in the chain (without breaking the chain), use `tag()` and then reference that tag later:

```python
result = (
    cq.Workplane()
    .box(1, 1, 1)
    .tag("base")                            # name this node "base"
    .faces(">>X", tag="base")              # later: select from the tagged node
    .workplane(centerOption="CenterOfMass")
    .circle(0.2)
    .extrude(1)
)
```

## Key Methods for Chain Navigation

| Method | Description |
|--------|-------------|
| `tag(name)` | Store a named reference to the current Workplane in the shared context; returns **same** object |
| `workplaneFromTagged(name)` | Create a new Workplane whose plane is derived from the tagged Workplane |
| `end(n=1)` | Move `n` steps backward up the parent chain |

## Notes

- `tag()` is one of the few methods that returns the same Workplane object (no new node in the chain). This means chaining after `tag()` continues from the same position.
- `workplaneFromTagged()` lets you re-orient the working plane to a previously tagged position, which is especially useful after loft or sweep operations that change the active plane.
- The `parent` attribute is read-only; it is set automatically when a method creates a new node.

## Related

- [The Stack](./stack.md)
- [The Context Solid](./context-solid.md)
- [Iteration](./iteration.md)
- [Overview](./overview.md)
