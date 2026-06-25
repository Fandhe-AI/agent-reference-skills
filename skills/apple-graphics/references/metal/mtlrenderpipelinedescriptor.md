# MTLRenderPipelineDescriptor

Configuration object for creating an `MTLRenderPipelineState`. Specifies shaders, color attachments, depth/stencil formats, rasterization settings, and more.

## Signature / Usage

```swift
let descriptor = MTLRenderPipelineDescriptor()
descriptor.vertexFunction   = library.makeFunction(name: "vertex_main")
descriptor.fragmentFunction = library.makeFunction(name: "fragment_main")
descriptor.colorAttachments[0].pixelFormat = .bgra8Unorm
descriptor.depthAttachmentPixelFormat      = .depth32Float

let pipelineState = try device.makeRenderPipelineState(descriptor: descriptor)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `vertexFunction` | `MTLFunction?` | Vertex shader; required for most render pipelines |
| `fragmentFunction` | `MTLFunction?` | Fragment shader; `nil` disables rasterization (depth-only or vertex-to-buffer) |
| `vertexDescriptor` | `MTLVertexDescriptor?` | Describes per-vertex input attribute layout |
| `colorAttachments` | `MTLRenderPipelineColorAttachmentDescriptorArray` | Array of color render targets with blending settings |
| `depthAttachmentPixelFormat` | `MTLPixelFormat` | Pixel format for the depth attachment |
| `stencilAttachmentPixelFormat` | `MTLPixelFormat` | Pixel format for the stencil attachment |
| `isRasterizationEnabled` | `Bool` | Whether the pipeline rasterizes primitives (default `true`) |
| `rasterSampleCount` | `Int` | Number of samples per fragment for MSAA |
| `isAlphaToCoverageEnabled` | `Bool` | Uses alpha to compute coverage mask |
| `isAlphaToOneEnabled` | `Bool` | Forces alpha values to 1.0 |

## Notes

- iOS 8.0+, iPadOS 8.0+, macOS 10.11+, tvOS, visionOS 1.0+, Mac Catalyst 13.1+.
- Metal copies property values into the compiled pipeline state; the descriptor can be reused and modified to create additional pipeline states without affecting existing ones.

## Related

- [MTLRenderPipelineState](./mtlrenderpipelinestate.md)
- [MTLFunction](./mtlfunction.md)
- [MTLDevice](./mtldevice.md)
