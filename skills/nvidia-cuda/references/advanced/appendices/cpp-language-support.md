# C++ Language Support

Which C++ standard revisions (C++11 through C++23), C standard library functions, lambda expression forms, and libcu++ standard-library facilities are supported in `__device__`/`__global__` code, plus language restrictions (no RTTI, no exceptions) that apply only on the device side.

## Signature / Usage

```cuda
#include <stdlib.h>

__global__ void single_thread_allocation_kernel() {
    size_t size = 123;
    char*  ptr  = (char*) malloc(size);
    memset(ptr, 0, size);
    printf("Thread %d got pointer: %p\n", threadIdx.x, ptr);
    free(ptr);
}
```

## Options / Props

| Name | Description |
| --- | --- |
| `clock()` / `clock64()` | Device-side timing functions returning a per-multiprocessor cycle counter. |
| `printf()` | Device-side formatted output; limited to 32 arguments. |
| `memcpy()` / `memset()` | Standard C memory functions, usable in device code. |
| `malloc()` / `free()` / `alloca()` | Device-side dynamic memory allocation from a per-context heap. |
| libcu++ | CUDA's C++ Standard Library, usable from both host and device code; backports C++20/23/26 features to C++17 and adds extended numeric types (128-bit integers, half-precision, bfloat16, quad-precision). |
| Extended Lambdas | `__device__`/`__host__ __device__`-annotated lambda expressions, with their own type-trait and capture restrictions (see Extended Lambda Restrictions, `*this` capture-by-value). |

## Notes

- Run-Time Type Information (RTTI) and exceptions are not supported in device code: the `typeid` keyword, `dynamic_cast`, and `try`/`catch`/`throw` cannot be used in `__device__`/`__global__` functions.
- C++ standard-library support in device code comes from libcu++, not the host's full standard library — not every host-side standard-library feature has a device-code equivalent, and some libcu++ facilities extend beyond a typical host STL (extended numeric types).
- `printf()` in device code has a fixed 32-argument limit, unlike host `printf`.
- Lambda expressions used as `__global__` function parameters and "extended lambdas" (lambdas usable across host/device boundaries) have restrictions distinct from ordinary host-only C++ lambdas — see Extended Lambda Restrictions before capturing by reference or using in constexpr contexts.

## Related

- [Floating-Point Computation](./mathematical-functions.md)
- [Advanced Kernel Programming](../core/advanced-kernel-programming.md)
