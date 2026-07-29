# Math and Compute Libraries

Deep-learning kernels, BLAS operations, kernel primitives, and mathematical functions that ship as part of the ROCm Core SDK.

## Signature / Usage

```cmake
# link the HIP runtime that these math libraries build on
find_package(hip REQUIRED)
# then link the specific library needed, e.g.:
#   find_package(hipBLAS REQUIRED)   -> hipblasSgemm(...)   BLAS marshalling
#   find_package(hipFFT REQUIRED)    -> hipfftExecC2C(...)  FFT marshalling
#   find_package(rocBLAS REQUIRED)   -> rocblas_sgemm(...)  native rocBLAS impl
#   find_package(MIOpen REQUIRED)    -> miopenConvolutionForward(...)
```

## Options / Props

| Library | Role |
| --- | --- |
| Composable Kernel | Programming model for writing performance-critical kernels for machine learning workloads |
| hipBLAS | BLAS-marshalling library that supports rocBLAS and cuBLAS backends |
| hipBLASLt | General matrix-matrix operations with a flexible API |
| hipCUB | Thin header-only wrapper library on top of rocPRIM or CUB |
| hipFFT | Fast Fourier Transforms (FFT)-marshalling library that supports rocFFT or cuFFT backends |
| hipRAND | Ports CUDA applications that use the cuRAND library into the HIP layer |
| hipSOLVER | LAPACK-marshalling library that supports rocSOLVER and cuSOLVER backends |
| hipSPARSE | SPARSE-marshalling library that supports rocSPARSE and cuSPARSE backends |
| MIOpen | Open source deep-learning library |
| rocBLAS | BLAS implementation (in the HIP programming language) on the ROCm runtime |
| rocFFT | Software library for computing Fast Fourier Transforms (FFTs), written in HIP |
| rocPRIM | Header-only library for HIP parallel primitives |
| rocRAND | Functions that generate pseudorandom and quasirandom numbers |
| rocSOLVER | Implementation of LAPACK routines on ROCm software |
| rocSPARSE | Common interface that provides BLAS for sparse computation |
| rocThrust | Parallel algorithm library |
| rocWMMA | C++ library for accelerating mixed-precision matrix multiply-accumulate operations |

## Notes

- ROCm 7.14.0. Individual API signatures for these libraries are outside the scope of `rocm-stack`; this page is a catalog, not an API reference
- The `hip*` prefixed libraries (hipBLAS, hipBLASLt, hipCUB, hipFFT, hipRAND, hipSOLVER, hipSPARSE) are marshalling/porting layers that pick a backend (rocBLAS/cuBLAS, rocFFT/cuFFT, etc.) at build or run time — they are AMD's naming counterparts to NVIDIA's cuBLAS / cuFFT / CUB / cuRAND / cuSOLVER / cuSPARSE / Thrust, similar in shape but **not the same library or ABI**. CUDA-side APIs belong to the `nvidia-cuda` skill, not this one
- rocThrust mirrors NVIDIA's Thrust API surface but is a distinct HIP-native implementation

## Related

- [Core SDK Overview](./core-sdk-overview.md)
- [Runtime and Compilers](./runtime-and-compilers.md)
