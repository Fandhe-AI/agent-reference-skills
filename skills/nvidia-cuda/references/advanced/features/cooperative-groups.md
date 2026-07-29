# Cooperative Groups

C++ library (`cooperative_groups` namespace) exposing explicit thread-group handles — thread block, grid, warp-tile, coalesced-active-thread — with collective operations (`sync`, `reduce`, scans, `memcpy_async`) instead of relying only on implicit `__syncthreads()`/warp semantics.

## Signature / Usage

```cuda
namespace cg = cooperative_groups;
cg::thread_block my_group = cg::this_thread_block();
cg::thread_block_tile<8> my_subgroup = cg::tiled_partition<8>(my_group);
my_subgroup.sync();
```

## Options / Props

| Name | Description |
| --- | --- |
| `this_thread_block()` | Handle to a group containing all threads in the current thread block. |
| `this_grid()` | Handle to a group containing all threads in the grid (requires cooperative launch). |
| `this_cluster()` | Handle to a group of threads in the current thread block cluster. |
| `coalesced_threads()` | Handle to the group of currently active (converged) threads in a warp. |
| `tiled_partition<N>(group)` | Partitions a group into statically-sized tiles (e.g. `thread_block_tile<8>`). |
| `thread_rank()` / `num_threads()` / `thread_index()` / `dim_threads()` | Member accessors: rank of calling thread, total thread count, 3D thread index, 3D block dimensions. |
| `sync()` | Synchronizes all threads in the group. |
| `barrier_arrive()` / `barrier_wait()` | Split arrive/wait synchronization on a group. |
| `reduce()` | Collective reduction across the group; supports operators `plus`, `less`, `greater`, `bit_and`, `bit_or`, `bit_xor`. |
| `inclusive_scan()` / `exclusive_scan()` | Collective prefix-scan operations across the group. |
| `invoke_one()` / `invoke_one_broadcast()` | Runs a callable on exactly one thread of the group, optionally broadcasting its result. |
| `memcpy_async()` / `wait()` | Asynchronous copy into shared memory scoped to the group, paired with a wait for completion. |
| `cudaLaunchCooperativeKernel()` | Host-side launch API required to use `this_grid()` — a normal `<<<>>>` launch does not guarantee all blocks are resident simultaneously. |

## Notes

- `this_grid()` requires the kernel be launched with `cudaLaunchCooperativeKernel`, not the `<<<>>>` syntax, because grid-wide synchronization requires all blocks to be co-resident on the device.
- Create implicit group handles (`this_thread_block()`, etc.) as early as possible in the kernel and pass group handles by reference to avoid redundant group-creation overhead.
- `coalesced_threads()` captures whichever threads are active at the point of the call, which can vary across warps/branches — it is not equivalent to a full warp unless divergence is known to be absent.

## Related

- [Advanced Kernel Programming](../core/advanced-kernel-programming.md)
- [Asynchronous Data Copies](./async-copies.md)
- [Asynchronous Barriers](./async-barriers.md)
