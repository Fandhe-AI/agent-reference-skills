# CPU-Encoded Indirect Command Buffer (Compute)

Encode a compute indirect command buffer (ICB) once on the CPU and re-execute it across multiple frames, instead of re-encoding the same dispatch every frame.

```objc
MTLIndirectCommandBufferDescriptor* icbDescriptor = [MTLIndirectCommandBufferDescriptor new];

// This ICB only ever contains concurrent-dispatch compute commands.
icbDescriptor.commandTypes = MTLIndirectCommandTypeConcurrentDispatch;

// Buffers are set per-command inside the ICB, not inherited from the
// encoder that executes it.
icbDescriptor.inheritBuffers = NO;
icbDescriptor.maxKernelBufferBindCount = 3;

// The compute pipeline state is set on the encoder that executes the
// ICB, not re-selected per command.
if (@available(macOS 11.0, iOS 13.0, *)) {
    icbDescriptor.inheritPipelineState = YES;
}

_indirectCommandBuffer = [_device newIndirectCommandBufferWithDescriptor:icbDescriptor
                                                         maxCommandCount:AAPLNumObjects
                                                                 options:0];

// Encode a dispatch command for each object once; this loop runs a
// single time at setup, not once per frame.
for (int objIndex = 0; objIndex < AAPLNumObjects; objIndex++)
{
    id<MTLIndirectComputeCommand> ICBCommand =
        [_indirectCommandBuffer indirectComputeCommandAtIndex:objIndex];

    [ICBCommand setKernelBuffer:_objectBuffer[objIndex] offset:0 atIndex:0];
    [ICBCommand setKernelBuffer:_frameStateBuffer offset:0 atIndex:1];

    [ICBCommand concurrentDispatchThreadgroups:MTLSizeMake(threadgroupsPerObject, 1, 1)
                          threadsPerThreadgroup:MTLSizeMake(threadgroupWidth, 1, 1)];

    [ICBCommand setBarrier];
}

// Per frame: update only the small frame-state buffer via blit, then
// execute the same pre-encoded ICB — no per-object re-encoding.
id<MTLBlitCommandEncoder> blitEncoder = [commandBuffer blitCommandEncoder];
[blitEncoder copyFromBuffer:_frameStateStagingBuffer[_inFlightIndex] sourceOffset:0
                   toBuffer:_frameStateBuffer destinationOffset:0
                       size:_frameStateBuffer.length];
[blitEncoder endEncoding];

id<MTLComputeCommandEncoder> computeEncoder = [commandBuffer computeCommandEncoder];
[computeEncoder setComputePipelineState:_computePipelineState];

// Every buffer the ICB's commands touch must be marked resident here;
// Metal can't infer it from the pre-encoded commands.
for (int i = 0; i < AAPLNumObjects; i++)
{
    [computeEncoder useResource:_objectBuffer[i] usage:MTLResourceUsageRead];
}
[computeEncoder useResource:_frameStateBuffer usage:MTLResourceUsageRead];

[computeEncoder executeCommandsInBuffer:_indirectCommandBuffer withRange:NSMakeRange(0, AAPLNumObjects)];
[computeEncoder endEncoding];
```

```metal
// The corresponding kernel guards against a partial final threadgroup,
// the same way a directly-dispatched dispatchThreadgroups: kernel would.
kernel void processObject(device const ObjectData *objectBuffer [[buffer(0)]],
                          constant FrameState *frameState [[buffer(1)]],
                          uint index [[thread_position_in_grid]])
{
    if (index >= objectBuffer->count) {
        return;
    }
    // ... per-object work using frameState ...
}
```

## Notes

- This is the compute side of Metal on Apple silicon; the rendering-side Metal API (MTKView, render pipeline states, render command encoders) is covered by the separate apple-graphics skill.
- Assumes `concurrentDispatchThreadgroups:threadsPerThreadgroup:` (threadgroup-count dispatch), which — like the render-side `dispatchThreadgroups:` — can overhang the logical work size, so the kernel checks `index` against the object count before writing.
- Adapted from the CPU-side indirect command buffer encoding pattern on developer.apple.com/documentation/metal/encoding-indirect-command-buffers-on-the-cpu ("Encoding indirect command buffers on the CPU"), which demonstrates the same encode-once/reuse-across-frames technique for `MTLIndirectRenderCommand`; here the command type is the compute variant, `MTLIndirectComputeCommand`.
