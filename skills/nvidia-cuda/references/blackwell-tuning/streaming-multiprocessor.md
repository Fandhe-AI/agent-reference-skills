# Streaming Multiprocessor Tuning

Occupancy limits and Thread Block Cluster behavior for the Blackwell Streaming Multiprocessor (compute capability 10.0 and 12.0).

## Signature / Usage

```cpp
// Query the maximum number of active clusters for a given kernel/launch config
int numClusters = 0;
cudaOccupancyMaxActiveClusters(&numClusters, kernelFunc, launchConfig);

// Opt in to a non-portable cluster size larger than 8 (B200 only)
cudaFuncSetAttribute(
    kernelFunc,
    cudaFuncAttributeNonPortableClusterSizeAllowed,
    1);
```

## Options / Props

| Name | Compute capability 10.0 | Compute capability 12.0 |
|------|--------------------------|--------------------------|
| Maximum concurrent warps per SM | 64 | 48 |
| Register file size per SM | 64K 32-bit registers | 64K 32-bit registers |
| Maximum registers per thread | 255 | 255 |
| Maximum thread blocks per SM | 32 | 32 |
| Maximum shared memory per SM | 228 KB | 128 KB |
| Maximum shared memory per thread block | 227 KB | 99 KB |

| Name | Description |
|------|-------------|
| Thread Block Cluster | A group of thread blocks that can read from, write to, and perform atomics on each other's shared memory (Distributed Shared Memory) |
| Maximum portable cluster size | 8 (guaranteed to run on any Blackwell GPU) |
| Non-portable cluster size | Up to 16 on B200 GPUs, requires opting in via `cudaFuncAttributeNonPortableClusterSizeAllowed` |
| `cudaOccupancyMaxActiveClusters` | Queries the maximum number of clusters that can be resident simultaneously for a given kernel and launch configuration |
| `cudaFuncAttributeNonPortableClusterSizeAllowed` | Function attribute that must be set to allow cluster sizes beyond the portable maximum of 8 |

## Notes

- Larger cluster sizes can reduce the maximum number of active thread blocks resident across the whole GPU, since more shared memory and scheduling resources are reserved per cluster.
- Non-portable cluster sizes (9–16) are a B200-specific capability; code relying on them will not run unmodified on GPUs that only support the portable maximum of 8.
- Document version: NVIDIA Blackwell Tuning Guide, revision 1.0 (`https://docs.nvidia.com/cuda/blackwell-tuning-guide/index.html`, CUDA docs build v13.3).

## Related

- [NVIDIA Blackwell GPU Architecture](./architecture.md)
- [Memory System](./memory-system.md)
