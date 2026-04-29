# CadQuery API Reference

| Name | Description | Path |
|------|-------------|------|
| Sketch Initialization | Creating and initializing Sketch objects; `Sketch()`, `importDXF`, `finalize`, `copy`, `located`, `moved` | [./sketch-initialization.md](./sketch-initialization.md) |
| Sketch Selection | Selecting, tagging, and deleting sketch elements; `tag`, `select`, `reset`, `delete`, `faces`, `edges`, `vertices` | [./sketch-selection.md](./sketch-selection.md) |
| Sketching with Faces | Face-based sketch primitives and arrays; `rect`, `circle`, `ellipse`, `rarray`, `parray`, `fillet`, `chamfer`, `hull`, `offset` | [./sketch-faces.md](./sketch-faces.md) |
| Sketching with Edges and Constraints | Edge construction and constraint solver; `segment`, `arc`, `spline`, `close`, `assemble`, `constrain`, `solve` | [./sketch-edges-constraints.md](./sketch-edges-constraints.md) |
| Workplane Initialization | Creating Workplanes with named planes or custom `Plane` objects | [./workplane-initialization.md](./workplane-initialization.md) |
| 2D Operations | All 2D drawing methods: lines, arcs, shapes, arrays; `lineTo`, `rect`, `circle`, `rarray`, `polarArray`, `spline` | [./workplane-2d-operations.md](./workplane-2d-operations.md) |
| 3D Operations (Requiring 2D Workplane) | 3D solids and Booleans from 2D profiles; `extrude`, `revolve`, `loft`, `sweep`, `hole`, `box`, `union`, `cut` | [./workplane-3d-operations.md](./workplane-3d-operations.md) |
| 3D Operations (Not Requiring 2D Workplane) | Direct solid modifications; `fillet`, `chamfer`, `shell`, `split`, `rotate`, `translate`, `mirror` | [./workplane-3d-non-2d.md](./workplane-3d-non-2d.md) |
| File Management and Export | Import/export for STEP, STL, DXF, SVG, GLTF; `importStep`, `importDXF`, `exporters.export` | [./file-management.md](./file-management.md) |
| Iteration Methods | Apply callbacks across stack items; `each`, `eachpoint` | [./iteration-methods.md](./iteration-methods.md) |
| Stack and Selector Methods | Stack navigation and geometry selection; `faces`, `edges`, `vertices`, `val`, `end`, `add` | [./stack-selector-methods.md](./stack-selector-methods.md) |
| Selectors | Selector classes and string syntax; `>Z`, `\|X`, `%Plane`, `NearestToPointSelector`, `AreaNthSelector` | [./selectors-api.md](./selectors-api.md) |
| Assemblies | Hierarchical assemblies with constraints; `Assembly`, `add`, `constrain`, `solve`, `save`, `Color` | [./assemblies-api.md](./assemblies-api.md) |
| Cheatsheet | Quick-reference for all major operations, selectors, and patterns | [./cheatsheet.md](./cheatsheet.md) |
