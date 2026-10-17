# Limitations

## Signature / Usage

```python
# only constexpr return values are supported today
@cute.jit
def f() -> "Constexpr":
    return 5          # OK

@cute.jit
def g():
    return dynamic_value  # not yet supported
```

## Options / Props

| Category | Constraint |
| --- | --- |
| Unsupported features | Convolutions, preferred clusters, Windows support |
| Layout algebra | Only 32-bit shapes/strides supported today; 64-bit / arbitrary width planned |
| Static vs. dynamic | Python native containers (lists, dicts) are static-only, not runtime-modifiable dynamic values |
| Function returns | Only `constexpr` values can be returned; dynamic-value returns are not yet supported |
| Type system | Static typing enforced, no dependent types; a variable's type must stay consistent across control flow; early return from a conditional is prohibited |
| OOP | Limited support when objects hold dynamic values — avoid passing dynamic values between member methods via class state |
| Scoping | Neither `global` nor `nonlocal` is supported inside JIT-compiled functions |
| Numeric type conversion | Implicit conversion (Python scalar mixed with a DSL value, or passed as a JIT argument) promotes to a type that holds the value, e.g. `(1 << 34) + cutlass.Int32(3)` becomes `Int64`. Explicit construction (`Int32(x)`, `Float32(x)`) narrows regardless of fit: out-of-range `int` wraps (`Int32(1 << 34)` is `0`, `Int32(2**31)` is `-2147483648`); `float` to integer truncates toward zero and an out-of-range value follows the host CPU's float-to-integer cast (`Int32(1e40)` is `-2147483648` on x86-64, `2147483647` on AArch64; unspecified, clamp first); `float` to `float` overflows to `±inf` or underflows to `0` (`Float32(1e40)` is `inf`, `Float32(1e-50)` is `0.0`) |
| Debugging | No single-step execution |
| Framework tensor conversion | ~2–3 microseconds overhead per tensor |

## Notes

- Numeric type conversion warnings (v4.8.0): the DSL emits compiler warnings for catastrophic explicit-construction cases, `TYPE_INT_LITERAL_OUT_OF_RANGE`, `TYPE_FLOAT_TO_INT_OUT_OF_RANGE`, `TYPE_FLOAT_LITERAL_OVERFLOW`, `TYPE_FLOAT_LITERAL_UNDERFLOW`, pointing at the source location and suggesting a wider type. Ordinary precision or rounding loss is not flagged (e.g. `Float32(0.1)` is silent), nor is precision loss in later arithmetic.

## Related

- [FAQs](./faqs.md)
- [DSL Control Flow](./dsl-control-flow.md)
- [DSL Dynamic Layout](./dsl-dynamic-layout.md)
