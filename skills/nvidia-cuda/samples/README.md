# samples

| Name | Description | Path |
| --- | --- | --- |
| Async Copy Pipeline (cuda::pipeline) | Use `cuda::memcpy_async` with a `cuda::pipeline` to move d… | [async-copy-pipeline.md](./async-copy-pipeline.md) |
| Cooperative Groups Reduction | Use `cooperative_groups::thread_block` and `tiled_partiti`… | [cooperative-groups-reduction.md](./cooperative-groups-reduction.md) |
| CUDA Graph via Explicit Node Construction | Build a `cudaGraph_t` node-by-node with the unified `cud`… | [cuda-graph-explicit-nodes.md](./cuda-graph-explicit-nodes.md) |
| CUDA Graph via Stream Capture | Record a sequence of stream operations into a `cudaGraph_`… | [cuda-graph-stream-capture.md](./cuda-graph-stream-capture.md) |
| CuTe DSL Kernel with Compile-Time Guards | Write a CuTe DSL kernel with `@cute.kernel` / `@cute.jit`… | [cute-dsl-gemm.md](./cute-dsl-gemm.md) |
| CUTLASS C++ Device GEMM | Instantiate `cutlass::gemm::device::Gemm` as a template a… | [cutlass-cpp-device-gemm.md](./cutlass-cpp-device-gemm.md) |
| CUTLASS Operator API GEMM (Python) | Build a `cutlass.operators.GemmArguments` from PyTorch ten… | [cutlass-operator-api-gemm.md](./cutlass-operator-api-gemm.md) |
| Explicit Memory Transfer | Allocate device memory with `cudaMalloc`, move data with `… | [explicit-memory-transfer.md](./explicit-memory-transfer.md) |
| Multi-GPU Peer-to-Peer Memory Access | Check peer access capability with `cudaDeviceCanAccessPee`… | [multi-gpu-peer-to-peer.md](./multi-gpu-peer-to-peer.md) |
| Shared Memory Tiled Matrix Multiply | Stage sub-matrices in `__shared__` memory and synchronize… | [shared-memory-tiled-matmul.md](./shared-memory-tiled-matmul.md) |
| Stream-Ordered Memory Allocation | Allocate and free device memory with `cudaMallocAsync` / … | [stream-ordered-allocation.md](./stream-ordered-allocation.md) |
| Stream Overlap with Event Timing | Split work across multiple `cudaStream_t` so device-to-ho… | [stream-overlap.md](./stream-overlap.md) |
| CUDA Tile Kernel Vector Add | Declare a `__tile_global__` kernel that operates on `cuda:… | [tile-kernel-vector-add.md](./tile-kernel-vector-add.md) |
| Unified Memory | Allocate a single pointer accessible from both host and d… | [unified-memory.md](./unified-memory.md) |
| Vector Add Kernel | Define a `__global__` kernel, launch it with a grid/block … | [vector-add-kernel.md](./vector-add-kernel.md) |
