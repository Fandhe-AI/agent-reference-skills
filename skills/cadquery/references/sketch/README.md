# sketch

| Name | Description | Path |
|------|-------------|------|
| Sketch Tutorial | The `cq.Sketch()` class provides a 2D sketching API for constructing faces and edges. There are three main construction approaches: face-based, edge-based, and constraint-based. All modifications happen in-place; Sketch does not implement history. | [tutorial.md](./tutorial.md) |
| Workplane Integration | A `Sketch` can be attached to a `Workplane` to drive 3D operations. Sketches can be created in-place with a fluent chain or pre-built and placed with `placeSketch()`. Supported 3D operations: `extrude()`, `twistExtrude()`, `revolve()`, `sweep()`, `cutBlind()`, `cutThruAll()`, `loft()`. | [workplane-integration.md](./workplane-integration.md) |
