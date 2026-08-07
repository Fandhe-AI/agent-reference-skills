# MTL4CommandQueue

Metal 4 API. An abstraction representing a command queue that you use to commit and synchronize command buffers and to perform other GPU operations.

## Signature / Usage

```swift
protocol MTL4CommandQueue: NSObjectProtocol, Sendable

// Commit command buffers for execution
commandQueue.commit([commandBuffer], options: nil)
```

## Options / Props

| Method / Property | Type | Description |
|-------------------|------|-------------|
| `device` | `MTLDevice` | Returns the GPU device that the command queue belongs to |
| `label` | `String?` | Obtains this queue's optional label for debugging purposes |
| `commit(_:options:)` | `Void` | Enqueues an array of command buffer instances for execution with a set of options |
| `addResidencySet(_:)` / `addResidencySets(_:)` | `Void` | Apply residency sets to the queue, which Metal applies to command buffers as you commit them |
| `removeResidencySet(_:)` / `removeResidencySets(_:)` | `Void` | Remove residency sets from the queue |
| `waitForEvent(_:value:)` / `signalEvent(_:value:)` | `Void` | Schedule wait/signal operations on the queue for GPU events |
| `waitForDrawable(_:)` / `signalDrawable(_:)` | `Void` | Schedule wait/signal operations on the queue for Metal drawables |
| `updateMappings(buffer:heap:operations:)` / `updateMappings(texture:heap:operations:)` | `Void` | Update mappings for placement sparse buffers and textures |
| `copyMappings(sourceBuffer:destinationBuffer:operations:)` / `copyMappings(sourceTexture:destinationTexture:operations:)` | `Void` | Copy mappings for placement sparse buffers and textures |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+.
- Metal 4 API, distinct from the classic `MTLCommandQueue`. Metal 4 moves synchronization (fences, drawable/event waits) and residency-set management onto the queue itself rather than the command buffer.

## Related

- [MTLCommandQueue](./mtlcommandqueue.md)
- [MTL4CommandBuffer](./mtl4commandbuffer.md)
