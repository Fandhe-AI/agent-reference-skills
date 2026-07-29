# programming-model

| Name | Description | Path |
| --- | --- | --- |
| introduction | The GPU, CUDA history, and where to start (libraries, DSLs, frameworks) | [introduction.md](./introduction.md) |
| programming-model | Heterogeneous host/device model, GPU hardware model, thread/grid/cluster hierarchy, warps and SIMT, tile programming, GPU memory spaces, unified memory | [programming-model.md](./programming-model.md) |
| cuda-platform | Compute capability, CUDA Toolkit vs NVIDIA Driver, runtime vs driver API, PTX, cubins/fatbins, binary/PTX compatibility, JIT compilation | [cuda-platform.md](./cuda-platform.md) |
| intro-to-cuda-cpp | Kernels, launch configuration, thread indexing, memory management (unified/explicit), synchronization, error checking, function/variable specifiers, thread block clusters | [intro-to-cuda-cpp.md](./intro-to-cuda-cpp.md) |
| intro-to-cuda-python | CUDA Python ecosystem (cuda.core, CuPy, numba.cuda), `@cuda.jit` kernels, thread indexing, memory management, synchronization, error checking | [intro-to-cuda-python.md](./intro-to-cuda-python.md) |
| writing-cuda-kernels | SIMT basics, thread hierarchy and synchronization, GPU device memory spaces, coalescing and bank conflicts, atomics, Cooperative Groups, occupancy | [writing-cuda-kernels.md](./writing-cuda-kernels.md) |
| writing-tile-kernels | Tile kernel/function declarations, launching, block position queries, tile creation, loads/stores, control flow, tile primitives, atomics, optimization hints | [writing-tile-kernels.md](./writing-tile-kernels.md) |
| asynchronous-execution | Streams, events, stream callbacks, stream ordering, default stream behavior, explicit/implicit synchronization | [asynchronous-execution.md](./asynchronous-execution.md) |
| understanding-memory | Unified virtual address space, unified memory paradigms, memory advise/prefetch, page-locked host memory, mapped memory | [understanding-memory.md](./understanding-memory.md) |
| nvcc | NVCC compilation workflow, source file types, architecture flags (-arch/-gencode/-code), separate compilation, common compiler options | [nvcc.md](./nvcc.md) |
