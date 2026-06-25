# MTLRenderPipelineState

A compiled GPU pipeline configuration for a render pass. Encapsulates vertex and fragment shaders together with rendering settings. Apply to a render command encoder before issuing draw calls.

## Signature / Usage

```swift
// Create the descriptor
let desc = MTLRenderPipelineDescriptor()
desc.vertexFunction   = library.makeFunction(name: "vertex_main")
desc.fragmentFunction = library.makeFunction(name: "fragment_main")
desc.colorAttachments[0].pixelFormat = .bgra8Unorm

// Compile (typically at app launch, not per-frame)
let pipelineState = try device.makeRenderPipelineState(descriptor: desc)

// Apply to an encoder
encoder.setRenderPipelineState(pipelineState)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `device` | `MTLDevice` | The GPU device that created this pipeline state |
| `label` | `String?` | Debug identifier |
| `gpuResourceID` | `MTLResourceID` | Unique identifier for use in argument buffers |
| `supportIndirectCommandBuffers` | `Bool` | Whether encoding into indirect command buffers is supported |
| `maxTotalThreadsPerThreadgroup` | `Int` | Max threads per threadgroup (tile shaders) |
| `threadgroupSizeMatchesTileSize` | `Bool` | Whether threadgroup size must match tile size (tile shaders) |
| `reflection` | `MTLRenderPipelineReflection?` | Reflection metadata, if available |

## Notes

- iOS 8.0+, iPadOS 8.0+, macOS 10.11+, tvOS, visionOS 1.0+, Mac Catalyst 13.1+.
- Pipeline state creation can be expensive; always create at non-critical times (app launch, level load). Once created, reuse freely throughout the app lifetime.
- Conforms to `MTLAllocation` and `Sendable`.

## Related

- [MTLRenderPipelineDescriptor](./mtlrenderpipelinedescriptor.md)
- [MTLRenderCommandEncoder](./mtlrendercommandencoder.md)
- [MTLDevice](./mtldevice.md)
- [MTLLibrary](./mtllibrary.md)
