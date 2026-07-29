# Memory Management

`mlx.core` exposes functions to inspect and bound MLX's memory usage — active allocations, cached (reusable) allocations, and configurable limits — useful when working with large models on constrained devices.

## Signature / Usage

```python
import mlx.core as mx

mx.get_active_memory()      # bytes currently in use
mx.get_peak_memory()         # peak bytes used since last reset
mx.get_cache_memory()        # bytes held in the reusable free cache

mx.reset_peak_memory()
mx.set_memory_limit(8 * 1024**3)     # cap total allocation, e.g. 8 GiB
mx.set_cache_limit(1 * 1024**3)      # cap the size of the free-block cache
mx.clear_cache()                     # release cached (but unused) allocations immediately
```

## Options / Props

| Function | Description |
| --- | --- |
| `get_active_memory()` | Currently-used memory, in bytes |
| `get_peak_memory()` | Peak used memory since the last reset, in bytes |
| `get_cache_memory()` | Size of MLX's reusable allocation cache, in bytes |
| `reset_peak_memory()` | Resets the peak-memory counter to zero |
| `set_memory_limit(limit)` | Upper bound on total memory the process may allocate |
| `set_cache_limit(limit)` | Upper bound on the size of the free-allocation cache |
| `set_wired_limit(limit)` | Limit on wired (pinned) memory |
| `clear_cache()` | Frees cached allocations immediately |

## Notes

- `get_peak_memory()` measures since the last `reset_peak_memory()` call (or process start), so call `reset_peak_memory()` before a section you want to profile in isolation.
- `set_memory_limit` bounds total allocation (a hard cap), while `set_cache_limit` only bounds MLX's internal reuse cache — lowering the cache limit trades allocator reuse speed for a smaller idle memory footprint; `clear_cache()` does the same one-off, without changing the limit.
- These functions are the array-level analogue of the GPU counters/residency APIs on this skill's metal-compute pages — for hand-written Metal compute pipelines rather than MLX's own array allocator.

## Related

- [Devices and Streams](./devices-streams.md)
- [Unified Memory Model](./unified-memory-model.md)
