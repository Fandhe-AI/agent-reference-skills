# Occupancy

Functions to compute the grid/block configuration that maximizes active warps per compute unit for a given kernel.

## Signature / Usage

```cpp
int minGridSize, blockSize;
hipOccupancyMaxPotentialBlockSize(&minGridSize, &blockSize, myKernel, /*dynSharedMem*/0, /*blockSizeLimit*/0);
```

## Options / Props

| Function | Description |
| --- | --- |
| `hipOccupancyMaxPotentialBlockSize(...)` | Determines the grid and block sizes that achieve maximum occupancy for a kernel |
| `hipModuleOccupancyMaxPotentialBlockSize(...)` | Module-based variant of the above, operating on a `hipFunction_t` |
| `hipOccupancyMaxActiveBlocksPerMultiprocessor(...)` | Returns how many blocks of a kernel can run concurrently on one compute unit |
| `hipModuleOccupancyMaxActiveBlocksPerMultiprocessor(...)` | Module-based variant |
| `hipOccupancyAvailableDynamicSMemPerBlock(...)` | Returns dynamic shared memory available per block when launching `numBlocks` blocks per compute unit |
| `hipOccupancyMaxActiveClusters(...)` | Determines the concurrent thread-block-cluster capacity |
| `hipOccupancyMaxPotentialClusterSize(...)` | Calculates the maximum cluster dimensions for a kernel |

## Notes

- HIP does not support launching a kernel whose total work-items (`gridDim x blockDim`) is `>= 2^32`.
- Use these functions rather than hand-tuned block sizes when occupancy needs to adapt to the target GPU (see `performance-guidelines.md`).

## Related

- [performance-guidelines.md](./performance-guidelines.md)
- [execution-control-launch.md](./execution-control-launch.md)
