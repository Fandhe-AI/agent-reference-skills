# Lazy Evaluation

MLX operations do not run immediately — each call records a node in a compute graph, and the graph only executes once `mx.eval()` (or an implicit trigger) forces it.

## Signature / Usage

```python
import mlx.core as mx

model = Model()                       # no computation, no memory used yet
model.load_weights("weights.safetensors")

y, _ = fun(x)                         # the unused second output's subgraph never runs

for batch in dataset:
    loss, grads = loss_and_grad_fn(model, batch)
    optimizer.update(model, grads)
    mx.eval(loss, model.parameters()) # one explicit evaluation per training step
```

## Options / Props

| Function / trigger | Description |
| --- | --- |
| `mx.eval(*args)` | Forces evaluation of the compute graph needed to produce the given arrays (or nested containers of arrays) |
| `mx.async_eval(*args)` | Schedules evaluation without blocking the calling Python thread |
| Printing an array | Implicitly evaluates it |
| Converting to NumPy | Implicitly evaluates it |
| `array.item()` | Implicitly evaluates the scalar array |
| `mx.save(...)` and friends | Implicitly evaluate their input arrays |
| Using a scalar array in Python control flow (e.g. `if y > 0:`) | Implicitly evaluates `y` at that point |

## Notes

- Because unused outputs never run, discarding part of a function's return value is free — `expensive_fun` in `y, _ = fun(x)` is skipped entirely if `_` is never evaluated.
- The natural evaluation point in a training loop is once per iteration, after `optimizer.update()` — evaluating too often (e.g. inside a per-layer loop) throws away graph-level optimization opportunities.
- Graphs of tens to a few thousand operations per `eval()` call are the sweet spot; evaluating a single op at a time defeats the purpose of lazy evaluation.
- Using a scalar array directly in an `if`/`while` condition forces an eager evaluation at that point in the graph — this is sometimes necessary but should be minimized in hot loops.
- `mx.eval` evaluates MLX's own lazy array graph — it is unrelated to Python's built-in `eval()`/`exec()`, which execute arbitrary source strings. Never pass untrusted external input to Python's `eval`/`exec` when writing MLX training code; `mx.eval` never interprets code, only array graphs.

## Related

- [Function Transforms](./function-transforms.md)
- [Compilation](./compilation.md)
