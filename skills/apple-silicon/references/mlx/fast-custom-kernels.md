# Fast and Custom Kernels

`mlx.core.fast` provides fused, hand-optimized implementations of performance-critical neural-network ops, plus `metal_kernel`/`cuda_kernel` for writing your own JIT-compiled GPU kernels when the built-in ops aren't enough.

## Signature / Usage

```python
import mlx.core as mx
import mlx.core.fast as fast

x = mx.random.normal((4, 128, 512))
normed = fast.rms_norm(x, weight, eps=1e-5)

out = fast.scaled_dot_product_attention(q, k, v, scale=1.0 / (dims ** 0.5))

q_rot = fast.rope(q, dims=head_dim, traditional=False, base=10000.0, scale=1.0, offset=0)

kernel = fast.metal_kernel(
    name="my_kernel",
    input_names=["x"],
    output_names=["y"],
    source="y[thread_position_in_grid.x] = x[thread_position_in_grid.x] * 2;",
    header="",
    ensure_row_contiguous=True,
)
```

## Options / Props

| Function | Description |
| --- | --- |
| `fast.rms_norm(x, weight, eps)` | Fused Root Mean Square normalization |
| `fast.layer_norm(x, weight, bias, eps)` | Fused layer normalization |
| `fast.rope(a, dims, *, traditional, base, scale, offset, freqs=None)` | Fused rotary positional encoding; `traditional`/`base`/`scale`/`offset` are keyword-only, and `base` and `freqs` are mutually exclusive |
| `fast.scaled_dot_product_attention(q, k, v, scale, mask=None)` | Fused multi-head attention: `softmax(Q @ Kᵀ · scale) @ V` |
| `fast.metal_kernel(name, input_names, output_names, source, header='', ensure_row_contiguous=True, atomic_outputs=False, compile_options=None)` | Define a custom, JIT-compiled Metal kernel from source |
| `fast.cuda_kernel(...)` | Define a custom, JIT-compiled CUDA kernel from source |

## Notes

- These are fused equivalents of ops you could otherwise compose from primitives (e.g. `rms_norm` vs. hand-rolled `mean`/`rsqrt`/multiply) — use `mlx.core.fast` when the fused kernel exists, since it reduces memory-bandwidth overhead versus the equivalent op composition.
- The `nn.RMSNorm`/`nn.LayerNorm` layer classes (see nn-layers.md) call into these same fused kernels internally; use the layer form when building a `Module`, the `fast` functions directly for custom forward passes.
- Custom `metal_kernel`/`cuda_kernel` source strings are compiled and executed on-device — treat kernel source the same as any other code you run: don't build kernel source from unsanitized/untrusted external input.
- `fast.metal_kernel` writes and JIT-compiles raw Metal shading language for MLX's own dispatch, a different workflow from this skill's `msl` category, which documents the Metal Shading Language itself for hand-authored `.metal` compute pipelines outside of MLX.

## Related

- [nn Layers](./nn-layers.md)
- [Compilation](./compilation.md)
