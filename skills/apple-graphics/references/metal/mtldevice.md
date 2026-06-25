# MTLDevice

The primary interface to a GPU. Represents a single GPU and serves as the factory for all other Metal objects. Obtain the default device with `MTLCreateSystemDefaultDevice()`.

## Signature / Usage

```swift
// Get the system default GPU
guard let device = MTLCreateSystemDefaultDevice() else {
    fatalError("Metal is not supported on this device")
}

// Create subsidiary objects
let commandQueue = device.makeCommandQueue()
let buffer = device.makeBuffer(length: 256, options: .storageModeShared)
let library  = device.makeDefaultLibrary()
```

## Options / Props

| Method / Property | Return Type | Description |
|-------------------|-------------|-------------|
| `makeCommandQueue()` | `MTLCommandQueue?` | Creates a command queue for submitting work to the GPU |
| `makeCommandQueue(descriptor:)` | `MTLCommandQueue?` | Creates a command queue with a custom descriptor |
| `makeBuffer(length:options:)` | `MTLBuffer?` | Allocates a new buffer of the given length |
| `makeBuffer(bytes:length:options:)` | `MTLBuffer?` | Creates a buffer by copying existing CPU data |
| `makeTexture(descriptor:)` | `MTLTexture?` | Creates a texture from a descriptor |
| `makeDefaultLibrary()` | `MTLLibrary?` | Loads the precompiled default `.metallib` from the app bundle |
| `makeLibrary(source:options:)` | throws `MTLLibrary` | Compiles Metal source at runtime |
| `makeRenderPipelineState(descriptor:)` | throws `MTLRenderPipelineState` | Creates a render pipeline state |
| `makeComputePipelineState(function:)` | throws `MTLComputePipelineState` | Creates a compute pipeline state |
| `maximumConcurrentCompilationTaskCount` | `Int` | Max concurrent shader compilation tasks |
| `shouldMaximizeConcurrentCompilation` | `Bool` | Whether to use extra CPU threads for compilation |

## Notes

- iOS 8.0+, iPadOS 8.0+, macOS 10.11+, tvOS, visionOS 1.0+, Mac Catalyst 13.1+.
- All Metal objects created from a device must only interact with other objects from the **same** device (critical for multi-GPU setups).
- `MTLDevice` conforms to `NSObjectProtocol` and `Sendable`.

## Related

- [MTLCommandQueue](./mtlcommandqueue.md)
- [MTLBuffer](./mtlbuffer.md)
- [MTLTexture](./mtltexture.md)
- [MTLLibrary](./mtllibrary.md)
- [MTLRenderPipelineState](./mtlrenderpipelinestate.md)
- [MTLComputePipelineState](./mtlcomputepipelinestate.md)
