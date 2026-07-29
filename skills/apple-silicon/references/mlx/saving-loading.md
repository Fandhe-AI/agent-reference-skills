# Saving and Loading

MLX serializes arrays and parameter dicts to NumPy, safetensors, or GGUF formats; `mx.load` auto-detects the format from the file extension on read.

## Signature / Usage

```python
import mlx.core as mx

a = mx.array([1.0])
mx.save("array", a)                 # writes array.npy
loaded = mx.load("array.npy")

mx.savez("arrays", a, b=b)          # writes arrays.npz
data = mx.load("arrays.npz")        # -> {'arr_0': ..., 'b': ...}

mx.save_safetensors("weights", {"a": a, "b": b})
mx.save_gguf("weights", {"a": a, "b": b})
weights = mx.load("weights.safetensors")
```

## Options / Props

| Format | Extension | Save | Load | Notes |
| --- | --- | --- | --- | --- |
| NumPy | `.npy` | `mx.save()` | `mx.load()` | Single array only |
| NumPy archive | `.npz` | `mx.savez()`, `mx.savez_compressed()` | `mx.load()` | Multiple named arrays, returned as a dict |
| Safetensors | `.safetensors` | `mx.save_safetensors()` | `mx.load()` | Multiple named arrays, dict in/out |
| GGUF | `.gguf` | `mx.save_gguf()` | `mx.load()` | Multiple named arrays, dict in/out |

## Notes

- `mx.load` returns a single `array` for `.npy` and a `dict` of arrays for the multi-array formats — check which you're expecting rather than assuming one shape.
- Prefer `.safetensors` over `.npz`/pickle-adjacent formats when loading files from an untrusted or third-party source: safetensors stores only raw tensor bytes with a JSON header, with no arbitrary code execution path, unlike formats that support pickling. Do not load untrusted model/array files without first verifying their provenance (checksum, trusted source), regardless of format.
- `Module.save_weights` / `Module.load_weights` (see nn-module.md) build on `mx.save_safetensors`/`mx.savez` under the hood for whole-model checkpoints.
- MLX's own array/weight formats (`.npz`, `.safetensors`, `.gguf`) are unrelated to Core ML's `.mlmodel`/`.mlpackage` compiled-model assets, which are covered by the apple-ml skill.

## Related

- [nn.Module](./nn-module.md)
- [array](./array.md)
