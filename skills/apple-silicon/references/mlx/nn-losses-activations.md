# Losses and Activations

`mlx.nn.losses` provides the standard loss functions used to train `nn.Module` models; functional activation forms (as opposed to the layer classes on the nn-layers page) live directly under `mlx.nn`.

## Signature / Usage

```python
import mlx.core as mx
import mlx.nn as nn

logits = model(x)
loss = nn.losses.cross_entropy(logits, targets, reduction="mean")

def loss_fn(model, x, y):
    return nn.losses.mse_loss(model(x), y)
```

## Options / Props

| Function | Description |
| --- | --- |
| `binary_cross_entropy` | Binary cross entropy loss |
| `cross_entropy` | Multi-class cross entropy loss |
| `nll_loss` | Negative log likelihood loss |
| `kl_div_loss` | Kullback-Leibler divergence loss |
| `gaussian_nll_loss` | Negative log likelihood for a Gaussian distribution |
| `mse_loss` | Mean squared error loss |
| `l1_loss` | L1 (mean absolute error) loss |
| `huber_loss` | Huber loss |
| `smooth_l1_loss` | Smooth L1 loss |
| `log_cosh_loss` | Log-cosh loss |
| `hinge_loss` | Hinge loss |
| `margin_ranking_loss` | Margin-based ranking loss |
| `cosine_similarity_loss` | Cosine similarity between two inputs |
| `triplet_loss` | Triplet loss over anchor/positive/negative samples |

## Notes

- Every loss function accepts a `reduction` argument (typically `"none"`, `"mean"`, or `"sum"`) to control batch aggregation.
- Functional activations (`nn.relu`, `nn.gelu`, `nn.silu`, etc.) mirror the activation layer classes on the nn-layers page — use the functional form inside a custom `__call__` and the layer class when composing with `nn.Sequential`.
- Loss functions are plain differentiable functions over MLX arrays, so they compose directly with `mx.grad` / `mlx.nn.value_and_grad` (see function-transforms.md) with no separate "loss module" abstraction required.

## Related

- [nn Layers](./nn-layers.md)
- [nn.Module](./nn-module.md)
- [Optimizers](./optimizers.md)
