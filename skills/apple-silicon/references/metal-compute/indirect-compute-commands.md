# Indirect Compute Commands

Encoding individual dispatch commands into an indirect command buffer (`MTLIndirectComputeCommand`), including GPU-driven dispatch where the thread/threadgroup count comes from data the GPU itself computed rather than from the CPU at encode time.

## Signature / Usage

```metal
// Kernel that both decides visibility and encodes a dispatch into the ICB
kernel void encodeDispatches(command_buffer cmdBuffer [[buffer(0)]],
                              device const ObjectData *objects [[buffer(1)]],
                              uint index [[thread_position_in_grid]])
{
    compute_command cmd(cmdBuffer, index);

    if (!objects[index].visible) {
        cmd.reset(); // leave an empty command for culled objects
        return;
    }

    cmd.set_compute_pipeline_state(pipelineState);
    cmd.set_kernel_buffer(objects[index].dataBuffer, 0, 1);
    cmd.concurrent_dispatch_threads(threadsPerGrid, threadsPerThreadgroup);
}
```

```swift
// CPU-side: fill in an indirect dispatch-arguments buffer for a later dispatch call
var args = MTLDispatchThreadgroupsIndirectArguments(threadgroupsPerGrid: (32, 32, 1))
memcpy(indirectArgsBuffer.contents(), &args, MemoryLayout<MTLDispatchThreadgroupsIndirectArguments>.size)

encoder.dispatchThreadgroups(indirectBuffer: indirectArgsBuffer, indirectBufferOffset: 0,
                              threadsPerThreadgroup: threadsPerThreadgroup)
```

## Options / Props

| Type / Method | Description |
| --- | --- |
| `MTLIndirectComputeCommand` | A single compute command slot inside an `MTLIndirectCommandBuffer`; obtained from the buffer, never implemented directly |
| `setComputePipelineState(_:)` | Sets the command's pipeline state (only needed if the ICB doesn't inherit it) |
| `setKernelBuffer(_:offset:at:)` | Binds a buffer argument for the command's kernel |
| `setStageInRegion(_:)` / `setStageIn(_:)` | Sets the `MTLRegion` of stage-in attribute data the kernel consumes |
| `setImageblockWidth(_:height:)` | Sets tile-memory imageblock dimensions for the command |
| `setBarrier()` / `clearBarrier()` | Forces (or removes) a wait for prior commands in the buffer to finish before this one executes |
| `concurrentDispatchThreads(_:threadsPerThreadgroup:)` | Encodes a non-uniform-grid dispatch into the command |
| `concurrentDispatchThreadgroups(_:threadsPerThreadgroup:)` | Encodes a threadgroup-aligned dispatch into the command |
| `reset()` | Clears the command back to its default (empty/no-op) state |
| `MTLDispatchThreadgroupsIndirectArguments` | Data layout (three `uint32` fields: threadgroups per grid, x/y/z) written into a buffer for `dispatchThreadgroups(indirectBuffer:...)` |
| `MTLStageInRegionIndirectArguments` | Data layout for the stage-in region used by `dispatchThreads(indirectBuffer:...)`-style indirect stage-in commands |

## Notes

- These commands only exist inside an `MTLIndirectCommandBuffer` (see `indirect-command-buffers.md`); a compute kernel encodes them with the MSL `compute_command` type, then the host executes the whole ICB range with `executeCommandsInBuffer`.
- GPU-driven dispatch (writing `MTLDispatchThreadgroupsIndirectArguments` from one pass and consuming it via `dispatchThreadgroups(indirectBuffer:...)` in a later pass) lets the size of a subsequent dispatch depend on results computed on the GPU, avoiding a CPU readback between passes.
- `reset()` a command explicitly when GPU-side encoding needs to leave a "no-op" slot (e.g. for a culled/invisible object) — an unset command isn't implicitly empty.
- This page covers the GPU-compute workflow on Apple silicon; the Metal rendering class references (MTLDevice, MTLComputeCommandEncoder, etc.) live in the apple-graphics skill.

## Related

- [Indirect Command Buffers](./indirect-command-buffers.md)
- [Threadgroup Sizing](./threadgroup-sizing.md)
- [Compute Pass Encoding](./compute-pass-encoding.md)
