# Metal

| Name | Description | Path |
|------|-------------|------|
| MTLDevice | Primary GPU interface; factory for all Metal objects | [mtldevice.md](./mtldevice.md) |
| MTLCommandQueue | Ordered queue for submitting command buffers to the GPU | [mtlcommandqueue.md](./mtlcommandqueue.md) |
| MTLCommandBuffer | Container that stores a sequence of GPU commands | [mtlcommandbuffer.md](./mtlcommandbuffer.md) |
| MTLRenderCommandEncoder | Encodes draw commands for a single render pass | [mtlrendercommandencoder.md](./mtlrendercommandencoder.md) |
| MTLComputeCommandEncoder | Encodes compute dispatch commands for a single compute pass | [mtlcomputecommandencoder.md](./mtlcomputecommandencoder.md) |
| MTLRenderPipelineState | Compiled GPU render pipeline (vertex + fragment shaders + settings) | [mtlrenderpipelinestate.md](./mtlrenderpipelinestate.md) |
| MTLRenderPipelineDescriptor | Configuration object for creating a render pipeline state | [mtlrenderpipelinedescriptor.md](./mtlrenderpipelinedescriptor.md) |
| MTLComputePipelineState | Compiled GPU compute pipeline for running kernels | [mtlcomputepipelinestate.md](./mtlcomputepipelinestate.md) |
| MTLBuffer | GPU resource for storing untyped app-defined data | [mtlbuffer.md](./mtlbuffer.md) |
| MTLTexture | GPU resource holding formatted image data | [mtltexture.md](./mtltexture.md) |
| MTLTextureDescriptor | Configuration object for creating Metal textures | [mtltexturedescriptor.md](./mtltexturedescriptor.md) |
| MTLLibrary | Collection of compiled Metal shader functions | [mtllibrary.md](./mtllibrary.md) |
| MTLFunction | A public shader function (vertex, fragment, or kernel) in a library | [mtlfunction.md](./mtlfunction.md) |
| MTLRenderPassDescriptor | Group of render targets (attachments) for a render pass | [mtlrenderpassdescriptor.md](./mtlrenderpassdescriptor.md) |
| MTKView | Metal-aware view that manages drawables and render pass descriptors | [mtkview.md](./mtkview.md) |
| MTKTextureLoader | Creates MTLTexture instances from common image formats | [mtktextureloader.md](./mtktextureloader.md) |
