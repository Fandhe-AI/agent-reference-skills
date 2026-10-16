# CoordinateSpace / Sorting / Topology

Three enumerations that configure a Compute Graph simulation: where element positions are stored, how elements are sorted, and how output geometry is assembled.

## Signature / Usage

```swift
enum CoordinateSpace          // cases: local, world
enum Sorting                  // cases: none, age, timeToLive, frontToBack, backToFront
enum ComputeNodeGraph.Topology // cases: point, triangle, quad, octagon, strip, instances
```

## Options / Props

### CoordinateSpace

Simulation coordinate space, controlling how positions and orientations are stored.

| Name | Type | Description |
|------|------|-------------|
| `local` | case | Positions and orientations are stored in relative to the Entity |
| `world` | case | Positions and orientations are stored in relative to the Scene |

### Sorting

An enumeration of sorting modes. No per-case abstracts on the official page.

| Name | Type | Description |
|------|------|-------------|
| `none` | case | No abstract on the official page |
| `age` | case | No abstract on the official page |
| `timeToLive` | case | No abstract on the official page |
| `frontToBack` | case | No abstract on the official page |
| `backToFront` | case | No abstract on the official page |

### ComputeNodeGraph.Topology

The primitive topology used to assemble output geometry for an output stage. Set on an output stage via the `topology` property; it determines how the compute graph emits vertex data for each element and how that data is consumed by the render pipeline.

| Name | Type | Description |
|------|------|-------------|
| `point` | case | Each element emits a single vertex |
| `triangle` | case | Each element emits three vertices, rendered as an independent triangle |
| `quad` | case | Each element emits four vertices, rendered as a quad (two triangles) |
| `octagon` | case | Each element emits eight vertices, rendered as an octagon |
| `strip` | case | Elements share vertices in a triangle-strip winding order. Requires a simulation with a grouping of `strips` |
| `instances` | case | Elements are rendered as instanced meshes |

## Notes

- All three are introduced in iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+; also listed for Reality Composer Pro.
- `CoordinateSpace` and `Sorting` conform to `CaseIterable`, `Copyable`, `Decodable`, `Encodable`, `Equatable`, `Escapable`, `Hashable`, `RawRepresentable`, `Sendable`, `SendableMetatype`. `Topology` conforms to `CaseIterable`, `Copyable`, `Equatable`, `Escapable`, `Hashable`, `RawRepresentable`, `Sendable`, `SendableMetatype` (no Codable).
- `CoordinateSpace` here is the Compute Graph type, not RealityKit's coordinate-space APIs.
- Part of Compute Graph (RealityKit particle / compute-simulation node graph), distinct from `MPSGraph` in the apple-silicon skill.
- Sources: https://developer.apple.com/documentation/computegraph/coordinatespace, https://developer.apple.com/documentation/computegraph/sorting, https://developer.apple.com/documentation/computegraph/computenodegraph/topology (fetched 2026-10).

## Related

- [ElementGrouping](./elementgrouping.md)
- [ComputeNodeGraph](./computenodegraph.md)
- [ComputeGraphSimulation](./computegraphsimulation.md)
