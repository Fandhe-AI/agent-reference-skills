# ComputeNodeGraph.Pipelines

Fully-compiled shaders for a compute graph. Pipelines construct `ComputeGraphSimulation` objects, and one pipeline can be used by many simulations at the same time.

## Signature / Usage

```swift
struct Pipelines

init(_ graph: ComputeNodeGraph) throws
init(_ graph: ComputeNodeGraph) async throws
init(descriptor: ComputeNodeGraph.PipelinesDescriptor) throws
init(descriptor: ComputeNodeGraph.PipelinesDescriptor) async throws
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(_:)` | `throws` / `async throws` | Assembles and compiles pipelines from the provided graph |
| `init(descriptor:)` | `throws` / `async throws` | Compiles pipelines from a `PipelinesDescriptor` (no abstract on the official page) |
| `assembly` | `ComputeNodeGraph.Assembly` | The assembly the pipelines were compiled from |
| `options` | `ComputeNodeGraph.Pipelines.Options` | Compilation options |
| `Options` | nested struct | Pipeline options (no abstract on the official page; `debugDraw` appears as an option in the `PipelinesDescriptor` example) |

## Notes

- Introduced in iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+; also listed for Reality Composer Pro. Conforms to `Sendable`, `SendableMetatype`.
- Third step of the pipeline: `ComputeNodeGraph` -> `Assembly` -> `Pipelines`.
- Part of Compute Graph (RealityKit particle / compute-simulation node graph), distinct from `MPSGraph` in the apple-silicon skill.
- Source: https://developer.apple.com/documentation/computegraph/computenodegraph/pipelines (fetched 2026-10).

## Related

- [ComputeNodeGraph](./computenodegraph.md)
- [ComputeNodeGraph.PipelinesDescriptor](./computenodegraph-pipelinesdescriptor.md)
- [ComputeGraphSimulation](./computegraphsimulation.md)
