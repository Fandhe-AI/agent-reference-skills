# Quickstart

## Signature / Usage

```bash
# Configure for Hopper (SM90a), build the profiler only
mkdir build && cd build
cmake .. -DCUTLASS_NVCC_ARCHS=90a \
         -DCUTLASS_ENABLE_TESTS=OFF \
         -DCUTLASS_UNITY_BUILD_ENABLED=ON
make cutlass_profiler -j

# Benchmark a GEMM kernel
./tools/profiler/cutlass_profiler --kernels=sgemm --m=4352 --n=4096 --k=4096

# Run the unit test suite (946+ tests)
make test_unit -j
```

## Options / Props

| Item | Value | Description |
| --- | --- | --- |
| CUDA Toolkit | 11.4+ (12.0 recommended) | Required for compilation |
| CMake | 3.18+ | Build system |
| Host compiler | g++ 7.5.0+ (C++17) | Minimum compiler version |
| Python | 3.6+ | Required for build scripts / library generation |
| `CUTLASS_NVCC_ARCHS` | e.g. `50`, `60-61`, `70`, `75`, `80`, `90a`, `100a` | Target architecture(s): Maxwell, Pascal, Volta, Turing, Ampere, Hopper, Blackwell |
| `CUTLASS_ENABLE_TESTS` | `ON` / `OFF` | Toggles unit test build (disable to speed up profiler-only builds) |
| `CUTLASS_UNITY_BUILD_ENABLED` | `ON` / `OFF` | Batches translation units to reduce compile time |
| `CUTLASS_LIBRARY_KERNELS` / `CUTLASS_LIBRARY_OPERATIONS` | glob/filter strings | Restrict which kernels/operations are instantiated into the library |

Optional dependencies: cuBLAS, cuDNN v7.6+.

## Notes

- The profiler reports runtime, memory bandwidth, and math throughput (GFLOP/s) per kernel invocation.
- CUTLASS Library (`libcutlass_lib.so`) exposes enumerated kernel types and host-side dispatch for runtime kernel selection.
- Blackwell SM100 kernels (including FP8 and block-scaled MXFP8 variants) are instantiated through dedicated dispatch policies distinct from the Hopper (SM90) path — see [Blackwell](./blackwell.md) and [Blackwell SM100 GEMM](./blackwell-sm100-gemm.md).

## Related

- [Getting Started](./getting-started.md)
- [Build](./build.md)
- [GEMM Heuristics](./gemm-heuristics.md)
