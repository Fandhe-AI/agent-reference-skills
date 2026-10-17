# CUDA Features (Part 4)

| Name | Description | Path |
| --- | --- | --- |
| Asynchronous Barriers | `cuda::barrier` (libcu++) separates arrival at a sync point from the wait for it. | [async-barriers.md](./async-barriers.md) |
| Asynchronous Data Copies | Global-to-shared copies without registers: LDGSTS (CC 8.0+) and TMA (CC 9.0+). | [async-copies.md](./async-copies.md) |
| Work Stealing with Cluster Launch Control | Blackwell (CC 10.0+) PTX API to cancel not-yet-started blocks for dynamic load balancing. | [cluster-launch-control.md](./cluster-launch-control.md) |
| Compute Fabric Transport | GPU-to-GPU communication over NVLink fabric endpoints, mainly for communication-library authors. | [compute-fabric-transport.md](./compute-fabric-transport.md) |
| Cooperative Groups | C++ thread-group handles (block, grid, warp-tile, coalesced) with collective operations. | [cooperative-groups.md](./cooperative-groups.md) |
| CUDA Graphs | Defines a sequence of CUDA operations and their dependencies once, for repeated low-overhead launch. | [cuda-graphs.md](./cuda-graphs.md) |
| Driver Entry Point Access | Runtime retrieval of Driver and Runtime API function pointers (`cuGetProcAddress`, `cudaGetDriverEntryPointByVersion`). | [driver-entry-point-access.md](./driver-entry-point-access.md) |
| CUDA Dynamic Parallelism | Kernels running on the GPU launch child grids. | [dynamic-parallelism.md](./dynamic-parallelism.md) |
| Error Log Management | Captures CUDA-internal error and warning logs to a file or through a callback. | [error-log-management.md](./error-log-management.md) |
| Extended GPU Memory | GPU access to all memory over NVLink-C2C, including host-NUMA memory of other nodes, as if local. | [extended-gpu-memory.md](./extended-gpu-memory.md) |
| CUDA Interoperability with APIs | Shares buffers and semaphores with OpenGL, Direct3D, Vulkan, and NVSCI. | [graphics-interop.md](./graphics-interop.md) |
| Green Contexts | Contexts restricted to a reserved subset of SMs, to isolate work on one GPU. | [green-contexts.md](./green-contexts.md) |
| Interprocess Communication | Shares GPU buffers between processes on the same host, via legacy IPC or VMM. | [inter-process-communication.md](./inter-process-communication.md) |
| L2 Cache Control | Reserves part of L2 for persisting global memory through `accessPolicyWindow`. | [l2-cache-control.md](./l2-cache-control.md) |
| Lazy Loading | JIT-loads modules and kernels on first use (`CU_MODULE_LAZY_LOADING`) to reduce startup time. | [lazy-loading.md](./lazy-loading.md) |
| Locality Domains | Groups of SMs and device memory; co-locates compute and memory within a domain. | [locality-domains.md](./locality-domains.md) |
| Memory Synchronization Domains | Assigns kernel launches to domains so fence traffic from different workloads does not interfere. | [memory-sync-domains.md](./memory-sync-domains.md) |
| Pipelines | `cuda::pipeline` (libcu++) stages async work into producer and consumer phases. | [pipelines.md](./pipelines.md) |
| Programmatic Dependent Launch and Synchronization | A secondary kernel starts before the primary fully completes and syncs only where needed. | [programmatic-dependent-launch.md](./programmatic-dependent-launch.md) |
| Stream-Ordered Memory Allocator | `cudaMallocAsync` / `cudaFreeAsync` take part in stream ordering with memory pools. | [stream-ordered-memory-allocation.md](./stream-ordered-memory-allocation.md) |
| Unified Memory | Single CPU/GPU virtual address space (`cudaMallocManaged`) with hints and prefetching. | [unified-memory.md](./unified-memory.md) |
| Virtual Memory Management | Driver-API control of device virtual address space (`cuMemCreate`, `cuMemAddressReserve`, `cuMemMap`). | [virtual-memory-management.md](./virtual-memory-management.md) |
