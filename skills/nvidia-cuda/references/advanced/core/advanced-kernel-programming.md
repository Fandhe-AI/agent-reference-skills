# Advanced Kernel Programming

Device-side primitives beyond basic kernel syntax: PTX access via `cuda::ptx`, the SIMT hardware model, thread scopes, scoped atomics, asynchronous barriers/pipelines, asynchronous data copies, and shared memory carveout control.

## Signature / Usage

```cpp
#include <cuda/barrier>
__global__ void split_arrive_wait(int iteration_count, float *data) {
    using barrier_t = cuda::barrier<cuda::thread_scope_block>;
    __shared__ barrier_t bar;
    if (threadIdx.x == 0) init(&bar, blockDim.x);
    __syncthreads();
    for (int i = 0; i < iteration_count; ++i) {
        barrier_t::arrival_token token = bar.arrive();
        bar.wait(std::move(token));
    }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `cuda::ptx` | namespace | libcu++ namespace with C++ functions mapping directly to individual PTX instructions. |
| `__syncwarp()` | intrinsic | Synchronizes threads within a warp under independent thread scheduling. |
| `__syncthreads()` | intrinsic | Synchronizes all threads within a thread block. |
| `cuda::thread_scope_thread` / `_block` / `_device` / `_system` | enum | Scopes for `cuda::atomic` and `cuda::barrier`, mapping to PTX `.cta` / `.gpu` / `.sys` scopes. |
| `cuda::atomic<T, Scope>` | class | Scoped atomic type; used with `memory_order_relaxed` / `_release` / `_acquire`. |
| `cuda::barrier<Scope>` | class | Asynchronous barrier supporting split arrive/wait (`arrive()`, `wait(token)`, `arrival_token`). Hardware-accelerated on compute capability 8.0+ (block scope) and 9.0+ (cluster scope). |
| `cuda::pipeline` | class | Multi-stage producer/consumer pipeline: `producer_acquire()`, `producer_commit()`, `consumer_wait()`, `consumer_release()`. |
| `cooperative_groups::memcpy_async()` / `wait()` | function | Asynchronous copy from global to shared memory, overlapping with computation; backed by LDGSTS (CC 8.0+) or TMA (CC 9.0+). |
| `cudaFuncSetAttribute` + `cudaFuncAttributePreferredSharedMemoryCarveout` | function/enum | Configures the L1 cache vs. shared memory split for a kernel (`cudaSharedmemCarveoutDefault` / `MaxL1` / `MaxShared`). |
| `cudaFuncAttributeMaxDynamicSharedMemorySize` | enum | Raises the dynamic shared memory limit for a kernel beyond the default 48 KB. |

## Notes

- Thread scopes determine which threads' writes become visible and at which cache level (L1 for block/cluster scope, L2 for device/system scope) — see `cuda::thread_scope_*`.
- `cuda::barrier` split arrive/wait lets a thread do unrelated work between `arrive()` and `wait()`, unlike `__syncthreads()`.
- Hardware-accelerated asynchronous data copies require compute capability 8.0+ (LDGSTS, global→shared::cta) or 9.0+ (TMA, bulk-async, broader source/destination combinations including cluster shared memory).
- Architecture traits (CPG 13.5): support for hardware-accelerated asynchronous data copies (CC 8.0) is reported by the `cp_async_supported` field of `cuda::arch_traits`, and support for TMA (CC 9.0) by `tma_supported`. Host code can check these fields with `cuda::arch_traits_for()` before launching a kernel, and device code can select a code path at compile time with `if constexpr (cuda::device::current_arch_traits().tma_supported)`.
- Section numbering: since CPG 13.5, advanced synchronization primitives are covered in Sections 4.11 and 4.12, and asynchronous data copies (including TMA) in Section 4.13 (Section 4.6 is the new Fine-Grained Synchronization).
- Full list of PTX-mapped `cuda::ptx` functions: see the official page.

### Opting in to more than 48 KB of dynamic shared memory (CPG 13.5)

The official page adds a second tab that uses `cuda::device_attributes` to query the current device's compute capability and `cuda::arch_traits_for()` to check the architecture's shared memory limit before opting in (both examples use the CUDA Runtime API to opt in and launch the kernel):

```cpp
#include <cuda/devices>
#include <cuda_runtime.h>
#include <cstdio>
#include <cstdlib>
#include <exception>
// Device code
__global__ void MyKernel(float* output, int n)
{
    extern __shared__ float buffer[];
    for (int i = threadIdx.x; i < n; i += blockDim.x) {
        buffer[i] = static_cast<float>(i);
    }
    __syncthreads();
    if (threadIdx.x == 0) {
        output[blockIdx.x] = buffer[n - 1];
    }
}
// Host code
cudaError_t launch_my_kernel(float* output, int num_blocks)
{
    int device_id;
    cudaError_t status = cudaGetDevice(&device_id);
    if (status != cudaSuccess) {
        return status;
    }
    auto compute_capability = cuda::device_attributes::compute_capability(device_id);
    auto traits             = cuda::arch_traits_for(compute_capability);
    int maxbytes = 98304; // 96 KB
    // The architecture must support the requested size.
    if (maxbytes > traits.max_shared_memory_per_block_optin) {
        return cudaErrorInvalidValue;
    }
    // Explicitly opt in to dynamic shared memory above 48 KB per block.
    status = cudaFuncSetAttribute(MyKernel, cudaFuncAttributeMaxDynamicSharedMemorySize, maxbytes);
    if (status != cudaSuccess) {
        return status;
    }
    int n = maxbytes / sizeof(float);
    MyKernel<<<num_blocks, 256, maxbytes>>>(output, n);
    return cudaGetLastError();
}
```

- Source: https://docs.nvidia.com/cuda/cuda-programming-guide/03-advanced/advanced-kernel-programming.html (CPG v13.5, retrieved 2026-11-14)

## Related

- [Advanced CUDA APIs and Features](./advanced-host-programming.md)
- [Cooperative Groups](../features/cooperative-groups.md)
- [Asynchronous Barriers](../features/async-barriers.md)
- [Pipelines](../features/pipelines.md)
- [Asynchronous Data Copies](../features/async-copies.md)
