# MTL4CommandAllocator

Metal 4 API. Manages the memory backing the encoding of GPU commands into command buffers.

## Signature / Usage

```swift
protocol MTL4CommandAllocator : NSObjectProtocol

let kMaxFramesInFlight = 3

class Metal4Renderer {
    let commandQueue: MTL4CommandQueue
    var commandAllocators: [MTL4CommandAllocator] = []
    let commandBuffer: MTL4CommandBuffer
}

func renderFrameToView(_ view: MTKView) {
    // Get the next allocator in the rotation.
    let frameIndex: Int = Int(frameNumber) % kMaxFramesInFlight
    let frameAllocator = commandAllocators[frameIndex]

    // Prepare to use or reuse the allocator by resetting it.
    frameAllocator.reset()

    // Prepare to use or reuse the command buffer for the frame's commands.
    commandBuffer.beginCommandBuffer(allocator: frameAllocator)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `device` | `any MTLDevice` | The GPU device that this command allocator belongs to |
| `label` | `String?` | The optional label you specify at creation time for debug purposes |
| `allocatedSize()` | `UInt64` | Queries the size of the internal memory heaps of this allocator that support encoding commands into command buffers |
| `reset()` | `Void` | Marks the command allocator's heaps for reuse |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+.
- Create an allocator with a `MTLDevice` factory method such as `makeCommandAllocator()`; creation parameters are grouped in `MTL4CommandAllocatorDescriptor`.
- An allocator is associated with one command buffer at a time through `MTL4CommandBuffer.beginCommandBuffer(allocator:)`. After `endCommandBuffer()` on the current command buffer, the allocator can be applied to another command buffer.
- A common pattern is one allocator per frame in flight; when the GPU finishes that frame's work, call `reset()` to release the memory for reuse. The Hello Triangle sample (Drawing a triangle with Metal 4) works with three frames at the same time.

## Related

- [MTL4CommandBuffer](./mtl4commandbuffer.md)
- [MTL4CommandQueue](./mtl4commandqueue.md)
- [MTL4ArgumentTable](./mtl4argumenttable.md)
