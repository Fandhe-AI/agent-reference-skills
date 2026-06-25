# MTLTextureDescriptor

Configuration object used to create `MTLTexture` instances. Metal copies property values into the new texture, so the descriptor can be reused for multiple creations.

## Signature / Usage

```swift
// Convenience constructor for a 2D texture
let desc = MTLTextureDescriptor.texture2DDescriptor(
    pixelFormat: .rgba8Unorm,
    width: 1024,
    height: 1024,
    mipmapped: true)
desc.usage       = [.shaderRead, .renderTarget]
desc.storageMode = .private

let texture = device.makeTexture(descriptor: desc)!
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `textureType` | `MTLTextureType` | Dimension and arrangement: `.type2D`, `.typeCube`, `.type3D`, `.type2DArray`, etc. |
| `pixelFormat` | `MTLPixelFormat` | Size and bit layout of each pixel (default `.rgba8Unorm`) |
| `width` | `Int` | Width in pixels of the base mipmap level |
| `height` | `Int` | Height in pixels of the base mipmap level |
| `depth` | `Int` | Depth in pixels of the base mipmap level (3D textures) |
| `mipmapLevelCount` | `Int` | Number of mipmap levels (default `1`) |
| `arrayLength` | `Int` | Number of slices in a texture array |
| `sampleCount` | `Int` | Samples per pixel for MSAA |
| `storageMode` | `MTLStorageMode` | Memory location and access: `.shared`, `.private`, `.managed` |
| `usage` | `MTLTextureUsage` | Combination of `.shaderRead`, `.shaderWrite`, `.renderTarget`, `.pixelFormatView` |
| `allowGPUOptimizedContents` | `Bool` | Allows GPU-internal compressed storage (default `true`) |
| `swizzle` | `MTLTextureSwizzleChannels` | Remaps RGBA channels when sampling |

### Convenience Constructors

| Method | Description |
|--------|-------------|
| `texture2DDescriptor(pixelFormat:width:height:mipmapped:)` | Creates a descriptor for a standard 2D texture |
| `textureCubeDescriptor(pixelFormat:size:mipmapped:)` | Creates a descriptor for a cube map |
| `textureBufferDescriptor(with:width:resourceOptions:usage:)` | Creates a descriptor for a texture buffer |

## Notes

- iOS 8.0+, iPadOS 8.0+, macOS 10.11+, tvOS, visionOS 1.0+, Mac Catalyst 13.1+.
- Use `.storageMode = .private` for GPU-only textures (render targets, depth buffers) for best performance.
- Set `usage` to include `.renderTarget` when the texture will be used as a render-pass attachment.

## Related

- [MTLTexture](./mtltexture.md)
- [MTLDevice](./mtldevice.md)
- [MTLBuffer](./mtlbuffer.md)
