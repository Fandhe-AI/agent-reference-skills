# CuTe DSL API: cute

## Signature / Usage

```python
import cutlass.cute as cute

layout = cute.make_layout(shape, stride=None)
t = cute.make_tensor(ptr, layout)
tiled = cute.local_tile(t, tiler, coord)
```

## Options / Props

| Category | Symbols |
| --- | --- |
| Core classes | `Swizzle`, `struct` (decorator), `MemRange`, `Align`, `ScaledBasis`, `Atom`, `MmaAtom`, `CopyAtom`, `TiledCopy`, `TiledMma`, `ThrMma`, `ThrCopy`, `TensorSSA` |
| Layout creation | `make_layout()`, `make_identity_layout()`, `make_ordered_layout()`, `make_layout_like()`, `make_composed_layout()` |
| Layout algebra | `composition()`, `complement()`, `right_inverse()`, `left_inverse()`, `logical_product()`, `zipped_product()`, `tiled_product()`, `flat_product()`, `raked_product()`, `blocked_product()`, `logical_divide()`, `zipped_divide()`, `tiled_divide()`, `flat_divide()` |
| Layout filtering/transform | `filter_zeros()`, `filter()`, `coalesce()`, `recast_layout()`, `nullspace()` |
| Coordinate/index ops | `crd2idx()`, `idx2crd()`, `increment_coord()`, `slice_and_offset()` |
| Tensor ops | `make_tensor()`, `local_tile()`, `local_partition()` |
| Shape/stride ops | `shape_div()`, `ceil_div()`, `round_up()`, `prepend()`, `append()`, `prepend_ones()`, `append_ones()` |
| Structural analysis | `depth()`, `is_congruent()`, `is_weakly_congruent()`, `flatten()`, `group_modes()`, `slice_()`, `front()` |
| Utility | `E()`, `is_static()`, `get_divisibility()`, `has_underscore()`, `pretty_str()`, `printf()`, `assume()`, `static()`, `get_leaves()`, `make_swizzle()`, `repeat_as_tuple()`, `repeat()`, `repeat_like()` |
| Pointer/memory | `make_ptr()`, `recast_ptr()`, `size_in_bytes()` |
| Specialized layout | `max_common_layout()`, `max_common_vector()`, `tile_to_shape()`, `make_layout_image_mask()`, `leading_dim()`, `make_layout_tv()`, `get_nonswizzle_portion()`, `get_swizzle_portion()` |

## Notes

- This is the Python `cutlass.cute` module — the DSL counterpart to the C++ `cute::*` templates documented under this skill's `cpp` category; concepts (Layout, Tensor, Atom, TiledMMA/TiledCopy, layout algebra) are the same, but the implementations are separate and not interchangeable.

## Related

- [CuTe: Layout (C++)](../cpp/cute-layout.md)
- [CuTe: Layout Algebra (C++)](../cpp/cute-layout-algebra.md)
- [CuTe DSL API: cute_arch](./api-cute-arch.md)
