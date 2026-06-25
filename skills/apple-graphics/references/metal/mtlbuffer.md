# MTLBuffer

A Metal resource that stores untyped data in a format defined by the app. Used to pass vertices, uniforms, and arbitrary data between the CPU and GPU.

## Signature / Usage

```swift
// Allocate a zeroed buffer
let buffer = device.makeBuffer(length: MemoryLayout<Uniforms>.size,
                               options: .storageModeShared)!

// Copy CPU data into a buffer
var uniforms = Uniforms(modelMatrix: matrix)
let buffer = device.makeBuffer(bytes: &uniforms,
                               length: MemoryLayout<Uniforms>.size,
                               options: .storageModeShared)!

// Access contents from CPU
let ptr = buffer.contents().bindMemory(to: Uniforms.self, capacity: 1)
ptr.pointee.modelMatrix = newMatrix
```

## Options / Props

| Method / Property | Type | Description |
|-------------------|------|-------------|
| `contents()` | `UnsafeMutableRawPointer` | System address of the buffer's storage for CPU read/write |
| `length` | `Int` | Logical size of the buffer in bytes (read-only) |
| `gpuAddress` | `MTLGPUAddress` | Direct GPU virtual address of the buffer |
| `makeTexture(descriptor:offset:bytesPerRow:)` | `MTLTexture?` | Creates a texture that shares storage with this buffer |
| `didModifyRange(_:)` | `Void` | Notifies Metal of CPU writes for managed-mode buffers |
| `addDebugMarker(_:range:)` | `Void` | Attaches a debug label to a byte range |
| `removeAllDebugMarkers()` | `Void` | Removes all debug markers |

## Notes

- iOS 8.0+, iPadOS 8.0+, macOS 10.11+, tvOS, visionOS 1.0+, Mac Catalyst 13.1+.
- Conforms to `MTLResource`, `MTLAllocation`.
- A buffer can only be used with the `MTLDevice` that created it.
- For `.storageModeManaged` buffers on macOS, call `didModifyRange(_:)` after every CPU write to synchronize changes to the GPU copy.
- `.storageModeShared` is the typical choice on iOS/Apple Silicon; avoid `.storageModeManaged` on those platforms.

## Related

- [MTLDevice](./mtldevice.md)
- [MTLTexture](./mtltexture.md)
- [MTLRenderCommandEncoder](./mtlrendercommandencoder.md)
- [MTLComputeCommandEncoder](./mtlcomputecommandencoder.md)
