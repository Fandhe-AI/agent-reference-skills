# KV Cache

Writing a fast KV cache for autoregressive generation: preallocate fixed-size chunks and update in place instead of appending with `concatenate`.

## Signature / Usage

```python
# Avoid this
cache = mx.zeros((1, 0, d))
for x in steps:
    cache = mx.concatenate([cache, x], axis=1)
    mx.eval(cache)
```

```python
chunk = 256
cache = mx.zeros((1, chunk, d))
offset = 0
for x in steps:
    if offset == cache.shape[1]:
        cache = mx.concatenate([cache, mx.zeros((1, chunk, d))], axis=1)
    cache = mx.slice_update(cache, x, mx.array(offset), (1,))
    offset += 1
    mx.eval(cache)

keys = cache[:, :offset]
```

Indexed assignment also works: `cache[:, offset : offset + 1, :] = x`.

## Notes

- Measurements from the docs: one position appended per step to 20 `bfloat16` caches of shape `[1, 4, N, 512]` on an M4 Max.

  | Context | Concatenate | Preallocate + update |
  | --- | --- | --- |
  | 512 | 0.90 ms / step | 0.24 ms / step |
  | 1024 | 1.11 ms / step | 0.21 ms / step |
  | 4096 | 3.73 ms / step | 0.22 ms / step |

- Concatenation copies the existing cache at every step (on the order of `n^2` elements for `n` appended positions) and prevents buffer reuse.
- MLX pools freed device buffers but reuses a buffer only for a similarly sized request; it does not split a larger buffer or combine smaller ones. A growing cache has a new size every step, so each allocation typically comes from the driver.
- The allocation work occurs on the CPU and shows up in profiles as GPU idle time between kernels rather than a slow kernel.
- Use a chunk size that is a multiple of 256. This amortizes growth and enables the fused cuDNN attention kernel on CUDA: for single-token attention, key and value must be slices of a contiguous cache with capacity a multiple of 256 and at least 256 positions in use. Other chunk sizes silently use a slower path.
- `slice_update` accepts a 0-D or 1-D integer array for `start_indices`, so the 0-D `mx.array(offset)` above is valid with `axes=(1,)` (`normalize_dynamic_slice_inputs` in `mlx/ops.cpp`, v0.32.4, rejects only `ndim > 1`).
- Source: https://ml-explore.github.io/mlx/build/html/usage/kv_cache.html (pinned source: https://github.com/ml-explore/mlx/blob/v0.32.4/docs/src/usage/kv_cache.rst)

## Related

- [Memory Management](./memory-management.md)
- [Lazy Evaluation](./lazy-evaluation.md)
- [Indexing](./indexing.md)
