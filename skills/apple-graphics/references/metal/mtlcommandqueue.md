# MTLCommandQueue

An ordered list of command buffers for scheduling and submitting GPU work. Created from `MTLDevice`; typically created once at app launch and reused throughout the app's lifetime.

## Signature / Usage

```swift
// Create a command queue from a device
guard let commandQueue = device.makeCommandQueue() else { return }

// Create a command buffer from the queue
guard let commandBuffer = commandQueue.makeCommandBuffer() else { return }
```

## Options / Props

| Method / Property | Type | Description |
|-------------------|------|-------------|
| `makeCommandBuffer()` | `MTLCommandBuffer?` | Creates a new command buffer |
| `makeCommandBuffer(descriptor:)` | `MTLCommandBuffer?` | Creates a command buffer with custom configuration |
| `makeCommandBufferWithUnretainedReferences()` | `MTLCommandBuffer?` | Creates a command buffer that does not retain strong references to resources |
| `addResidencySet(_:)` | `Void` | Attaches a residency set to the queue |
| `removeResidencySet(_:)` | `Void` | Detaches a residency set from the queue |
| `device` | `MTLDevice` | The GPU device that created this queue |
| `label` | `String?` | Optional debug identifier |

## Notes

- iOS 8.0+, iPadOS 8.0+, macOS 10.11+, tvOS, visionOS 1.0+, Mac Catalyst 13.1+.
- Thread-safe: multiple threads can encode commands into different command buffers simultaneously.
- Conforms to `NSObjectProtocol` and `Sendable`.

## Related

- [MTLDevice](./mtldevice.md)
- [MTLCommandBuffer](./mtlcommandbuffer.md)
