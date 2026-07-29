# Writing SIMT Kernels

Covers the SIMT execution model, thread hierarchy and synchronization, GPU device memory spaces, memory access performance (coalescing, bank conflicts), atomics, Cooperative Groups, and kernel launch occupancy.

## Signature / Usage

```c
__shared__ float sharedArray[1024];
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Global memory | memory space | Grid scope, application lifetime, resides in device memory; persistent storage visible to all threads |
| Shared memory | memory space | Block scope, kernel lifetime, resides on the SM; user-managed, higher bandwidth than global memory |
| Registers | memory space | Thread scope, kernel lifetime, resides on the SM; compiler-managed thread-local storage |
| Local memory | memory space | Thread scope, kernel lifetime; logically thread-local but physically resides in global memory |
| Constant memory | memory space | Grid scope, application lifetime, resides in device memory; read-only, 64 KB per device |
| Caches (L1/L2) | memory space | L2 is shared among all SMs; L1 shares physical space with shared memory within each SM |
| Texture/Surface memory | memory space | Specialized instructions for image data; no performance advantage for non-graphics applications |
| Distributed shared memory | memory space | Accessible across a thread block cluster; requires cluster-level synchronization |
| `__syncthreads()` | function | Synchronizes all threads within a thread block, preventing race conditions on shared-memory access |
| `cuda::atomic` / `cuda::std::atomic` | type | C++ `std::atomic`-like atomics with an explicit thread-scope specification |
| `cuda.atomic` (Python) | namespace | Numba atomic operations: `add`, `sub`, `max`, `min`, `compare_and_swap` |

## Notes

### Basics of SIMT

The SIMT model lets each thread maintain independent state and control flow; performance improves when threads within the same warp minimize divergent code paths.

### Thread hierarchy

Threads organize into thread blocks, which form grids (1D, 2D, or 3D). Built-in variables (`gridDim`, `blockDim`, `blockIdx`, `threadIdx`) let a kernel compute a thread's unique global index. Thread linearization follows x-fastest ordering, which affects warp assignment.

#### Thread block synchronization

`__syncthreads()` synchronizes threads within a block, which is necessary to avoid race conditions when threads exchange data through shared memory.

### Memory access performance

Memory transactions to global memory are 32 bytes; utilization is maximized when consecutive threads access consecutive memory elements (coalesced access), which maximizes bytes actually used relative to bytes transferred — a naive matrix-transpose kernel commonly reads coalesced but writes uncoalesced. Shared memory has 32 banks with 32-bit bandwidth per clock; a bank conflict occurs when multiple threads in a warp access different elements within the same bank, which serializes access (same-address reads instead broadcast to all requesting threads). Staging data for a matrix transpose through shared memory lets both the read and the write to global memory be coalesced; padding a shared-memory array (e.g. using 32×33 instead of 32×32) is a common technique to eliminate bank conflicts.

### Atomics

Atomic functions provide synchronous read-modify-write operations on global memory locations and should be used sparingly, since they carry a performance cost.

### Cooperative Groups

A software tool that enables thread-group synchronization across thread blocks, clusters, and multiple GPUs, subject to semantic and performance limitations.

### Kernel launch and occupancy

The scheduler assigns thread blocks to SMs based on available hardware resources. Occupancy is the ratio of active warps to the maximum number of warps an SM supports; device properties determine the resource limits (registers, shared memory) that bound occupancy for a given kernel.

## Related

- [Programming Model](./programming-model.md)
- [Intro to CUDA C++](./intro-to-cuda-cpp.md)
- [Writing Tile Kernels](./writing-tile-kernels.md)
- [Unified and System Memory](./understanding-memory.md)
