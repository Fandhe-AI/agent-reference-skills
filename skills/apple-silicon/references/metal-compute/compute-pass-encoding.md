# Compute Pass Encoding

Workflow for encoding a GPU compute pass: create a compute command encoder from a command buffer, bind a pipeline state and resources, dispatch work, and end the encoding. Covers both the traditional `MTLComputeCommandEncoder` and the unified Metal 4 `MTL4ComputeCommandEncoder`.

## Signature / Usage

```swift
// Traditional (Metal 1–3)
let commandBuffer = commandQueue.makeCommandBuffer()!
let encoder = commandBuffer.makeComputeCommandEncoder()!

encoder.setComputePipelineState(pipelineState)
encoder.setBuffer(inputBuffer, offset: 0, index: 0)
encoder.setTexture(outputTexture, index: 0)

let threadsPerGrid = MTLSize(width: 512, height: 512, depth: 1)
let threadsPerThreadgroup = MTLSize(width: 8, height: 8, depth: 1)
encoder.dispatchThreads(threadsPerGrid, threadsPerThreadgroup: threadsPerThreadgroup)

encoder.endEncoding()
commandBuffer.commit()
```

```swift
// Metal 4 — unified compute encoder (also encodes blit / acceleration-structure commands)
let mtl4CommandBuffer = mtl4CommandQueue.makeCommandBuffer()!
let computeEncoder = mtl4CommandBuffer.makeComputeCommandEncoder()!

computeEncoder.setComputePipelineState(pipelineState)
computeEncoder.setArgumentTable(argumentTable)
computeEncoder.dispatchThreads(threadsPerGrid: threadsPerGrid, threadsPerThreadgroup: threadsPerThreadgroup)

computeEncoder.endEncoding()
```

## Options / Props

| Concept | Description |
| --- | --- |
| `MTLDispatchType.serial` | Commands in the pass execute one after another (default) |
| `MTLDispatchType.concurrent` | Commands without data hazards between them may execute in parallel on the GPU |
| `MTLComputePassDescriptor.dispatchType` | Selects serial or concurrent dispatch for the whole pass |
| `MTLComputePassDescriptor.sampleBufferAttachments` | Attaches `MTLCounterSampleBuffer` instances to sample GPU counters at pass boundaries |
| `MTL4ComputeCommandEncoder` | Metal 4 encoder unifying dispatch, blit (buffer/texture copy, fill, mipmap generation), and acceleration-structure build/copy/refit commands into a single pass |
| `MTL4ComputeCommandEncoder.setArgumentTable(_:)` | Binds an `MTL4ArgumentTable` for the compute stage, replacing per-resource `setBuffer`/`setTexture` calls |
| `MTL4ComputeCommandEncoder.stages()` | Returns a bitmask of shader stages the commands currently encoded in the encoder operate on |

## Notes

- Kernel functions are annotated `[[kernel]]` in Metal Shading Language; argument tables (`[[buffer(n)]]`, `[[texture(n)]]`, etc.) bind data to them.
- Everything used to set up a compute pass is CPU thread-safe except the encoder itself (`MTLComputeCommandEncoder` / `MTL4ComputeCommandEncoder`); synchronize CPU/GPU-shared resources with an `MTLFence`, `MTLEvent`, or completion callback.
- A compute pass can combine with blit operations in a single pass on Metal 3+ (Apple's "Combining blit and compute operations in a single pass" sample), and Metal 4 makes this unification the default via `MTL4ComputeCommandEncoder`.
- Resources accessed through an argument buffer must be resident in GPU memory for the pass duration — call `useResource(_:usage:)` / `useHeap(_:)` (or attach an `MTLResidencySet`, see `unified-memory.md`) before dispatching.
- This page covers the GPU-compute workflow on Apple silicon; the Metal rendering class references (MTLDevice, MTLComputeCommandEncoder, etc.) live in the apple-graphics skill.

## Related

- [Threadgroup Sizing](./threadgroup-sizing.md)
- [Compute Pipeline Configuration](./compute-pipeline-configuration.md)
- [Indirect Command Buffers](./indirect-command-buffers.md)
- [GPU Counters](./gpu-counters.md)
