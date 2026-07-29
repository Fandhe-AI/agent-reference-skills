# Data Types

Scalar / vector / matrix / SIMD-group matrix / packed / atomic data types that MSL adds on top of C++17, plus their size, alignment, and conversion rules.

## Signature / Usage

```metal
kernel void add_vectors(const device float4 *inA [[buffer(0)]],
                         const device float4 *inB [[buffer(1)]],
                         device float4 *out [[buffer(2)]],
                         uint id [[thread_position_in_grid]])
{
    out[id] = inA[id] + inB[id];
}
```

## Options / Props

| Category | Types | Notes |
| --- | --- | --- |
| Scalar | `bool`, `char`/`int8_t`, `uchar`/`uint8_t`, `short`/`int16_t`, `ushort`/`uint16_t`, `int`/`int32_t`, `uint`/`uint32_t`, `long`/`int64_t`, `ulong`/`uint64_t`, `half`, `bfloat` (Metal 3.1+), `float`, `size_t`, `ptrdiff_t`, `void` | No `double` / `long long` / `unsigned long long` / `long double`. `f`/`h`/`bf`/`u`/`l` literal suffixes |
| Vector | `<scalar>n` for `n` = 2/3/4 (`floatn`, `intn`, `halfn`, `bfloatn`...), `vec<T,n>` | `.xyzw` / `.rgba` swizzle (no mixing the two, no duplicate lvalue components); 3-component vectors size/align as 4-component |
| Matrix | `<half\|float>NxM` (`N`,`M` = 2/3/4), `matrix<T,c,r>` | Column-major; `m[col][row]` indexing; constructed from scalars, vectors, or same-shape matrices |
| SIMD-group matrix | `simdgroup_half8x8`, `simdgroup_bfloat8x8` (3.1+), `simdgroup_float8x8` — `simdgroup_matrix<T,Cols,Rows>` (`<metal_simdgroup_matrix>`) | Cooperative 8x8 tile type; all ops must run under uniform control flow within the SIMD-group; functions in `simdgroup-functions.md` |
| Packed vector | `packed_<scalar>n` (`packed_floatn`, `packed_halfn`, `packed_longn` 2.3+...), `packed_vec<T,n>` | Tightly packed storage layout (alignment 1/2/4/8 instead of the vector's natural alignment); loads/stores convert to/from the aligned vector type |
| Atomic | `atomic<T>` for `T` in `int`/`uint`/`bool`/`ulong` (2.4+) or `float` (Metal 3+); aliases `atomic_int`, `atomic_uint`, `atomic_bool`, `atomic_ulong`, `atomic_float` | Data-race-free; only usable with the atomic functions in `atomic-functions.md` |
| Pixel | `r8unorm<T>`, `rg8unorm<T>`, `rgba8unorm<T>`, `rgb10a2<T>`, `rg11b10f<T>`, `rgb9e5<T>`, ... | Templated on the ALU type (`half`/`float`); only assignment and equality/inequality vs. the ALU type are allowed |
| Packed numeric (4.0 SDK26.4+/4.1) | `packed_numeric_type<Format,N>` over `int4b_format`/`uint4b_format`/`int2b_format`/`uint2b_format`/`metal_fp4_e2m1_format`/`metal_fp8_e4m3_format`/`metal_fp8_e5m2_format`/`metal_fp8_ue8m0_format` | Sub-byte / narrow float storage for ML; `pack<Format,Rm,Sm>()` / `unpack<T,Format,N>()` free functions convert to/from `float`/`half`/`bfloat` |
| Conversion | `static_cast<T>`, `as_type<T>(x)` | `static_cast` rounds (ties-to-even for float, toward-zero for int); `as_type` reinterprets same-size bit patterns only |

## Notes

- MSL is the device-side shader language compiled from `.metal` source (`metal::` namespace); it is not the host-side `MTL*` Objective-C/Swift API (`MTLDevice`, `MTLBuffer`, ...) covered by the separate `apple-graphics` skill.
- Vector/matrix data-type layout questions belong here; the CUDA/HIP analogues (`float4`, cooperative matrix fragments) are covered by the separate `nvidia-cuda` / `amd-rocm` skills, not here.
- Implicit conversions: scalar-to-vector broadcasts; vector-to-vector/scalar, scalar/vector-to-matrix, and matrix-to-anything conversions are all compile errors — use explicit constructors or `static_cast`.
- Argument Buffers (spec 2.13) and Indirect Command Buffer commands (spec 6.17) are out of scope here; they are host-API-facing and covered by the `metal-compute` category in this skill.

## Related

- [address-spaces.md](./address-spaces.md)
- [simdgroup-functions.md](./simdgroup-functions.md)
- [atomic-functions.md](./atomic-functions.md)
- [numerical-compliance.md](./numerical-compliance.md)
