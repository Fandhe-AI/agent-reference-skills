# MTLResidencySet

A collection of resource allocations (buffers, textures, heaps) that can move in and out of resident memory. Includes `MTLResidencySetDescriptor`, the configuration used to create one.

## Signature / Usage

```swift
protocol MTLResidencySet : NSObjectProtocol

let setDescriptor = MTLResidencySetDescriptor()
setDescriptor.label = "Primary residency set"
setDescriptor.initialCapacity = 42

let residencySet = try device.makeResidencySet(descriptor: setDescriptor)

residencySet.addAllocation(buffer0)
residencySet.addAllocations([buffer2, texture2, argumentBufferHeap, textureHeap])
residencySet.commit()

commandQueue.addResidencySet(residencySet)
```

## Options / Props

`MTLResidencySet` members:

| Name | Type | Description |
|------|------|-------------|
| `addAllocation(_:)` | `any MTLAllocation` | Stages a single resource to join the set's list of allocations |
| `addAllocations(_:)` | `[any MTLAllocation]` | Stages multiple resources to join the set's list of allocations |
| `removeAllocation(_:)` | `any MTLAllocation` | Stages a single resource to leave the set's list of allocations |
| `removeAllocations(_:)` | `[any MTLAllocation]` | Stages multiple resources to leave the set's list of allocations |
| `removeAllAllocations()` | `Void` | Stages all resources in the set to leave its list of allocations |
| `commit()` | `Void` | Applies any pending additions and removals |
| `requestResidency()` | `Void` | Asks Metal to make the set's allocations resident ahead of time |
| `endResidency()` | `Void` | Informs Metal the allocations no longer need to be resident, so it can reuse the memory |
| `label` | `String?` | Optional name that helps identify the residency set |
| `device` | `any MTLDevice` | The Metal device that owns the set |
| `containsAllocation(_:)` | `Bool` | Whether the set contains a specific allocation |
| `allAllocations` | `[any MTLAllocation]` | The set's current list of allocations |
| `allocationCount` | `Int` | Number of allocations in the set |
| `allocatedSize` | `UInt64` | Resident memory, in bytes, that the set's allocations consume |

`MTLResidencySetDescriptor` (class, created with `MTLDevice.makeResidencySet(descriptor:)`):

| Name | Type | Description |
|------|------|-------------|
| `label` | `String?` | Optional name that helps identify a residency set created with the descriptor |
| `initialCapacity` | `Int` | Number of allocations a new residency set can store without reallocating memory |

## Notes

- `MTLResidencySet`: iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+. `MTLResidencySetDescriptor` has the same availability and inherits from `NSObject`.
- Additions and removals are staged and take effect only after `commit()`. Duplicate additions are ignored.
- Metal does not synchronize the set's state between the CPU and GPU: allocations can be added while the GPU runs a command buffer that accesses them, and allocations the GPU no longer needs can be removed while it accesses others.
- Metal makes the union of all residency sets' allocations resident. Removing an allocation from one set does not affect its residency if another set also contains it.
- Adding a buffer or texture that originates from a heap makes the entire heap resident.
- Residency sets do not track hazards; account for them with `MTLFence` and `MTLEvent`. They do not support sparse heaps or sparse textures, and their methods are not thread-safe.
- Attach a set to a command buffer with `MTLCommandBuffer.useResidencySet(_:)` / `useResidencySets(_:)` (up to 32 sets per command buffer), or to a command queue with `MTLCommandQueue.addResidencySet(_:)` / `addResidencySets(_:)` (up to 32 sets per queue). On `MTLCommandBuffer.commit()`, Metal attaches the owning queue's current residency sets to the command buffer. Detach from a queue with `removeResidencySet(_:)` / `removeResidencySets(_:)`; the set stays attached to the queue's command buffers already in flight with status committed or scheduled.
- Attached sets replace per-encoder `useResource` / `useResources` / `useHeap` / `useHeaps` calls on `MTLRenderCommandEncoder` and `MTLComputeCommandEncoder`, which cost CPU overhead per call and apply to a single encoder.
- `requestResidency()` lets you do the CPU work before the first `commit()` that uses the set (for example at launch); it may postpone some steps when other apps have competing memory needs.
- Distinct from unified-memory guidance in the apple-silicon skill: its metal-compute/unified-memory pages also cover `MTLResidencySet` from the compute and memory-optimization angle.
- Source: https://developer.apple.com/documentation/metal/mtlresidencyset

## Related

- [MTLCommandBuffer](./mtlcommandbuffer.md)
- [MTLCommandQueue](./mtlcommandqueue.md)
- [MTLDevice](./mtldevice.md)
- [MTLBuffer](./mtlbuffer.md)
