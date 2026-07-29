# Performance Guidelines

Guidance for tuning HIP kernel occupancy, memory coalescing, control-flow divergence, and asynchronous stream overlap.

## Signature / Usage

```cpp
// Query API for tuning occupancy-driven launch configuration
int minGridSize, blockSize;
hipOccupancyMaxPotentialBlockSize(&minGridSize, &blockSize, myKernel, 0, 0);
```

## Options / Props

| Guideline | Recommendation |
| --- | --- |
| Occupancy | Reduce per-thread register usage and per-block shared memory to allow more resident warps/blocks per compute unit |
| Block size | Use a multiple of the warp size (64 on AMD Instinct/CDNA, 32 on Radeon/RDNA); 128-256 threads/block typically gives good occupancy |
| Memory coalescing | Have consecutive threads in a warp access consecutive addresses; use naturally aligned types (`float2`, `float4`); pad 2D arrays to warp-size row alignment |
| Control-flow divergence | Keep warp-uniform branches; the hardware serializes both sides of a divergent branch, wasting cycles; use predication when divergence is unavoidable |
| Asynchronous streams | Use multiple streams to overlap kernel execution with memory transfers; synchronize only where a true data dependency exists |
| Profiling | `rocprofv3` (command-line kernel/bandwidth profiling), ROCprof Compute Viewer (GUI counter analysis), AMD SMI (GPU utilization/thermal monitoring) |

## Notes

- Profile with `rocprofv3` before optimizing occupancy to identify the actual limiting resource (registers, LDS, or block count).

## Related

- [hardware-implementation.md](./hardware-implementation.md)
- [occupancy.md](./occupancy.md)
- [asynchronous-execution.md](./asynchronous-execution.md)
