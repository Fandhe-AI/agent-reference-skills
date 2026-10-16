# samples

| Name | Description | Path |
| --- | --- | --- |
| Combining Blit and Compute Operations in a Single Pass | Metal 4 compute encoder issuing texture-copy (blit) and compute dispatch in one pass | [blit-and-compute-single-pass.md](./blit-and-compute-single-pass.md) |
| Metal Compute Kernel Dispatch | Compute-only round trip: device, library, function, pipeline state, command buffer, encoder, dispatch, readback | [compute-kernel-dispatch.md](./compute-kernel-dispatch.md) |
| CPU-Encoded Indirect Command Buffer (Compute) | Encode a compute ICB once on the CPU and re-execute it across frames | [cpu-encoded-indirect-compute.md](./cpu-encoded-indirect-compute.md) |
| MLX Array Creation and Lazy Evaluation | `mx.array` creation and `mx.eval`, with implicit triggers (`print`, `.item()`, numpy conversion) | [mlx-array-lazy-evaluation.md](./mlx-array-lazy-evaluation.md) |
| MLX Composable Function Transforms | Nesting `mx.grad`, `mx.value_and_grad`, `mx.vmap`; `argnums` selection | [mlx-function-transforms.md](./mlx-function-transforms.md) |
| MLX MLP Training Loop | `nn.Module` MLP, `nn.value_and_grad`, `optim.SGD.update` training loop | [mlx-mlp-training-loop.md](./mlx-mlp-training-loop.md) |
| MLX Unified Memory Across CPU and GPU Streams | Same array across CPU and GPU streams with automatic cross-stream dependencies | [mlx-unified-memory.md](./mlx-unified-memory.md) |
| MPS Image Filter with In-Place Fallback | `MPSImageGaussianBlur` encoded into a command buffer, in place with copy-allocator fallback | [mps-image-filter.md](./mps-image-filter.md) |
| MPSGraph Matrix Multiplication | Placeholders, variables, `matrixMultiplication`, and `MPSGraphTensorData` | [mpsgraph-matrix-multiplication.md](./mpsgraph-matrix-multiplication.md) |
| MPSGraph Training Loop Step | Placeholders, trainable variables, loss, gradients, SGD update, double buffering | [mpsgraph-training-loop.md](./mpsgraph-training-loop.md) |
| Non-Uniform Threadgroup Dispatch Sizing | Threadgroup size from execution width; `dispatchThreads` vs `dispatchThreadgroups` | [nonuniform-threadgroup-dispatch.md](./nonuniform-threadgroup-dispatch.md) |
| Resource Group Argument Buffer for a Compute Function | Texture, buffer, and constant bound through a single argument buffer | [resource-group-argument-buffer.md](./resource-group-argument-buffer.md) |
| Shared Storage Mode Buffer on Unified Memory | `MTLResourceStorageModeShared` buffer accessed via `contents()`; `.private` for GPU-only resources | [shared-storage-mode-buffer.md](./shared-storage-mode-buffer.md) |
