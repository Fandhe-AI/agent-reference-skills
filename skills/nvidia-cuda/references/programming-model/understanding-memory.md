# Unified and System Memory

Covers the unified virtual address space, unified memory paradigms and their platform support, memory advise/prefetch APIs, and page-locked (and mapped) host memory.

## Signature / Usage

```cuda
void usingMallocHost() {
  float* a = nullptr;
  float* b = nullptr;

  CUDA_CHECK(cudaMallocHost(&a, vLen*sizeof(float)));
  CUDA_CHECK(cudaMallocHost(&b, vLen*sizeof(float)));

  initVector(b, vLen);
  memset(a, 0, vLen*sizeof(float));

  int threads = 256;
  int blocks = vLen/threads;
  copyKernel<<<blocks, threads>>>(a, b);
  CUDA_CHECK(cudaGetLastError());
  CUDA_CHECK(cudaDeviceSynchronize());

  printf("Using cudaMallocHost: ");
  checkAnswer(a, b);
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `cudaPointerGetAttributes()` | function | Determines whether a given pointer refers to host or GPU memory (and which GPU) within the unified virtual address space |
| `cudaMallocManaged` | function | Explicit unified-memory allocation, used on platforms without full implicit management |
| `cudaMemAdvise` | function | Advises the runtime on how a unified-memory allocation should be placed/migrated |
| `cudaMemPrefetchAsync` | function | Asynchronously migrates unified-memory data to a target processor before it is accessed |
| `cudaMallocHost()` / `cudaHostAlloc()` | function | Allocates page-locked host memory, enabling asynchronous transfers and improving synchronous copy performance |

## Notes

- A unified virtual address space spans CPU DRAM and all GPU memory within a single OS process, so a pointer's location (host or a specific GPU) is always determinable via `cudaPointerGetAttributes()`.
- Unified memory allocation strategy varies by platform: explicit `cudaMallocManaged` on some systems, versus implicit management on Linux with HMM (Heterogeneous Memory Management) or on NVLink-C2C systems with ATS (Address Translation Services).
- Four unified-memory paradigms exist, distinguished by device attributes: limited support (Windows / Tegra), full explicit managed allocations, full software-coherent allocations, and full hardware-coherent allocations.
  - Full-support systems typically migrate managed memory at page/cache-line granularity and allow oversubscription; hardware coherency via ATS (e.g. on Grace Hopper / Blackwell systems) outperforms software coherency over PCIe-connected GPUs.
  - Windows and Tegra systems have limited unified-memory support: migration happens at larger granularity, allocations must be explicitly CUDA-allocated, and oversubscription is not permitted.
- `cudaMemAdvise` and `cudaMemPrefetchAsync` let a program optimize unified-memory placement and asynchronously migrate data ahead of a kernel launch, rather than relying solely on on-demand migration.
- Mapped memory (a form of page-locked host memory) makes CPU memory directly accessible from kernels without unified memory, on systems that lack HMM/ATS; it has higher latency and lower bandwidth than GPU memory, so it is not a general substitute for placing data in the appropriate memory space.

## Related

- [Programming Model](./programming-model.md)
- [Intro to CUDA C++](./intro-to-cuda-cpp.md)
- [Asynchronous Execution](./asynchronous-execution.md)
