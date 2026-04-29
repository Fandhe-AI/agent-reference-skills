# Workplane

| Name | Description | Path |
|------|-------------|------|
| Overview | Workplane class constructor, parameters, and internal data model | [./overview.md](./overview.md) |
| 2D Construction | Lines, arcs, curves, shapes, arrays, mirrors — all 2D drawing methods | [./2d-construction.md](./2d-construction.md) |
| 3D Construction | Primitives, extrude/revolve/sweep/loft, booleans, holes, fillets, chamfers | [./3d-construction.md](./3d-construction.md) |
| Selectors | String selector syntax and programmatic selector classes for filtering geometry | [./selectors.md](./selectors.md) |
| Construction Geometry | `forConstruction=True` parameter for non-solid locating geometry | [./construction-geometry.md](./construction-geometry.md) |
| The Stack | `objects` list, parent chain, and stack navigation methods (`val`, `end`, `first`, etc.) | [./stack.md](./stack.md) |
| Chaining | Fluent method chaining, `tag()`, and `workplaneFromTagged()` | [./chaining.md](./chaining.md) |
| The Context Solid | How CadQuery tracks and auto-combines the first created solid | [./context-solid.md](./context-solid.md) |
| Iteration + Introspective Example | Automatic per-stack-item iteration and step-by-step internal state walkthrough | [./iteration.md](./iteration.md) |
