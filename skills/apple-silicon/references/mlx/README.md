# mlx

| Name | Description | Path |
| --- | --- | --- |
| array | `mlx.core.array` N-dimensional array type; `shape`, `dtype`, `size`, `ndim`, `itemsize`, `nbytes` | [array.md](./array.md) |
| Compilation | `mx.compile` graph specialization, `shapeless`, `enable_compile` / `disable_compile`, purity constraints | [compilation.md](./compilation.md) |
| Data Types | `Dtype` values, `DtypeCategory` hierarchy, `issubdtype`, `finfo`, `iinfo` | [data-types.md](./data-types.md) |
| Devices and Streams | `stream=` argument selecting the device and stream for each operation | [devices-streams.md](./devices-streams.md) |
| Distributed | `mlx.core.distributed` multi-process execution with `Group` over `mpi`, `ring`, `jaccl`, `nccl` | [distributed.md](./distributed.md) |
| Environment Variables | `MLX_ENABLE_TF32`, `MLX_CONV_WINOGRAD`, `MLX_DISABLE_COMPILE` and other compile, precision, backend, distributed settings | [environment-variables.md](./environment-variables.md) |
| Exporting Functions | `mx.export_function`, `mx.import_function`, `mx.exporter`, `mx.export_to_dot` for `.mlxfn` files | [export.md](./export.md) |
| Fast and Custom Kernels | `mlx.core.fast` fused ops (`scaled_dot_product_attention`, `rope`), `metal_kernel`, `cuda_kernel` | [fast-custom-kernels.md](./fast-custom-kernels.md) |
| FFT | `mlx.core.fft` 1-D, 2-D, N-D transforms, frequency helpers, shifts, `stft` / `istft` | [fft.md](./fft.md) |
| Function Transforms | `grad`, `value_and_grad`, `vmap`, `vjp` / `jvp`, `stop_gradient`, `custom_function`, `checkpoint` | [function-transforms.md](./function-transforms.md) |
| Indexing | NumPy-style basic and fancy indexing; no bounds checking, limited boolean-mask reads | [indexing.md](./indexing.md) |
| KV Cache | Preallocated fixed-size chunks updated in place instead of `concatenate`, with `mx.eval` | [kv-cache.md](./kv-cache.md) |
| Lazy Evaluation | Compute graph recording; execution via `mx.eval()` or implicit triggers | [lazy-evaluation.md](./lazy-evaluation.md) |
| linalg | `mlx.core.linalg` matrix decompositions, solvers, and norms | [linalg.md](./linalg.md) |
| Memory Management | `get_active_memory` / `get_peak_memory` / `get_cache_memory`, `set_memory_limit` / `set_cache_limit`, `clear_cache` | [memory-management.md](./memory-management.md) |
| Metal Backend Utilities | `mlx.core.metal` availability, device info, `start_capture` / `stop_capture` | [metal-backend.md](./metal-backend.md) |
| nn Layers | `mlx.nn` Module subclasses: linear, convolution, normalization, recurrent, attention, containers | [nn-layers.md](./nn-layers.md) |
| Losses and Activations | `mlx.nn.losses` (e.g. `cross_entropy`) and functional activations under `mlx.nn` | [nn-losses-activations.md](./nn-losses-activations.md) |
| nn.Module | `mlx.nn.Module` base class: parameters, submodules, training mode, freezing | [nn-module.md](./nn-module.md) |
| Operations | `mlx.core` operations index: `minmax`, `searchsorted`, `unique`, and other array ops | [operations.md](./operations.md) |
| Optimizers | `mlx.optimizers` gradient-descent optimizers and learning-rate schedulers for `nn.Module` parameters | [optimizers.md](./optimizers.md) |
| Numerical Precision | Reduced-precision `float32` matmul; `MLX_ENABLE_TF32=0`, `MLX_CONV_WINOGRAD=0` | [precision.md](./precision.md) |
| random | `mlx.core.random` sampling with a splittable Threefry PRNG and explicit keys | [random.md](./random.md) |
| Saving and Loading | NumPy, safetensors, GGUF serialization; `mx.load` detects format from extension | [saving-loading.md](./saving-loading.md) |
| Tree Utils | `mlx.utils` `tree_flatten`, `tree_unflatten`, `tree_map`, `tree_reduce` | [tree-utils.md](./tree-utils.md) |
| Unified Memory Model | CPU and GPU share one memory pool; `stream=` picks the device per operation | [unified-memory-model.md](./unified-memory-model.md) |
