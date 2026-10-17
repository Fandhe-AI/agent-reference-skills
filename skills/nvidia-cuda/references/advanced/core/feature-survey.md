# A Tour of CUDA Features

Overview page surveying advanced CUDA features and which page in this guide covers each: kernel performance (async barriers, TMA/async copies, pipelines, cluster launch control), latency (green contexts, stream-ordered allocation, CUDA Graphs, programmatic dependent launch, lazy loading), functionality (extended GPU memory, dynamic parallelism), interoperability (graphics APIs, IPC), and fine-grained control (virtual memory management, driver entry point access, error log management).

## Signature / Usage

```cpp
// Stream-ordered memory allocation, one of the features surveyed on this page
cudaMallocAsync(&ptr, size, stream);
cudaFreeAsync(ptr, stream);
```

## Options / Props

| Feature | Category | Page |
| --- | --- | --- |
| Asynchronous Barriers | Improving Kernel Performance | [async-barriers.md](../features/async-barriers.md) |
| Asynchronous Data Copies (LDGSTS / TMA) | Improving Kernel Performance | [async-copies.md](../features/async-copies.md) |
| Pipelines | Improving Kernel Performance | [pipelines.md](../features/pipelines.md) |
| Work Stealing with Cluster Launch Control | Improving Kernel Performance | [cluster-launch-control.md](../features/cluster-launch-control.md) |
| Green Contexts | Improving Latencies | [green-contexts.md](../features/green-contexts.md) |
| Locality Domains | Improving Latencies | [locality-domains.md](../features/locality-domains.md) |
| Stream-Ordered Memory Allocator | Improving Latencies | [stream-ordered-memory-allocation.md](../features/stream-ordered-memory-allocation.md) |
| CUDA Graphs | Improving Latencies | [cuda-graphs.md](../features/cuda-graphs.md) |
| Programmatic Dependent Launch and Synchronization | Improving Latencies | [programmatic-dependent-launch.md](../features/programmatic-dependent-launch.md) |
| Lazy Loading | Improving Latencies | [lazy-loading.md](../features/lazy-loading.md) |
| Extended GPU Memory | Functionality Features | [extended-gpu-memory.md](../features/extended-gpu-memory.md) |
| CUDA Dynamic Parallelism | Functionality Features | [dynamic-parallelism.md](../features/dynamic-parallelism.md) |
| CUDA Interoperability with Other APIs | CUDA Interoperability | [graphics-interop.md](../features/graphics-interop.md) |
| Interprocess Communication | CUDA Interoperability | [inter-process-communication.md](../features/inter-process-communication.md) |
| Virtual Memory Management | Fine-Grained Control | [virtual-memory-management.md](../features/virtual-memory-management.md) |
| Compute Fabric Transport | Fine-Grained Control | [compute-fabric-transport.md](../features/compute-fabric-transport.md) |
| Driver Entry Point Access | Fine-Grained Control | [driver-entry-point-access.md](../features/driver-entry-point-access.md) |
| Error Log Management | Fine-Grained Control | [error-log-management.md](../features/error-log-management.md) |

## Notes

- This page is a navigational overview; it introduces no new APIs itself beyond pointers to the detailed feature pages listed above.
- Work Stealing with Cluster Launch Control is available on compute capability 10.0+ (Blackwell).
- Locality Domains (CPG 13.4): a locality domain is a subset of GPU memory and SMs. On GPUs with more than one locality domain, it can be beneficial to allocate memory within a specific locality domain and run kernels using that memory in a green context whose SMs are only from the same domain. A performance feature: code that does not localize memory or compute still executes correctly.
- Compute Fabric Transport (CPG 13.4): a resource-centric model for GPU-initiated data movement over an NVLink fabric, in which a peer is named by a logical endpoint id and offset rather than by a mapped virtual address. It targets developers writing communication primitives; applications should prefer the NCCL Device API or NVSHMEM when either matches their communication pattern.
- The earlier statement that green contexts are available in the CUDA runtime only from a given CUDA version onward was removed from the 13.4 guide.

## Related

- [Advanced CUDA APIs and Features](./advanced-host-programming.md)
- [Advanced Kernel Programming](./advanced-kernel-programming.md)
- [Locality Domains](../features/locality-domains.md)
- [Compute Fabric Transport](../features/compute-fabric-transport.md)
