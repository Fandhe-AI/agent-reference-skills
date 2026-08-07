# CuTe DSL

| Name | Description | Path |
|------|-------------|------|
| CuTe DSL (Index) | Navigation page for the CuTe DSL documentation tree | [cute-dsl.md](./cute-dsl.md) |
| CuTe DSL API (Index) | Navigation page for the `cutlass.cute` Python API reference | [api-overview.md](./api-overview.md) |
| CuTe DSL API: cute | Core layout, tensor, atom operations and layout algebra | [api-cute.md](./api-cute.md) |
| CuTe DSL API: cute.arch | NVVM device-function wrappers for thread ops, synchronization, memory barriers, and atomics | [api-cute-arch.md](./api-cute-arch.md) |
| CuTe DSL API: cute.nvgpu | Navigation/index page for the `cutlass.cute.nvgpu` module | [api-cute-nvgpu.md](./api-cute-nvgpu.md) |
| CuTe DSL API: cute.nvgpu (Common) | Architecture-agnostic MMA and Copy operations plus helpers | [api-cute-nvgpu-common.md](./api-cute-nvgpu-common.md) |
| CuTe DSL API: cute.nvgpu.cpasync | cp.async and TMA copy operations for bulk tensor transfers | [api-cute-nvgpu-cpasync.md](./api-cute-nvgpu-cpasync.md) |
| CuTe DSL API: cute.nvgpu.tcgen05 | Blackwell SM100 tcgen05 MMA operations and TMEM utilities | [api-cute-nvgpu-tcgen05.md](./api-cute-nvgpu-tcgen05.md) |
| CuTe DSL API: cute.nvgpu.warp | Warp-level MMA and ldmatrix/stmatrix operations | [api-cute-nvgpu-warp.md](./api-cute-nvgpu-warp.md) |
| CuTe DSL API: cute.nvgpu.warpgroup | Hopper SM90a warpgroup MMA operations | [api-cute-nvgpu-warpgroup.md](./api-cute-nvgpu-warpgroup.md) |
| CuTe DSL API: cute.runtime | Runtime pointer, tensor, and DLPack conversion utilities | [api-cute-runtime.md](./api-cute-runtime.md) |
| CuTe DSL API: pipeline | Pipeline utilities for TMA, MMA, and async copies | [api-pipeline.md](./api-pipeline.md) |
| CuTe DSL API: utils | General memory management, tile scheduling, and hardware info | [api-utils.md](./api-utils.md) |
| CuTe DSL API: utils (SM90) | Hopper-specific SMEM layout builders and epilogue utilities | [api-utils-sm90.md](./api-utils-sm90.md) |
| CuTe DSL API: utils (SM100) | Blackwell-specific epilogue and block-scaled MMA utilities | [api-utils-sm100.md](./api-utils-sm100.md) |
| Auto-Tuning GEMM | GEMM kernel tuning via parameter space search and caching | [autotuning-gemm.md](./autotuning-gemm.md) |
| Compile with TVM FFI | TVM FFI integration for faster PyTorch interop | [compile-with-tvm-ffi.md](./compile-with-tvm-ffi.md) |
| Debugging | Environment variables and attributes for troubleshooting | [debugging.md](./debugging.md) |
| Deprecation Policy | Soft and hard deprecation timelines for DSL features | [deprecation-policy.md](./deprecation-policy.md) |
| DSL Introduction | Core concepts, decorators, and basic JIT/kernel patterns | [dsl-introduction.md](./dsl-introduction.md) |
| DSL Code Generation | Meta-stage vs. object-stage execution and preprocessor modes | [dsl-code-generation.md](./dsl-code-generation.md) |
| DSL Control Flow | Loop and conditional constructs for static/dynamic control | [dsl-control-flow.md](./dsl-control-flow.md) |
| Static vs. Dynamic Layouts | Static vs. dynamic shape handling and compilation trade-offs | [dsl-dynamic-layout.md](./dsl-dynamic-layout.md) |
| JIT Function Argument Generation | Argument protocols, `Constexpr`, and custom type adaptation | [dsl-jit-arg-generation.md](./dsl-jit-arg-generation.md) |
| JIT Caching | Implicit caching and explicit `cute.compile()` for reuse | [dsl-jit-caching.md](./dsl-jit-caching.md) |
| JIT Compilation Options | Optimization levels, debugging flags, and PTX/CUBIN retention | [dsl-jit-compilation-options.md](./dsl-jit-compilation-options.md) |
| Struct-like JIT Arguments | NamedTuple, `@native_struct`, and frozen dataclass containers | [dsl-struct-types.md](./dsl-struct-types.md) |
| DSL Types | IntValue, Ratio, Swizzle, Layout, Pointer, and struct/union decorators | [dsl-types.md](./dsl-types.md) |
| Ahead-of-Time (AOT) Compilation | Kernel export to C/C++ headers and object files | [dsl-ahead-of-time-compilation.md](./dsl-ahead-of-time-compilation.md) |
| FAQs | Common questions on DSLs, porting, framework support, and licensing | [faqs.md](./faqs.md) |
| Framework Integration | DLPack tensor conversion, dynamic layouts, and TVM FFI | [framework-integration.md](./framework-integration.md) |
| Functionality | Supported MMA data types and instruction sets by architecture | [functionality.md](./functionality.md) |
| IKET Profiling (In-Kernel Event Tracing) | Mark/range instrumentation and Perfetto trace visualization | [iket-profiling.md](./iket-profiling.md) |
| Limitations | Unsupported features and constraints in the beta DSL | [limitations.md](./limitations.md) |
| Architecture-Specific MMA Programming Guides (Index) | Navigation page covering WMMA, WGMMA, and tcgen05 guides | [mma-intro.md](./mma-intro.md) |
| MMA: Warp-Level MMA Programming Guide | Warp-synchronous MMA setup, data flow, and complete workflow | [mma-wmma-programming.md](./mma-wmma-programming.md) |
| MMA: Warpgroup MMA (WGMMA) Programming Guide | Hopper warpgroup MMA ops, SMEM descriptors, and async fences | [mma-wgmma-programming.md](./mma-wgmma-programming.md) |
| MMA: tcgen05 Programming Guide (Blackwell, SM100) | Blackwell tcgen05 MMA, TMEM, 2-CTA cooperation, and block-scaled variants | [mma-tcgen05-programming.md](./mma-tcgen05-programming.md) |
| Naming Conventions | Hungarian-style notation for memory spaces, operands, and axes | [naming-conventions.md](./naming-conventions.md) |
| CuTe DSL Overview | Purpose, core abstractions, compilation model, and public beta status | [overview.md](./overview.md) |
| Primitives API (experimental) | Low-level NVVM dialect wrappers for barriers, TMA, atomics | [primitives-api.md](./primitives-api.md) |
| Quick Start | Installation, Python version, CUDA toolkit, and driver requirements | [quick-start.md](./quick-start.md) |
| Task Scheduling (TS, experimental) | Navigation for experimental task-scheduling infrastructure | [task-scheduling.md](./task-scheduling.md) |
