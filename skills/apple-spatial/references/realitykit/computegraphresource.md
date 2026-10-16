# ComputeGraphResource

A loaded compute graph resource containing the graph definition, compiled pipelines, and all associated rendering assets.

## Signature / Usage

```swift
final class ComputeGraphResource

let resource = try await ComputeGraphResource(contentsOf: url)
var component = ComputeGraphComponent(resource: resource)
entity.components.set(component)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(contentsOf:bundle:)` | `convenience init(contentsOf: URL, bundle: Bundle?) async throws` | Loads a resource from a file URL |
| `init(contentsOf:)` | `convenience init(contentsOf: URL) async throws` | Deprecated; use `init(contentsOf:bundle:)` |
| `init(graph:pipelines:dependencies:)` | `convenience init(graph: ComputeNodeGraph, pipelines: ComputeNodeGraph.Pipelines, dependencies: ComputeGraphResource.Dependencies) throws` | Builds a resource from a graph, compiled pipelines, and dependencies |
| `BufferInfo` | `struct` | Nested type (no description in the source page) |
| `Dependencies` | `struct` | Nested type (no description in the source page) |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+
- Conforms to `Sendable` and `SendableMetatype`.
- Assign the resource to `ComputeGraphComponent.resource` to drive a simulation.
- Compute Graph here is RealityKit's particle/GPU simulation graph; it is distinct from MPSGraph (apple-silicon skill).
- Source: https://developer.apple.com/documentation/realitykit/computegraphresource (fetched 2026-10 from the DocC JSON).

## Related

- [ComputeGraphComponent](./computegraphcomponent.md)
- [ComputeGraphRuntimeComponent](./computegraphruntimecomponent.md)
