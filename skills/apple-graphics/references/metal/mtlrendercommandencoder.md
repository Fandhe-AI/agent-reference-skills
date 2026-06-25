# MTLRenderCommandEncoder

Encodes configuration and draw commands for a single render pass into a command buffer. Manages the GPU rendering pipeline state and issues draw commands.

## Signature / Usage

```swift
let encoder = commandBuffer.makeRenderCommandEncoder(descriptor: renderPassDescriptor)!

encoder.setRenderPipelineState(pipelineState)
encoder.setVertexBuffer(vertexBuffer, offset: 0, index: 0)
encoder.setFragmentTexture(texture, index: 0)
encoder.drawPrimitives(type: .triangle, vertexStart: 0, vertexCount: 3)

encoder.endEncoding()
```

## Options / Props

| Method | Description |
|--------|-------------|
| `setRenderPipelineState(_:)` | Sets the active render pipeline state (required before drawing) |
| `setViewport(_:)` | Sets the rendering viewport |
| `setScissorRect(_:)` | Sets the scissor rectangle for clipping |
| `setVertexBuffer(_:offset:index:)` | Binds a buffer to the vertex shader at the given index |
| `setVertexTexture(_:index:)` | Binds a texture to the vertex shader |
| `setVertexSamplerState(_:index:)` | Binds a sampler state to the vertex shader |
| `setFragmentBuffer(_:offset:index:)` | Binds a buffer to the fragment shader at the given index |
| `setFragmentTexture(_:index:)` | Binds a texture to the fragment shader |
| `setFragmentSamplerState(_:index:)` | Binds a sampler state to the fragment shader |
| `drawPrimitives(type:vertexStart:vertexCount:)` | Draws a single non-indexed primitive instance |
| `drawPrimitives(type:vertexStart:vertexCount:instanceCount:)` | Draws multiple instances |
| `drawIndexedPrimitives(type:indexCount:indexType:indexBuffer:indexBufferOffset:)` | Draws indexed primitives |
| `drawIndexedPrimitives(type:indexCount:indexType:indexBuffer:indexBufferOffset:instanceCount:)` | Draws multiple indexed instances |
| `waitForFence(_:before:)` | Waits for a fence before the given pipeline stage |
| `updateFence(_:after:)` | Updates a fence after the given pipeline stage |
| `memoryBarrier(scope:after:before:)` | Inserts a memory barrier by scope |
| `endEncoding()` | Finalizes the render pass into the command buffer |

## Notes

- iOS 8.0+, iPadOS 8.0+, macOS 10.11+, tvOS, visionOS 1.0+, Mac Catalyst 13.1+.
- Conforms to `MTLCommandEncoder`, `NSObjectProtocol`.
- Create pipeline states at non-critical times (e.g., app launch) to avoid rendering stutter.
- The encoder applies its current configuration to all subsequent draw commands; reconfigure as needed between draw batches.

## Related

- [MTLCommandBuffer](./mtlcommandbuffer.md)
- [MTLRenderPipelineState](./mtlrenderpipelinestate.md)
- [MTLRenderPassDescriptor](./mtlrenderpassdescriptor.md)
- [MTLBuffer](./mtlbuffer.md)
- [MTLTexture](./mtltexture.md)
