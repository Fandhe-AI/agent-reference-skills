# libhipcxx (C++ Standard Library for HIP)

libhipcxx is the C++ Standard Library for HIP: an opt-in, incremental, heterogeneous implementation of C++ Standard Library features that work in both host and device code, plus extensions and HIP abstractions. It is header-only and derived from libcudacxx.

## Signature / Usage

```cmake
# "/opt/rocm" - default ROCm install prefix
find_package(libhipcxx REQUIRED)

target_link_libraries(your_target PRIVATE libhipcxx::libhipcxx)
```

```cpp
// Standard C++, __host__ only.
#include <atomic>
std::atomic<int> x;

// HIP C++, __host__ __device__. Strictly conforming to the C++ Standard.
#include <cuda/std/atomic>
cuda::std::atomic<int> x;

// HIP C++, __host__ __device__. Conforming extensions to the C++ Standard.
#include <cuda/atomic>
cuda::atomic<int, cuda::thread_scope_block> x;
```

Without CMake: `hipcc -std=c++17 -I/opt/rocm/include/hipccl -c main.hip`

## Options / Props

Namespace hierarchy:

| Namespace | Include path | Where it runs |
| --- | --- | --- |
| `std::` | `<*>` | `__host__` only. Host compiler's Standard Library |
| `cuda::std::` / `hip::std::` | `<cuda/std/*>` / `<hip/std/*>` | `__host__` and `__device__`. Conforming implementations |
| `cuda::` / `hip::` | `<cuda/*>` / `<hip/*>` | `__host__` and `__device__`. Extensions with GPU-specific semantics |

Extension categories:

| Extension | APIs |
| --- | --- |
| Thread-scope synchronization | `atomic`, `atomic_ref` (`thread_scope` controls fence strength across thread, block, device, system) |
| Functional utilities | `maximum`, `minimum`, `proclaim_return_type`, `get_device_address` |
| Math utilities | `ceil_div`, `round_up`, `round_down`, `ilog2`, `ilog10` |
| Bit utilities | `bitmask`, `bit_reverse`, `bitfield_insert`, `bitfield_extract` |
| Stream reference | `stream_ref` (type-safe wrapper around `hipStream_t`) |
| Memory resources | `mr::resource`, `mr::resource_ref` (experimental; requires `LIBCUDACXX_ENABLE_EXPERIMENTAL_MEMORY_RESOURCE`) |

Minimum dialect for some headers:

| Minimum dialect | Headers |
| --- | --- |
| C++20 | `<bit>`, `<concepts>`, `<span>`, `<source_location>` |
| C++23 | `<expected>`, `<mdspan>` |
| C++26 | `<inplace_vector>`, `<linalg>` |

## Notes

- `cuda::` / `hip::` prefixes (and `cuda/` / `hip/` include paths) are interchangeable aliases resolving to the same headers. There is no CUDA backend for libhipcxx. This is the HIP/AMD library; CUDA-side libcudacxx belongs to the `nvidia-cuda` skill
- Opt-in: does not replace the host Standard Library. Incremental: not a complete implementation. Heterogeneous: works in host and device code. libhipcxx does not document individual Standard Library features (defers to cppreference); it documents which headers are available
- C++17 is tested; C++20 is supported but not yet tested
- Available header groups: synchronization (`<atomic>`), containers (`<array>`, `<span>`, `<mdspan>`, `<inplace_vector>`), numerics (`<ratio>`, `<bit>`, `<complex>`, `<linalg>`, `<numbers>`, `<numeric>`), ranges (`<iterator>`, `<ranges>`: concepts and `subrange` only), time (`<chrono>`: no timezone, no `steady_clock`; host and device clocks not synchronized), concepts, utilities (`<type_traits>`, `<utility>`, `<tuple>`, `<optional>`, `<expected>`, `<variant>`, `<functional>`, `<bitset>`, `<memory>`, `<initializer_list>`, `<source_location>`, `<version>`), type support (`<limits>`, `<climits>`), C library compatibility (`<cassert>`, `<cfloat>`, `<climits>`, `<cmath>`, `<cstddef>`, `<cstdint>`, `<cstdlib>`, `<cstring>`, `<ctime>`)
- Unsupported (depend on NVIDIA hardware / PTX): `<cuda/latch>`, `<cuda/barrier>`, `<cuda/semaphore>`, `<cuda/pipeline>` and their `cuda::std` equivalents; `cuda::memcpy_async`, `memcpy_async_tx`, `aligned_size_t`; `<cuda/annotated_ptr>`; `cuda::device::warp_shuffle_*`; `<cuda/ptx>`. `cuda::discard_memory` is available but has no effect on AMD GPUs. `cuda::for_each_canceled_block` invokes the function once for the current block on AMD GPUs
- Install: as of ROCm Core SDK 10.1, libhipcxx ships in the ROCm Core SDK (`amdrocm-core-sdk`). Standalone via the ROCm CCL dev package (`amdrocm-ccl<dev/devel><rocm_version>-<llvm_target>`, includes libhipcxx, rocThrust, hipCUB, rocPRIM): `sudo apt install amdrocm-ccl-dev`, `sudo dnf install amdrocm-ccl-devel`, `sudo zypper install amdrocm-ccl-devel`. Nightly builds come from TheRock
- CMake does not configure the HIP compiler; enable it separately (e.g. `enable_language(HIP)` or `CMAKE_HIP_COMPILER`). `libhipcxx::libhipcxx` is an interface target that only adds include directories. For non-default installs set `CMAKE_PREFIX_PATH`
- Source: `rocm.docs.amd.com/projects/libhipcxx/en/docs-10.1.0/` (index, install, conceptual pages; Sphinx sources). Standard API / Extended API per-API pages, limitations and conformance pages are not covered here

## Related

- [Threading Libraries (hipThreads)](./threading-libraries.md)
- [Math and Compute Libraries](./math-compute-libraries.md)
- [Core SDK Overview](./core-sdk-overview.md)
