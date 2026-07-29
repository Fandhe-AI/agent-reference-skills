# array

`mlx.core.array` is MLX's N-dimensional array type — the base object every MLX API operates on, backed by lazy compute graphs and unified memory.

## Signature / Usage

```python
import mlx.core as mx

a = mx.array([1, 2, 3, 4])
b = mx.array([1.0, 2.0, 3.0, 4.0])

a.shape, a.dtype, a.size, a.ndim, a.itemsize, a.nbytes

c = (a + b).astype(mx.float16)   # type promotion + explicit cast
d = c.reshape(2, 2)
e = d.transpose(1, 0)

d.item()      # forces evaluation, returns a Python scalar (1-element arrays only)
d.tolist()    # forces evaluation, returns a nested Python list
```

## Options / Props

| Member | Description |
| --- | --- |
| `shape` | Array shape as a Python tuple |
| `dtype` | The array's `Dtype` (e.g. `mx.float32`, `mx.int32`, `mx.float16`, `mx.bfloat16`) |
| `size` | Total number of elements |
| `ndim` | Number of dimensions |
| `itemsize` | Size in bytes of one element |
| `nbytes` | Total size in bytes |
| `astype(dtype, stream=None)` | Cast to a different `Dtype` |
| `reshape(*shape, stream=None)` | Reshape; shape as a tuple or separate args |
| `transpose(*axes, stream=None)` | Permute dimensions |
| `flatten(start_axis=0, end_axis=-1, stream=None)` | Collapse a dimension range |
| `item()` | Read a scalar (1-element) array as a Python value — forces evaluation |
| `tolist()` | Convert to a nested Python list — forces evaluation |

## Notes

- Arrays are created without a device — MLX's unified memory model means the same `array` is directly accessible from CPU and GPU; device choice happens per-operation via `stream=`, not at construction (see unified memory model page).
- Binary ops between mixed dtypes follow standard promotion rules (e.g. `int32 + float32 → float32`).
- Because operations are lazy, `shape`/`dtype` are known without triggering computation, but `item()`, `tolist()`, printing, and NumPy conversion all force evaluation of the array's compute graph (see lazy evaluation page).
- `mlx.core.array` is MLX's own array type, entirely distinct from Core ML's `MLMultiArray` (compiled-model tensor container), which is covered by the apple-ml skill. The two are not interchangeable and belong to different frameworks.
- MLX's official documentation lives at `https://ml-explore.github.io/mlx/` (an open-source project site), not on `developer.apple.com` like the rest of this skill's Metal/MPS references. Content on this page reflects MLX 0.32.0.

## Related

- [Indexing](./indexing.md)
- [Lazy Evaluation](./lazy-evaluation.md)
- [Unified Memory Model](./unified-memory-model.md)
