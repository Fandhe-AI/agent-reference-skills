# MTLCommandBuffer

A container that stores a sequence of GPU commands. Obtained from `MTLCommandQueue`; encoder creation, submission, and presentation all flow through a command buffer.

## Signature / Usage

```swift
guard let commandBuffer = commandQueue.makeCommandBuffer() else { return }

// Encode a render pass
let encoder = commandBuffer.makeRenderCommandEncoder(descriptor: renderPassDescriptor)!
// ... encode draw calls ...
encoder.endEncoding()

// Present and submit
commandBuffer.present(drawable)
commandBuffer.commit()
```

## Options / Props

| Method / Property | Type | Description |
|-------------------|------|-------------|
| `makeRenderCommandEncoder(descriptor:)` | `MTLRenderCommandEncoder?` | Creates an encoder for a render pass |
| `makeComputeCommandEncoder(dispatchType:)` | `MTLComputeCommandEncoder?` | Creates an encoder for a compute pass |
| `makeBlitCommandEncoder()` | `MTLBlitCommandEncoder?` | Creates an encoder for blit (copy/fill) operations |
| `enqueue()` | `Void` | Reserves the next slot in the command queue before encoding |
| `commit()` | `Void` | Submits the command buffer to the GPU |
| `present(_:)` | `Void` | Schedules presentation of a drawable after execution |
| `present(_:atTime:)` | `Void` | Schedules presentation at a specific host time |
| `present(_:afterMinimumDuration:)` | `Void` | Schedules presentation after a minimum display duration |
| `waitUntilScheduled()` | `Void` | Blocks until the command queue schedules the buffer |
| `waitUntilCompleted()` | `Void` | Blocks until the GPU finishes executing the buffer |
| `addScheduledHandler(_:)` | `Void` | Callback invoked when the GPU schedules the buffer |
| `addCompletedHandler(_:)` | `Void` | Callback invoked when the GPU finishes the buffer |
| `status` | `MTLCommandBufferStatus` | Current state: `.notScheduled`, `.scheduled`, `.committed`, `.completed`, `.error` |

## Notes

- iOS 8.0+, iPadOS 8.0+, macOS 10.11+, tvOS, visionOS 1.0+, Mac Catalyst 13.1+.
- Only **one encoder can be active at a time**; call `endEncoding()` before creating the next encoder.
- For multithreaded encoding, call `enqueue()` on a single thread in the desired GPU execution order, then encode on separate threads in parallel.
- If `enqueue()` is not called explicitly, committing the buffer auto-enqueues it.

## Related

- [MTLCommandQueue](./mtlcommandqueue.md)
- [MTLRenderCommandEncoder](./mtlrendercommandencoder.md)
- [MTLComputeCommandEncoder](./mtlcomputecommandencoder.md)
- [MTLRenderPassDescriptor](./mtlrenderpassdescriptor.md)
