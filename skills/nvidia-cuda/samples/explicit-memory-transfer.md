# Explicit Memory Transfer

Allocate device memory with `cudaMalloc`, move data with `cudaMemcpy`, and use pinned (page-locked) host memory with `cudaHostAlloc` for faster, asynchronous transfers.

```cpp
#include <cuda_runtime.h>
#include <stdio.h>

int main(void)
{
    const int n = 1 << 20;
    size_t bytes = n * sizeof(float);

    // Pinned host memory lets the DMA engine transfer directly without an
    // extra staging copy, which is required for cudaMemcpyAsync to actually
    // overlap with kernel execution or other transfers.
    float *h_pinned = NULL;
    cudaHostAlloc((void **)&h_pinned, bytes, cudaHostAllocDefault);
    for (int i = 0; i < n; ++i) {
        h_pinned[i] = (float)i;
    }

    float *d_data = NULL;
    cudaMalloc((void **)&d_data, bytes);

    cudaStream_t stream;
    cudaStreamCreate(&stream);

    // Host-to-device copy is asynchronous with respect to the host only
    // because h_pinned is page-locked.
    cudaMemcpyAsync(d_data, h_pinned, bytes, cudaMemcpyHostToDevice, stream);

    // A kernel enqueued on the same stream here would run only after the
    // H2D copy above completes, and the D2H copy below would in turn wait
    // for that kernel — stream order alone gives correct sequencing
    // without any explicit event or synchronize call between the three.

    cudaMemcpyAsync(h_pinned, d_data, bytes, cudaMemcpyDeviceToHost, stream);
    cudaStreamSynchronize(stream);

    cudaStreamDestroy(stream);
    cudaFree(d_data);
    cudaFreeHost(h_pinned);
    return 0;
}
```

## Notes

- `cudaMemcpy` (no `Async` suffix) is synchronous with respect to the host and always safe, but blocks the calling thread until the transfer completes.
- `cudaMemcpyAsync` only behaves asynchronously with respect to the host when the host buffer is page-locked (`cudaHostAlloc` / `cudaMallocHost`); passing regular `malloc`'d memory silently falls back to a synchronous copy.
- Pinned memory is a limited system resource — over-allocating it can degrade overall system performance, so pin only the buffers that are actually on the hot transfer path.
- Always pair `cudaHostAlloc` with `cudaFreeHost` (not `free`) and `cudaMalloc` with `cudaFree`.
- Derived from the official NVIDIA/cuda-samples sample "simpleStreams" (cpp/0_Introduction), tag `v13.3`.
