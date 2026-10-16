# nn Layers

`mlx.nn` provides ready-made `Module` subclasses for the layer types that make up most model architectures — linear, convolutional, normalization, recurrent, attention, and container layers.

## Signature / Usage

```python
import mlx.nn as nn

model = nn.Sequential(
    nn.Linear(784, 256),
    nn.RMSNorm(256),
    nn.ReLU(),
    nn.Dropout(0.1),
    nn.Linear(256, 10),
)

attn = nn.MultiHeadAttention(dims=512, num_heads=8)
```

## Options / Props

| Category | Layers |
| --- | --- |
| Linear | `Linear`, `Bilinear` |
| Quantized | `QuantizedLinear`, `QuantizedEmbedding`, `QQLinear` |
| Distributed / sharded | `AllToShardedLinear`, `ShardedToAllLinear`, `QuantizedAllToShardedLinear`, `QuantizedShardedToAllLinear`, `FullyShardedModule` (wrapper; create with `nn.fully_shard`) |
| Convolution | `Conv1d`, `Conv2d`, `Conv3d`, `ConvTranspose1d/2d/3d` |
| Normalization | `BatchNorm`, `LayerNorm`, `GroupNorm`, `InstanceNorm`, `RMSNorm` |
| Activations | `ReLU`, `ReLU2`, `ReLU6`, `GELU`, `ELU`, `SELU`, `Sigmoid`, `LogSigmoid`, `Tanh`, `HardTanh`, `SiLU`, `LeakyReLU`, `PReLU`, `CELU`, `Mish`, `Hardswish`, `GLU`, `HardShrink`, `Softshrink`, `Softmax`, `LogSoftmax`, `Softmin`, `Softplus`, `Softsign`, `Step`, `Identity` |
| Recurrent | `RNN`, `GRU`, `LSTM` |
| Attention / Transformer | `MultiHeadAttention`, `Transformer`, `TransformerEncoder`, `TransformerEncoderLayer`, `TransformerDecoder`, `TransformerDecoderLayer` |
| Positional encoding | `RoPE`, `ALiBi`, `SinusoidalPositionalEncoding` |
| Embedding & regularization | `Embedding`, `Dropout`, `Dropout2d`, `Dropout3d` |
| Pooling | `MaxPool1d/2d/3d`, `AvgPool1d/2d/3d` |
| Containers | `Sequential` — calls its child modules in order; `Upsample` |

## Notes

- All of the above are `nn.Module` subclasses, so they participate in `parameters()`, `freeze()`, `train()`/`eval()`, and gradient computation exactly like a hand-written module (see nn-module.md).
- `RMSNorm` here is the trainable-module form used inside a model definition; `mlx.core.fast.rms_norm` (see fast-custom-kernels.md) is the underlying fused kernel it calls into.
- `MultiHeadAttention` implements scaled dot-product attention across multiple heads; for a lower-level fused kernel, see `mlx.core.fast.scaled_dot_product_attention` on the fast-custom-kernels page.
- MLX layers are ordinary Python classes composed and trained via gradient descent in-process — this is a different representation from Core ML's compiled layer/operator spec (`.mlmodel`/`.mlpackage`), which is covered by the apple-ml skill.
- `QuantizedLinear` / `QuantizedEmbedding` / `QQLinear` are quantized-weight drop-in replacements for `Linear` / `Embedding`, typically produced via `nn.quantize(model, ...)` rather than instantiated directly.
- `AllToShardedLinear` / `ShardedToAllLinear` (and their quantized variants) partition `Linear` weights across a `mlx.core.distributed` group for tensor-parallel inference/training.
- `nn.fully_shard(module, *, group=None, compute_dtype=None) -> Module` wraps `module` in a `FullyShardedModule(module, group=None, compute_dtype=None)` so each group member holds only a shard of its parameters: full parameters are gathered for the forward pass and gradients are reduce-scattered in the backward pass. Every parameter is sharded along axis 0, so its size along that axis must be divisible by the group size (otherwise `ValueError`). It returns `module` unchanged when the group size is 1, when `module` is already a `FullyShardedModule`, or when no parameters are sharded. New in the 0.32.x line (absent from the 0.32.0 sources, listed in `nn/distributed.rst` at 0.32.4).
- `nn.utils.fsdp_apply_gradients` (present in 0.32.0 `nn/utils.py` and `nn.rst`) is gone from both the code and `nn.rst` at 0.32.4 (removed). No replacement is named in the sources.

## Related

- [nn.Module](./nn-module.md)
- [Losses and Activations](./nn-losses-activations.md)
- [Fast and Custom Kernels](./fast-custom-kernels.md)
