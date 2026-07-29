# nn.Module

`mlx.nn.Module` is the base class for defining and training neural networks in MLX — a container for parameters and submodules with training-mode state and freezing support.

## Signature / Usage

```python
import mlx.core as mx
import mlx.nn as nn

class MyMLP(nn.Module):
    def __init__(self, in_dims: int, out_dims: int, hidden_dims: int = 16):
        super().__init__()
        self.in_proj = nn.Linear(in_dims, hidden_dims)
        self.out_proj = nn.Linear(hidden_dims, out_dims)

    def __call__(self, x):
        x = self.in_proj(x)
        x = mx.maximum(x, 0)
        return self.out_proj(x)

model = MyMLP(2, 1)
mx.eval(model.parameters())        # allocate + initialize (lazy until evaluated)

model.in_proj.freeze()             # exclude from trainable_parameters()
model.save_weights("model.safetensors")
model.load_weights("model.safetensors")
```

## Options / Props

| Member | Description |
| --- | --- |
| `parameters()` | All arrays in the module tree as nested dicts/lists |
| `trainable_parameters()` | Same, excluding frozen parameters |
| `update(parameters)` | Replace parameters with new values (e.g. after an optimizer step) |
| `train(mode=True)` / `eval()` | Toggle training mode (affects `Dropout`, `BatchNorm`, etc.) |
| `training` | Boolean attribute reflecting current mode |
| `freeze()` / `unfreeze()` | Exclude/include parameters from gradient computation |
| `save_weights(file)` | Export parameters to `.npz` or `.safetensors` |
| `load_weights(file_or_weights)` | Import parameters from a file path or a dict |

## Notes

- Modules support arbitrary nesting of Python `list`/`dict` as well as submodules, so parameter trees mirror whatever container structure the model uses.
- `mlx.nn.value_and_grad(model, loss_fn)` only differentiates `trainable_parameters()` — frozen submodules (e.g. a pretrained embedding) never receive a gradient.
- Parameters are ordinary MLX arrays and remain lazy until `mx.eval(model.parameters())` (or a training step's `mx.eval(...)`) is called — constructing a model does not allocate memory by itself.
- `mlx.nn.Module` defines and trains a model in-process from Python source, updating parameters via gradient steps — this is a different layer from Core ML's `MLModel`, which loads a precompiled `.mlpackage`/`.mlmodelc` for on-device inference only; `MLModel` is covered by the apple-ml skill.

## Related

- [Optimizers](./optimizers.md)
- [nn Layers](./nn-layers.md)
- [Function Transforms](./function-transforms.md)
