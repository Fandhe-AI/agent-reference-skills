# ComputeGraphComponent

A component that drives a compute graph–based particle simulation on an entity, executing a Metal compute pipeline each frame.

## Signature / Usage

```swift
struct ComputeGraphComponent: Component

var component = ComputeGraphComponent(resource: resource)
entity.components.set(component)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `resource` | `ComputeGraphResource?` | The compute graph resource that defines the simulation |
| `state` | `ComputeGraphComponent.SimulationState` | Current playback state (playing, paused, stepped) |
| `simulationRate` | `ComputeGraphSimulation.SimulationRate` | The rate at which the simulation updates |
| `randomSeed` | `UInt32?` | Optional fixed random seed for the simulation |
| `materials` | `[ComputeNodeGraph.NodeID : any Material]` | Per-output material overrides, keyed by output node identifier |
| `models` | `[ComputeNodeGraph.NodeID : ModelComponent]` | Per-output model component overrides, keyed by output node identifier |
| `pipelines` | `ComputeNodeGraph.Pipelines?` | Compiled pipelines used to execute the simulation |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+
- Conforms to `Component`.
- RealityKit automatically creates and manages a child entity for each graph output, each carrying its own `ModelComponent` and material.
- Playback control: `play()`, `pause()`, `step()`, `fastForward()`, `fastForward(stepCount:stepDeltaTime:)`.
- Element spawning: `spawn(element:in:)`, `spawn(elements:in:)`.
- Metal binding: `setBuffer(_:bufferOffset:elementCount:at:)`, `setTexture(_:at:)`, `setTexture(_:port:)`.
- Uniform access: `uniformHandle(named:)`, `setUniformValue(_:for:)`, `setUniformValue(_:named:)`, `setUniformData(_:for:)`, `replaceUniforms(_:)`.
- Output control: `isOutputEnabled(_:)`, `setOutputEnabled(_:enabled:)`, `findBufferIndex(port:)`, `firstBufferIndex(type:)`.
- visionOS 27 release notes: fixed `ComputeGraphComponent`s stored in a Reality file not rendering when loaded (177674901).
- The graph definition types (`ComputeNodeGraph`, `ComputeGraphSimulation`, and node types such as emitters and forces) live in the separate Compute Graph module; see the compute-graph category.

## Related

- [ComputeGraphResource](./computegraphresource.md)
- [ComputeGraphRuntimeComponent](./computegraphruntimecomponent.md)
- [ComputeGraphSharedUniforms](./computegraphshareduniforms.md)
- [ModelComponent](./modelcomponent.md)
- [Component](./component.md)
