# MTLComputeCommandEncoder

Encodes compute dispatch commands for a single compute pass into a command buffer. Configures compute kernels and dispatches parallel GPU work.

## Signature / Usage

```swift
let encoder = commandBuffer.makeComputeCommandEncoder()!

encoder.setComputePipelineState(pipelineState)
encoder.setBuffer(inputBuffer, offset: 0, index: 0)
encoder.setTexture(outputTexture, index: 0)

let threadsPerGrid      = MTLSize(width: 512, height: 512, depth: 1)
let threadsPerThreadgroup = MTLSize(width: 8,   height: 8,   depth: 1)
encoder.dispatchThreads(threadsPerGrid, threadsPerThreadgroup: threadsPerThreadgroup)

encoder.endEncoding()
```

## Options / Props

| Method | Description |
|--------|-------------|
| `setComputePipelineState(_:)` | Sets the active compute pipeline state (required before dispatch) |
| `setBuffer(_:offset:index:)` | Binds a buffer to the compute shader at the given index |
| `setBuffers(_:offsets:range:)` | Binds multiple buffers at once |
| `setBufferOffset(_:index:)` | Updates the offset for a previously bound buffer |
| `setBytes(_:length:index:)` | Copies raw bytes (≤ 4 KB) directly to the shader |
| `setTexture(_:index:)` | Binds a texture to the compute shader |
| `setTextures(_:range:)` | Binds multiple textures at once |
| `setSamplerState(_:index:)` | Binds a sampler state |
| `setThreadgroupMemoryLength(_:index:)` | Sets the length of threadgroup memory |
| `dispatchThreads(_:threadsPerThreadgroup:)` | Dispatches an arbitrary grid of threads (non-uniform dispatch) |
| `dispatchThreadgroups(_:threadsPerThreadgroup:)` | Dispatches aligned to threadgroup boundaries |
| `dispatchThreadgroups(indirectBuffer:indirectBufferOffset:threadsPerThreadgroup:)` | Dispatches using GPU-computed threadgroup count |
| `waitForFence(_:)` | Waits for a fence before executing |
| `updateFence(_:)` | Updates a fence after executing |
| `memoryBarrier(scope:)` | Inserts a memory barrier by scope |
| `endEncoding()` | Finalizes the compute pass into the command buffer |

## Notes

- iOS 8.0+, iPadOS 8.0+, macOS 10.11+, tvOS, visionOS 1.0+, Mac Catalyst 13.1+.
- Conforms to `MTLCommandEncoder`, `NSObjectProtocol`.
- `setBytes` is limited to **4 KB**; use `setBuffer` for larger data.
- For indirect resource access (argument buffers), also call `useResource(_:usage:)` or `useHeap(_:)`.

## Related

- [MTLCommandBuffer](./mtlcommandbuffer.md)
- [MTLComputePipelineState](./mtlcomputepipelinestate.md)
- [MTLBuffer](./mtlbuffer.md)
- [MTLTexture](./mtltexture.md)
