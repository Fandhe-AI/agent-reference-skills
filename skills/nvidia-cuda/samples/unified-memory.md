# Unified Memory

Allocate a single pointer accessible from both host and device with `cudaMallocManaged`, then use `cudaMemPrefetchAsync` and `cudaMemAdvise` to steer page migration instead of relying on first-touch demand paging.

```cpp
#include <cuda_runtime.h>
#include <stdio.h>

__global__ void scale(float *data, int n, float factor)
{
    int i = blockDim.x * blockIdx.x + threadIdx.x;
    if (i < n) {
        data[i] *= factor;
    }
}

int main(void)
{
    int n = 1 << 20;
    size_t bytes = n * sizeof(float);
    int device = 0;
    cudaGetDevice(&device);

    float *data = NULL;
    cudaMallocManaged(&data, bytes);
    for (int i = 0; i < n; ++i) {
        data[i] = (float)i;
    }

    // Migrate the freshly-initialized data to the GPU ahead of the kernel
    // launch instead of paying for page-fault-driven migration during the
    // first kernel access. No read-mostly hint yet: the kernel below still
    // writes every element, so marking it read-mostly now would just force
    // the driver to invalidate the hint immediately.
    cudaMemPrefetchAsync(data, bytes, device, 0);

    int threadsPerBlock = 256;
    int blocksPerGrid = (n + threadsPerBlock - 1) / threadsPerBlock;
    scale<<<blocksPerGrid, threadsPerBlock>>>(data, n, 2.0f);
    cudaDeviceSynchronize();

    // Only now is the buffer done being written. Hint that it will be read
    // (not written) from this point on, so the driver can keep read-only
    // replicas resident on multiple processors instead of migrating it back
    // and forth on every future access.
    cudaMemAdvise(data, bytes, cudaMemAdviseSetReadMostly, device);

    // Migrate back to the host before the CPU reads the result, avoiding a
    // page fault per cache line touched.
    cudaMemPrefetchAsync(data, bytes, cudaCpuDeviceId, 0);
    cudaDeviceSynchronize();

    printf("data[0] = %f\n", data[0]);
    cudaFree(data);
    return 0;
}
```

## Notes

- `cudaMallocManaged` returns a single pointer valid on both host and device; without prefetch/advise hints, pages migrate on first touch, which shows up as page-fault latency inside the first kernel or host access.
- `cudaMemPrefetchAsync(ptr, bytes, device, stream)` moves a managed range to a target location ahead of use; pass `cudaCpuDeviceId` to prefetch back to the host.
- `cudaMemAdviseSetReadMostly` is appropriate once a range is done being written and will only be read afterward; it lets the driver keep read-only copies resident on multiple processors instead of migrating on every access. Applying it before a write that still touches every element (e.g. before `scale` runs) forces the driver to invalidate the read-only replica right away, so the hint must be set after the writing kernel completes, not before.
- Always call `cudaDeviceSynchronize()` (or synchronize the stream used) after a prefetch before touching the data from the other processor, since prefetch is asynchronous.
- Derived from the official NVIDIA/cuda-samples sample "UnifiedMemoryStreams" (cpp/0_Introduction), tag `v13.3`, adapted to use `cudaMemPrefetchAsync` / `cudaMemAdvise` as documented in the CUDA C++ Programming Guide's Unified Memory chapter.
