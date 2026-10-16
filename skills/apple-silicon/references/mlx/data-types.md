# Data Types

`mlx.core` exposes a fixed set of `Dtype` values, a `DtypeCategory` hierarchy, and helpers (`issubdtype`, `finfo`, `iinfo`) to query them. The default floating point type is `float32` and the default integer type is `int32`.

## Signature / Usage

```python
import mlx.core as mx

x = mx.array([1, 2, 3], dtype=mx.float16)
x.dtype.size                                   # 2 (bytes)
mx.issubdtype(mx.float16, mx.floating)         # True
mx.finfo(mx.float16).eps
mx.iinfo(mx.int8).max
```

Signatures (from `python/src/array.cpp` and `python/src/ops.cpp`):

```python
def issubdtype(arg1: Dtype | DtypeCategory, arg2: Dtype | DtypeCategory) -> bool
mx.finfo(dtype: Dtype)    # attrs: bits, min, max, eps, smallest_normal, dtype
mx.iinfo(dtype: Dtype)    # attrs: min, max, dtype
```

## Options / Props

Supported data types:

| Type | Bytes | Description |
| --- | --- | --- |
| `bool_` | 1 | Boolean (`True`, `False`) data type |
| `uint8` | 1 | 8-bit unsigned integer |
| `uint16` | 2 | 16-bit unsigned integer |
| `uint32` | 4 | 32-bit unsigned integer |
| `uint64` | 8 | 64-bit unsigned integer |
| `int8` | 1 | 8-bit signed integer |
| `int16` | 2 | 16-bit signed integer |
| `int32` | 4 | 32-bit signed integer |
| `int64` | 8 | 64-bit signed integer |
| `bfloat16` | 2 | 16-bit brain float (e8, m7) |
| `float16` | 2 | 16-bit IEEE float (e5, m10) |
| `float32` | 4 | 32-bit float |
| `float64` | 8 | 64-bit double |
| `complex64` | 8 | 64-bit complex float |

Objects documented on this page:

| Name | Description |
| --- | --- |
| `Dtype` | Holds the type of an `array`; read-only property `size` is the size in bytes |
| `DtypeCategory` | Enum of categories: `generic`, `number`, `integer`, `unsignedinteger`, `signedinteger`, `inexact`, `floating`, `complexfloating` |
| `issubdtype` | Checks whether a `Dtype` or `DtypeCategory` is a subtype of another |
| `finfo` | Information on floating-point types: `bits`, `min`, `max`, `eps` (difference between 1.0 and the next larger representable number), `smallest_normal`, `dtype` |
| `iinfo` | Information on integer types: `min`, `max`, `dtype` |

## Notes

- Arrays with type `float64` only work with CPU operations. Using `float64` arrays on the GPU results in an exception.
- Data types are arranged in a hierarchy; see `DtypeCategory`. Use `issubdtype` to test whether one dtype (or category) is a subtype of another category.
- `iinfo` is listed in the data types page of MLX 0.32.4 (source pinned at tag `v0.32.4`).
- Source: https://ml-explore.github.io/mlx/build/html/python/data_types.html (pinned source: https://github.com/ml-explore/mlx/blob/v0.32.4/docs/src/python/data_types.rst)

## Related

- [Array](./array.md)
- [Numerical Precision](./precision.md)
