# Threadgroup Sizing

How Metal organizes a compute dispatch into threads, threadgroups, and SIMD groups, and how to calculate threadgroup / grid sizes from `MTLComputePipelineState` properties.

## Signature / Usage

```swift
let w = pipelineState.threadExecutionWidth
let h = pipelineState.maxTotalThreadsPerThreadgroup / w
let threadsPerThreadgroup = MTLSize(width: w, height: h, depth: 1)

// Non-uniform dispatch: total thread count, Metal computes threadgroup boundaries
let threadsPerGrid = MTLSize(width: texture.width, height: texture.height, depth: 1)
encoder.dispatchThreads(threadsPerGrid, threadsPerThreadgroup: threadsPerThreadgroup)
```

```metal
kernel void
convertToGrayscale(texture2d<half, access::read>  inTexture  [[texture(0)]],
                    texture2d<half, access::write> outTexture [[texture(1)]],
                    uint2 gridId [[thread_position_in_grid]])
{
    if (gridId.x >= outTexture.get_width() || gridId.y >= outTexture.get_height()) {
        return; // out-of-bounds guard for uniform-threadgroup dispatch
    }
    half4 colorValue = inTexture.read(gridId);
    half grayValue = dot(colorValue.rgb, kRec709LumaCoefficients);
    outTexture.write(half4(grayValue, grayValue, grayValue, 1.0), gridId);
}
```

## Options / Props

| Concept | Description |
| --- | --- |
| `MTLComputePipelineState.threadExecutionWidth` | Number of threads in one SIMD group for this pipeline state; constant after creation |
| `MTLComputePipelineState.maxTotalThreadsPerThreadgroup` | Maximum threads a single threadgroup can contain for this pipeline state |
| `[[thread_position_in_grid]]` | MSL attribute qualifier giving a thread's unique coordinate in the whole grid |
| `[[thread_position_in_threadgroup]]` | MSL attribute qualifier giving a thread's coordinate within its own threadgroup |
| `[[threadgroup_position_in_grid]]` | MSL attribute qualifier giving a threadgroup's coordinate within the grid |
| `[[simdgroup_index_in_threadgroup]]` | MSL attribute qualifier giving a SIMD group's index within its threadgroup |
| `[[thread_index_in_simdgroup]]` | MSL attribute qualifier giving a thread's scalar index within its SIMD group |
| `dispatchThreads(_:threadsPerThreadgroup:)` | Dispatches an arbitrary (non-uniform) grid; Metal generates smaller threadgroups along grid edges — no manual bounds check needed |
| `dispatchThreadgroups(_:threadsPerThreadgroup:)` | Dispatches aligned to uniform threadgroup boundaries; kernel must guard against out-of-bounds positions itself |

## Notes

- A thread's position in the grid can be derived from its threadgroup as `threadgroup_position_in_grid * threads_per_threadgroup + thread_position_in_threadgroup`.
- Threads in a threadgroup are further split into SIMD groups (also called warps/wavefronts) that execute the same instruction stream concurrently; branch divergence within a SIMD group forces all threads to execute both branches, hurting performance.
- On devices supporting nonuniform threadgroup dispatch, prefer `dispatchThreads(_:threadsPerThreadgroup:)`: Metal computes threadgroup counts and produces nonuniform threadgroups at grid edges, avoiding wasted threads on non-multiple-of-threadgroup-size data (e.g. odd image dimensions).
- With `dispatchThreadgroups(_:threadsPerThreadgroup:)`, Metal may round the grid up to a whole number of uniform threadgroups, generating extra out-of-bounds threads — add a defensive bounds check in the kernel to exit early for those threads.
- This page covers the GPU-compute workflow on Apple silicon; the Metal rendering class references (MTLDevice, MTLComputeCommandEncoder, etc.) live in the apple-graphics skill.

## Related

- [Compute Pass Encoding](./compute-pass-encoding.md)
- [Compute Pipeline Configuration](./compute-pipeline-configuration.md)
- [Indirect Compute Commands](./indirect-compute-commands.md)
