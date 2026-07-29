# DSL Types

## Signature / Usage

```python
# Ratio: rational-number representation
r = cutlass.Ratio(3, 4)
r.is_integral()   # numerator divides denominator evenly?
r.reduced()       # lowest-terms form
r.to(float)       # convert to Ratio / float / int

# struct/union decorators
@cute.struct
class MyStruct:
    a: cutlass.Int32
    arr: cute.MemRange[cutlass.Float32, 4]
```

## Options / Props

| Type | Description |
| --- | --- |
| `IntValue` | Internal representation for constrained integers with divisibility tracking; emits `cute.get_scalars` in the IR; supports standard arithmetic |
| `Ratio` | Rational number as an integer pair; `is_integral()`, `reduced()`, `to(dtype)` |
| `ScaledBasis` | Scaled basis element (scale value + mode identifier), used in layout strides / coordinate mapping |
| `Swizzle` | Permutes layout elements for better memory access patterns; defined by `MBase`, `BBits`, `SShift` |
| `Layout` | Maps a logical coordinate space to an index space; has `shape`, `stride`, `max_alignment` |
| `ComposedLayout` | Composition of an inner transformation, an offset, and an outer layout |
| `Pointer` | Memory address with `dtype`, memory space (`gmem`/`smem`/`rmem`), and alignment; supports arithmetic and composition with layouts |
| `@struct` / `@union` | Decorators for C-like structures: scalar elements, arrays (`MemRange`), nested structures, alignment control (`struct.Align`); `__sizeof__()` / `__alignof__()` static queries |

## Related

- [Struct-like JIT Arguments](./dsl-struct-types.md)
- [CuTe DSL API: cute](./api-cute.md)
