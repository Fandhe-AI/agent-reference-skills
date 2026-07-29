# DSL Control Flow

## Signature / Usage

```python
for i in cutlass.range(n):          # always lowered to IR, even for Python-value inputs
    ...

for i in cutlass.range_constexpr(n): # fully unrolled in the Python interpreter; n must be Constexpr
    ...

# software pipelining (experimental, SM90+)
for i in cutlass.range(n, prefetch_stages=2):
    ...

if cutlass.const_expr(python_bool_predicate):   # evaluated at compile time
    ...
else:
    ...

if dynamic_predicate:    # unannotated predicate -> IR branch
    ...
```

## Options / Props

| Construct | Behavior |
| --- | --- |
| `range` / `cutlass.range` | Always emitted as an IR loop, even for compile-time-known bounds |
| `cutlass.range_constexpr` | Fully unrolled in the Python interpreter; loop indices must be `Constexpr` |
| `prefetch_stages=` | Experimental software-pipelining loop attribute generating prefetch loops coordinated with the main loop; requires SM90+ |
| `if`/`elif`/`else` (unannotated) | Produces IR branches |
| `if`/`elif`/`else` with `cutlass.const_expr` | Evaluated at compile time |
| `while` | Same two modes as `if` (IR branch, or compile-time with `cutlass.const_expr`) |

## Notes

- Dynamic control-flow limitations: early-exit constructs (`break`, `continue`, `pass`, `return`, exceptions) are unsupported; values defined inside a control-flow body are unavailable outside it; a variable's type cannot change within a control-flow body; operations trace only while tracing is active in that region.

## Related

- [DSL Introduction](./dsl-introduction.md)
- [DSL Code Generation](./dsl-code-generation.md)
