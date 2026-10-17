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

- `prefetch_stages` split points (v4.8.0): the compiler recognizes two. (1) A TMA bulk copy: at least one `cute.copy(tma_atom, ..., tma_bar_ptr=...)` paired with an mbarrier wait on the same barrier. (2) A cp.async group: copies with a cp.async atom followed by `cute.arch.cp_async_commit_group()` and `cute.arch.cp_async_wait_group(0)`, in a canonical loop (start 0, step 1) whose circular-buffer slot is indexed as `i % stages`. Loops with neither split point, or outside these shapes, get a warning ("software pipelining ('prefetch_stages') skipped") and are compiled without pipelining. Experimental; sm90 and above.
- Dynamic control-flow limitations: early-exit constructs (`break`, `continue`, `pass`, `return`, exceptions) are unsupported; values defined inside a control-flow body are unavailable outside it; a variable's type cannot change within a control-flow body; operations trace only while tracing is active in that region.

## Related

- [DSL Introduction](./dsl-introduction.md)
- [DSL Code Generation](./dsl-code-generation.md)
