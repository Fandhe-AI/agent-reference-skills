# CuTe: Layout

## Signature / Usage

```cpp
using namespace cute;

Layout s8      = make_layout(Int<8>{});
Layout s2xs4   = make_layout(make_shape(Int<2>{}, Int<4>{}));
Layout s2xd4_a = make_layout(make_shape(Int<2>{}, 4),
                             make_stride(Int<12>{}, Int<1>{}));
Layout s2xh4   = make_layout(make_shape(2, make_shape(2, 2)),
                             make_stride(4, make_stride(2, 1)));

// crd2idx: index = inner product of natural coordinate with stride
// layout (3,(2,3)):(3,(12,1)), coordinate (i,(j,k)) -> i*3 + j*12 + k*1
```

## Options / Props

| Concept | Description |
| --- | --- |
| `Layout` | A mapping from coordinate space(s) to an index space; composed of `Shape` (bounds) and `Stride` (coordinate-to-index) `IntTuple`s |
| Static vs dynamic integer | Static = `std::integral_constant` instance (`cute::C<Value>`, shortcuts `Int<1>`, `_1`); dynamic = ordinary C++ integral type |
| `IntTuple` | Recursively an integer or tuple of `IntTuple`s; `rank()`, `get<I>()`, `depth()`, `size()` operate on it |
| `LayoutLeft` / `LayoutRight` | Default stride generation when `Stride` is omitted from `make_layout` — column-major / row-major respectively |
| `idx2crd` | Converts a linear index to natural coordinates (colexicographical order, right to left) |
| `crd2idx` | Converts natural coordinates to a linear index via inner product with strides |
| Shape compatibility | Shape A compatible with Shape B iff sizes match and every A-coordinate is valid in B — a weak partial order (reflexive, antisymmetric, transitive); e.g. `24` is compatible with `(4,6)` but not with `(24)` |
| `layout<I...>(a)` / `select<I...>(a)` / `take<Begin,End>(a)` | Sublayout extraction |
| `make_layout(a, b)`, `append()`, `prepend()`, `replace<I>()` | Concatenation |
| `group<Begin,End>()` / `flatten()` | Nest / unnest modes |

## Notes

- Core principle: "Layouts are functions from integers to integers." Unlike C++23 `mdspan` layout mappings, CuTe `Layout`s are first-class, natively hierarchical, and accept coordinates from 1-D indices up to h-D natural coordinates.
- This is the C++ template `cute::Layout`, distinct from the Python CuTe DSL's layout API (`cutlass.cute.*`, under this skill's `cute-dsl` category) — same conceptual model, separate implementations.

## Related

- [CuTe: Layout Algebra](./cute-layout-algebra.md)
- [CuTe: Tensor](./cute-tensor.md)
- [Terminology](./terminology.md)
