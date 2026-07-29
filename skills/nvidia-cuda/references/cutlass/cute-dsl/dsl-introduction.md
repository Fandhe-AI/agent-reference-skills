# DSL Introduction

## Signature / Usage

```python
import cutlass.cute as cute

@cute.jit(preprocessor=True)
def host_fn(...):
    ...

host_fn(..., no_cache=True)  # force fresh compilation for this call

@cute.kernel(
    preprocessor=True,
    grid=[gx, gy, gz], block=[bx, by, bz], cluster=[cx, cy, cz],
    smem=None,                  # None = auto-calculate via SmemAllocator
    fallback_cluster=None,
    max_number_threads=[0, 0, 0],
    min_blocks_per_mp=0,
    use_pdl=False,
    cooperative=False,
    smem_merge_branch_allocs=False,
    preferred_smem_carveout=None,
)
def device_kernel(...):
    ...
```

## Options / Props

| Decorator | Parameter | Default | Description |
| --- | --- | --- | --- |
| `@jit` | `preprocessor` | `True` | Auto-translates Python control flow; `False` disables automatic expansion |
| `@jit` (call-site) | `no_cache` | `False` | `True` forces fresh compilation, bypassing the JIT cache |
| `@kernel` | `preprocessor` | `True` | `False` expects manual implementations |
| `@kernel` | `grid` / `block` / `cluster` | — | Launch dimensions as integer lists |
| `@kernel` | `smem` | `None` | Shared memory bytes; `None` auto-calculates via `SmemAllocator` |
| `@kernel` | `fallback_cluster` | — | Minimum-guaranteed cluster size for graceful degradation |
| `@kernel` | `max_number_threads` | `[0, 0, 0]` | Max threads per block |
| `@kernel` | `min_blocks_per_mp` | `0` | Minimum blocks per multiprocessor |
| `@kernel` | `use_pdl` | `False` | Enables Programmatic Dependent Launch |
| `@kernel` | `cooperative` | `False` | Enables cooperative kernel launch |
| `@kernel` | `smem_merge_branch_allocs` | `False` | Allows branches to reuse shared memory |
| `@kernel` | `preferred_smem_carveout` | `None` | Percentage hint: shared memory vs. L1 cache |

| Caller | Callee | Allowed? | Behavior |
| --- | --- | --- | --- |
| Python | `@jit` | Yes | DSL runtime |
| Python | `@kernel` | No | Raises an error |
| `@jit` | `@jit` | Yes | Compile-time, inlined |
| `@jit` | Python | Yes | Compile-time, inlined |
| `@jit` | `@kernel` | Yes | Dynamic call via GPU driver |
| `@kernel` | `@jit` | Yes | Compile-time, inlined |
| `@kernel` | Python | Yes | Compile-time, inlined |
| `@kernel` | `@kernel` | No | Raises an error |

## Notes

- CuTe DSL's design goals: zero-cost abstraction, consistency with C++ CUTLASS, JIT compilation, DLPack integration (PyTorch/JAX), JIT caching, native type inference, and optional lower-level control.

## Related

- [DSL Code Generation](./dsl-code-generation.md)
- [DSL Control Flow](./dsl-control-flow.md)
- [DSL JIT Caching](./dsl-jit-caching.md)
