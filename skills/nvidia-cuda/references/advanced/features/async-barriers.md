# Asynchronous Barriers

`cuda::barrier` (libcu++) separates the arrival at a synchronization point from the wait for it, so threads can do independent work between `arrive()` and `wait()` instead of blocking immediately as with `__syncthreads()`.

## Signature / Usage

```cuda
#include <cuda/barrier>
#include <cooperative_groups.h>

__global__ void init_barrier()
{
  __shared__ cuda::barrier<cuda::thread_scope_block> bar;
  auto block = cooperative_groups::this_thread_block();

  if (block.thread_rank() == 0)
  {
    init(&bar, block.size());
  }
  block.sync();
}
```

## Options / Props

| Name | Description |
| --- | --- |
| `cuda::barrier<Scope>` / `cuda::barrier<Scope, CompletionFunction>` | Barrier type parameterized by thread scope, optionally with a custom function to run on phase completion. |
| `init(&bar, count)` | Initializes a barrier for `count` participating threads. Must be called before use and synchronized with `block.sync()`/`__syncthreads()`. |
| `bar.arrive()` | Signals arrival, returning a `cuda::barrier::arrival_token` for the current phase. |
| `bar.wait(token)` | Blocks until the phase identified by `token` completes (countdown to zero). |
| `bar.arrive_and_wait()` | Convenience combining arrive and wait for the same phase, equivalent to `__syncthreads()`-style usage. |
| `bar.arrive_and_drop()` | Arrives at the barrier and reduces the expected participant count for all future phases (thread exits the barrier's participation). |
| `cuda::device::barrier_arrive_tx()` | Arrives with an expected transaction count, used to track completion of asynchronous memory operations (e.g. TMA copies) alongside thread arrivals. |
| `cuda::device::barrier_native_handle()` | Retrieves the underlying `__mbarrier_t` PTX-level handle for use with `cuda::ptx::mbarrier_*` functions. |

## Notes

- A barrier has phases: arrival/countdown, completion, then automatic reset for the next phase — `wait()` targets a specific phase's token, so a stale token from a completed phase must not be reused.
- Warp entanglement: threads in the same warp that call `arrive()`/`wait()` at different points can affect each other's progress due to SIMT execution; see the official page's warp entanglement section before mixing barrier calls with warp-divergent control flow.
- `barrier_arrive_tx` extends the arrival count with asynchronous-operation "transactions" (e.g. TMA bulk copies), letting a barrier track both thread arrivals and in-flight async copies in one synchronization point — this is the mechanism `cp_async_bulk` (TMA) uses to signal completion.

## Related

- [Pipelines](./pipelines.md)
- [Asynchronous Data Copies](./async-copies.md)
- [Advanced Kernel Programming](../core/advanced-kernel-programming.md)
