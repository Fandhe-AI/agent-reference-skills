# Indirect Command Buffers

Reusable, GPU-executable buffers of encoded commands (`MTLIndirectCommandBuffer`, ICB). Unlike an `MTLCommandBuffer`, an ICB can be submitted multiple times and can be encoded either on the CPU once for reuse, or dynamically by a compute kernel running on the GPU.

## Signature / Usage

```swift
// CPU: create and configure once, reuse every frame
let icbDescriptor = MTLIndirectCommandBufferDescriptor()
icbDescriptor.commandTypes = [.draw]
icbDescriptor.inheritBuffers = false
icbDescriptor.inheritPipelineState = true
icbDescriptor.maxKernelBufferBindCount = 8

let icb = device.makeIndirectCommandBuffer(descriptor: icbDescriptor, maxCommandCount: 512, options: [])!

// Later, per frame: execute the reused commands
renderEncoder.executeCommandsInBuffer(icb, range: 0..<512)
```

```swift
// GPU: pass the ICB into a compute kernel via an argument buffer so the kernel can encode into it
computeEncoder.setBuffer(argumentBufferContainingICB, offset: 0, index: 0)
computeEncoder.useResource(icb, usage: .write)
computeEncoder.dispatchThreads(threadsPerGrid, threadsPerThreadgroup: threadsPerThreadgroup)
```

## Options / Props

| Type / Property | Description |
| --- | --- |
| `MTLIndirectCommandBuffer` | The reusable buffer of commands; `size` reports its capacity, `indirectComputeCommandAt(_:)` / `indirectRenderCommandAt(_:)` retrieve a command for encoding, `reset(_:)` clears a range back to default state |
| `MTLIndirectCommandBufferDescriptor.commandTypes` | Set of `MTLIndirectCommandType` values (`.draw`, `.drawIndexed`, `.concurrentDispatch`, `.concurrentDispatchThreads`, etc.) the buffer must support |
| `MTLIndirectCommandBufferDescriptor.inheritBuffers` | Whether commands take buffer arguments from the encoder executing them (`true`) instead of storing their own |
| `MTLIndirectCommandBufferDescriptor.inheritPipelineState` | Whether commands take their pipeline state from the executing encoder instead of storing their own |
| `MTLIndirectCommandBufferDescriptor.maxKernelBufferBindCount` | Maximum buffers a single compute command in the ICB can bind |
| `MTLIndirectCommandBufferExecutionRange` | A `{location, length}` range of commands, used to scope `executeCommandsInBuffer` / reset / optimize calls |
| `executeCommandsInBuffer(_:range:)` | Encodes a single command that runs a range of the ICB's commands from the host app's command encoder |
| `optimizeIndirectCommandBuffer(_:range:)` | `MTLBlitCommandEncoder` method that compacts a range by removing empty/redundant commands accumulated from GPU-side encoding; once optimized, subsequent `executeCommandsInBuffer` ranges must start at or before the optimized region |

## Notes

- ICBs are the mechanism that lets GPU-driven pipelines skip the CPU round trip: a compute kernel culls/decides what to draw or dispatch, then encodes commands directly into the ICB, and a single `executeCommandsInBuffer` call on the host runs them — no CPU readback of the compute kernel's results is needed.
- When encoded from the GPU, pass the ICB to the compute kernel through an argument buffer (see `argument-buffers.md`) and call `useResource(_:usage:)` on it before dispatching, exactly as for any other argument-buffer-referenced resource.
- Reset a command (`reset(_:)` on the buffer, or the per-command `reset()`) before re-encoding it — commands don't implicitly clear between uses.
- This page covers the GPU-compute workflow on Apple silicon; the Metal rendering class references (MTLDevice, MTLComputeCommandEncoder, etc.) live in the apple-graphics skill.

## Related

- [Indirect Compute Commands](./indirect-compute-commands.md)
- [Argument Buffers](./argument-buffers.md)
- [Compute Pass Encoding](./compute-pass-encoding.md)
