# Compilation

`mx.compile` optimizes and specializes a function's compute graph ahead of repeated calls, trading a one-time (or per-shape) compile cost for faster subsequent execution.

## Signature / Usage

```python
import mlx.core as mx

@mx.compile
def fn(x, y):
    return mx.exp(x) + y

# shapeless=True avoids recompiling when only input shapes change.
# mx.compile is not decorator-friendly with kwargs; wrap the plain function instead:
def fn_shapeless(x, y):
    return mx.abs(x + y)

compiled_fn = mx.compile(fn_shapeless, shapeless=True)
compiled_fn(mx.array(1.0), mx.array(-2.0))
compiled_fn(mx.array([1.0, -6.0]), mx.array([-2.0, 3.0]))  # no recompile, same graph shape-agnostic

mx.disable_compile()   # temporarily disable all compilation globally, e.g. to debug/print
mx.enable_compile()    # re-enable
```

## Options / Props

| Option / function | Description |
| --- | --- |
| `shapeless=True` | Skips recompilation when only input shapes change; unsafe if the function's logic itself branches on shape (e.g. a hardcoded `reshape`) |
| `mx.disable_compile()` | Globally disables compilation — useful to inspect/print array contents inside a normally-compiled function |
| `mx.enable_compile()` | Re-enables compilation after `disable_compile()` |
| `inputs=` / `outputs=` params | Explicitly declare external state a compiled function reads/writes, since compiled functions must otherwise be pure |

## Notes

- Compiled functions must be pure: any input not in the traced parameter list is treated as a constant baked into the graph, so mutating external/global state inside a compiled function will not be reflected on later calls unless it is threaded through `inputs`/`outputs`.
- You cannot evaluate (e.g. print) arrays inside a compiled function during normal operation — use `mx.disable_compile()` while debugging.
- `shapeless=True` is a correctness trade-off, not just a performance flag — any shape-conditional logic embedded in the function body silently produces wrong results for shapes other than the one it first traced against.
- Because MLX's evaluation is already lazy (see lazy-evaluation.md), `compile` builds on the same graph representation to fuse and specialize it, rather than requiring a separate tracing step like eager frameworks need.

## Related

- [Lazy Evaluation](./lazy-evaluation.md)
- [Function Transforms](./function-transforms.md)
