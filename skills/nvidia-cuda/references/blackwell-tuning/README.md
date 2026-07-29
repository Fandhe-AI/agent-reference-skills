# blackwell-tuning

| Name | Description | Path |
| --- | --- | --- |
| architecture | NVIDIA Blackwell GPU Architecture, CUDA programming model compatibility with Ampere/Hopper, compute capability 10.0 / 12.0 | [architecture.md](./architecture.md) |
| best-practices | High-priority CUDA Best Practices, Application Compatibility pointer to the Blackwell Compatibility Guide | [best-practices.md](./best-practices.md) |
| streaming-multiprocessor | SM occupancy limits (warps, registers, shared memory, thread blocks), Thread Block Clusters, `cudaOccupancyMaxActiveClusters` | [streaming-multiprocessor.md](./streaming-multiprocessor.md) |
| memory-system | HBM3/HBM3e, increased L2 capacity, unified shared memory/L1/texture cache, `cudaFuncAttributePreferredSharedMemoryCarveout` | [memory-system.md](./memory-system.md) |
| nvlink | Fifth-generation NVLink, transparent NVLink routing, `cudaDeviceEnablePeerAccess`, `cudaDeviceCanAccessPeer` | [nvlink.md](./nvlink.md) |
