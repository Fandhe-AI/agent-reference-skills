# Fundamental Types

## Signature / Usage

```cpp
cutlass::half_t x = 1.0_hf;      // IEEE half precision (5b exp / 10b mantissa)
cutlass::bfloat16_t y = 1.0_bf16; // BFloat16 (8b exp / 7b mantissa)
cutlass::tfloat32_t z = 1.0_tf32; // Tensor Float32 (8b exp / 10b mantissa)

cutlass::multiply_add<T> mad;     // d = a * b + c, specialized for complex<T> and Array<T, N>
```

## Options / Props

| Type | Description |
| --- | --- |
| `half_t` | IEEE half-precision float (exponent 5b, mantissa 10b; literal suffix `_hf`) |
| `bfloat16_t` | BFloat16 (exponent 8b, mantissa 7b; literal suffix `_bf16`) |
| `tfloat32_t` | Tensor Float 32 (exponent 8b, mantissa 10b; literal suffix `_tf32`) |
| `int4_t` / `uint4_t` | 4-bit signed/unsigned integer (literal suffix `_s4` / `_u4`) |
| `bin1_t` | 1-bit binary numeric type (literal suffix `_b1`) |
| `float_e5m2_t` / `float_e4m3_t` | 8-bit signed float, 5m2 / 4m3 exponent-mantissa split |
| `float_ue4m3_t` / `float_ue8m0_t` | 8-bit unsigned float variants |
| `float_e3m2_t` / `float_e2m3_t` / `float_e2m1_t` | 6-bit and 4-bit signed float variants |
| `mx_float8_t` / `mx_float6_t` / `mx_float4_t` / `nv_float4_t` | Block-scaled data types |
| `complex<T>` | Complex-valued type based on a real numeric type `T` |
| `Array<T, N>` | Statically sized array of `N` elements of type `T`, densely packed for sub-byte types |
| `AlignedArray` | `Array` variant with an optional alignment field for vectorized memory access |
| `AlignedBuffer` | Uniform aligned memory allocation across data types |
| `Coord` | Logical coordinate in a tensor of known rank, with vector operations |
| `PredicateVector` | Statically sized array of hardware predicates packed into registers |

## Notes

- `multiply_add<T>` computes `d = a * b + c` with specializations for `complex<T>` and `Array<T, N>`.

## Related

- [Terminology](./terminology.md)
- [Functionality](./functionality.md)
