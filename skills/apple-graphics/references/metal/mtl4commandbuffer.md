# MTL4CommandBuffer

Metal 4 API. Records a sequence of GPU commands.

## Signature / Usage

```swift
protocol MTL4CommandBuffer: NSObjectProtocol

commandBuffer.beginCommandBuffer(allocator: allocator)
let encoder = commandBuffer.makeComputeCommandEncoder()
// ... encode commands ...
commandBuffer.endCommandBuffer()
```

## Options / Props

| Method / Property | Type | Description |
|-------------------|------|-------------|
| `device` | `MTLDevice` | Returns the GPU device that this command buffer belongs to |
| `label` | `String?` | Assigns an optional label with this command buffer |
| `beginCommandBuffer(allocator:)` / `beginCommandBuffer(allocator:options:)` | `Void` | Prepares a command buffer for encoding |
| `endCommandBuffer()` | `Void` | Closes a command buffer to prepare it for submission to a command queue |
| `makeComputeCommandEncoder()` | `MTL4ComputeCommandEncoder?` | Creates a compute command encoder |
| `makeMachineLearningCommandEncoder()` | `MTL4MachineLearningCommandEncoder?` | Creates a machine learning command encoder |
| `makeRenderCommandEncoder(descriptor:options:)` | `MTL4RenderCommandEncoder?` | Creates a render command encoder from a render pass descriptor with additional options |
| `pushDebugGroup(_:)` / `popDebugGroup()` | `Void` | Pushes/pops a string on the debug group stack for this command buffer |
| `resolveCounterHeap(_:range:buffer:fenceToWait:fenceToUpdate:)` | `Void` | Encodes a command that resolves an opaque counter heap into a buffer |
| `useResidencySet(_:)` / `useResidencySets(_:)` | `Void` | Applies residency set(s) to a command buffer |
| `writeTimestamp(counterHeap:index:)` | `Void` | Writes a GPU timestamp into the given counter heap |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+.
- Metal 4 API, distinct from the classic `MTLCommandBuffer`. Requires an explicit `MTL4CommandAllocator` via `beginCommandBuffer(allocator:)`/`endCommandBuffer()`, and is created independently of the command queue rather than via `makeCommandBuffer()`.

## Related

- [MTLCommandBuffer](./mtlcommandbuffer.md)
- [MTL4CommandQueue](./mtl4commandqueue.md)
- [MTL4ArgumentTable](./mtl4argumenttable.md)
