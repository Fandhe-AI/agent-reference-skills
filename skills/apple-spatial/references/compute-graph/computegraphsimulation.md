# ComputeGraphSimulation

A simulation of particles, which use a single pipeline. The class is independent of the output, which makes for simpler testing. `ComputeGraphSimulation.SimulationRate` specifies the rate and mode for the simulation.

## Signature / Usage

```swift
final class ComputeGraphSimulation

convenience init(pipelines: ComputeNodeGraph.Pipelines?)
convenience init(pipelines: ComputeNodeGraph.Pipelines, commandQueue: any MTLCommandQueue)

func advance(_ params: ComputeGraphSimulation.AdvanceParams)
func spawn(elements: borrowing [ElementSpawnParameters], in: Int?, using: any MTLComputeCommandEncoder)
```

## Options / Props

Properties and methods:

| Name | Type | Description |
|------|------|-------------|
| `pipelines` | `ComputeNodeGraph.Pipelines` | Pipelines the simulation runs |
| `commandQueue` | `any MTLCommandQueue` | Command queue |
| `graphUniforms` | `any MTLBuffer` | Returns a read-only copy of the uniforms buffer |
| `simulationRate` | `ComputeGraphSimulation.SimulationRate` | Specifies the current simulation rate |
| `advance(_:)` | `(AdvanceParams)` | Advances the simulation by one time step, encoding all simulation stage dispatches into the command buffer and encoder provided by `params` |
| `fastForward(stepCount:stepDeltaTime:)` | `(Int, Float)` | Advances the particle simulation by multiple steps in a single operation |
| `fastForward()` | `()` | Fast-forward without arguments |
| `spawn(elements:in:using:)` | see above | Spawns new elements into the simulation with the given initial parameters |
| `reset(encoder:)` | `(any MTLComputeCommandEncoder)` | Resets the simulation to its initial state, clearing all live elements and accumulated time |
| `resetRandomSeeds(using:)` | `(() -> UInt32)` | Resets random seeds using the provided randomness function |
| `isOutputEnabled(_:)` | `(Int) -> Bool` | Returns whether the specified output is currently enabled for simulation |
| `setOutputEnabled(_:enabled:)` | `(Int, enabled: Bool)` | Enables or disables execution of the provided output stage, without disabling the system it represents |
| `setTexture(_:at:)` | `((any MTLTexture)?, at: Int)` | Binds a Metal texture to the texture slot at the given index |
| `setTextures(_:)` / `texture(at:)` | | Set all textures / read a texture |
| `setBuffer(_:bufferOffset:at:)` | `Int` or `ComputeNodeGraph.Assembly.Location` | Bind a Metal buffer (no abstract on the official page) |
| `setBuffer(_:bufferOffset:elementCount:at:)` / `setBuffers(_:bufferOffsets:)` / `buffer(at:)` | | Buffer binding variants |
| `setUniform(_:named:)` | `<V>(V, named: String) -> Bool` | Finds the named uniform and sets it to the given BitwiseCopyable value |
| `setUniformValue(_:at:)` | `<V>(V, at: Assembly.Location)` | Copies the contents of `value` into the location specified by `relocation` |
| `setUniformData(_:at:)` | `(Data, at: Assembly.Location)` | Set uniform data at a location |
| `modifyUniforms(_:)` | closure over `UnsafeMutableRawBufferPointer` | Provides read/write access to the entire uniforms buffer for CPU access |
| `addUserResource(_:)` | `(any MTLResource)` | Registers a resource for residency on all command encoders used by this simulation |
| `setUserResources(_:)` | `([any MTLResource])` | Sets additional resources for residency on all command buffers used by this simulation, replacing any previously added resources |

`ComputeGraphSimulation.SimulationRate` (struct, Equatable):

| Name | Type | Description |
|------|------|-------------|
| `default` | `static var` | Default rate (no abstract on the official page) |
| `init()` | initializer | Initializes a SimulationRate structure using default values |
| `mode` | `SimulationRate.Mode` | The simulation mode that determines how time steps are calculated |
| `frequency` | `Float` | The number of simulation steps per second, used when `mode` is `fixedFrequency` |
| `timeDelta` | `Float` | The fixed time interval in seconds between simulation steps, used when `mode` is `fixedTime` |

`SimulationRate.Mode` cases: `fixedFrequency` ("Simulate using a fixed number of steps per second."), `fixedTime` ("Simulate using time delta.").

`ComputeGraphSimulation.AdvanceParams`: "Parameters for advancing a compute graph simulation by one time step." Per the framework overview it carries the time delta, a Metal command buffer, a compute encoder, and optional world-space transforms.

## Notes

- Introduced in iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+; also listed for Reality Composer Pro.
- Call `advance(_:)` each frame to drive GPU execution. To inject elements programmatically, call `spawn(elements:in:using:)` with `ElementSpawnParameters` values.
- Compute Graph drives RealityKit particle and compute simulations through a node graph. It is distinct from `MPSGraph` (Metal Performance Shaders Graph) in the apple-silicon skill, and `ComputeGraphSimulation` is unrelated to MPS graph execution.
- `ComputeGraphComponent.simulationRate` in the RealityKit pages is typed `ComputeGraphSimulation.SimulationRate`.
- Source: https://developer.apple.com/documentation/computegraph/computegraphsimulation and https://developer.apple.com/documentation/computegraph/computegraphsimulation/simulationrate-swift.struct (fetched 2026-10).

## Related

- [ComputeNodeGraph.Pipelines](./computenodegraph-pipelines.md)
- [ElementSpawnParameters](./elementspawnparameters.md)
- [ElementGrouping](./elementgrouping.md)
- [CoordinateSpace / Sorting / Topology](./simulation-options.md)
