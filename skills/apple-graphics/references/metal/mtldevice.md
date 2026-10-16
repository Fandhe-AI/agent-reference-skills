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
| `makeResidencySet(descriptor:)` | throws `any MTLResidencySet` | Creates a residency set (iOS 18.0+, macOS 15.0+) |
| `makeMTL4CommandQueue()` | `(any MTL4CommandQueue)?` | Creates a new Metal 4 command queue (26.0+) |
| `makeMTL4CommandQueue(descriptor:)` | throws `any MTL4CommandQueue` | Creates a Metal 4 command queue from a queue descriptor (26.0+) |
| `makeCommandAllocator()` | `(any MTL4CommandAllocator)?` | Creates a new command allocator (26.0+) |
| `makeCommandAllocator(descriptor:)` | throws `any MTL4CommandAllocator` | Creates a command allocator from a descriptor (26.0+) |
| `makeCommandBuffer()` | `(any MTL4CommandBuffer)?` | Creates a new Metal 4 command buffer (26.0+) |
| `makeCompiler(descriptor:)` | throws `any MTL4Compiler` | Creates a Metal 4 compiler from a compiler descriptor (26.0+) |
| `makeArgumentTable(descriptor:)` | throws `any MTL4ArgumentTable` | Creates an argument table from a descriptor (26.0+) |
| `makeTensor(descriptor:)` | throws `any MTLTensor` | Creates a tensor with the specified descriptor (26.0+) |
| `makeTensor(descriptor:attachments:)` | throws `any MTLTensor` | Creates a tensor with per-plane buffer backing storage (iOS 27.0+) |
| `tensorSizeAndAlign(descriptor:)` | `MTLSizeAndAlign` | Size and alignment required to hold the data plane of a tensor in a buffer (26.0+) |
| `makeCounterHeap(descriptor:)` | throws `any MTL4CounterHeap` | Creates a counter heap from a descriptor (26.0+) |
| `size(ofCounterHeapEntry:)` | `Int` | Size in bytes of each resolved entry for a counter heap type (26.0+) |
| `queryTimestampFrequency()` | `UInt64` | GPU timestamp frequency in ticks per second (26.0+) |
| `makeTextureViewPool(descriptor:)` | throws `any MTLTextureViewPool` | Creates a texture view pool from a resource view pool descriptor (26.0+) |
| `makePipelineDataSetSerializer(descriptor:)` | `any MTL4PipelineDataSetSerializer` | Creates a pipeline data set serializer from a descriptor (26.0+) |
| `makeArchive(url:)` | throws `any MTL4Archive` | Creates an archive from data at a URL (26.0+) |
| `functionHandle(function:)` | `(any MTLFunctionHandle)?` | Handle for an `MTLFunction` (function table) or an `MTL4BinaryFunction` (26.0+) |
| `supportsPlacementSparse` | `Bool` | Whether the device supports placement sparse resources (iOS 26.4+) |

## Notes

- iOS 8.0+, iPadOS 8.0+, macOS 10.11+, tvOS, visionOS 1.0+, Mac Catalyst 13.1+.
- All Metal objects created from a device must only interact with other objects from the **same** device (critical for multi-GPU setups).
- `MTLDevice` conforms to `NSObjectProtocol` and `Sendable`.
- `makeTensor(descriptor:attachments:)` creates multi-plane tensors; every plane configured in the descriptor (data plane and all auxiliary planes) needs a corresponding entry in `attachments`.

## Related

- [MTLCommandQueue](./mtlcommandqueue.md)
- [MTLBuffer](./mtlbuffer.md)
- [MTLTexture](./mtltexture.md)
- [MTLLibrary](./mtllibrary.md)
- [MTLRenderPipelineState](./mtlrenderpipelinestate.md)
- [MTLComputePipelineState](./mtlcomputepipelinestate.md)
- [MTLResidencySet](./mtlresidencyset.md)
- [MTLTensor](./mtltensor.md)
- [MTL4Compiler](./mtl4compiler.md)
- [MTL4CommandAllocator](./mtl4commandallocator.md)
