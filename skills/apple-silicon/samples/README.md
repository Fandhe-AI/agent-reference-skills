# samples

| Name | Description | Path |
| --- | --- | --- |
| Combining Blit and Compute Operations in a Single Pass | Metal 4's compute command encoder can issue both texture-copy… | [blit-and-compute-single-pass.md](./blit-and-compute-single-pass.md) |
| Metal Compute Kernel Dispatch | Run a compute-only round trip on the GPU: device, library, fu… | [compute-kernel-dispatch.md](./compute-kernel-dispatch.md) |
| CPU-Encoded Indirect Command Buffer (Compute) | Encode a compute indirect command buffer (ICB) once on the CP… | [cpu-encoded-indirect-compute.md](./cpu-encoded-indirect-compute.md) |
| MLX Array Creation and Lazy Evaluation | Create `mx.array` values and control when the compute graph r… | [mlx-array-lazy-evaluation.md](./mlx-array-lazy-evaluation.md) |
| MLX Composable Function Transforms | Compose `mx.grad`, `mx.value_and_grad`, and `mx.vmap` — each … | [mlx-function-transforms.md](./mlx-function-transforms.md) |
| MLX MLP Training Loop | Define a multi-layer perceptron as an `nn.Module`, get a comb… | [mlx-mlp-training-loop.md](./mlx-mlp-training-loop.md) |
| MLX Unified Memory Across CPU and GPU Streams | Run the same array through CPU and GPU streams without moving… | [mlx-unified-memory.md](./mlx-unified-memory.md) |
| MPS Image Filter with In-Place Fallback | Encode a built-in `MPSImageGaussianBlur` kernel into a comman… | [mps-image-filter.md](./mps-image-filter.md) |
| MPSGraph Matrix Multiplication | Build a small graph with placeholders and variables, connect t… | [mpsgraph-matrix-multiplication.md](./mpsgraph-matrix-multiplication.md) |
| MPSGraph Training Loop Step | Wire up placeholders, trainable variables, a loss, its gradien… | [mpsgraph-training-loop.md](./mpsgraph-training-loop.md) |
| Non-Uniform Threadgroup Dispatch Sizing | Derive a threadgroup size from the pipeline state's execution… | [nonuniform-threadgroup-dispatch.md](./nonuniform-threadgroup-dispatch.md) |
| Resource Group Argument Buffer for a Compute Function | Bind several resources (a texture, a buffer, and a constant) t… | [resource-group-argument-buffer.md](./resource-group-argument-buffer.md) |
| Shared Storage Mode Buffer on Unified Memory | Allocate a buffer with `MTLResourceStorageModeShared` so the C… | [shared-storage-mode-buffer.md](./shared-storage-mode-buffer.md) |
