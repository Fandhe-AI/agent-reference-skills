# Terminology

## Signature / Usage

```cpp
// cute::Layout — composed of hierarchical cute::Shape and cute::Stride tuples
// cute::Tensor  — a pointer backed by a cute::Layout
```

## Options / Props

| Term | Definition |
| --- | --- |
| `cute::Layout` | Vocabulary type composed of the hierarchical `cute::Shape` and `cute::Stride` tuples, representing thread and data layouts (CUTLASS 3.0+) |
| `cute::Tensor` | A pointer backed by a `cute::Layout` used to represent a tensor |
| Capacity | Physical number of elements required in memory to store a multidimensional object (e.g. column-major matrix capacity = `lda * N`) |
| Element | A data type describing a single item within a multidimensional tensor, array, or matrix |
| Extent | The logical size of each dimension of a multidimensional index space |
| Fragment | A register-backed array of elements used to store a thread's part of a tile |
| Index | A signed integer aligned with a logical dimension |
| Layout | A functor mapping logical tensor coordinates to linear memory offsets, including stride vectors |
| LongIndex | Signed integer representing memory offsets; typically wider than `Index` |
| Rank | Number of dimensions in a multidimensional index space, array, tensor, or matrix |
| Tile | Partition of a tensor with constant extents and layout known at compile time |
| Warp | A collection of hardware threads executing in lock-step |

## Notes

- `Operator`, `Tile Iterator`, and `Thread Map` are deprecated as of CUTLASS 3.0+, replaced by CuTe's MMA and Copy atoms.

## Related

- [Fundamental Types](./fundamental-types.md)
- [CuTe: Layout](./cute-layout.md)
