# free-function

| Name | Description | Path |
|------|-------------|------|
| Adding Features Manually | Add holes, protrusions, and custom features to faces and solids without boolean operations, using face-level mutation methods (`addHole`, `replace`, `remove`) and explicit `shell()` construction. | [adding-features.md](./adding-features.md) |
| Boolean Operations | Boolean operations on 2D and 3D shapes, available as operators (`+`, `-`, `*`, `/`) and as free functions. | [boolean-operations.md](./boolean-operations.md) |
| Operations | Shape-forming operations: extrude, sweep, loft, revolve, offset, fillet, and chamfer. | [operations.md](./operations.md) |
| Mapping onto Parametric Space | Trim faces using (u,v) space coordinates and map edges, wires, and faces onto curved base surfaces. | [parametric-mapping.md](./parametric-mapping.md) |
| Placement | Positioning shapes and creating patterns using the `.move()` and `.moved()` method overloads on `Shape`. | [placement.md](./placement.md) |
| Primitives | 1D, 2D, and 3D primitive shape constructors available in `cadquery.func`. | [primitives.md](./primitives.md) |
| Shape Construction | Assembling lower-dimensional shapes (edges, wires, faces) into higher-level shapes (wires, faces, shells, solids, compounds). | [shape-construction.md](./shape-construction.md) |
| Text | Create flat, spine-following, or surface-projected text using the `text()` free function. | [text.md](./text.md) |
| Tutorial | Introduction to building `Shape` objects using the free function API by sequentially constructing faces and assembling them into a solid. | [tutorial.md](./tutorial.md) |
