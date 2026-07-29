# Programming Model

This chapter introduces the CUDA programming model at a high level, separate from any language; the terminology applies to CUDA in any supported programming language.

## Signature / Usage

```cuda
// A kernel launch expresses the grid (of thread blocks) and block (of threads)
// dimensions via the <<<...>>> execution configuration.
__global__ void kernel(float *data) {
    int tid = blockIdx.x * blockDim.x + threadIdx.x; // global thread index
    data[tid] *= 2.0f;
}

dim3 grid(numBlocks);
dim3 block(256); // 256 threads per block, a multiple of the 32-thread warp size
kernel<<<grid, block>>>(data);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| host / host memory | concept | The CPU and the memory directly connected to it |
| device / device memory | concept | A GPU and the memory directly connected to it |
| kernel | concept | A function invoked for execution on the GPU; a kernel launch starts many threads executing the kernel code in parallel |
| SM (Streaming Multiprocessor) | hardware unit | Contains a local register file, a unified data cache (backing shared memory and L1), and functional units; a GPU is a collection of SMs |
| GPC (Graphics Processing Cluster) | hardware unit | A group of SMs; a GPU is a set of GPCs connected to GPU memory |
| thread block | concept | A group of threads launched together; all threads of a thread block run on a single SM and can synchronize/communicate via shared memory |
| grid | concept | The set of all thread blocks launched by a kernel; a grid may be 1D, 2D, or 3D, as may its thread blocks |
| thread block cluster | concept | Compute capability 9.0+; an optional grouping of adjacent thread blocks, all executed within a single GPC, enabling distributed shared memory and cluster-level sync via Cooperative Groups |
| warp | concept | A group of 32 threads within a thread block, executed in SIMT (Single-Instruction Multiple-Threads) fashion; warp lanes are numbered 0-31 |
| global memory | memory space | GPU-attached DRAM, accessible to all SMs in the GPU |
| system memory / host memory | memory space | CPU-attached DRAM |
| shared memory | memory space | Per-SM, on-chip memory accessible to all threads within a thread block (or cluster, for distributed shared memory) |
| register file | memory space | Per-SM, on-chip storage for thread-local variables, usually allocated by the compiler |
| L1 / L2 cache | memory space | L1 is part of each SM's unified data cache (shared with shared memory); L2 is shared by all SMs in the GPU |
| constant cache | memory space | Per-SM cache for values in global memory declared constant over a kernel's life; the compiler may place kernel parameters here |
| unified memory | concept | A CUDA feature allowing memory allocations accessible from both CPU and GPU; the CUDA runtime or hardware relocates data as needed |
| tile / array (tile programming) | concept | An array is a mutable, multidimensional container in device memory; a tile is an immutable, block-local, compile-time-shaped collection of values used only within tile code |

## Notes

- Distinct from `ptx-isa/programming-model.md`: this page covers the CUDA C/C++ host/device programming model (host, device, kernel, thread block, grid, SM); the PTX ISA page covers the lower-level virtual-ISA thread hierarchy (CTA, cluster, grid) exposed to PTX assembly.

### Heterogeneous systems

The CUDA programming model assumes a heterogeneous computing system that includes both GPUs and CPUs. CUDA applications always start execution on the CPU (the host); host code uses CUDA APIs to copy data between host and device memory, launch code on the GPU, and wait for copies or GPU code to complete. The CPU and GPU can execute simultaneously, and best performance usually comes from maximizing utilization of both.

### GPU hardware model

The GPU can be considered a collection of SMs organized into GPCs. Each SM contains a local register file, a unified data cache, and functional units; the unified data cache backs both shared memory and L1 cache, and its split between the two can be configured at runtime. Sizes and functional-unit counts vary across GPU architectures, but these hardware differences do not affect the correctness of software written using the CUDA programming model.

#### Thread blocks and grids

A kernel launch may involve millions of threads, organized into thread blocks, which are in turn organized into a grid; all thread blocks in a grid share the same size and dimensions. An *execution configuration* specifies the grid and thread block dimensions (and optionally cluster size, stream, and SM configuration settings) at launch time. Built-in variables let each thread determine its position within its block and its block's position within the grid, giving each thread a unique identity typically used to determine what data or work it is responsible for.

All threads of a thread block execute on a single SM, which lets them communicate and synchronize efficiently through on-chip shared memory. A grid may contain far more thread blocks than a GPU has SMs; there is no ordering guarantee between thread blocks, so a thread block cannot rely on results from another thread block. This requirement — that thread blocks must be executable in any order, in parallel or in series — is what lets the same CUDA program run on GPUs with any number of SMs.

##### Thread block clusters

GPUs with compute capability 9.0 and higher support an additional, optional grouping level called clusters: groups of thread blocks laid out in 1, 2, or 3 dimensions, always adjacent to each other within the grid. All thread blocks in a cluster execute within a single GPC, which lets threads in different blocks of the same cluster communicate and synchronize using Cooperative Groups software interfaces, including access to distributed shared memory (the combined shared memory of all blocks in the cluster). Maximum cluster size is hardware-dependent.

#### Warps and SIMT

Within a thread block, threads are grouped into warps of 32 threads, executed in the SIMT (Single-Instruction Multiple-Threads) paradigm: all threads in a warp execute the same instruction simultaneously, but each may follow a different branch. Threads that do not follow an active branch are masked off while the active threads execute — divergent control flow within a warp is called warp divergence, and utilization is maximized when a warp's threads follow the same control-flow path. Warp execution proceeds in lock step in the programming model, though real hardware execution may differ (see Independent Thread Execution); relying on undocumented mapping of warp execution to specific hardware behavior is discouraged, as it can lead to undefined behavior that differs across GPUs.

Thread blocks are best sized to a multiple of 32 threads — a size that is not a multiple of 32 leaves some lanes of the last warp unused, typically causing suboptimal functional-unit and memory-access utilization for that warp. SIMT differs from SIMD (Single Instruction Multiple Data): SIMD follows one control-flow path, while SIMT allows each thread its own control-flow path and has no fixed data width.

#### Tile programming in CUDA

CUDA also supports a tile programming model, in addition to the SIMT model. In tile programming, the programmer writes code at the level of an entire thread block, describing operations on multidimensional data collections called tiles; the compiler maps these operations onto the block's individual threads. The programmer specifies only grid dimensions — the compiler determines the number of threads per block from the tile operations in the kernel. A block executes tile code as a single control flow (so there is no warp divergence), though scalar operations such as index/loop-bound computation are executed by a single thread of the block while tile operations (e.g. element-wise tile addition) are collectively executed by all threads. Blocks (units of execution) and tiles (units of data) are distinct — a single block may create and operate on many tiles of different shapes and data types.

Tile kernels operate on two data kinds: arrays (mutable, multidimensional containers in device memory) and tiles (immutable, block-local collections that exist only within tile code; every dimension must be a power of two and known at compile time, and tiles cannot be passed as kernel parameters). Data moves between arrays and tiles via load/store operations defined over a conceptual *tile space* — an array is conceptually partitioned into equally sized, non-overlapping tiles, and a tile-space index selects which tile to load or store; out-of-bounds elements on load can be filled with a default value, and out-of-bounds writes on store are silently discarded. Gather and scatter operations load from or store to arbitrary array positions. Built-in tile operations include element-wise arithmetic, matrix multiplication, reductions (sum, max, ...) along one or more axes, shape manipulation (reshape, transpose), and type conversion; combining tiles of different shapes triggers automatic broadcasting of the smaller tile.

Tile programming and SIMT programming coexist within CUDA: the choice is a per-kernel decision, an application may mix both kernel kinds operating on the same device memory, and both are built on the same underlying SMs/thread blocks/grids and device memory spaces.

### GPU memory

Heterogeneous systems have multiple memory spaces, and GPUs contain various types of programmable on-chip memory in addition to caches.

#### DRAM memory in heterogeneous systems

Each GPU has its own directly attached DRAM (global memory from the perspective of device code, since it is accessible to all SMs in that GPU); CPU-attached DRAM is system/host memory. CPUs and GPUs use a single unified virtual memory space, so a given virtual address is resolvable to GPU memory or system memory (and, on multi-GPU systems, to a specific GPU). CUDA APIs allocate GPU and CPU memory and copy between them (CPU↔GPU, within a GPU, or between GPUs); locality can be explicitly controlled, or handled automatically via unified memory.

#### On-chip memory in GPUs

Each SM has its own register file and shared memory, accessible extremely quickly from threads executing within that SM. The register file stores thread-local variables (usually compiler-allocated); shared memory is accessible to all threads within a thread block or cluster and is used to exchange data between them. The register file, shared memory, and L1 cache are all finite and shared among all threads in a thread block: a thread block is only schedulable on an SM if its total register requirement (per-thread registers × thread count) fits within the SM's available registers, and shared-memory allocations are made at the thread-block level (not per-thread).

##### Caches

GPUs have both L1 and L2 caches. Each SM's L1 cache is part of its unified data cache; a larger L2 cache is shared by all SMs in the GPU. Each SM also has a separate constant cache for global-memory values declared constant over a kernel's life (the compiler may also place kernel parameters here), which can improve performance by caching them separately from the L1 data cache.

#### Unified memory

Explicitly allocated CPU or GPU memory is only accessible to code running on that respective device; CUDA APIs are used to explicitly copy data between them at the right time. Unified memory instead allows allocations accessible from both CPU and GPU — the CUDA runtime or hardware relocates or enables access to the data as needed. Even with unified memory, optimal performance still comes from minimizing migration and accessing data from the processor directly attached to where it resides.

## Related

- [Introduction](./introduction.md)
- [Writing SIMT Kernels](./writing-cuda-kernels.md)
- [Intro to CUDA C++](./intro-to-cuda-cpp.md)
- [Unified and System Memory](./understanding-memory.md)
