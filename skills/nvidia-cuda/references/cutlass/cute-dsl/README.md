# cute-dsl

| Name | Description | Path |
| --- | --- | --- |
| **Guides** | | |
| Overview | CuTe DSL purpose, core abstractions, compilation approach | [overview.md](./overview.md) |
| Functionality | Supported MMA ops by architecture (Ampere/Hopper/Blackwell) | [functionality.md](./functionality.md) |
| Quick Start | Install, platform/driver requirements | [quick-start.md](./quick-start.md) |
| CuTe DSL (Index) | Navigation page for the CuTe DSL guide tree | [cute-dsl.md](./cute-dsl.md) |
| DSL Introduction | @jit / @kernel decorators, calling conventions | [dsl-introduction.md](./dsl-introduction.md) |
| DSL Code Generation | Pre-staging/meta-stage/object-stage, tracing vs preprocessor mode | [dsl-code-generation.md](./dsl-code-generation.md) |
| DSL Control Flow | range/range_constexpr, if/while, const_expr, limitations | [dsl-control-flow.md](./dsl-control-flow.md) |
| JIT Argument Generation | Constexpr vs dynamic args, JitArgument/DynamicExpression protocols | [dsl-jit-arg-generation.md](./dsl-jit-arg-generation.md) |
| Static vs Dynamic Layouts | mark_layout_dynamic, compile tradeoffs | [dsl-dynamic-layout.md](./dsl-dynamic-layout.md) |
| Struct-like JIT Arguments | NamedTuple, @native_struct, frozen dataclass | [dsl-struct-types.md](./dsl-struct-types.md) |
| JIT Caching | cute.compile, cache key, CUTE_DSL_CACHE_DIR | [dsl-jit-caching.md](./dsl-jit-caching.md) |
| JIT Compilation Options | opt-level, enable-assertions, keep-cubin/ptx | [dsl-jit-compilation-options.md](./dsl-jit-compilation-options.md) |
| DSL Types | IntValue, Ratio, ScaledBasis, Swizzle, Layout, Pointer, struct/union | [dsl-types.md](./dsl-types.md) |
| Framework Integration | DLPack, from_dlpack, mark_layout_dynamic, TVM FFI | [framework-integration.md](./framework-integration.md) |
| Debugging | CUTE_DSL_DEBUG, CUTE_DSL_KEEP, logging env vars | [debugging.md](./debugging.md) |
| IKET Profiling | In-kernel event tracing, mark/range_push/pop | [iket-profiling.md](./iket-profiling.md) |
| Autotuning GEMM | Search space, caching, benchmarking practices | [autotuning-gemm.md](./autotuning-gemm.md) |
| Compile with TVM FFI | --enable-tvm-ffi, fake tensors | [compile-with-tvm-ffi.md](./compile-with-tvm-ffi.md) |
| Ahead-of-Time Compilation | export_to_c, CuteDSLRuntime.h | [dsl-ahead-of-time-compilation.md](./dsl-ahead-of-time-compilation.md) |
| Naming Conventions | Hungarian-style identifier prefixes (g/s/r/t, tTR_/tRS_/bSG_/bGS_) | [naming-conventions.md](./naming-conventions.md) |
| Deprecation Policy | Soft deprecation process, current deprecations | [deprecation-policy.md](./deprecation-policy.md) |
| MMA Guides (Index) | Navigation for the three architecture-specific MMA guides | [mma-intro.md](./mma-intro.md) |
| MMA: WMMA Programming (Warp-Level) | SM80+ warp-level MMA, MmaF16BF16Op/MmaFP8Op | [mma-wmma-programming.md](./mma-wmma-programming.md) |
| MMA: WGMMA Programming (Hopper) | SM90a warpgroup MMA, async issue model | [mma-wgmma-programming.md](./mma-wgmma-programming.md) |
| MMA: tcgen05 Programming (Blackwell) | SM100 tcgen05 MMA, TMEM, CTA-pair cooperation | [mma-tcgen05-programming.md](./mma-tcgen05-programming.md) |
| Limitations | Unsupported features, 32-bit layout algebra, OOP constraints | [limitations.md](./limitations.md) |
| FAQs | C++ vs Python DSL, architecture support, license | [faqs.md](./faqs.md) |
| **CuTe DSL API** | | |
| API (Index) | Navigation for the cutlass.cute Python API reference | [api-overview.md](./api-overview.md) |
| cute | Layout/Tensor/Atom core API, layout algebra | [api-cute.md](./api-cute.md) |
| cute.arch | NVVM device-function wrappers (thread/cluster/mbarrier/atomics) | [api-cute-arch.md](./api-cute-arch.md) |
| cute.runtime | Pointer/Tensor/FakeTensor, from_dlpack, make_ptr | [api-cute-runtime.md](./api-cute-runtime.md) |
| cute.nvgpu (Index) | Navigation for common/warp/warpgroup/cpasync/tcgen05 submodules | [api-cute-nvgpu.md](./api-cute-nvgpu.md) |
| cute.nvgpu (Common) | Arch-agnostic MMA/Copy ops, TMA atom helpers | [api-cute-nvgpu-common.md](./api-cute-nvgpu-common.md) |
| cute.nvgpu.warp | Warp-level MMA ops, LdMatrix/StMatrix | [api-cute-nvgpu-warp.md](./api-cute-nvgpu-warp.md) |
| cute.nvgpu.warpgroup | Hopper warpgroup MMA ops, fence/commit_group/wait_group | [api-cute-nvgpu-warpgroup.md](./api-cute-nvgpu-warpgroup.md) |
| cute.nvgpu.cpasync | cp.async / TMA copy ops | [api-cute-nvgpu-cpasync.md](./api-cute-nvgpu-cpasync.md) |
| cute.nvgpu.tcgen05 | Blackwell tcgen05 MMA ops, TMEM load/store | [api-cute-nvgpu-tcgen05.md](./api-cute-nvgpu-tcgen05.md) |
| pipeline | PipelineAsync/PipelineTmaUmma/PipelineState, producer/consumer | [api-pipeline.md](./api-pipeline.md) |
| utils | SmemAllocator, TmemAllocator, tile schedulers, HardwareInfo | [api-utils.md](./api-utils.md) |
| utils (SM90) | make_smem_layout_a/b/epi for Hopper | [api-utils-sm90.md](./api-utils-sm90.md) |
| utils (SM100) | make_smem_layout_a/b/epi, block-scaled MMA helpers for Blackwell | [api-utils-sm100.md](./api-utils-sm100.md) |
