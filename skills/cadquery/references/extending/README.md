# Extending CadQuery

| Name | Description | Path |
|------|-------------|------|
| Using OpenCascade Methods | Mixing OCP and CadQuery calls; wrapping OCP shapes with `cq.Shape.cast()` | [./opencascade-methods.md](./opencascade-methods.md) |
| Extending CadQuery: Plugins | Overview of what a CadQuery plugin is and how it integrates with the fluent API | [./plugins.md](./plugins.md) |
| The Stack | Structure of the Workplane stack (`self.objects`), item types, and coordinate rules | [./stack.md](./stack.md) |
| Preserving the Chain | Returning `self` vs. `newObject()` to keep the fluent chain intact | [./preserving-chain.md](./preserving-chain.md) |
| Helper Methods | Internal helpers: `newObject()`, `findSolid()`, `_makeWireAtPoints()`, `_addPendingWire()`, `plane` | [./helper-methods.md](./helper-methods.md) |
| Coordinate Systems | Global vs. local coordinates; converting with `plane.toWorldCoords()` / `toLocalCoords()` | [./coordinate-systems.md](./coordinate-systems.md) |
| Linking in your plugin | Attaching a function to `cq.Workplane` to register it as a plugin | [./linking.md](./linking.md) |
| CadQuery Example Plugins | Reference implementations: `polygon()` and `cboreHole()` | [./example-plugins.md](./example-plugins.md) |
| Plugin Example | Complete working plugin (`makeCubes`) using `eachpoint()` | [./plugin-example.md](./plugin-example.md) |
| Extending CadQuery: Special Methods | Functional API via `invoke()`, `map()`, `apply()` — no monkey-patching required | [./special-methods.md](./special-methods.md) |
