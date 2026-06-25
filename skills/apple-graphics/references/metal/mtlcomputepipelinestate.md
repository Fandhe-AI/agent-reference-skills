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

## Notes

- iOS 8.0+, iPadOS 8.0+, macOS 10.11+, tvOS, visionOS 1.0+, Mac Catalyst 13.1+.
- Conforms to `MTLAllocation` and `Sendable`.
- Use `threadExecutionWidth` and `maxTotalThreadsPerThreadgroup` to compute optimal threadgroup sizes dynamically.
- Create via `MTLDevice.makeComputePipelineState(function:)` or `makeComputePipelineState(descriptor:)` (descriptor form supports indirect command buffers and binary functions).

## Related

- [MTLComputeCommandEncoder](./mtlcomputecommandencoder.md)
- [MTLDevice](./mtldevice.md)
- [MTLLibrary](./mtllibrary.md)
- [MTLFunction](./mtlfunction.md)
