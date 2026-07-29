# random

`mlx.core.random` samples from common distributions using a splittable, counter-based PRNG (Threefry) — the same design JAX uses — so randomness can be made fully explicit and reproducible via keys, while still defaulting to an implicit global state.

## Signature / Usage

```python
import mlx.core as mx

mx.random.seed(0)                       # seed the implicit global PRNG state
x = mx.random.uniform(shape=(4, 4))      # uses global state implicitly

key = mx.random.key(42)                 # explicit key from a seed
y = mx.random.normal(shape=(4, 4), key=key)   # reproducible: same key -> same output

k1, k2 = mx.random.split(key)           # derive independent sub-keys
```

## Options / Props

| Function | Description |
| --- | --- |
| `mx.random.seed(seed)` | Seeds the implicit global PRNG state |
| `mx.random.key(seed)` | Creates an explicit PRNG key from a seed |
| `mx.random.split(key)` | Splits a key into independent sub-keys |
| `mx.random.normal(shape, key=None)` | Normal distribution (configurable mean/scale) |
| `mx.random.uniform(shape, key=None)` | Uniform distribution |
| `mx.random.randint(low, high, shape, key=None)` | Random integers |
| `mx.random.bernoulli(p, shape, key=None)` | Bernoulli (binary) samples |
| `mx.random.categorical(logits, key=None)` | Samples from a categorical distribution |
| `mx.random.truncated_normal(lower, upper, shape, key=None)` | Bounded normal distribution |
| `mx.random.laplace` / `gumbel` / `multivariate_normal` / `permutation` | Additional distributions and permutation sampling |

## Notes

- Passing the same explicit `key` to a sampling function always reproduces the same values, independent of call order elsewhere in the program — this is the main advantage over the implicit-global-state model for reproducible experiments and parallel data pipelines.
- Use `mx.random.split` when a subroutine needs its own independent random stream (e.g. per-layer dropout masks) without disturbing the caller's key sequence.
- `mx.random.seed` only affects the implicit global-state path; code using explicit `key=` is unaffected by it.

## Related

- [array](./array.md)
- [nn Layers](./nn-layers.md)
