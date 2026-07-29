# Stream Ordered Allocation

Allocate and free device memory with stream-ordered semantics using `hipMallocAsync` / `hipFreeAsync`, and tune a memory pool's retention behavior with `hipMemPoolSetAttribute`.

```cpp
#include <hip/hip_runtime.h>
#include <cstdint>
#include <cstdlib>
#include <iostream>
#include <limits>

#define HIP_CHECK(expr)                                                    \
    {                                                                      \
        const hipError_t status = (expr);                                 \
        if (status != hipSuccess) {                                       \
            std::cerr << "HIP error " << status << ": "                   \
                      << hipGetErrorString(status) << " at " << __FILE__  \
                      << ":" << __LINE__ << std::endl;                    \
            std::exit(EXIT_FAILURE);                                     \
        }                                                                 \
    }

__global__ void myKernel(int* data, std::size_t numElements)
{
    int tid = threadIdx.x + blockIdx.x * blockDim.x;
    if (tid < numElements) {
        data[tid] = tid * 2;
    }
}

int main()
{
    hipStream_t stream;
    HIP_CHECK(hipStreamCreate(&stream));

    // A memory pool backs stream-ordered allocations; its release threshold
    // controls how much freed memory the pool retains for future reuse
    // instead of returning it to the OS immediately.
    hipMemPoolProps poolProps  = {};
    poolProps.allocType        = hipMemAllocationTypePinned;
    poolProps.handleTypes      = hipMemHandleTypePosixFileDescriptor;
    poolProps.location.type    = hipMemLocationTypeDevice;
    poolProps.location.id      = 0;

    hipMemPool_t memPool;
    HIP_CHECK(hipMemPoolCreate(&memPool, &poolProps));

    std::uint64_t threshold = std::numeric_limits<std::uint64_t>::max();
    HIP_CHECK(hipMemPoolSetAttribute(memPool, hipMemPoolAttrReleaseThreshold, &threshold));

    constexpr std::size_t numElements = 1024;
    int* devData = nullptr;
    // Allocation is enqueued on the stream: it becomes valid only after
    // prior work on the stream completes, and is safe to use immediately
    // by subsequent operations on the same stream without extra sync.
    HIP_CHECK(hipMallocFromPoolAsync(reinterpret_cast<void**>(&devData),
                                      numElements * sizeof(*devData), memPool, stream));

    dim3 blockSize(256);
    dim3 gridSize((numElements + blockSize.x - 1) / blockSize.x);
    myKernel<<<gridSize, blockSize, 0, stream>>>(devData, numElements);

    HIP_CHECK(hipStreamSynchronize(stream));

    // hipFreeAsync enqueues the free on the stream instead of blocking; the
    // memory becomes available for reuse only after the stream reaches
    // this point.
    HIP_CHECK(hipFreeAsync(devData, stream));
    HIP_CHECK(hipStreamSynchronize(stream));

    HIP_CHECK(hipMemPoolDestroy(memPool));
    HIP_CHECK(hipStreamDestroy(stream));
    return 0;
}
```

## Notes

- `hipMallocAsync`/`hipFreeAsync` (and the pool-scoped `hipMallocFromPoolAsync`) make allocation and deallocation stream-ordered operations, avoiding the implicit device-wide synchronization that `hipMalloc`/`hipFree` can incur.
- `hipMemPoolAttrReleaseThreshold` controls how many bytes of freed memory a pool retains (for reuse by future `hipMallocAsync` calls) before returning excess memory to the OS; setting it to the maximum keeps all freed memory in the pool.
- Memory obtained from a stream-ordered allocation must not be accessed before the enqueuing stream reaches that point, and must not be freed on an unrelated stream without synchronization.
- This is the HIP API (`hipMallocAsync`, `hipFreeAsync`, `hipMemPool_t`) for AMD GPUs, not the CUDA API of the same shape; the CUDA equivalent is covered by the separate nvidia-cuda skill.
- Derived from the official ROCm/rocm-examples samples "HIP-Doc/.../SOMA/stream_ordered_memory_allocation" and "memory_pool_threshold" (MIT License), tag `therock-7.14`.
