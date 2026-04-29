# Free Function API

| Name | Description | Path |
|------|-------------|------|
| Tutorial | End-to-end walkthrough: build a lofted solid and create a pattern using the free function API | [./tutorial.md](./tutorial.md) |
| Primitives | 1D/2D/3D primitive constructors: segment, circle, ellipse, rect, polyline, polygon, spline, plane, box, cylinder, sphere, torus, cone, compound | [./primitives.md](./primitives.md) |
| Boolean Operations | Union, difference, intersection, and split via operators (`+`, `-`, `*`, `/`) and functions: fuse, cut, intersect, split, imprint | [./boolean-operations.md](./boolean-operations.md) |
| Shape Construction | Assemble edges/wires/faces into higher shapes: wire, face, shell, solid, compound, fill, cap, clean | [./shape-construction.md](./shape-construction.md) |
| Operations | Shape-forming operations: extrude, revolve, sweep, loft, offset, fillet, chamfer | [./operations.md](./operations.md) |
| Placement | Position shapes and create patterns with `.move()` / `.moved()` and `Location` overloads | [./placement.md](./placement.md) |
| Text | Flat, spine-following, and surface-projected text with `text()` | [./text.md](./text.md) |
| Adding Features Manually | Add holes and protrusions without boolean ops using `addHole`, `replace`, `remove`, and local sewing | [./adding-features.md](./adding-features.md) |
| Mapping onto Parametric Space | Trim faces in (u,v) space and map edges/wires/faces onto curved surfaces: edgeOn, wireOn, faceOn, project | [./parametric-mapping.md](./parametric-mapping.md) |
