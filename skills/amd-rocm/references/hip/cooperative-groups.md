# Cooperative Groups

C++ types and functions that let kernels express and synchronize thread groups explicitly (sub-warp tiles up to whole-grid and multi-device groups) instead of relying only on implicit block/warp scope.

## Signature / Usage

```cpp
#include <hip/hip_cooperative_groups.h>
namespace cg = cooperative_groups;

__global__ void kernel() {
    cg::thread_block block = cg::this_thread_block();
    cg::thread_block_tile<32> tile = cg::tiled_partition<32>(block);
    tile.sync();
}
```

## Options / Props

| Type / Function | Description |
| --- | --- |
| `thread_group` | Base type of all cooperative group types, holding group type and size |
| `thread_block` | Group of threads within the same launching work-group (block) |
| `grid_group` | Group spanning all work-groups in a single-device kernel launch (requires `hipLaunchCooperativeKernel`) |
| `multi_grid_group` | Group spanning work-groups across multiple devices (requires `hipLaunchCooperativeKernelMultiDevice`) |
| `thread_block_tile<N>` | Statically sized sub-warp tile for sub-wavefront operations |
| `coalesced_group` | Groups all currently active (converged) lanes into a new group |
| `this_thread_block()` / `this_grid()` / `this_multi_grid()` | Constructs the corresponding cooperative group handle |
| `coalesced_threads()` | Constructs a `coalesced_group` from currently active lanes |
| `tiled_partition<N>(g)` | Partitions a parent group into row-major tiles of size `N` |
| `binary_partition(g, pred)` | Splits a group into two subgroups by a boolean predicate |
| `sync(g)` / `g.sync()` | Blocks all threads in the group at a synchronization point |
| `thread_rank(g)` | Returns the calling thread's rank within `[0, num_threads())` |
| `group_size(g)` | Returns the total number of threads in the group |
| `is_valid(g)` | Validates group construction constraints |
| `hipLaunchCooperativeKernel(...)` | Launches a kernel enabling grid-wide cooperation/synchronization on one device |
| `hipLaunchCooperativeKernelMultiDevice(...)` | Launches a cooperative kernel spanning multiple devices |
| `hipModuleLaunchCooperativeKernel(...)` | Module-API variant of a cooperative kernel launch |

## Notes

- This is the AMD HIP API (`hip*` prefix), not the CUDA runtime API (`cuda*` prefix). HIP and CUDA are source-portable but not source-identical; see `porting-cuda-to-hip.md` and `hipify.md`. CUDA equivalents are covered by the separate `nvidia-cuda` skill.
- Grid- and multi-grid-level groups require launching via the cooperative-launch functions, not the `<<<>>>` syntax.

## Related

- [cpp-language-extensions.md](./cpp-language-extensions.md)
- [execution-control-launch.md](./execution-control-launch.md)
- [multi-device-peer-to-peer.md](./multi-device-peer-to-peer.md)
