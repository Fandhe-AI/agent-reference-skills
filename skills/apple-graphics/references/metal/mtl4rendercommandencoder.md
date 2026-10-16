# MTL4RenderCommandEncoder

Metal 4 API. Encodes configuration and draw commands for a single render pass into a command buffer.

## Signature / Usage

```swift
protocol MTL4RenderCommandEncoder : MTL4CommandEncoder

// Create from an MTL4CommandBuffer
makeRenderCommandEncoder(descriptor: MTL4RenderPassDescriptor, options: MTL4RenderEncoderOptions) -> (any MTL4RenderCommandEncoder)?

// Typical flow
setRenderPipelineState(_:)   // an MTLRenderPipelineState
setViewport(_:)
setScissorRect(_:)
setDepthStencilState(_:)
setArgumentTable(_:stages:)  // an MTL4ArgumentTable
drawPrimitives(primitiveType:vertexStart:vertexCount:)
endEncoding()
```

## Options / Props

| Topic | Members | Description |
|-------|---------|-------------|
| Pipeline state | `setRenderPipelineState(_:)` | Set the pipeline state for a render pass |
| Argument tables | `setArgumentTable(_:stages:)` | Associates an argument table with a set of render stages |
| Attachment actions | `setColorStoreAction(_:index:)`, `setDepthStoreAction(_:)`, `setStencilStoreAction(_:)` | Configure store actions for attachments |
| Blend | `setBlendColor(red:green:blue:alpha:)`, `setColorAttachmentMap(_:)` | `setColorAttachmentMap` sets the mapping from logical shader color output to physical render pass color attachments |
| Rendering behavior | `setTriangleFillMode(_:)`, `setFrontFacing(_:)`, `setCullMode(_:)` | Triangle fill, winding, culling |
| Depth / stencil | `setDepthStencilState(_:)`, `setDepthBias(_:slopeScale:clamp:)`, `setDepthClipMode(_:)`, `setDepthTestBounds(_:)`, `setStencilReferenceValue(_:)`, `setStencilReferenceValue(front:back:)` | Depth and stencil behavior |
| Viewport / scissor | `setViewport(_:)`, `setViewports(_:)`, `setScissorRect(_:)`, `setScissorRects(_:)` | Viewport and scissor behavior |
| Visibility | `setVisibilityResultMode(_:offset:)` | Visibility testing |
| Vertex amplification | `setVertexAmplificationCount(_:)` (two overloads) | Vertex amplification |
| Threadgroup memory | `setObjectThreadgroupMemoryLength(_:index:)`, `setThreadgroupMemoryLength(_:offset:index:)` | Persistent threadgroup memory |
| Draw with vertices | `drawPrimitives(primitiveType:vertexStart:vertexCount:)`, `...instanceCount:)`, `...instanceCount:baseInstance:)`, `drawPrimitives(primitiveType:indirectBuffer:)` | Render primitives with vertex shaders |
| Draw with indexed vertices | `drawIndexedPrimitives(primitiveType:indexCount:indexType:indexBuffer:indexBufferLength:)` and overloads with `instanceCount:`, `instanceCount:baseVertex:baseInstance:`, and `indexType:indexBuffer:indexBufferLength:indirectBuffer:` | Render indexed primitives; index and indirect buffers are `MTLGPUAddress` values |
| Draw with meshes | `drawMeshThreads(threadsPerGrid:threadsPerObjectThreadgroup:threadsPerMeshThreadgroup:)`, `drawMeshThreadgroups(threadgroupsPerGrid:...)`, `drawMeshThreadgroups(indirectBuffer:...)` | Render meshes with mesh and object shaders |
| Tile shaders | `dispatchThreadsPerTile(_:)`, `tileWidth`, `tileHeight` | Dispatch tile shaders within a render pass |
| Indirect command buffers | `executeCommands(buffer:range:)`, `executeCommands(buffer:indirectBuffer:)` | Invoke commands within an indirect command buffer |
| Counters | `writeTimestamp(granularity:after:counterHeap:index:)` | Writes a GPU timestamp into the given `MTL4CounterHeap` at `index` after the stage completes |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+. Inherits from `MTL4CommandEncoder`.
- Difference from classic `MTLRenderCommandEncoder`: the Metal 4 encoder has no methods that bind individual buffers, textures, and heaps. Configure resource bindings in an `MTL4ArgumentTable` and bind the table to one or more pipeline stages with `setArgumentTable(_:stages:)`.
- Compared with `MTLRenderCommandEncoder`, `MTL4RenderCommandEncoder` removes the methods that manage resource bindings and residency sets, and the methods that configure store-action options and tessellation. Add a residency set to the encoder's command buffer or to the command queue instead, and use mesh shaders in place of tessellation. Store-action options (`MTLStoreActionOptions`) are not available because they do not apply to Apple silicon GPUs.
- Supports encoding a render pass across command buffers by suspending the work at the end of one render encoder and resuming it after the beginning of the next; this conceptually replaces `MTLParallelRenderCommandEncoder`.
- Create the encoder with `MTL4CommandBuffer.makeRenderCommandEncoder(descriptor:options:)`. Finish with `MTL4CommandEncoder.endEncoding()`. The encoder keeps its current state and applies it to all subsequent draw commands.
- Create pipeline states at a noncritical time such as launch to avoid visual stutter.
- Command stages: draw primitives and indexed draws apply to the vertex and fragment stages; mesh draws apply to object, mesh, and fragment; `dispatchThreadsPerTile(_:)` applies to tile; `executeCommands` and `writeTimestamp` apply to no stage, so a barrier cannot wait for all commands in an indirect command buffer (each command inside it applies to the same stages as the equivalent direct command). Draw commands do not apply to fragment when the pipeline state disables rasterization, and mesh draws do not apply to object when the pipeline state has no object shader.
- Source: https://developer.apple.com/documentation/metal/mtl4rendercommandencoder

## Related

- [MTL4ArgumentTable](./mtl4argumenttable.md)
- [MTL4CommandBuffer](./mtl4commandbuffer.md)
- [MTL4RenderPipelineDescriptor](./mtl4renderpipelinedescriptor.md)
- [MTLRenderCommandEncoder](./mtlrendercommandencoder.md)
