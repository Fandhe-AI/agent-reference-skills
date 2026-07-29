# cutlass

| Name | Description | Path |
| --- | --- | --- |
| **CuTe DSL** | | |
| Overview | CuTe DSL purpose, core abstractions, compilation approach | [cute-dsl/overview.md](./cute-dsl/overview.md) |
| Functionality | Supported MMA ops by architecture (Ampere/Hopper/Blackwell) | [cute-dsl/functionality.md](./cute-dsl/functionality.md) |
| Quick Start | Install, platform/driver requirements | [cute-dsl/quick-start.md](./cute-dsl/quick-start.md) |
| CuTe DSL (Index) | Navigation page for the CuTe DSL guide tree | [cute-dsl/cute-dsl.md](./cute-dsl/cute-dsl.md) |
| DSL Introduction | @jit / @kernel decorators, calling conventions | [cute-dsl/dsl-introduction.md](./cute-dsl/dsl-introduction.md) |
| DSL Code Generation | Pre-staging/meta-stage/object-stage, tracing vs preprocessor mode | [cute-dsl/dsl-code-generation.md](./cute-dsl/dsl-code-generation.md) |
| DSL Control Flow | range/range_constexpr, if/while, const_expr, limitations | [cute-dsl/dsl-control-flow.md](./cute-dsl/dsl-control-flow.md) |
| JIT Argument Generation | Constexpr vs dynamic args, JitArgument/DynamicExpression protocols | [cute-dsl/dsl-jit-arg-generation.md](./cute-dsl/dsl-jit-arg-generation.md) |
| Static vs Dynamic Layouts | mark_layout_dynamic, compile tradeoffs | [cute-dsl/dsl-dynamic-layout.md](./cute-dsl/dsl-dynamic-layout.md) |
| Struct-like JIT Arguments | NamedTuple, @native_struct, frozen dataclass | [cute-dsl/dsl-struct-types.md](./cute-dsl/dsl-struct-types.md) |
| JIT Caching | cute.compile, cache key, CUTE_DSL_CACHE_DIR | [cute-dsl/dsl-jit-caching.md](./cute-dsl/dsl-jit-caching.md) |
| JIT Compilation Options | opt-level, enable-assertions, keep-cubin/ptx | [cute-dsl/dsl-jit-compilation-options.md](./cute-dsl/dsl-jit-compilation-options.md) |
| DSL Types | IntValue, Ratio, ScaledBasis, Swizzle, Layout, Pointer, struct/union | [cute-dsl/dsl-types.md](./cute-dsl/dsl-types.md) |
| Framework Integration | DLPack, from_dlpack, mark_layout_dynamic, TVM FFI | [cute-dsl/framework-integration.md](./cute-dsl/framework-integration.md) |
| Debugging | CUTE_DSL_DEBUG, CUTE_DSL_KEEP, logging env vars | [cute-dsl/debugging.md](./cute-dsl/debugging.md) |
| IKET Profiling | In-kernel event tracing, mark/range_push/pop | [cute-dsl/iket-profiling.md](./cute-dsl/iket-profiling.md) |
| Autotuning GEMM | Search space, caching, benchmarking practices | [cute-dsl/autotuning-gemm.md](./cute-dsl/autotuning-gemm.md) |
| Compile with TVM FFI | --enable-tvm-ffi, fake tensors | [cute-dsl/compile-with-tvm-ffi.md](./cute-dsl/compile-with-tvm-ffi.md) |
| Ahead-of-Time Compilation | export_to_c, CuteDSLRuntime.h | [cute-dsl/dsl-ahead-of-time-compilation.md](./cute-dsl/dsl-ahead-of-time-compilation.md) |
| Naming Conventions | Hungarian-style identifier prefixes (g/s/r/t, tTR_/tRS_/bSG_/bGS_) | [cute-dsl/naming-conventions.md](./cute-dsl/naming-conventions.md) |
| Deprecation Policy | Soft deprecation process, current deprecations | [cute-dsl/deprecation-policy.md](./cute-dsl/deprecation-policy.md) |
| MMA Guides (Index) | Navigation for the three architecture-specific MMA guides | [cute-dsl/mma-intro.md](./cute-dsl/mma-intro.md) |
| MMA: WMMA Programming (Warp-Level) | SM80+ warp-level MMA, MmaF16BF16Op/MmaFP8Op | [cute-dsl/mma-wmma-programming.md](./cute-dsl/mma-wmma-programming.md) |
| MMA: WGMMA Programming (Hopper) | SM90a warpgroup MMA, async issue model | [cute-dsl/mma-wgmma-programming.md](./cute-dsl/mma-wgmma-programming.md) |
| MMA: tcgen05 Programming (Blackwell) | SM100 tcgen05 MMA, TMEM, CTA-pair cooperation | [cute-dsl/mma-tcgen05-programming.md](./cute-dsl/mma-tcgen05-programming.md) |
| Limitations | Unsupported features, 32-bit layout algebra, OOP constraints | [cute-dsl/limitations.md](./cute-dsl/limitations.md) |
| FAQs | C++ vs Python DSL, architecture support, license | [cute-dsl/faqs.md](./cute-dsl/faqs.md) |
| **CuTe DSL API** | | |
| API (Index) | Navigation for the cutlass.cute Python API reference | [cute-dsl/api-overview.md](./cute-dsl/api-overview.md) |
| cute | Layout/Tensor/Atom core API, layout algebra | [cute-dsl/api-cute.md](./cute-dsl/api-cute.md) |
| cute.arch | NVVM device-function wrappers (thread/cluster/mbarrier/atomics) | [cute-dsl/api-cute-arch.md](./cute-dsl/api-cute-arch.md) |
| cute.runtime | Pointer/Tensor/FakeTensor, from_dlpack, make_ptr | [cute-dsl/api-cute-runtime.md](./cute-dsl/api-cute-runtime.md) |
| cute.nvgpu (Index) | Navigation for common/warp/warpgroup/cpasync/tcgen05 submodules | [cute-dsl/api-cute-nvgpu.md](./cute-dsl/api-cute-nvgpu.md) |
| cute.nvgpu (Common) | Arch-agnostic MMA/Copy ops, TMA atom helpers | [cute-dsl/api-cute-nvgpu-common.md](./cute-dsl/api-cute-nvgpu-common.md) |
| cute.nvgpu.warp | Warp-level MMA ops, LdMatrix/StMatrix | [cute-dsl/api-cute-nvgpu-warp.md](./cute-dsl/api-cute-nvgpu-warp.md) |
| cute.nvgpu.warpgroup | Hopper warpgroup MMA ops, fence/commit_group/wait_group | [cute-dsl/api-cute-nvgpu-warpgroup.md](./cute-dsl/api-cute-nvgpu-warpgroup.md) |
| cute.nvgpu.cpasync | cp.async / TMA copy ops | [cute-dsl/api-cute-nvgpu-cpasync.md](./cute-dsl/api-cute-nvgpu-cpasync.md) |
| cute.nvgpu.tcgen05 | Blackwell tcgen05 MMA ops, TMEM load/store | [cute-dsl/api-cute-nvgpu-tcgen05.md](./cute-dsl/api-cute-nvgpu-tcgen05.md) |
| pipeline | PipelineAsync/PipelineTmaUmma/PipelineState, producer/consumer | [cute-dsl/api-pipeline.md](./cute-dsl/api-pipeline.md) |
| utils | SmemAllocator, TmemAllocator, tile schedulers, HardwareInfo | [cute-dsl/api-utils.md](./cute-dsl/api-utils.md) |
| utils (SM90) | make_smem_layout_a/b/epi for Hopper | [cute-dsl/api-utils-sm90.md](./cute-dsl/api-utils-sm90.md) |
| utils (SM100) | make_smem_layout_a/b/epi, block-scaled MMA helpers for Blackwell | [cute-dsl/api-utils-sm100.md](./cute-dsl/api-utils-sm100.md) |
| **Operator API** | | |
| Overview | CUTLASS Operator API purpose, install, basic GEMM usage | [operator-api/overview.md](./operator-api/overview.md) |
| Tutorials | Index of Operator API tutorials | [operator-api/tutorials.md](./operator-api/tutorials.md) |
| Tutorial 000: Basic GEMM | GemmArguments, get_operators, supports/compile/run workflow | [operator-api/tutorial-000-gemm.md](./operator-api/tutorial-000-gemm.md) |
| Tutorial 001: GEMM with Fused Epilogue | EpilogueArguments, custom epilogue function contract | [operator-api/tutorial-001-gemm-fused-epilogue.md](./operator-api/tutorial-001-gemm-fused-epilogue.md) |
| Tutorial 002: Bring Your Own Kernel | CuteDslOperator subclassing, registration | [operator-api/tutorial-002-bring-your-own-kernel.md](./operator-api/tutorial-002-bring-your-own-kernel.md) |
| Tutorial 003: Host Latency Best Practices | Compiled artifacts, skip-supports, CUDA Graphs, TVM FFI | [operator-api/tutorial-003-host-latency-best-practices.md](./operator-api/tutorial-003-host-latency-best-practices.md) |
| Tutorial 004: Fake Tensors | Compile against FakeTensor, run against real tensors | [operator-api/tutorial-004-fake-tensors.md](./operator-api/tutorial-004-fake-tensors.md) |
| Tutorial 005: Grouped GEMM with Contiguous Offset | GroupedGemmArguments, offsets vector | [operator-api/tutorial-005-grouped-gemm-contiguous-offset.md](./operator-api/tutorial-005-grouped-gemm-contiguous-offset.md) |
| Tutorial 006: Block-Scaled GEMM (MXFP8) | ScaledOperand, ScaleMode, ScaleSwizzleMode | [operator-api/tutorial-006-block-scaled-gemm.md](./operator-api/tutorial-006-block-scaled-gemm.md) |
| API Reference | Index of the public cutlass.operators API reference | [operator-api/api-reference.md](./operator-api/api-reference.md) |
| API: Operator | Operator class, CompiledArtifact, Workspace, AllocationRequirement | [operator-api/api-operator.md](./operator-api/api-operator.md) |
| API: Arguments and Operands | RuntimeArguments, GemmArguments, GroupedGemmArguments, EpilogueArguments, ScaledOperand | [operator-api/api-arguments.md](./operator-api/api-arguments.md) |
| API: Kernel Discovery | get_operators, Manifest, TargetSm, ArchPortability | [operator-api/api-discovery.md](./operator-api/api-discovery.md) |
| API: Metadata | OperatorMetadata, OperandsMetadata, DesignMetadata, EpilogueMetadata, MmaInstruction | [operator-api/api-metadata.md](./operator-api/api-metadata.md) |
| API: Misc | Status, GlobalOptions | [operator-api/api-misc.md](./operator-api/api-misc.md) |
| **CUTLASS C++** | | |
| Overview | CUTLASS purpose, version, data types, architectures | [cpp/overview.md](./cpp/overview.md) |
| Getting Started | Index of C++ documentation tree | [cpp/getting-started.md](./cpp/getting-started.md) |
| Quickstart | Build the profiler, run unit tests, CMake arch flags | [cpp/quickstart.md](./cpp/quickstart.md) |
| IDE Setup | VSCode / clangd configuration | [cpp/ide-setup.md](./cpp/ide-setup.md) |
| Build | Index of platform-specific build guides | [cpp/build.md](./cpp/build.md) |
| Building on Windows with Visual Studio | Prerequisites, long-path registry key, CMake build | [cpp/build-windows-visual-studio.md](./cpp/build-windows-visual-studio.md) |
| Building with Clang as Host Compiler | CMAKE_CXX_COMPILER / CMAKE_CUDA_HOST_COMPILER | [cpp/build-clang-host-compiler.md](./cpp/build-clang-host-compiler.md) |
| Functionality | Supported GEMM kernel families by architecture | [cpp/functionality.md](./cpp/functionality.md) |
| Terminology | Layout, Tensor, Fragment, Tile, Warp, etc. | [cpp/terminology.md](./cpp/terminology.md) |
| Fundamental Types | half_t, bfloat16_t, tfloat32_t, Array, Coord | [cpp/fundamental-types.md](./cpp/fundamental-types.md) |
| Programming Guidelines | C++ style, East const, Params/SharedStorage patterns | [cpp/programming-guidelines.md](./cpp/programming-guidelines.md) |
| GEMM Heuristics | nvidia-matmul-heuristics search-space reduction | [cpp/gemm-heuristics.md](./cpp/gemm-heuristics.md) |
| Efficient GEMM | Threadblock/warp/instruction/thread hierarchy, pipelining | [cpp/efficient-gemm.md](./cpp/efficient-gemm.md) |
| Pipeline | cutlass::Pipeline* producer/consumer synchronization | [cpp/pipeline.md](./cpp/pipeline.md) |
| Profiler | cutlass_profiler CLI, kernel search, CSV output | [cpp/profiler.md](./cpp/profiler.md) |
| GEMM Performance Measurement | Warmup/profiling loop methodology | [cpp/gemm-performance-measurement.md](./cpp/gemm-performance-measurement.md) |
| Dependent Kernel Launch | Programmatic Dependent Launch (PDL) | [cpp/dependent-kernel-launch.md](./cpp/dependent-kernel-launch.md) |
| Blackwell | Index of Blackwell-specific CUTLASS docs | [cpp/blackwell.md](./cpp/blackwell.md) |
| Blackwell SM100 (and SM120) GEMMs | tcgen05.mma dispatch policies, tile shapes, block scaling | [cpp/blackwell-sm100-gemm.md](./cpp/blackwell-sm100-gemm.md) |
| Blackwell Cluster Launch Control | Static/dynamic tile scheduling via CLC | [cpp/blackwell-cluster-launch-control.md](./cpp/blackwell-cluster-launch-control.md) |
| Code Organization | Repository directory layout | [cpp/code-organization.md](./cpp/code-organization.md) |
| CuTe (C++) | Index of the CuTe C++ tutorial set | [cpp/cute.md](./cpp/cute.md) |
| CuTe: Quickstart | Header, directory layout, cute::print | [cpp/cute-quickstart.md](./cpp/cute-quickstart.md) |
| CuTe: Layout | Shape/Stride, make_layout, crd2idx/idx2crd | [cpp/cute-layout.md](./cpp/cute-layout.md) |
| CuTe: Layout Algebra | Coalesce, composition, complement, divide/product | [cpp/cute-layout-algebra.md](./cpp/cute-layout-algebra.md) |
| CuTe: Tensor | Engine + Layout, make_tensor, tiling/slicing/partitioning | [cpp/cute-tensor.md](./cpp/cute-tensor.md) |
| CuTe: Algorithms | copy, copy_if, gemm, axpby, fill, clear | [cpp/cute-algorithms.md](./cpp/cute-algorithms.md) |
| CuTe: MMA Atom | Operation structs, MMA_Traits, make_tiled_mma | [cpp/cute-mma-atom.md](./cpp/cute-mma-atom.md) |
| CuTe: GEMM Tutorial | sgemm_1/2.cu, TiledCopy/TiledMMA, majorness | [cpp/cute-gemm-tutorial.md](./cpp/cute-gemm-tutorial.md) |
| CuTe: Predication | Identity-layout masking for non-uniform tiling | [cpp/cute-predication.md](./cpp/cute-predication.md) |
| CuTe: TMA Tensors | TMA descriptors, ArithmeticTupleIterator, basis elements | [cpp/cute-tma-tensors.md](./cpp/cute-tma-tensors.md) |
| CUTLASS 3.x | Index of CUTLASS 3.x design/API docs | [cpp/cutlass-3x.md](./cpp/cutlass-3x.md) |
| CUTLASS 3.0 Design | Design goals, CuTe integration, type reduction | [cpp/cutlass-3x-design.md](./cpp/cutlass-3x-design.md) |
| CUTLASS 3.0 GEMM Backwards Compatibility | GemmUniversalAdapter, layout tag conversion | [cpp/cutlass-3x-backwards-compatibility.md](./cpp/cutlass-3x-backwards-compatibility.md) |
| GEMM API (3.x) | Device/Kernel/Collective/TiledMMA/Atom hierarchy | [cpp/gemm-api-3x.md](./cpp/gemm-api-3x.md) |
| CUTLASS 2.x | Index of CUTLASS 2.x docs | [cpp/cutlass-2x.md](./cpp/cutlass-2x.md) |
| Layouts and Tensors (2.x) | layout::ColumnMajor/RowMajor, TensorRef/TensorView | [cpp/layout-2x.md](./cpp/layout-2x.md) |
| GEMM API (2.x) | device::Gemm family, MmaPipelined, MmaTensorOp/MmaSimt | [cpp/gemm-api-2x.md](./cpp/gemm-api-2x.md) |
| Tile Iterator Concept | TileIteratorConcept family, deprecated in 3.0 | [cpp/tile-iterator-concept.md](./cpp/tile-iterator-concept.md) |
| Utilities | HostTensor, DeviceAllocation, TensorFill*, synclog | [cpp/utilities.md](./cpp/utilities.md) |
| Grouped Kernel Schedulers | Grouped GEMM/Rank2K scheduling, sort_problems | [cpp/grouped-scheduler.md](./cpp/grouped-scheduler.md) |
| Implicit GEMM Convolution | im2col-free convolution as GEMM | [cpp/implicit-gemm-convolution.md](./cpp/implicit-gemm-convolution.md) |
