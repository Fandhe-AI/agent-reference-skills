# MTL4RenderPipelineDescriptor

Metal 4 API. Groups together properties to create a render pipeline state object.

## Signature / Usage

```swift
class MTL4RenderPipelineDescriptor: MTL4PipelineDescriptor

let descriptor = MTL4RenderPipelineDescriptor()
descriptor.vertexFunctionDescriptor   = vertexFnDescriptor
descriptor.fragmentFunctionDescriptor = fragmentFnDescriptor
descriptor.colorAttachments[0].pixelFormat = .bgra8Unorm
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `vertexFunctionDescriptor` | `MTL4FunctionDescriptor?` | Assigns the shader function that this pipeline executes for each vertex |
| `fragmentFunctionDescriptor` | `MTL4FunctionDescriptor?` | Assigns the shader function that this pipeline executes for each fragment |
| `vertexDescriptor` | `MTLVertexDescriptor?` | Configures an optional vertex descriptor for the vertex input |
| `colorAttachments` | `MTL4RenderPipelineColorAttachmentDescriptorArray` | Array of color attachments this pipeline writes to |
| `inputPrimitiveTopology` | `MTLPrimitiveTopologyClass` | Assigns the type of primitive topology this pipeline renders |
| `isRasterizationEnabled` | `Bool` | Determines whether the pipeline rasterizes primitives |
| `rasterSampleCount` | `Int` | Controls the number of samples this pipeline applies for each fragment |
| `alphaToCoverageState` | `MTL4AlphaToCoverageState` | Whether to read and use the alpha channel fragment output of color attachments to compute a sample coverage mask |
| `alphaToOneState` | `MTL4AlphaToOneState` | Whether the pipeline forces alpha channel values of color attachments to the largest representable value |
| `colorAttachmentMappingState` | `MTL4LogicalToPhysicalColorAttachmentMappingState` | Configures a logical-to-physical rendering remap state |
| `maxVertexAmplificationCount` | `Int` | Maximum value that can be passed as the pipeline's amplification count |
| `supportIndirectCommandBuffers` | `MTL4IndirectCommandBufferSupportState` | Indicates whether the pipeline supports indirect command buffers |
| `supportVertexBinaryLinking` / `supportFragmentBinaryLinking` | `Bool` | Whether the pipeline can create new pipelines by adding binary functions to the vertex/fragment shader's callable functions list |
| `vertexStaticLinkingDescriptor` / `fragmentStaticLinkingDescriptor` | `MTL4StaticLinkingDescriptor!` | Static linking information for the vertex/fragment stage |
| `reset()` | `Void` | Resets this descriptor to its default state |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+.
- Metal 4 API, distinct from the classic `MTLRenderPipelineDescriptor`. Compared to `MTLRenderPipelineDescriptor`, this descriptor doesn't offer a mechanism to hint mutability of vertex/fragment buffers, and doesn't specify binary archives.

## Related

- [MTLRenderPipelineDescriptor](./mtlrenderpipelinedescriptor.md)
- [MTLRenderPipelineState](./mtlrenderpipelinestate.md)
- [MTL4CompilerDescriptor](./mtl4compilerdescriptor.md)
