# cpp

| Name | Description | Path |
| --- | --- | --- |
| Overview | CUTLASS purpose, version, data types, architectures | [overview.md](./overview.md) |
| Getting Started | Index of C++ documentation tree | [getting-started.md](./getting-started.md) |
| Quickstart | Build the profiler, run unit tests, CMake arch flags | [quickstart.md](./quickstart.md) |
| IDE Setup | VSCode / clangd configuration | [ide-setup.md](./ide-setup.md) |
| Build | Index of platform-specific build guides | [build.md](./build.md) |
| Building on Windows with Visual Studio | Prerequisites, long-path registry key, CMake build | [build-windows-visual-studio.md](./build-windows-visual-studio.md) |
| Building with Clang as Host Compiler | CMAKE_CXX_COMPILER / CMAKE_CUDA_HOST_COMPILER | [build-clang-host-compiler.md](./build-clang-host-compiler.md) |
| Functionality | Supported GEMM kernel families by architecture | [functionality.md](./functionality.md) |
| Terminology | Layout, Tensor, Fragment, Tile, Warp, etc. | [terminology.md](./terminology.md) |
| Fundamental Types | half_t, bfloat16_t, tfloat32_t, Array, Coord | [fundamental-types.md](./fundamental-types.md) |
| Programming Guidelines | C++ style, East const, Params/SharedStorage patterns | [programming-guidelines.md](./programming-guidelines.md) |
| GEMM Heuristics | nvidia-matmul-heuristics search-space reduction | [gemm-heuristics.md](./gemm-heuristics.md) |
| Efficient GEMM | Threadblock/warp/instruction/thread hierarchy, pipelining | [efficient-gemm.md](./efficient-gemm.md) |
| Pipeline | cutlass::Pipeline* producer/consumer synchronization | [pipeline.md](./pipeline.md) |
| Profiler | cutlass_profiler CLI, kernel search, CSV output | [profiler.md](./profiler.md) |
| GEMM Performance Measurement | Warmup/profiling loop methodology | [gemm-performance-measurement.md](./gemm-performance-measurement.md) |
| Dependent Kernel Launch | Programmatic Dependent Launch (PDL) | [dependent-kernel-launch.md](./dependent-kernel-launch.md) |
| Blackwell | Index of Blackwell-specific CUTLASS docs | [blackwell.md](./blackwell.md) |
| Blackwell SM100 (and SM120) GEMMs | tcgen05.mma dispatch policies, tile shapes, block scaling | [blackwell-sm100-gemm.md](./blackwell-sm100-gemm.md) |
| Blackwell Cluster Launch Control | Static/dynamic tile scheduling via CLC | [blackwell-cluster-launch-control.md](./blackwell-cluster-launch-control.md) |
| Code Organization | Repository directory layout | [code-organization.md](./code-organization.md) |
| CuTe (C++) | Index of the CuTe C++ tutorial set | [cute.md](./cute.md) |
| CuTe: Quickstart | Header, directory layout, cute::print | [cute-quickstart.md](./cute-quickstart.md) |
| CuTe: Layout | Shape/Stride, make_layout, crd2idx/idx2crd | [cute-layout.md](./cute-layout.md) |
| CuTe: Layout Algebra | Coalesce, composition, complement, divide/product | [cute-layout-algebra.md](./cute-layout-algebra.md) |
| CuTe: Tensor | Engine + Layout, make_tensor, tiling/slicing/partitioning | [cute-tensor.md](./cute-tensor.md) |
| CuTe: Algorithms | copy, copy_if, gemm, axpby, fill, clear | [cute-algorithms.md](./cute-algorithms.md) |
| CuTe: MMA Atom | Operation structs, MMA_Traits, make_tiled_mma | [cute-mma-atom.md](./cute-mma-atom.md) |
| CuTe: GEMM Tutorial | sgemm_1/2.cu, TiledCopy/TiledMMA, majorness | [cute-gemm-tutorial.md](./cute-gemm-tutorial.md) |
| CuTe: Predication | Identity-layout masking for non-uniform tiling | [cute-predication.md](./cute-predication.md) |
| CuTe: TMA Tensors | TMA descriptors, ArithmeticTupleIterator, basis elements | [cute-tma-tensors.md](./cute-tma-tensors.md) |
| CUTLASS 3.x | Index of CUTLASS 3.x design/API docs | [cutlass-3x.md](./cutlass-3x.md) |
| CUTLASS 3.0 Design | Design goals, CuTe integration, type reduction | [cutlass-3x-design.md](./cutlass-3x-design.md) |
| CUTLASS 3.0 GEMM Backwards Compatibility | GemmUniversalAdapter, layout tag conversion | [cutlass-3x-backwards-compatibility.md](./cutlass-3x-backwards-compatibility.md) |
| GEMM API (3.x) | Device/Kernel/Collective/TiledMMA/Atom hierarchy | [gemm-api-3x.md](./gemm-api-3x.md) |
| CUTLASS 2.x | Index of CUTLASS 2.x docs | [cutlass-2x.md](./cutlass-2x.md) |
| Layouts and Tensors (2.x) | layout::ColumnMajor/RowMajor, TensorRef/TensorView | [layout-2x.md](./layout-2x.md) |
| GEMM API (2.x) | device::Gemm family, MmaPipelined, MmaTensorOp/MmaSimt | [gemm-api-2x.md](./gemm-api-2x.md) |
| Tile Iterator Concept | TileIteratorConcept family, deprecated in 3.0 | [tile-iterator-concept.md](./tile-iterator-concept.md) |
| Utilities | HostTensor, DeviceAllocation, TensorFill*, synclog | [utilities.md](./utilities.md) |
| Grouped Kernel Schedulers | Grouped GEMM/Rank2K scheduling, sort_problems | [grouped-scheduler.md](./grouped-scheduler.md) |
| Implicit GEMM Convolution | im2col-free convolution as GEMM | [implicit-gemm-convolution.md](./implicit-gemm-convolution.md) |
