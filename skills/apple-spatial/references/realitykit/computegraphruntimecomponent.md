# ComputeGraphRuntimeComponent

Manages the live GPU simulation for an entity's `ComputeGraphComponent_v1`.

## Signature / Usage

```swift
struct ComputeGraphRuntimeComponent: Component, TransientComponent

var simulation: ComputeGraphSimulation
func readOutput(_: ComputeNodeGraph.Port.Address) -> (any MTLBuffer)?
func readOutputs(_: ComputeNodeGraph.NodeID) -> [any MTLBuffer]?
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `simulation` | `ComputeGraphSimulation` | The underlying compute graph simulation driving this entity |
| `readOutput(_:)` | `(ComputeNodeGraph.Port.Address) -> (any MTLBuffer)?` | Returns the output buffer for the port at the given address |
| `readOutputs(_:)` | `(ComputeNodeGraph.NodeID) -> [any MTLBuffer]?` | Returns all output buffers for the given output node |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+
- RealityKit creates this component automatically on the first frame that a `ComputeGraphComponent` becomes active. You do not need to add it manually.
- Conforms to `Component` and `TransientComponent`.
- Source: https://developer.apple.com/documentation/realitykit/computegraphruntimecomponent (fetched 2026-10 from the DocC JSON).

## Related

- [ComputeGraphComponent](./computegraphcomponent.md)
- [ComputeGraphOutputComponent](./computegraphoutputcomponent.md)
