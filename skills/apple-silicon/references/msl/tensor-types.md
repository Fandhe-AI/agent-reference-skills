# Tensor Types

MSL tensor types (Metal 4+): `extents` / `dextents` index spaces, the `tensor<ElementType, Extents, DescriptorType, Tags...>` non-owning view, `tensor_blockwise` auxiliary planes (Metal 4.1), and `cooperative_tensor` whose storage is partitioned across threads.

## Signature / Usage

```metal
#include <metal_tensor>
using namespace metal;

// Host-bound tensor (DescriptorType defaults to tensor_handle).
[[kernel]]
void gemm(tensor<device half, dextents<int, 2>, tensor_handle> ta [[buffer(0)]],
          tensor<constant float, dextents<int, 2>> tb [[buffer(1)]])
{
   ta.set(half(tb.get(0, 0)), 0, 0);
}

// Shader-allocated (inline) tensor over a raw pointer.
[[kernel]] void func1(threadgroup half *buf) {
   tensor<threadgroup half, dextents<int, 3>, tensor_inline>
     t1(buf, dextents<int, 3>(16, 32, 64));
}
```

## Options / Props

`extents<IndexType, size_t... Extents>` (header `<metal_tensor>`):

| Name | Type | Description |
| --- | --- | --- |
| IndexType | signed or unsigned integer type | Type of each dimension size and index calculations. For `tensor`, one of `short`, `ushort`, `int`, `uint`, `long`, `ulong` |
| Extents... | `size_t` or `dynamic_extent` | Extent per dimension; `dynamic_extent` when decided at run time |
| `dextents<IndexType, Rank>` | alias template | `extents` whose every dimension is `dynamic_extent` |

`extents` member types: `index_type`, `size_type`, `rank_type`. Static members: `rank()`, `rank_dynamic()`, `static_extent(r)`; `extent(r)` returns a dynamic extent.

`tensor<ElementType, Extents, DescriptorType, Tags...>`:

| Template parameter | Description |
| --- | --- |
| ElementType | Fully qualified type: value type + address space (`constant` / `device` / `threadgroup` / `thread`) + optional `const` / `volatile` / `coherent(device)`. Value type: `half`, `bfloat`, `float`, `char`, `uchar`, `short`, `ushort`, `int`, `uint`; in Metal 4.1 also a format type. With a scale plane the value type is at most 8 bits |
| Extents | `extents<...>`. If a format type is used, extent 0 must be a multiple of `Fblock` |
| DescriptorType | `tensor_handle` (tensor holds a handle to the descriptor; default) or `tensor_inline` (tensor holds the descriptor) |
| Tags... | `tensor_offset` (only with `tensor_handle`; origin-shifted tensor) and, in Metal 4.1, `tensor_blockwise<...>` |

Format types supported by tensors (`Fb` = bits per element, `Fv` = minimum elements per `get`/`set`, `Fblock` = minimum block size):

| Format type | Fb | Fv | Fblock | Since |
| --- | --- | --- | --- | --- |
| `int4b_format`, `uint4b_format` | 4 bits | 2 | 32 | Metal 4.0 SDK 26.4 |
| `int2b_format`, `uint2b_format` | 2 bits | 4 | 32 | Metal 4.1 |
| `metal_fp4_e2m1_format` | 4 bits | 2 | 32 | Metal 4.1 |
| `metal_fp8_e4m3_format`, `metal_fp8_e5m2_format` | 8 bits | 1 | 32 | Metal 4.1 |

`tensor_blockwise<PlaneTag, ElementType, BlockSizes...>` (Metal 4.1):

| Parameter | Description |
| --- | --- |
| PlaneTag | `tensor_plane_data` (primary data plane) or `tensor_plane_scales` (scales plane). Only `tensor_plane_scales` is supported as a template argument |
| ElementType | Only `metal_fp8_ue8m0_format` is supported |
| BlockSizes... | Compile-time block size per dimension; first dimension must be 32, all others 1 |

```metal
template <class Extents, class Descriptor>
using mxfp4_tensor =
  tensor<metal_fp4_e2m1_format, Extents, Descriptor,
         tensor_blockwise<tensor_plane_scales,
                          device metal_fp8_ue8m0_format, 32, 1>>;
```

`tensor` member functions (primary data plane):

| Member | Description |
| --- | --- |
| `get_rank()` | Number of dimensions (static constexpr) |
| `get_static_extent(r)` / `get_extent(r)` | Static extent / run-time extent along dimension `r` |
| `get_stride(r)` | Stride in elements; `get_stride(0)` is always 1 |
| `get_stride_bytes(r)` | Stride in bytes (Metal 4.1+) |
| `operator[](index...)` | Element reference; out-of-bounds access is undefined behavior |
| `get(index...)` | Load one element. Broadcasts when `get_extent(i)` is 1; out-of-bounds returns the default value. Not available for format-type tensors |
| `get<ValueType>(index...)` | Load consecutive elements as a vector / packed vector / format type (Metal 4, OS 26.4+) |
| `set(v, index...)` | Store one element; out-of-bounds stores are dropped |
| `set<ValueType>(v, index...)` | Store consecutive elements (Metal 4, OS 26.4+) |
| `slice<SliceExtents...>(index...)` | View with origin shifted by `index` and extents `SliceExtents`; with `dynamic_extent` (or no template arguments) returns the remaining elements. Result is origin-shifted or shader-allocated; out-of-range slice is undefined behavior |

