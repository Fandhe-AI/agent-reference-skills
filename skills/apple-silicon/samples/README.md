# samples

| Name | Description | Path |
| --- | --- | --- |
| Combining Blit and Compute Operations in a Single Pass | Metal 4 の compute encoder で texture copy と dispatch を… | [blit-and-compute-single-pass.md](./blit-and-compute-single-pass.md) |
| Metal Compute Kernel Dispatch | Run a compute-only round trip on the GPU: device, library, function… | [compute-kernel-dispatch.md](./compute-kernel-dispatch.md) |
| CPU-Encoded Indirect Command Buffer (Compute) | Encode a compute ICB once on the CPU and re-execute it across frames… | [cpu-encoded-indirect-compute.md](./cpu-encoded-indirect-compute.md) |
| MLX Array Creation and Lazy Evaluation | Create `mx.array` values and control when the compute graph runs via `mx.eval`… | [mlx-array-lazy-evaluation.md](./mlx-array-lazy-evaluation.md) |
| MLX Composable Function Transforms | Compose `mx.grad`, `mx.value_and_grad`, and `mx.vmap` as nestable transforms… | [mlx-function-transforms.md](./mlx-function-transforms.md) |
| MLX MLP Training Loop | Define an MLP as `nn.Module` and run an SGD loop with `optim.SGD.update`… | [mlx-mlp-training-loop.md](./mlx-mlp-training-loop.md) |
| MLX Unified Memory Across CPU and GPU Streams | Run one array on CPU and GPU streams without copying; MLX schedules deps… | [mlx-unified-memory.md](./mlx-unified-memory.md) |
| MPS Image Filter with In-Place Fallback | Encode a built-in `MPSImageGaussianBlur` with in-place fallback to a copy allocator… | [mps-image-filter.md](./mps-image-filter.md) |
| MPSGraph Matrix Multiplication | Build an MPSGraph with placeholders, variables, and `matrixMultiplication`… | [mpsgraph-matrix-multiplication.md](./mpsgraph-matrix-multiplication.md) |
| MPSGraph Training Loop Step | Wire placeholders, variables, loss, gradients, and SGD ops into one graph… | [mpsgraph-training-loop.md](./mpsgraph-training-loop.md) |
| Non-Uniform Threadgroup Dispatch Sizing | Derive threadgroup size from execution width; `dispatchThreads` vs `dispatchThreadgroups`… | [nonuniform-threadgroup-dispatch.md](./nonuniform-threadgroup-dispatch.md) |
| Resource Group Argument Buffer for a Compute Function | Bind a texture, buffer, and constant to a compute function via one argument buffer… | [resource-group-argument-buffer.md](./resource-group-argument-buffer.md) |
| Shared Storage Mode Buffer on Unified Memory | Allocate with `MTLResourceStorageModeShared` so CPU and GPU share memory via `contents()`… | [shared-storage-mode-buffer.md](./shared-storage-mode-buffer.md) |
