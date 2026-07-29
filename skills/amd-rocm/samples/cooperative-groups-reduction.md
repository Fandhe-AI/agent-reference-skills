# Cooperative Groups Reduction

Use `cooperative_groups::thread_block` and `tiled_partition<>()` to express a reduction generically over a whole block or over sub-block tiles, without hard-coding warp-level shuffles.

```cpp
#include <hip/hip_runtime.h>
#include <hip/hip_cooperative_groups.h>

using namespace cooperative_groups;

// Sums val across every thread in group g, using x as scratch shared
// memory. Works for any thread_group (a whole block or a tiled partition).
__device__ unsigned int reduce_sum(thread_group g, unsigned int* x, unsigned int val)
{
    const unsigned int group_thread_id = g.thread_rank();

    for (unsigned int i = g.size() / 2; i > 0; i /= 2) {
        x[group_thread_id] = val;
        // Synchronizes only the threads in g, not the whole device.
        g.sync();
        if (group_thread_id < i) {
            val += x[group_thread_id + i];
        }
        g.sync();
    }
    return (g.thread_rank() == 0) ? val : 0;
}

template <unsigned int PartitionSize>
__global__ void vector_reduce_kernel(const unsigned int* d_vector,
                                      unsigned int* d_block_reduced_vector,
                                      unsigned int* d_partition_reduced_vector)
{
    thread_block thread_block_group = this_thread_block();
    __shared__ unsigned int workspace[2048];

    const unsigned int input = d_vector[thread_block_group.thread_rank()];
    unsigned int output = reduce_sum(thread_block_group, workspace, input);
    if (thread_block_group.thread_rank() == 0) {
        d_block_reduced_vector[0] = output;
    }

    // Splits the block into fixed-size sub-groups (e.g. 16 threads each),
    // each with its own private slice of the shared workspace.
    thread_block_tile<PartitionSize> custom_partition = tiled_partition<PartitionSize>(thread_block_group);
    const unsigned int group_offset = thread_block_group.thread_rank() - custom_partition.thread_rank();

    output = reduce_sum(custom_partition, &workspace[group_offset], input);
    if (custom_partition.thread_rank() == 0) {
        const unsigned int partition_id = thread_block_group.thread_rank() / PartitionSize;
        d_partition_reduced_vector[partition_id] = output;
    }
}
```

## Notes

- `cooperative_groups` gives a single `reduce_sum` implementation that works identically whether `g` is the whole `thread_block` or a `tiled_partition<PartitionSize>` sub-group — the group's own `.size()`, `.thread_rank()`, and `.sync()` abstract over the difference.
- `tiled_partition<PartitionSize>` splits a parent group into disjoint fixed-size tiles; `group_offset` computes each tile's private slice of the shared `workspace` array so tiles don't clobber each other.
- `g.sync()` on a `thread_group` only synchronizes the threads that belong to that group, unlike `__syncthreads()` which always synchronizes the entire block.
- This is the HIP API (`hip/hip_cooperative_groups.h`, `cooperative_groups::thread_block`) for AMD GPUs, not the CUDA API of the same shape; the CUDA equivalent is covered by the separate nvidia-cuda skill's `cooperative-groups-reduction.md`.
- Derived from the official ROCm/rocm-examples sample "HIP-Basic/cooperative_groups" (MIT License), tag `therock-7.14`.
