# Non-Uniform Threadgroup Dispatch Sizing

Derive a threadgroup size from the pipeline state's execution width, then dispatch across a 2D grid using both the non-uniform (`dispatchThreads`) and uniform (`dispatchThreadgroups`) forms.

```swift
// Calculate the maximum threads per threadgroup based on the thread execution width.
let w = pipelineState.threadExecutionWidth
let h = pipelineState.maxTotalThreadsPerThreadgroup / w
let threadsPerThreadgroup = MTLSizeMake(w, h, 1)

let threadsPerGrid = MTLSize(width: texture.width,
                             height: texture.height,
                             depth: 1)

// Non-uniform: Metal only launches threads whose position is inside
// threadsPerGrid, so partial threadgroups at the grid edge are handled
// for you and the kernel needs no bounds check.
computeCommandEncoder.dispatchThreads(threadsPerGrid,
                                      threadsPerThreadgroup: threadsPerThreadgroup)

let threadgroupsPerGrid = MTLSize(width: (texture.width + w - 1) / w,
                                  height: (texture.height + h - 1) / h,
                                  depth: 1)

// Uniform: the threadgroup count is rounded up, so the last threadgroup
// in each dimension can overhang the grid — the kernel below guards
// against that with an explicit bounds check.
computeCommandEncoder.dispatchThreadgroups(threadgroupsPerGrid,
                                           threadsPerThreadgroup: threadsPerThreadgroup)
```

```metal
kernel void
simpleKernelFunction(texture2d<float, access::write> outputTexture [[texture(0)]],
                     uint2 position [[thread_position_in_grid]]) {

    // Required because this kernel is dispatched with dispatchThreadgroups:
    // threadgroup counts are rounded up to a whole threadgroup, so threads
    // past the texture edge exist and must return before writing.
    if (position.x >= outputTexture.get_width() || position.y >= outputTexture.get_height()) {
        return;
    }

    outputTexture.write(float4(1.0), position);
}
```

## Notes

- This is the compute side of Metal on Apple silicon; the rendering-side Metal API (MTKView, render pipeline states, render command encoders) is covered by the separate apple-graphics skill.
- `dispatchThreads` needs no bounds guard; `dispatchThreadgroups` rounds the threadgroup count up and can overhang the grid, so its kernel must check `position` against the texture size — the guard above is written for that overhang.
- Derived from the code listings on developer.apple.com/documentation/metal/calculating-threadgroup-and-grid-sizes ("Calculating threadgroup and grid sizes").
