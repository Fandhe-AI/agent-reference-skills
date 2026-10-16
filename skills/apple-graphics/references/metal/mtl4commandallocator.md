# MTL4CommandAllocator

Metal 4 API. Manages the memory backing the encoding of GPU commands into command buffers.

## Signature / Usage

```swift
protocol MTL4CommandAllocator : NSObjectProtocol
```

Per-frame allocator rotation from the Hello Triangle sample (Objective-C, Drawing a triangle with Metal 4). The CPU waits (with a 10 ms timeout) on the shared event for the frame `kMaxFramesInFlight` earlier before calling `reset`. Note: in the official sample, a timeout only logs a message and execution continues to `reset`:

```objc
// Increment the frame number for this frame.
frameNumber += 1;

const uint32_t frameIndex = frameNumber % kMaxFramesInFlight;
NSString *label = [NSString stringWithFormat:@"Frame: %llu", frameNumber];


if (frameNumber >= kMaxFramesInFlight) {
    [self waitOnSharedEvent:sharedEvent
             forEarlierFrame:frameNumber - kMaxFramesInFlight];
}

// Prepare to use or reuse the allocator by resetting it.
id<MTL4CommandAllocator> frameAllocator = commandAllocators[frameIndex];
[frameAllocator reset];

// Prepare to use or reuse the command buffer for the frame's commands.
[commandBuffer beginCommandBufferWithAllocator:frameAllocator];
commandBuffer.label = label;
```

```objc
- (void) waitOnSharedEvent:(id<MTLSharedEvent>) sharedEvent
            forEarlierFrame:(uint64_t) earlierFrameNumber
{
    const uint64_t tenMilliseconds = 10;

    // Wait for the GPU to finish rendering the frame that's
    // `kMaxFramesInFlight` before this one, and then proceed to the next step.
    BOOL beforeTimeout = [sharedEvent waitUntilSignaledValue:earlierFrameNumber
                                                   timeoutMS:tenMilliseconds];

    if (false == beforeTimeout) {
        NSLog(@"No signal from frame %llu to shared event after %llums",
              earlierFrameNumber, tenMilliseconds);
    }
}
```

Adapted, not from the sample: retry the wait until it succeeds before calling `reset`.

```objc
if (frameNumber >= kMaxFramesInFlight) {
    while (![sharedEvent waitUntilSignaledValue:frameNumber - kMaxFramesInFlight
                                      timeoutMS:10]) {
        // GPU still busy; keep waiting.
    }
}
[frameAllocator reset];
```

```objc
// Signal when the GPU finishes rendering this frame with a shared event.
[commandQueue signalEvent:sharedEvent value:frameNumber];
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
- Do not call `reset()` until the GPU has finished the work encoded with that allocator: before `reset()`, wait with `MTLSharedEvent` `waitUntilSignaledValue:timeoutMS:` for the frame `kMaxFramesInFlight` earlier (signaled by `[commandQueue signalEvent:sharedEvent value:frameNumber]`). `waitUntilSignaledValue:timeoutMS:` returns NO on timeout; the sample only logs and proceeds, so in production retry until it returns YES (or skip reset and encoding for that frame) before calling `reset()`. Source of the example: Drawing a triangle with Metal 4 (https://developer.apple.com/documentation/metal/drawing-a-triangle-with-metal-4).
- Source: https://developer.apple.com/documentation/metal/mtl4commandallocator

## Related

- [MTL4CommandBuffer](./mtl4commandbuffer.md)
- [MTL4CommandQueue](./mtl4commandqueue.md)
- [MTL4ArgumentTable](./mtl4argumenttable.md)
