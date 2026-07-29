# Static vs. Dynamic Layouts

## Signature / Usage

```python
# static layout: shape known at compile time; each distinct shape triggers separate compilation
t3 = torch.zeros(3)
t5 = torch.zeros(5)
# converting to cute.Tensor gives layout (3):(1) vs (5):(1) respectively — not interchangeable

# dynamic layout: pass a torch.Tensor directly to a @cute.jit function
@cute.jit
def f(x: cute.Tensor):
    print(x.layout)   # (?,?):(?,1) — cute.mark_layout_dynamic applied automatically
```

## Options / Props

| Layout kind | Trait |
| --- | --- |
| Static | Shape known at compile time; enables compiler optimizations not possible with dynamic layouts; requires a separate compilation per distinct input shape; reusing compiled code with a mismatched shape causes type errors / incorrect results |
| Dynamic | `cute.mark_layout_dynamic` applied automatically when a `torch.Tensor` is passed directly to a JIT function; single compilation handles varying shapes (e.g. `(?,?):(?,1)`); more scalable across varying input shapes |

## Notes

- With static layouts, loops fully unroll at compile time; with dynamic layouts, loops execute at runtime based on actual dimensions — CuTe DSL generates efficient code for either case from the same function body.

## Related

- [DSL Introduction](./dsl-introduction.md)
- [JIT Argument Generation](./dsl-jit-arg-generation.md)
- [CuTe DSL API: cute](./api-cute.md)
