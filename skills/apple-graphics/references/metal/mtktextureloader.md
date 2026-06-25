# MTKTextureLoader

A MetalKit object that creates `MTLTexture` instances from common image formats (PNG, JPEG, TIFF, KTX, PVR), asset catalogs, `CGImage`, or raw `Data`. Infers output texture format and pixel format automatically.

## Signature / Usage

```swift
let loader = MTKTextureLoader(device: device)

// Synchronous load from URL
let texture = try loader.newTexture(URL: imageURL, options: nil)

// Async load from asset catalog
loader.newTexture(name: "AlbedoMap",
                  scaleFactor: 1.0,
                  bundle: nil,
                  options: [.SRGB: false]) { texture, error in
    guard let texture else { print(error!); return }
    self.albedoTexture = texture
}
```

## Options / Props

| Method | Description |
|--------|-------------|
| `newTexture(URL:options:)` | Synchronously loads a texture from a file URL |
| `newTexture(URL:options:completionHandler:)` | Asynchronously loads a texture from a file URL |
| `newTexture(name:scaleFactor:bundle:options:completionHandler:)` | Asynchronously loads from a named asset catalog entry |
| `newTextures(names:scaleFactor:bundle:options:completionHandler:)` | Asynchronously loads multiple named asset catalog textures |
| `newTexture(name:scaleFactor:displayGamut:bundle:options:)` | Synchronously loads from an asset catalog with display gamut |
| `newTexture(cgImage:options:)` | Synchronously creates a texture from a `CGImage` |
| `newTexture(data:options:)` | Synchronously creates a texture from in-memory image data |

### Common `MTKTextureLoader.Option` keys

| Option | Type | Description |
|--------|------|-------------|
| `.SRGB` | `Bool` | Interpret the source image as sRGB (`true`) or linear (`false`) |
| `.generateMipmaps` | `Bool` | Generate a full mipmap chain |
| `.textureUsage` | `MTLTextureUsage` | Override the usage flags of the created texture |
| `.textureStorageMode` | `MTLStorageMode` | Override the storage mode |
| `.cubeLayout` | `MTKTextureLoader.CubeLayout` | Layout of source data for cube map creation |
| `.origin` | `MTKTextureLoader.Origin` | Image data origin (`.topLeft`, `.bottomLeft`, `.flippedVertically`) |

## Notes

- iOS 9.0+, iPadOS 9.0+, macOS 10.11+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+.
- Inherits from `NSObject`.
- The loader automatically picks appropriate pixel formats; use `MTKTextureLoader.Option` to override.
- For best performance, use asynchronous methods on a background queue and pass textures back to the main thread when ready.

## Related

- [MTKView](./mtkview.md)
- [MTLTexture](./mtltexture.md)
- [MTLTextureDescriptor](./mtltexturedescriptor.md)
- [MTLDevice](./mtldevice.md)
