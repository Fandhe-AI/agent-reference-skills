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
| Distributed / sharded | `AllToShardedLinear`, `ShardedToAllLinear`, `QuantizedAllToShardedLinear`, `QuantizedShardedToAllLinear` |
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

## Related

- [nn.Module](./nn-module.md)
- [Losses and Activations](./nn-losses-activations.md)
- [Fast and Custom Kernels](./fast-custom-kernels.md)
