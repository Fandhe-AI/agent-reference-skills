# CUDA Features (Part 4)

| Name | Description | Path |
| --- | --- | --- |
| Unified Memory | cudaMallocManaged, cudaMemAdvise, cudaMemPrefetchAsync | [unified-memory.md](./unified-memory.md) |
| CUDA Graphs | cudaGraphCreate, cudaStreamBeginCapture, cudaGraphInstantiate, cudaGraphLaunch | [cuda-graphs.md](./cuda-graphs.md) |
| Stream-Ordered Memory Allocator | cudaMallocAsync, cudaFreeAsync, cudaMemPoolCreate | [stream-ordered-memory-allocation.md](./stream-ordered-memory-allocation.md) |
| Cooperative Groups | this_thread_block, this_grid, tiled_partition, reduce | [cooperative-groups.md](./cooperative-groups.md) |
| Programmatic Dependent Launch and Synchronization | cudaTriggerProgrammaticLaunchCompletion, cudaGridDependencySynchronize | [programmatic-dependent-launch.md](./programmatic-dependent-launch.md) |
| Green Contexts | cudaGreenCtxCreate, cudaDevSmResourceSplit | [green-contexts.md](./green-contexts.md) |
| Lazy Loading | CUDA_MODULE_LOADING, cuModuleGetLoadingMode | [lazy-loading.md](./lazy-loading.md) |
| Error Log Management | CUDA_LOG_FILE, cuLogsRegisterCallback | [error-log-management.md](./error-log-management.md) |
| Asynchronous Barriers | cuda::barrier, arrive/wait split synchronization | [async-barriers.md](./async-barriers.md) |
| Pipelines | cuda::pipeline, producer/consumer stages | [pipelines.md](./pipelines.md) |
| Asynchronous Data Copies | cuda::memcpy_async, LDGSTS, TMA | [async-copies.md](./async-copies.md) |
| Work Stealing with Cluster Launch Control | clusterlaunchcontrol_try_cancel (Blackwell CC 10.0+) | [cluster-launch-control.md](./cluster-launch-control.md) |
| L2 Cache Control | cudaStreamSetAttribute, accessPolicyWindow | [l2-cache-control.md](./l2-cache-control.md) |
| Memory Synchronization Domains | cudaLaunchAttributeMemSyncDomain | [memory-sync-domains.md](./memory-sync-domains.md) |
| Interprocess Communication | cudaIpcGetMemHandle, cudaIpcOpenMemHandle | [inter-process-communication.md](./inter-process-communication.md) |
| Virtual Memory Management | cuMemCreate, cuMemAddressReserve, cuMemMap | [virtual-memory-management.md](./virtual-memory-management.md) |
| Extended GPU Memory | Host-NUMA VMM/memory-pool allocations over NVLink-C2C | [extended-gpu-memory.md](./extended-gpu-memory.md) |
| CUDA Dynamic Parallelism | Device-side kernel launch (parent/child grids) | [dynamic-parallelism.md](./dynamic-parallelism.md) |
| CUDA Interoperability with Other APIs | cudaGraphicsResource, cudaImportExternalMemory | [graphics-interop.md](./graphics-interop.md) |
| Driver Entry Point Access | cuGetProcAddress, cudaGetDriverEntryPointByVersion | [driver-entry-point-access.md](./driver-entry-point-access.md) |
