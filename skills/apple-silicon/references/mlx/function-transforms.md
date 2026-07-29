# Function Transforms

MLX composes automatic differentiation and vectorization as function transforms: `grad`, `vmap`, `vjp`, `jvp` and friends take a function and return a new function, and transforms nest to arbitrary depth.

## Signature / Usage

```python
import mlx.core as mx

dfdx = mx.grad(mx.sin)
dfdx(mx.array(mx.pi))            # -1, i.e. cos(pi)

d2fdx2 = mx.grad(mx.grad(mx.sin))
d2fdx2(mx.array(mx.pi / 2))      # second derivative, composed by nesting grad

def loss_fn(w, x, y):
    return mx.mean(mx.square(w * x - y))

grad_fn = mx.grad(loss_fn, argnums=1)          # gradient w.r.t. x instead of w
loss_and_grad_fn = mx.value_and_grad(loss_fn)  # both output and gradient, one pass

xs = mx.random.uniform(shape=(4096, 100))
ys = mx.random.uniform(shape=(100, 4096))
vmap_add = mx.vmap(lambda x, y: x + y, in_axes=(0, 1))
result = vmap_add(xs, ys)
```

## Options / Props

| Transform | Description |
| --- | --- |
| `mx.grad(fn, argnums=0)` | Gradient of a scalar-valued function w.r.t. positional argument(s); composes with itself for higher-order derivatives |
| `mx.value_and_grad(fn, argnums=0)` | Returns `(value, grad)` in one pass, avoiding a redundant forward pass |
| `mx.vmap(fn, in_axes=0, out_axes=0)` | Automatic vectorization over a batch axis, without a manual loop |
| `mx.vjp(fn, primals, cotangents)` | Vector-Jacobian product (reverse-mode primitive) |
| `mx.jvp(fn, primals, tangents)` | Jacobian-vector product (forward-mode primitive) |
| `mx.stop_gradient(x)` | Blocks gradient flow through `x` in a larger graph |
| `mx.custom_function` | Define custom forward/backward behavior for a function |
| `mx.checkpoint(fn)` | Recompute-instead-of-store gradient checkpointing for memory-efficient backprop |

## Notes

- Gradients preserve nested Python container structure — `mx.grad` on a function taking a `dict` of parameters returns a `dict` of gradients with the same keys/shape.
- `argnums` selects which positional argument(s) to differentiate with respect to; the default is the first argument.
- `vmap` reports a `ValueError` for primitives that don't support vectorized execution — not every op has a vmap rule.
- Transforms compose freely (`mx.grad(mx.vmap(fn))`, etc.), which is how `mlx.nn.value_and_grad` builds per-parameter gradients for a whole `Module` without a manual computational-graph API.
- `compile()` is a related transform for graph optimization/specialization — see compilation.md.

## Related

- [Compilation](./compilation.md)
- [nn.Module](./nn-module.md)
