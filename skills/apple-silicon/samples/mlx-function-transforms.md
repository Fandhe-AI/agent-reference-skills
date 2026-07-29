# MLX Composable Function Transforms

Compose `mx.grad`, `mx.value_and_grad`, and `mx.vmap` — each transform takes a function and returns another function, so transforms can be nested and reused arbitrarily.

```python
import mlx.core as mx

# grad(sin) returns a new function, the derivative of sin — which is
# cos. Calling grad again on that result gives the second derivative.
dfdx = mx.grad(mx.sin)
dfdx(mx.array(mx.pi))          # array(-1, dtype=float32)
mx.cos(mx.array(mx.pi))        # array(-1, dtype=float32) — matches dfdx

d2fdx2 = mx.grad(mx.grad(mx.sin))
d2fdx2(mx.array(mx.pi / 2))    # array(-1, dtype=float32)


def loss_fn(w, x, y):
    return mx.mean(mx.square(w * x - y))


w = mx.array(1.0)
x = mx.array([0.5, -0.5])
y = mx.array([1.5, -1.5])

# By default grad differentiates with respect to the first argument (w).
grad_fn = mx.grad(loss_fn)
dloss_dw = grad_fn(w, x, y)

# argnums selects a different argument to differentiate with respect to.
grad_fn_x = mx.grad(loss_fn, argnums=1)
dloss_dx = grad_fn_x(w, x, y)

# grad also differentiates with respect to nested dicts/lists/tuples of
# arrays, preserving the input's tree structure in the output gradients.
def loss_fn_dict(params, x, y):
    w, b = params["weight"], params["bias"]
    h = w * x + b
    return mx.mean(mx.square(h - y))


params = {"weight": mx.array(1.0), "bias": mx.array(0.0)}
grads = mx.grad(loss_fn_dict)(params, x, y)
# {'weight': array(-1, dtype=float32), 'bias': array(0, dtype=float32)}

# value_and_grad avoids calling the function twice (once for the value,
# once for the gradient) when both are needed, which grad-then-call would do.
loss_and_grad_fn = mx.value_and_grad(loss_fn)
loss, dloss_dw = loss_and_grad_fn(w, x, y)

# vmap automatically vectorizes a function written for single elements
# over a batch dimension, instead of a Python loop over the batch.
xs = mx.random.uniform(shape=(4096, 100))
ys = mx.random.uniform(shape=(100, 4096))

vmap_add = mx.vmap(lambda a, b: a + b, in_axes=(0, 1))
result = vmap_add(xs, ys)
```

## Notes

- MLX is Apple's open-source array framework (ml-explore), not Core ML; Core ML / Create ML / Vision are covered by the separate apple-ml skill.
- Coming from PyTorch: MLX differentiates functions rather than tracing an implicit autograd graph, so there is no `backward()`, `zero_grad()`, `detach()`, or `requires_grad` — `mx.grad` returns a plain function instead.
- On an M1 Max, the `vmap` version of the naive per-row loop measured about 200x faster (0.024 s vs 5.639 s for 100 iterations), per the source doc.
- Derived from the official MLX documentation source `docs/src/usage/function_transforms.rst` at tag v0.32.0 (MIT License).
