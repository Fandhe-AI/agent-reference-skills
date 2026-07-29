# Optimizers

`mlx.optimizers` provides gradient-descent-family optimizers plus learning-rate schedulers, for use with `mlx.nn.Module` parameter trees.

## Signature / Usage

```python
import mlx.nn as nn
import mlx.optimizers as optim

model = MyModel()
optimizer = optim.AdamW(learning_rate=1e-3)

loss_and_grad_fn = nn.value_and_grad(model, loss_fn)

for batch in dataset:
    loss, grads = loss_and_grad_fn(model, batch)
    grads, _ = optim.clip_grad_norm(grads, max_norm=1.0)
    optimizer.update(model, grads)
    mx.eval(model.parameters(), optimizer.state)   # one eval per step
```

## Options / Props

| Optimizer / function | Description |
| --- | --- |
| `SGD`, `RMSprop`, `Adagrad`, `Adafactor`, `AdaDelta`, `Adam`, `AdamW`, `Adamax`, `Lion`, `Muon` | Available gradient-descent optimizers |
| `MultiOptimizer` | Applies different optimizers to different parameter groups |
| `cosine_decay`, `exponential_decay`, `linear_schedule`, `step_decay`, `join_schedules` | Learning-rate scheduler builders |
| `optimizer.update(model, grads)` | Applies one optimization step, in-place on the model's parameters |
| `optimizer.state` | Nested dict of scheduled/mutable optimizer state (e.g. momentum, current learning rate) — excludes fixed hyperparameters like `betas`/`eps` |
| `clip_grad_norm(grads, max_norm)` | Rescales a gradient tree to a maximum global norm |

## Notes

- `optimizer.state` only holds values that change during training; static hyperparameters passed at construction (e.g. `betas`, `eps`) are not part of it and are not serialized by saving state.
- To checkpoint an optimizer, flatten `optimizer.state` with `tree_flatten` and save it (e.g. as safetensors); to resume, reconstruct the same optimizer class and reload the flattened state.
- Call `mx.eval(model.parameters(), optimizer.state)` once per training step (not per layer) — this is the natural evaluation point described in the lazy-evaluation model.
- MLX optimizers train a model in-process by mutating its parameters every step from gradients you compute yourself — a different layer from Create ML's `MLTrainingSession`, which drives a bundled training job from `.mlmodel` templates outside your process; `MLTrainingSession` is covered by the apple-ml skill.

## Related

- [nn.Module](./nn-module.md)
- [Function Transforms](./function-transforms.md)
