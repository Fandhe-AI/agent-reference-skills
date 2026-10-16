# ComputeNodeGraph.PipelinesDescriptor

Specifies the configuration used to compile a set of compute pipelines for a compute graph effect. Use it when you need explicit control over pipeline compilation, for example to supply Metal libraries from multiple bundles or to enable debug draw.

## Signature / Usage

```swift
var descriptor = ComputeNodeGraph.PipelinesDescriptor(assembly: assembly)
descriptor.addLibrary(myMTLLibrary, bundle: "com.example.MyEffects")
descriptor.options.debugDraw = true
let pipelines = try await ComputeNodeGraph.Pipelines(descriptor: descriptor)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(assembly:)` | `init(assembly: ComputeNodeGraph.Assembly)` | Creates a descriptor configured for the given graph assembly |
| `assembly` | `ComputeNodeGraph.Assembly` | The assembled compute graph layout that defines the graph's buffer, uniform, and texture configuration |
| `libraries` | `[ComputeNodeGraph.LibraryReference]` | The Metal libraries that provide shader function implementations for the graph's nodes |
| `options` | `ComputeNodeGraph.Pipelines.Options` | Options controlling pipeline compilation, such as whether debug draw is enabled |
| `addLibrary(_:bundle:)` | `func addLibrary(any MTLLibrary, bundle: String?)` | Adds a Metal library (no abstract on the official page) |
| `setLibrary(_:)` | `func setLibrary(ComputeNodeGraph.Library)` | Sets the library (no abstract on the official page) |

## Notes

- Introduced in iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+; also listed for Reality Composer Pro. Conforms to `Sendable`, `SendableMetatype`.
- Pass the configured descriptor to `ComputeNodeGraph.Pipelines.init(descriptor:)` to compile.
- Part of Compute Graph (RealityKit particle / compute-simulation node graph), distinct from `MPSGraph` in the apple-silicon skill.
- Source: https://developer.apple.com/documentation/computegraph/computenodegraph/pipelinesdescriptor (fetched 2026-10).

## Related

- [ComputeNodeGraph.Pipelines](./computenodegraph-pipelines.md)
- [ComputeNodeGraph.Library](./computenodegraph-library.md)
- [ComputeNodeGraph](./computenodegraph.md)
