# Stream-Ordered Memory Allocation

Allocate and free device memory with `cudaMallocAsync` / `cudaFreeAsync` so allocation lifetime follows stream order like any other stream operation, and tune the memory pool's retention with `cudaMemPoolSetAttribute`.

```cpp
#include <cuda_runtime.h>
#include <stdio.h>
#include <limits.h>

__global__ void vectorAddGPU(const float *a, const float *b, float *c, int n)
{
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        c[idx] = a[idx] + b[idx];
    }
}

int main(void)
{
    int dev = 0;
    cudaSetDevice(dev);
    const int nelem = 1 << 20;
    size_t bytes = nelem * sizeof(float);

    float *a = (float *)malloc(bytes);
    float *b = (float *)malloc(bytes);
    float *c = (float *)malloc(bytes);
    for (int i = 0; i < nelem; ++i) {
        a[i] = 1.0f;
        b[i] = 2.0f;
    }

    // By default a memory pool releases chunks back to the OS as soon as
    // they have no active suballocations. Raising the release threshold to
    // the maximum keeps freed blocks in the pool across iterations, so
    // repeated cudaMallocAsync/cudaFreeAsync in a steady-state loop stop
    // paying for OS-level allocation once the pool has grown to fit.
    cudaMemPool_t memPool;
    cudaDeviceGetDefaultMemPool(&memPool, dev);
    uint64_t thresholdVal = ULONG_MAX;
    cudaMemPoolSetAttribute(memPool, cudaMemPoolAttrReleaseThreshold, (void *)&thresholdVal);

    cudaStream_t stream;
    cudaStreamCreateWithFlags(&stream, cudaStreamNonBlocking);

    float *d_a, *d_b, *d_c;
    // Allocation and free are ordered on the stream just like a kernel
    // launch: d_a is guaranteed valid for every operation enqueued on
    // `stream` between this call and the matching cudaFreeAsync.
    cudaMallocAsync(&d_a, bytes, stream);
    cudaMallocAsync(&d_b, bytes, stream);
    cudaMallocAsync(&d_c, bytes, stream);
    cudaMemcpyAsync(d_a, a, bytes, cudaMemcpyHostToDevice, stream);
    cudaMemcpyAsync(d_b, b, bytes, cudaMemcpyHostToDevice, stream);

    dim3 block(256);
    dim3 grid((nelem + block.x - 1) / block.x);
    vectorAddGPU<<<grid, block, 0, stream>>>(d_a, d_b, d_c, nelem);

    cudaFreeAsync(d_a, stream);
    cudaFreeAsync(d_b, stream);
    cudaMemcpyAsync(c, d_c, bytes, cudaMemcpyDeviceToHost, stream);
    cudaFreeAsync(d_c, stream);
    cudaStreamSynchronize(stream);

    cudaStreamDestroy(stream);
    free(a);
    free(b);
    free(c);
    return 0;
}
```

## Notes

- `cudaMallocAsync`/`cudaFreeAsync` enqueue the allocation and free as stream operations — no explicit synchronization is needed between the alloc, the kernel that uses it, and the matching free as long as they are all issued on the same stream in that order.
- The default memory pool's release threshold is `0`, meaning the driver may return freed memory to the OS immediately; setting `cudaMemPoolAttrReleaseThreshold` to `ULONG_MAX` keeps the pool's high-water mark resident, which pays off for allocate/free patterns repeated many times in a loop.
- `cudaMallocAsync` calls are still ordered relative to each other and to kernel launches on the same stream, so `d_a`/`d_b`/`d_c` can be safely consumed by `vectorAddGPU` without an extra `cudaStreamSynchronize` in between.
- Derived from the official NVIDIA/cuda-samples sample "streamOrderedAllocation" (cpp/2_Concepts_and_Techniques), tag `v13.3`.
