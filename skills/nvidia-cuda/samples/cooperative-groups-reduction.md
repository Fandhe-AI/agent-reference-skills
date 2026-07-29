# Cooperative Groups Reduction

Use `cooperative_groups::thread_block` and `tiled_partition` to express a generic reduction that works identically over the whole block or over sub-block tiles, instead of hand-writing warp-shuffle logic per group size.

```cpp
#include <cooperative_groups.h>
#include <cuda_runtime.h>
#include <stdio.h>

namespace cg = cooperative_groups;

// Works for any cooperative group type (thread_block or a tiled_partition):
// halves the active thread count each iteration and folds values pairwise.
__device__ int sumReduction(cg::thread_group g, int *workspace, int val)
{
    int lane = g.thread_rank();
    for (int i = g.size() / 2; i > 0; i /= 2) {
        workspace[lane] = val;
        g.sync();
        if (lane < i) {
            val += workspace[lane + i];
        }
        g.sync();
    }
    return (g.thread_rank() == 0) ? val : -1;
}

__global__ void reduceRanks()
{
    cg::thread_block block = cg::this_thread_block();
    extern __shared__ int workspace[];

    int input = block.thread_rank();
    int total = sumReduction(block, workspace, input);
    if (block.thread_rank() == 0) {
        printf("block sum = %d\n", total);
    }
    block.sync();

    // Partition the same block into independent 16-thread tiles; each tile
    // gets its own slice of the shared workspace so tiles don't clobber
    // each other's intermediate values.
    cg::thread_block_tile<16> tile16 = cg::tiled_partition<16>(block);
    int offset = block.thread_rank() - tile16.thread_rank();
    int tileSum = sumReduction(tile16, workspace + offset, tile16.thread_rank());
    if (tile16.thread_rank() == 0) {
        printf("tile16 sum = %d\n", tileSum);
    }
}

int main(void)
{
    int threadsPerBlock = 64;
    size_t sharedBytes = threadsPerBlock * sizeof(int);
    reduceRanks<<<1, threadsPerBlock, sharedBytes>>>();
    cudaDeviceSynchronize();
    return 0;
}
```

## Notes

- `cg::this_thread_block()` wraps the implicit block group in the same `thread_group` interface that `tiled_partition` returns, so generic device functions like `sumReduction` work unmodified on either.
- `g.sync()` on a cooperative group is the group-scoped equivalent of `__syncthreads()`, but also correctly synchronizes a `thread_block_tile` smaller than the full block.
- Tiles created by `cg::tiled_partition<16>(block)` each need a disjoint region of the shared workspace (`workspace + offset`); reusing the same base pointer across tiles corrupts other tiles' intermediate values.
- Derived from the official NVIDIA/cuda-samples sample "simpleCooperativeGroups" (cpp/0_Introduction), tag `v13.3`.
