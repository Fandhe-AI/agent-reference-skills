# ComputeGraphOutputComponent

A transient component that identifies the compute graph output associated with an entity.

## Signature / Usage

```swift
struct ComputeGraphOutputComponent: Component, TransientComponent

var outputID: ComputeNodeGraph.NodeID
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `outputID` | `ComputeNodeGraph.NodeID` | The identifier of the output node in the compute graph that this entity represents |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+
- The system attaches this component to child entities that represent individual graph outputs. Use `outputID` to correlate the entity with a specific output inside the owning entity's running simulation.
- Conforms to `Component` and `TransientComponent`.

## Related

- [ComputeGraphComponent](./computegraphcomponent.md)
- [ComputeGraphRuntimeComponent](./computegraphruntimecomponent.md)
