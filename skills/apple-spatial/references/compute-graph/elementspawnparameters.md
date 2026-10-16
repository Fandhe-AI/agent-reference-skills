# ElementSpawnParameters

Parameters used to configure the initial state of a particle when it is spawned in the simulation. The values become initial values in the Initialization stage, which can read or overwrite them.

## Signature / Usage

```swift
let params = ElementSpawnParameters(
    position: SIMD3<Float>(0, 1, 0),
    velocity: SIMD3<Float>(0, -1, 0),
    size: SIMD2<Float>(0.02, 0.02),
    color: SIMD4<Float>(1, 0.5, 0, 1),
    lifetime: 2.0
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `position` | `SIMD3<Float>` | The initial 3D position of the particle in world space coordinates |
| `velocity` | `SIMD3<Float>` | The initial velocity vector of the particle in world space units per second |
| `size` | `SIMD2<Float>` | The initial size of the particle as a 2D vector representing width and height |
| `color` | `SIMD4<Float>` | The initial color and alpha (transparency) of the particle |
| `lifetime` | `Float` | The initial lifetime of the particle in seconds |

## Notes

- Introduced in iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+; also listed for Reality Composer Pro. Conforms to `Sendable`, `SendableMetatype`.
- Initializer: `init(position:velocity:size:color:lifetime:)` ("Creates a new set of particle spawn parameters.").
- Passed to `ComputeGraphSimulation.spawn(elements:in:using:)`.
- Source: https://developer.apple.com/documentation/computegraph/elementspawnparameters (fetched 2026-10).

## Related

- [ComputeGraphSimulation](./computegraphsimulation.md)
- [Simulation-stage nodes](./simulation-stage-nodes.md)
