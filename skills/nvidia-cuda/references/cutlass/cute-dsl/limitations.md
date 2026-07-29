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
| Debugging | No single-step execution |
| Framework tensor conversion | ~2–3 microseconds overhead per tensor |

## Related

- [FAQs](./faqs.md)
- [DSL Control Flow](./dsl-control-flow.md)
- [DSL Dynamic Layout](./dsl-dynamic-layout.md)
