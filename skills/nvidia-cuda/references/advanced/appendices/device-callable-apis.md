# Device-Callable APIs and Intrinsics

Lower-level device-side APIs underlying the higher-level `cuda::barrier`, `cuda::pipeline`, and Cooperative Groups facilities: raw memory-barrier primitives (`__mbarrier_*`), pipeline primitives (`__pipeline_*`), the Cooperative Groups API surface, and the CUDA Device Runtime (device-callable subset of `cudaMalloc`/`cudaMemcpyAsync`/stream and event APIs, plus `cudaLaunchDevice`/`cudaGetParameterBuffer`).

## Signature / Usage

```cuda
__global__ void kernel(int *globalInput) {
    __shared__ int x;
    auto g = cooperative_groups::this_thread_block();
    if (g.thread_rank() == 0) {
        x = (*globalInput);
    }
    g.sync();
}
```

## Options / Props

| Name | Description |
| --- | --- |
| `__mbarrier_init()` / `__mbarrier_inval()` | Initialize/invalidate a raw `__mbarrier_t` handle, the PTX-level object backing `cuda::barrier`. |
| `__mbarrier_arrive()` / `__mbarrier_arrive_and_drop()` | Arrive at a raw memory barrier, optionally dropping from future phases. |
| `__mbarrier_test_wait()` / `__mbarrier_test_wait_parity()` / `__mbarrier_try_wait()` / `__mbarrier_try_wait_parity()` | Non-blocking/blocking phase-completion checks on a raw memory barrier. |
| `__mbarrier_maximum_count()` | Returns the maximum arrival count a memory barrier supports. |
| `__pipeline_memcpy_async()` / `__pipeline_commit()` / `__pipeline_wait_prior()` / `__pipeline_arrive_on()` | Raw pipeline primitives underlying `cuda::pipeline`'s producer/consumer stages. |
| `cudaMalloc` / `cudaFree`, `cudaMemcpyAsync` / `cudaMemcpy2DAsync` / `cudaMemcpy3DAsync`, `cudaMemsetAsync` (and 2D/3D variants) | Device Runtime subset of the Runtime API callable from within a kernel under Dynamic Parallelism. |
| `cudaStreamCreateWithFlags` / `cudaStreamDestroy` / `cudaStreamWaitEvent`, `cudaEventCreateWithFlags` / `cudaEventRecord` / `cudaEventDestroy` | Device-callable stream/event management for child-grid orchestration. |
| `cudaGetParameterBuffer()` / `cudaLaunchDevice()` | Low-level device-side kernel launch primitives underlying the device-side `<<<>>>` syntax. |
| `cudaLimitDevRuntimePendingLaunchCount` | Named limit controlling the pending-launch/event buffer size for the device runtime (default 2048 slots). |
| `cudaLimitStackSize` | Named limit controlling per-thread GPU stack size in bytes. |

## Notes

- These are the primitives that `cuda::barrier`, `cuda::pipeline`, and `cooperative_groups::memcpy_async` compile down to — most code should prefer the higher-level libcu++/Cooperative Groups APIs and reach for these only when building custom synchronization primitives.
- The Device Runtime subset listed here is the same API family used by CUDA Dynamic Parallelism for device-side kernel launches and memory operations; `cudaLimitDevRuntimePendingLaunchCount` and `cudaLimitStackSize` are configured via `cudaDeviceSetLimit` before launching kernels that use it.

## Related

- [Asynchronous Barriers](../features/async-barriers.md)
- [Pipelines](../features/pipelines.md)
- [Cooperative Groups](../features/cooperative-groups.md)
- [CUDA Dynamic Parallelism](../features/dynamic-parallelism.md)
