# mlx

| Name | Description | Path |
| --- | --- | --- |
| array | `mlx.core.array` N-dimensional array type, dtypes, shape/reshape/astype, NumPy interop | [array.md](./array.md) |
| Lazy Evaluation | Compute graph, `mx.eval` / `mx.async_eval`, implicit evaluation triggers | [lazy-evaluation.md](./lazy-evaluation.md) |
| Unified Memory Model | Device-free array creation, per-op `stream=` selection, automatic cross-device dependencies | [unified-memory-model.md](./unified-memory-model.md) |
| Function Transforms | `grad`, `value_and_grad`, `vmap`, `vjp`/`jvp`, `stop_gradient`, `custom_function`, `checkpoint` | [function-transforms.md](./function-transforms.md) |
| Compilation | `mx.compile`, `shapeless`, `enable_compile`/`disable_compile`, purity constraints | [compilation.md](./compilation.md) |
| nn.Module | `mlx.nn.Module`, parameters/trainable_parameters, freeze/unfreeze, train/eval, save/load weights | [nn-module.md](./nn-module.md) |
| Optimizers | `mlx.optimizers` (SGD/Adam/AdamW/Lion/...), schedulers, `clip_grad_norm`, `optimizer.state` | [optimizers.md](./optimizers.md) |
| nn Layers | `Linear`, `Conv*d`, norm layers, `MultiHeadAttention`, `LSTM`/`GRU`/`RNN`, `Sequential` | [nn-layers.md](./nn-layers.md) |
| Losses and Activations | `mlx.nn.losses` (cross_entropy, mse_loss, ...), functional activations | [nn-losses-activations.md](./nn-losses-activations.md) |
| Indexing | Basic/fancy indexing, `take`/`take_along_axis`, boolean-mask assignment, no bounds checking | [indexing.md](./indexing.md) |
| Saving and Loading | `mx.save`/`savez`/`save_safetensors`/`save_gguf`/`load`, format table | [saving-loading.md](./saving-loading.md) |
| random | `mlx.core.random`, explicit PRNG keys, `split`, distributions | [random.md](./random.md) |
| linalg | `mlx.core.linalg` — `inv`, `norm`, `qr`, `svd`, `cholesky`, `solve`, `eigh` | [linalg.md](./linalg.md) |
| Devices and Streams | `mx.default_device`, `Stream`, `stream=` argument, `mx.synchronize` | [devices-streams.md](./devices-streams.md) |
| Memory Management | `get_active_memory`/`get_peak_memory`, `set_memory_limit`/`set_cache_limit`, `clear_cache` | [memory-management.md](./memory-management.md) |
| Fast and Custom Kernels | `mlx.core.fast` (`rms_norm`/`layer_norm`/`rope`/`scaled_dot_product_attention`), `metal_kernel`/`cuda_kernel` | [fast-custom-kernels.md](./fast-custom-kernels.md) |
| Distributed | `mlx.core.distributed` — `Group`, `init`, `all_sum`/`all_gather`, `send`/`recv` | [distributed.md](./distributed.md) |
| Tree Utils | `mlx.utils` — `tree_flatten`/`tree_unflatten`/`tree_map`/`tree_reduce`/`tree_merge` | [tree-utils.md](./tree-utils.md) |