Multiplane (Metal 4.1) member templates take a `PlaneTag`: `get_static_extent<PlaneTag>(r)`, `get_block_size<PlaneTag>(r)`, `get_extent<PlaneTag>(r)`, `get_stride<PlaneTag>(r)`, `get_stride_bytes<PlaneTag>(r)`, `operator[]<PlaneTag>(...)`, `get<PlaneTag>(...)`, `get<PlaneTag, ValueType>(...)`, `set<PlaneTag, ValueType>(...)`. `get_block_size(r)` equals `get_block_size<tensor_plane_data>(r)`.

Kinds of tensor:

| Kind | Declaration | Notes |
| --- | --- | --- |
| Host-bound | `tensor_handle` (default) | Allocated and set up on the host. ElementType in `device` or `constant` |
| Origin-shifted | `tensor_handle` + `tensor_offset` | Aliases the base tensor's memory; `get_extent(i) = base.get_extent(i) - offset(i)`. Obtained by `slice` |
| Shader-allocated | `tensor_inline` | ElementType in `device`, `constant`, `threadgroup`, or `thread`. Cannot be a member of an aggregate type. Constructors: `(ptr, extents, strides)` and `(ptr, extents)` (packed strides); Metal 4.1 adds a `plane` argument for a blockwise plane. The pointer's address space must match ElementType's; `ptr` must be non-null and cover all elements, else undefined behavior. For format types in `device` / `constant` / `threadgroup`, `ptr` must be 128-byte aligned and the row stride in bytes a multiple of 128; in `thread` it must be a whole number of bytes |

`cooperative_tensor<ElementType, Extents, Layout>` (header `<metal_cooperative_tensor>`): elements partitioned across participating threads of one threadgroup (possibly across consecutive SIMD-groups); each thread accesses only its partition. ElementType address space is `thread`. Cannot be a member of an aggregate type. `Layout` is an opaque, device-specific object.

| Member | Description |
| --- | --- |
| `get_rank()` | Rank (static constexpr) |
| `load(tensor)` / `store(tensor)` | Cooperatively load / store all elements; broadcast supported when ranks match and the source dimension is 1 (a 64x1 tensor loads into a 64x2 cooperative tensor) |
| `get_capacity()` | Maximum number of elements private to this thread; uniform across participating threads |
| `operator[](idx)`, `get(it\|idx\|ptr)`, `set(it\|idx\|ptr, v)` | Per-thread element access; out-of-bounds is undefined behavior |
| `get_multidimensional_index(it\|idx\|ptr)` | Logical multidimensional index of an element |
| `is_valid_element(it\|idx\|ptr)` | If false, accessing the element is undefined behavior |
| `begin()` / `end()` / `get_iterator(idx\|ptr)` | Iterators |
| `map_iterator(it)` | Element corresponding to an iterator of another cooperative tensor; available only when layouts are compatible |

## Notes

- Tensor types require Metal 4 or later (All OS). `tensor_blockwise`, multiplane member functions, `get_stride_bytes`, and the `int2b` / `fp4` / `fp8` format types are Metal 4.1; `int4b_format` / `uint4b_format` and the vector-returning `get<ValueType>` / `set<ValueType>` are Metal 4 SDK / OS 26.4.
- All `tensor` specializations are non-owning views; the data must stay accessible for every valid index, otherwise the tensor is invalid and access is undefined behavior.
- Conversions from dynamic to static extents are supported (explicit `static_cast`, must match run-time values); static to dynamic is not. `tensor_handle` to `tensor_inline` converts implicitly but can be expensive (allocates and initializes a descriptor in the shader), and copies between `tensor_inline` instances are also expensive; pass tensors by reference.
- Slicing a format-type tensor requires indices and extents aligned to 32 along dimension 0; for a multiplane tensor they must align with the scale block sizes.
- `cooperative_tensor` is normally not constructed directly; obtain it from a tensor operation (for example `get_destination_cooperative_tensor()` in `tensor-operations.md`), which chooses an efficient `Layout` for the GPU.
- This is the MSL (`.metal`) device-side `tensor` type. It is distinct from the host-side `MTLTensor` / `MTLTensorDescriptor` objects (covered in this skill's `metal-compute/tensors.md`), the MPS `MPSNDArray` / MPSGraph tensors in the `mps` category here, and the Core ML `MLMultiArray` in the separate `apple-ml` skill.
- Source: https://developer.apple.com/metal/Metal-Shading-Language-Specification.pdf (Metal Shading Language Specification version 4.1, document dated 2026-06-04), section 2.22, pages 84-110. Retrieved 2026-10-17.

## Related

- [data-types.md](./data-types.md)
- [address-spaces.md](./address-spaces.md)
- [tensor-operations.md](./tensor-operations.md)
- [tensors.md](../metal-compute/tensors.md)
