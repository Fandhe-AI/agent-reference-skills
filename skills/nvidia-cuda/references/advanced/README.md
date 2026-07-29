# Advanced CUDA

| Name | Description | Path |
|------|-------------|------|
| **Advanced CUDA (Part 3)** | | |
| Advanced CUDA APIs and Features | cudaLaunchKernelEx, cluster launch, stream priorities, batched memcpy | [core/advanced-host-programming.md](./core/advanced-host-programming.md) |
| Advanced Kernel Programming | cuda::ptx, SIMT model, thread scopes, scoped atomics, barriers, pipelines | [core/advanced-kernel-programming.md](./core/advanced-kernel-programming.md) |
| The CUDA Driver API | cuInit, cuCtxCreate, cuModuleLoad, cuLaunchKernel | [core/driver-api.md](./core/driver-api.md) |
| Programming Systems with Multiple GPUs | cudaSetDevice, peer-to-peer memcpy and access | [core/multi-gpu-systems.md](./core/multi-gpu-systems.md) |
| A Tour of CUDA Features | Overview/index of advanced CUDA features | [core/feature-survey.md](./core/feature-survey.md) |
| **CUDA Features (Part 4)** | | |
| Unified Memory | cudaMallocManaged, cudaMemAdvise, cudaMemPrefetchAsync | [features/unified-memory.md](./features/unified-memory.md) |
| CUDA Graphs | cudaGraphCreate, cudaStreamBeginCapture, cudaGraphInstantiate, cudaGraphLaunch | [features/cuda-graphs.md](./features/cuda-graphs.md) |
| Stream-Ordered Memory Allocator | cudaMallocAsync, cudaFreeAsync, cudaMemPoolCreate | [features/stream-ordered-memory-allocation.md](./features/stream-ordered-memory-allocation.md) |
| Cooperative Groups | this_thread_block, this_grid, tiled_partition, reduce | [features/cooperative-groups.md](./features/cooperative-groups.md) |
| Programmatic Dependent Launch and Synchronization | cudaTriggerProgrammaticLaunchCompletion, cudaGridDependencySynchronize | [features/programmatic-dependent-launch.md](./features/programmatic-dependent-launch.md) |
| Green Contexts | cudaGreenCtxCreate, cudaDevSmResourceSplit | [features/green-contexts.md](./features/green-contexts.md) |
| Lazy Loading | CUDA_MODULE_LOADING, cuModuleGetLoadingMode | [features/lazy-loading.md](./features/lazy-loading.md) |
| Error Log Management | CUDA_LOG_FILE, cuLogsRegisterCallback | [features/error-log-management.md](./features/error-log-management.md) |
| Asynchronous Barriers | cuda::barrier, arrive/wait split synchronization | [features/async-barriers.md](./features/async-barriers.md) |
| Pipelines | cuda::pipeline, producer/consumer stages | [features/pipelines.md](./features/pipelines.md) |
| Asynchronous Data Copies | cuda::memcpy_async, LDGSTS, TMA | [features/async-copies.md](./features/async-copies.md) |
| Work Stealing with Cluster Launch Control | clusterlaunchcontrol_try_cancel (Blackwell CC 10.0+) | [features/cluster-launch-control.md](./features/cluster-launch-control.md) |
| L2 Cache Control | cudaStreamSetAttribute, accessPolicyWindow | [features/l2-cache-control.md](./features/l2-cache-control.md) |
| Memory Synchronization Domains | cudaLaunchAttributeMemSyncDomain | [features/memory-sync-domains.md](./features/memory-sync-domains.md) |
| Interprocess Communication | cudaIpcGetMemHandle, cudaIpcOpenMemHandle | [features/inter-process-communication.md](./features/inter-process-communication.md) |
| Virtual Memory Management | cuMemCreate, cuMemAddressReserve, cuMemMap | [features/virtual-memory-management.md](./features/virtual-memory-management.md) |
| Extended GPU Memory | Host-NUMA VMM/memory-pool allocations over NVLink-C2C | [features/extended-gpu-memory.md](./features/extended-gpu-memory.md) |
| CUDA Dynamic Parallelism | Device-side kernel launch (parent/child grids) | [features/dynamic-parallelism.md](./features/dynamic-parallelism.md) |
| CUDA Interoperability with Other APIs | cudaGraphicsResource, cudaImportExternalMemory | [features/graphics-interop.md](./features/graphics-interop.md) |
| Driver Entry Point Access | cuGetProcAddress, cudaGetDriverEntryPointByVersion | [features/driver-entry-point-access.md](./features/driver-entry-point-access.md) |
| **Technical Appendices (Part 5)** | | |
| Compute Capabilities | Per-architecture SM/shared-memory/thread limits | [appendices/compute-capabilities.md](./appendices/compute-capabilities.md) |
| CUDA Environment Variables | CUDA_VISIBLE_DEVICES, CUDA_MODULE_LOADING, CUDA_LOG_FILE | [appendices/environment-variables.md](./appendices/environment-variables.md) |
| C++ Language Support | C++11-23 support, libcu++, RTTI/exceptions restrictions | [appendices/cpp-language-support.md](./appendices/cpp-language-support.md) |
| C/C++ Language Extensions | `__global__`/`__device__`, `__shared__`, threadIdx, warp intrinsics, atomics | [appendices/cpp-language-extensions.md](./appendices/cpp-language-extensions.md) |
| Floating-Point Computation | IEEE-754 compliance, FMA, math function ULP error bounds | [appendices/mathematical-functions.md](./appendices/mathematical-functions.md) |
| Device-Callable APIs and Intrinsics | __mbarrier_*, __pipeline_*, CUDA Device Runtime | [appendices/device-callable-apis.md](./appendices/device-callable-apis.md) |
| CUDA C++ Memory Model | Thread scopes, cuda::atomic_ref, data races | [appendices/cuda-cpp-memory-model.md](./appendices/cuda-cpp-memory-model.md) |
| CUDA C++ Execution model | Host/device forward progress guarantees | [appendices/cuda-cpp-execution-model.md](./appendices/cuda-cpp-execution-model.md) |
