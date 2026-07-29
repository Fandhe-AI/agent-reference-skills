# Work Stealing with Cluster Launch Control

Compute-capability-10.0+ (Blackwell) PTX API letting a resident thread block or cluster cancel the launch of another thread block/cluster that has not yet started, enabling dynamic load balancing (work stealing) across an otherwise static grid.

## Signature / Usage

```cuda
if (cg::thread_block::thread_rank() == 0)
    ptx::mbarrier_init(&bar, 1);
__syncthreads();
```

## Options / Props

| Name | Description |
| --- | --- |
| `ptx::clusterlaunchcontrol_try_cancel()` | Attempts to cancel the launch of a not-yet-started thread block/cluster, freeing its resources for reassignment. |
| `ptx::clusterlaunchcontrol_query_cancel_is_canceled()` | Queries whether a prior `try_cancel` call actually canceled a block. |
| `ptx::clusterlaunchcontrol_query_cancel_get_first_ctaid_x/y/z()` | Retrieves the CTA (thread block) ID of the canceled block along each dimension. |
| `ptx::clusterlaunchcontrol_try_cancel_multicast()` | Multicast variant of `try_cancel` for cluster-wide cancellation. |
| `ptx::mbarrier_init()` / `mbarrier_arrive_expect_tx()` / `mbarrier_try_wait_parity()` | Low-level PTX barrier primitives used to synchronize the try-cancel/query-cancel handshake. |
| `ptx::fence_proxy_async_generic_sync_restrict()` | Fence required around the async-proxy operations involved in cluster launch control. |

## Notes

- Cluster launch control is available only on compute capability 10.0+ (Blackwell); attempting to use it on earlier architectures is unsupported.
- The typical pattern: a thread block/cluster nearing completion calls `try_cancel` on a not-yet-scheduled block; if canceled, it queries the first CTA ID of the canceled block and takes over that work item itself, achieving work stealing without host intervention.
- Constraints on which blocks are eligible for cancellation (e.g. must not have started, cluster-mode restrictions) are documented on the official page and should be checked before relying on cancellation ordering.

## Related

- [A Tour of CUDA Features](../core/feature-survey.md)
- [Advanced Kernel Programming](../core/advanced-kernel-programming.md)
