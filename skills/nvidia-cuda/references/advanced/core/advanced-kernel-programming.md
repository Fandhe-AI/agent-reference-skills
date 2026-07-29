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
- Full list of PTX-mapped `cuda::ptx` functions: see the official page.

## Related

- [Advanced CUDA APIs and Features](./advanced-host-programming.md)
- [Cooperative Groups](../features/cooperative-groups.md)
- [Asynchronous Barriers](../features/async-barriers.md)
- [Pipelines](../features/pipelines.md)
- [Asynchronous Data Copies](../features/async-copies.md)
