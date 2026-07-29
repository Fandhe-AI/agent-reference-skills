# CuTe: Quickstart

## Signature / Usage

```cpp
#include <cute/tensor.hpp>

using namespace cute;
Layout s8 = make_layout(Int<8>{});
print(s8);
```

## Options / Props

| Directory | Contents |
| --- | --- |
| `include/cute` | Core components: `Layout`, `Tensor` |
| `include/cute/container` | STL-like objects (`tuple`, `array`) |
| `include/cute/numeric` | Numeric data types |
| `include/cute/algorithm` | Utility algorithms (`copy`, `fill`) |
| `include/cute/arch` | Architecture-specific instructions |
| `include/cute/atom` | MMA instruction metadata |

## Notes

- CuTe (C++) provides abstractions for hierarchically multidimensional layouts of threads and data via `Layout` and `Tensor` objects that handle indexing and memory management.
- Requirements: NVCC with a C++17 host compiler; shares CUTLASS 3.x's software requirements.
- Debugging/printing: `cute::print` supports most CuTe types; `print_layout`, `print_tensor`, and `print_latex` provide specialized visualizations.

## Related

- [CuTe: Layout](./cute-layout.md)
- [CuTe: Layout Algebra](./cute-layout-algebra.md)
- [CuTe: Tensor](./cute-tensor.md)
