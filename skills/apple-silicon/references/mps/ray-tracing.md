# ray-tracing

MPS's GPU ray-tracing kernel: `MPSRayIntersector` performs intersection tests between rays and geometry stored in an `MPSAccelerationStructure` (built from `MPSTriangleAccelerationStructure`, `MPSInstanceAccelerationStructure`, or the more general `MPSPolygonAccelerationStructure`/`MPSQuadrilateralAccelerationStructure`).

## Signature / Usage

```swift
let intersector = MPSRayIntersector(device: device)
intersector.rayDataType = .originMinDistanceDirectionMaxDistance

let accelerationStructure = MPSTriangleAccelerationStructure(device: device)
accelerationStructure.vertexBuffer = vertexBuffer
accelerationStructure.triangleCount = triangleCount
accelerationStructure.rebuild()

intersector.encodeIntersection(commandBuffer: commandBuffer,
                                intersectionType: .nearest,
                                rayBuffer: rayBuffer, rayBufferOffset: 0,
                                intersectionBuffer: intersectionBuffer, intersectionBufferOffset: 0,
                                rayCount: rayCount,
                                accelerationStructure: accelerationStructure)
```

## Options / Props

| Name | Description |
| --- | --- |
| `MPSRayIntersector` | Encodes ray/geometry intersection tests onto a command buffer |
| `MPSAccelerationStructure` | Base class for GPU-resident acceleration structures |
| `MPSTriangleAccelerationStructure` | Acceleration structure built from a triangle vertex/index buffer |
| `MPSInstanceAccelerationStructure` | Instances multiple acceleration structures with per-instance transforms |
| `MPSAccelerationStructureGroup` | Shares GPU memory across acceleration structures built for the same group |
| `MPSPolygonAccelerationStructure` / `MPSQuadrilateralAccelerationStructure` | Non-triangle geometry variants |

## Notes

- `MPSRayIntersector`'s own platform metadata carries `deprecatedAt` values (iOS/iPadOS/tvOS/Mac Catalyst 17.0, macOS 14.0, visionOS 1.0) even where the `deprecated` flag itself was not consistently set — treat the class as soft-deprecated from those releases onward.
- Apple's replacement is Metal's own ray-tracing API (`MTLAccelerationStructure`, intersection functions in a compute shader), documented under "Accelerating ray tracing and motion blur using Metal" and covered by the apple-graphics skill, not this one — `MPSRayIntersector`/`MPSAccelerationStructure*` are a distinct, older surface and should not be mixed with `MTLAccelerationStructure` APIs.
- `MPSSVGF`/`MPSSVGFDenoiser`/`MPSTemporalAA` (spatiotemporal denoising/anti-aliasing for ray-traced output) live in the MPS `Classes` topic section alongside these but are denoising post-processes, not intersection kernels.

## Related

- [MPSKernel](./mpskernel.md)
- [mpsndarray](./mpsndarray.md)
