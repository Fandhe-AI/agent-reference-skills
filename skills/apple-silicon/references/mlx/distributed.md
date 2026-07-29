# Distributed

`mlx.core.distributed` runs MLX across multiple processes (typically multiple machines/devices) over an MPI-based backend, coordinating them as a `Group`.

## Signature / Usage

```python
import mlx.core as mx
import mlx.core.distributed as dist

if dist.is_available():
    group = dist.init()               # initialize backend + global communication group

x = mx.random.normal((100,))
total = dist.all_sum(x, group=group)       # reduce-sum across all processes
gathered = dist.all_gather(x, group=group) # concatenate x from every process

dist.send(x, dst=1, group=group)           # send(x, dst, *, group=None, stream=None)
y = dist.recv_like(x, src=0, group=group)  # receive an array matching x's shape/dtype from rank 0
```

## Options / Props

| Function / class | Description |
| --- | --- |
| `Group` | A set of independent MLX processes that can communicate |
| `init()` | Initializes the communication backend and creates the global `Group` |
| `is_available()` | Checks whether a communication backend is available before use |
| `all_sum`, `all_max`, `all_min` | All-reduce operations across the group |
| `all_gather` | Gathers arrays from every process into one result |
| `sum_scatter` | Sums across processes, then shards the result along the first axis across ranks |
| `send(x, dst)` / `recv(src)` / `recv_like(x, src)` | Point-to-point communication by process rank |

## Notes

- Always guard distributed calls with `is_available()` (or a fallback) — calling `init()`/collectives without an MPI backend present raises rather than silently no-op'ing.
- This module is for scaling a single MLX computation across multiple processes/machines; it is unrelated to `mlx.core.fast`'s single-process fused kernels or to unified-memory-model's CPU/GPU stream split within one process.

## Related

- [Unified Memory Model](./unified-memory-model.md)
- [Devices and Streams](./devices-streams.md)
