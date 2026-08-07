# MTL4ArgumentTable

Metal 4 API. Provides a mechanism to manage and provide resource bindings for buffers, textures, sampler states and other Metal resources.

## Signature / Usage

```swift
protocol MTL4ArgumentTable: NSObjectProtocol

argumentTable.setAddress(bufferAddress, index: 0)
argumentTable.setTexture(textureID, index: 0)
```

## Options / Props

| Method / Property | Type | Description |
|-------------------|------|-------------|
| `device` | `MTLDevice` | The device from which you created this argument table |
| `label` | `String?` | Assigns an optional label with this argument table for debugging purposes |
| `setAddress(_:index:)` | `Void` | Binds a GPU address to a buffer binding slot |
| `setAddress(_:attributeStride:index:)` | `Void` | Binds a GPU address to a buffer binding slot, providing a dynamic vertex stride |
| `setTexture(_:index:)` | `Void` | Binds a texture to a texture binding slot |
| `setSamplerState(_:index:)` | `Void` | Binds a sampler state to a sampler state binding slot |
| `setResource(_:bufferIndex:)` | `Void` | Binds a resource to a buffer binding slot |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+.
- Metal 4 API. Replaces argument buffer/binding patterns from classic Metal encoders; bound to command encoders via `MTL4CommandEncoder` rather than set directly per-draw call.

## Related

- [MTL4CommandBuffer](./mtl4commandbuffer.md)
- [MTL4CommandQueue](./mtl4commandqueue.md)
