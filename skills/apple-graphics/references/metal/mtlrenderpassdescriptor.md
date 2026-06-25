# MTLRenderPassDescriptor

A group of render targets (attachments) that hold the results of a render pass. Passed to `MTLCommandBuffer.makeRenderCommandEncoder(descriptor:)` to begin a render pass.

## Signature / Usage

```swift
// Typically obtained from MTKView each frame
guard let descriptor = view.currentRenderPassDescriptor else { return }

// Or manually configured
let descriptor = MTLRenderPassDescriptor()
descriptor.colorAttachments[0].texture     = colorTexture
descriptor.colorAttachments[0].loadAction  = .clear
descriptor.colorAttachments[0].storeAction = .store
descriptor.colorAttachments[0].clearColor  = MTLClearColor(red: 0, green: 0, blue: 0, alpha: 1)
descriptor.depthAttachment.texture         = depthTexture
descriptor.depthAttachment.loadAction      = .clear
descriptor.depthAttachment.storeAction     = .dontCare
descriptor.depthAttachment.clearDepth      = 1.0

let encoder = commandBuffer.makeRenderCommandEncoder(descriptor: descriptor)!
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `colorAttachments` | `MTLRenderPassColorAttachmentDescriptorArray` | Array of color render target configurations |
| `depthAttachment` | `MTLRenderPassDepthAttachmentDescriptor` | Depth attachment configuration |
| `stencilAttachment` | `MTLRenderPassStencilAttachmentDescriptor` | Stencil attachment configuration |
| `renderTargetWidth` | `Int` | Width in pixels to constrain the render target |
| `renderTargetHeight` | `Int` | Height in pixels to constrain the render target |
| `renderTargetArrayLength` | `Int` | Number of active layers for layered rendering |
| `visibilityResultBuffer` | `MTLBuffer?` | Buffer for GPU-written visibility test results |
| `defaultRasterSampleCount` | `Int` | Raster sample count when no attachments are configured |

### Attachment load/store actions

| Action | Description |
|--------|-------------|
| `.clear` | Fills the attachment with the clear value at the start of the pass |
| `.load` | Preserves existing attachment contents |
| `.dontCare` | Attachment contents are undefined at the start |
| `.store` | Saves rendered contents at the end of the pass |
| `.multisampleResolve` | Resolves MSAA samples to a resolve texture |
| `.dontCare` (store) | Discards rendered contents (good for depth-only passes) |

## Notes

- iOS 8.0+, iPadOS 8.0+, macOS 10.11+, tvOS, visionOS 1.0+, Mac Catalyst 13.1+.
- Set `MTLTextureDescriptor.usage` to include `.renderTarget` on any texture used as an attachment to improve performance on tile-based GPUs.
- When using `MTKView`, prefer `view.currentRenderPassDescriptor` — it is pre-configured with the current drawable's texture.

## Related

- [MTLCommandBuffer](./mtlcommandbuffer.md)
- [MTLRenderCommandEncoder](./mtlrendercommandencoder.md)
- [MTLTexture](./mtltexture.md)
- [MTLTextureDescriptor](./mtltexturedescriptor.md)
