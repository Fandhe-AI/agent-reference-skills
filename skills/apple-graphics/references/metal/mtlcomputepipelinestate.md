# MTLComputePipelineState

A compiled GPU pipeline configuration for running compute kernels. Applied to a compute command encoder before dispatching work. Create at non-critical times and reuse throughout the app's lifetime.

## Signature / Usage

```swift
// Compile once (e.g., at app launch)
let kernelFn      = library.makeFunction(name: "my_kernel")!
let pipelineState = try device.makeComputePipelineState(function: kernelFn)

// Use per-frame in a compute command encoder
let encoder = commandBuffer.makeComputeCommandEncoder()!
encoder.setComputePipelineState(pipelineState)

let w = pipelineState.threadExecutionWidth
let h = pipelineState.maxTotalThreadsPerThreadgroup / w
let threadsPerGroup = MTLSize(width: w, height: h, depth: 1)
let gridSize        = MTLSize(width: texture.width, height: texture.height, depth: 1)
encoder.dispatchThreads(gridSize, threadsPerThreadgroup: threadsPerGroup)
encoder.endEncoding()
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `maxTotalThreadsPerThreadgroup` | `Int` | Maximum threads that can be dispatched per threadgroup |
| `threadExecutionWidth` | `Int` | Number of threads the GPU executes simultaneously (SIMD width) |
| `staticThreadgroupMemoryLength` | `Int` | Bytes of statically allocated threadgroup memory |
| `requiredThreadsPerThreadgroup` | `MTLSize` | Required thread count per threadgroup if the kernel specifies one |
| `device` | `MTLDevice` | The GPU device that created this pipeline state |
| `label` | `String?` | Debug identifier |
| `gpuResourceID` | `MTLResourceID` | Unique identifier for use in argument buffers |
| `supportIndirectCommandBuffers` | `Bool` | Whether encoding into indirect command buffers is supported |
| `reflection` | `MTLComputePipelineReflection?` | Reflection metadata |
| `functionHandle(function:)` | `(any MTLFunctionHandle)?` | Function handle for a function this pipeline links at the binary level (`MTL4BinaryFunction`) (26.0+) |
| `functionHandle(withName:)` | `(any MTLFunctionHandle)?` | Function handle for a function this pipeline links at the Metal IR level, by name (26.0+) |
| `forwardProgressUsage` | `MTLForwardProgressUsage` | Read-only `MTLForwardProgressUsage` property; no official abstract (27.0+) |
| `recommendedPersistentThreadgroupsPerGrid(forThreadsPerThreadgroup:)` | `Int` | Method taking an `MTLSize` threads-per-threadgroup and returning an `Int`; no official abstract (27.0+) |

## Notes

- iOS 8.0+, iPadOS 8.0+, macOS 10.11+, tvOS, visionOS 1.0+, Mac Catalyst 13.1+.
- Conforms to `MTLAllocation` and `Sendable`.
- Use `threadExecutionWidth` and `maxTotalThreadsPerThreadgroup` to compute optimal threadgroup sizes dynamically.
- Create via `MTLDevice.makeComputePipelineState(function:)` or `makeComputePipelineState(descriptor:)` (descriptor form supports indirect command buffers and binary functions).
- `MTLForwardProgressUsage` cases are `automatic` / `simdGroupParallel` / `weak`, and `MTLContentionRelief` cases are `automatic` / `none` (both iOS 27.0+). They are specified through `forwardProgressUsage` / `contentionRelief` on `MTLComputePipelineDescriptor` / `MTL4ComputePipelineDescriptor`. The official pages give no behavioral description for them.
- Overall compute pipeline setup and GPU compute optimization belong to the apple-silicon skill; this skill covers the pipeline state object itself.

## Related

- [MTLComputeCommandEncoder](./mtlcomputecommandencoder.md)
- [MTLDevice](./mtldevice.md)
- [MTLLibrary](./mtllibrary.md)
- [MTLFunction](./mtlfunction.md)
