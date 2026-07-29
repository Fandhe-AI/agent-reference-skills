# MLX Array Creation and Lazy Evaluation

Create `mx.array` values and control when the compute graph they build actually runs, via `mx.eval` and the implicit-evaluation triggers (`print`, `.item()`, `numpy` conversion).

```python
import mlx.core as mx

a = mx.array([1, 2, 3, 4])
a.shape  # [4]
a.dtype  # int32

b = mx.array([1.0, 2.0, 3.0, 4.0])
b.dtype  # float32

# Operations are lazy: `c` is only a recorded compute graph node here,
# no addition has actually run on the GPU/CPU yet.
c = a + b
mx.eval(c)  # forces the graph to actually execute

# print, .item(), and conversion to numpy.ndarray all evaluate implicitly.
c = a + b
print(c)  # array([2, 4, 6, 8], dtype=float32)

import numpy as np
c = a + b
np.array(c)  # also evaluates c


def fun(x):
    a = fun1(x)
    b = expensive_fun(a)  # graph recorded, but never forced to run
    return a, b


y, _ = fun(x)  # only `a`'s graph is ever evaluated; expensive_fun's output is discarded unused

# A common place to call eval is once per outer-loop iteration, batching
# many small ops into one graph instead of evaluating after every op.
for batch in dataset:
    loss, grad = value_and_grad_fn(model, batch)   # nothing evaluated yet
    optimizer.update(model, grad)                   # still nothing evaluated
    mx.eval(loss, model.parameters())               # runs the whole graph once
```

## Notes

- MLX is Apple's open-source array framework (ml-explore), not Core ML; Core ML / Create ML / Vision are covered by the separate apple-ml skill.
- Evaluating too often (e.g. every element of a Python loop) adds fixed per-call overhead; evaluating too rarely lets the recorded graph grow very large. A per-iteration `mx.eval` at the outer training loop is the documented sweet spot.
- Using a scalar `mx.array` in an `if`/`while` condition forces an evaluation at that point, since Python control flow needs a concrete boolean.
- Derived from the official MLX documentation source `docs/src/usage/quick_start.rst` and `docs/src/usage/lazy_evaluation.rst` at tag v0.32.0 (MIT License).
