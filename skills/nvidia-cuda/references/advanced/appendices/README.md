# Technical Appendices (Part 5)

| Name | Description | Path |
| --- | --- | --- |
| Compute Capabilities | Per-architecture SM/shared-memory/thread limits | [compute-capabilities.md](./compute-capabilities.md) |
| CUDA Environment Variables | CUDA_VISIBLE_DEVICES, CUDA_MODULE_LOADING, CUDA_LOG_FILE | [environment-variables.md](./environment-variables.md) |
| C++ Language Support | C++11-23 support, libcu++, RTTI/exceptions restrictions | [cpp-language-support.md](./cpp-language-support.md) |
| C/C++ Language Extensions | `__global__`/`__device__`, `__shared__`, threadIdx, warp intrinsics, atomics | [cpp-language-extensions.md](./cpp-language-extensions.md) |
| Floating-Point Computation | IEEE-754 compliance, FMA, math function ULP error bounds | [mathematical-functions.md](./mathematical-functions.md) |
| Device-Callable APIs and Intrinsics | __mbarrier_*, __pipeline_*, CUDA Device Runtime | [device-callable-apis.md](./device-callable-apis.md) |
| CUDA C++ Memory Model | Thread scopes, cuda::atomic_ref, data races | [cuda-cpp-memory-model.md](./cuda-cpp-memory-model.md) |
| CUDA C++ Execution model | Host/device forward progress guarantees | [cuda-cpp-execution-model.md](./cuda-cpp-execution-model.md) |
