# Kernel Language C++ Support

Describes which C++ standard features are usable inside `__device__`/`__global__` code, and which are restricted or unsupported by the GPU execution model.

## Signature / Usage

```cpp
__device__ constexpr int square(int x) { return x * x; } // constexpr: full device support

__global__ void kernel(int* out) {
    auto add = [] __device__ (int a, int b) { return a + b; }; // lambda, restricted capture
    out[0] = add(square(2), 3);
}
```

## Options / Props

| Feature | Device-code support |
| --- | --- |
| C++11 / C++14 / C++17 | Fully supported |
| C++20 | Most language features supported, with restrictions; coroutines not available |
| `constexpr` | Full support; implicitly `__host__ __device__` |
| Lambdas | Supported, implicitly `__host__ __device__`; capturing by reference across host/device execution contexts is undefined behavior |
| Virtual functions | Supported within a single execution context; calling across host/device boundary is undefined behavior |
| Classes | Supported, but memory-space qualifiers (`__device__`, `__managed__`, `__shared__`, `__constant__`) cannot be applied to member variables |
| Exceptions | Not available (no hardware support); device code must use return codes for error handling |
| RTTI | Not supported |
| Standard library | Severely limited; only `constexpr`-qualified functions are compiled for device by default. `libhipcxx` is an ongoing effort to expand coverage |
| `std::function` | Not supported (polymorphic function wrapper) |

## Notes

- This is the AMD HIP API (`hip*` prefix), not the CUDA runtime API (`cuda*` prefix). HIP and CUDA are source-portable but not source-identical; see `porting-cuda-to-hip.md` and `hipify.md`. CUDA equivalents are covered by the separate `nvidia-cuda` skill.

## Related

- [cpp-language-extensions.md](./cpp-language-extensions.md)
- [error-handling.md](./error-handling.md)
