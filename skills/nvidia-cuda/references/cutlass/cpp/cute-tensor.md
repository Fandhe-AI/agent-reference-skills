# CuTe: Tensor

## Signature / Usage

```cpp
using namespace cute;

// nonowning tensor view over existing memory
Tensor gA = make_tensor(make_gmem_ptr(ptr), layout);

// owning tensor, static shape/stride only (like std::array)
Tensor rA = make_tensor<float>(layout);

// slicing: `_` retains a mode as if no coordinate had been used
auto slice = gA(_, 0);
```

## Options / Props

| Concept | Description |
| --- | --- |
| `Tensor` | Combines an `Engine` (iterator managing data) with a `Layout` (logical-to-physical coordinate mapping) |
| `Engine` | Wraps an iterator/data array; exposes `iterator`, `value_type`, `reference`, `begin()` |
| `make_gmem_ptr()` / `make_smem_ptr()` | Tag a pointer with its memory space (global/shared/register) |
| `make_tensor(iterator, Layout)` | Nonowning tensor view; static or dynamic layout, any memory space |
| `make_tensor<T>(Layout)` | Owning tensor; requires static shape and stride, no dynamic allocation |
| `.data()` / `.size()` / `operator[]` / `operator()` | Container-like access; `rank`, `depth`, `shape`, `size`, `layout` also apply hierarchically |
| Tiling (`composition`, `logical_divide`, `zipped_divide`, `tiled_divide`, `flat_divide`) | Factor out subtensors via layout algebra |
| Slicing (`_`, Underscore) | Retains a mode of the tensor as if no coordinate had been used |
| Partitioning (`inner_partition()`, `outer_partition()`) | Combine tiling with slicing; thread-value partitioning composes with specialized layouts |

## Notes

- This is the C++ `cute::Tensor`; the Python CuTe DSL exposes an analogous but separately implemented tensor abstraction under `cutlass.cute.*` (see this skill's `cute-dsl` category).

## Related

- [CuTe: Layout](./cute-layout.md)
- [CuTe: Layout Algebra](./cute-layout-algebra.md)
- [CuTe: Algorithms](./cute-algorithms.md)
