# MTLTexture

A Metal resource that holds formatted image data. Created via `MTLDevice` or `MTLBuffer` factory methods; size, type, and pixel format are immutable after creation.

## Signature / Usage

```swift
let desc = MTLTextureDescriptor.texture2DDescriptor(
    pixelFormat: .rgba8Unorm,
    width: 512, height: 512,
    mipmapped: false)
desc.usage = [.shaderRead, .renderTarget]

let texture = device.makeTexture(descriptor: desc)!
```

## Options / Props

| Property / Method | Type | Description |
|-------------------|------|-------------|
| `width` | `Int` | Width of the base mipmap level in pixels |
| `height` | `Int` | Height of the base mipmap level in pixels |
| `depth` | `Int` | Depth of the base mipmap level (3D textures) |
| `pixelFormat` | `MTLPixelFormat` | Format of each pixel |
| `textureType` | `MTLTextureType` | Dimension and arrangement (2D, cube, array, 3D, etc.) |
| `mipmapLevelCount` | `Int` | Number of mipmap levels |
| `arrayLength` | `Int` | Number of slices in a texture array |
| `sampleCount` | `Int` | Samples per pixel (MSAA) |
| `usage` | `MTLTextureUsage` | Allowed uses: `.shaderRead`, `.shaderWrite`, `.renderTarget`, etc. |
| `isFramebufferOnly` | `Bool` | `true` if the texture is only for render-target use |
| `allowGPUOptimizedContents` | `Bool` | Whether the GPU may store data in a compressed/optimized layout |
| `replace(region:mipmapLevel:withBytes:bytesPerRow:)` | `Void` | Copies CPU data into a mipmap level |
| `getBytes(_:bytesPerRow:from:mipmapLevel:)` | `Void` | Reads a mipmap level back to CPU memory |
| `makeTextureView(pixelFormat:)` | `MTLTexture?` | Creates a view reinterpreting the texture as a different pixel format |
| `makeTextureView(pixelFormat:textureType:levels:slices:)` | `MTLTexture?` | Creates a view over specific mip levels and slices |

## Notes

- iOS 8.0+, iPadOS 8.0+, macOS 10.11+, tvOS, visionOS 1.0+, Mac Catalyst 13.1+.
- Conforms to `MTLResource`.
- Texture views share storage with the source; writes to a view are visible through the original texture.
- Set `usage` to include `.renderTarget` when the texture will be used as a render-pass attachment — this can significantly improve performance on tile-based GPUs.

## Related

- [MTLTextureDescriptor](./mtltexturedescriptor.md)
- [MTLDevice](./mtldevice.md)
- [MTLBuffer](./mtlbuffer.md)
- [MTLRenderPassDescriptor](./mtlrenderpassdescriptor.md)
