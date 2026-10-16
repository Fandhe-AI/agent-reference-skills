# Distributed

`mlx.core.distributed` runs MLX across multiple processes (typically multiple machines/devices) over one of several communication backends (`mpi`, `ring`, `jaccl`, `nccl`), coordinating them as a `Group`.

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
| `init(strict=False, backend='any', *, all_gather_factory=None)` | Initializes the communication backend and creates the global `Group`. `strict=False` returns a singleton group when `is_available()` is False, otherwise it throws a runtime error. `backend` is one of `mpi`, `ring`, `nccl`, `jaccl`, `any` (`any` tries all available backends and the first that succeeds becomes the global group) |
| `is_available(backend='any')` | Checks whether MLX can instantiate that backend (same values as `init()`); it does not guarantee a group can be created, use `init(strict=True)` for that |
| `all_sum`, `all_max`, `all_min` | All-reduce operations across the group |
| `all_gather` | Gathers arrays from every process into one result |
| `sum_scatter` | Sums across processes, then shards the result along the first axis across ranks |
| `send(x, dst)` / `recv(src)` / `recv_like(x, src)` | Point-to-point communication by process rank |

## Notes

- Backends per `usage/distributed.rst`: MPI (full featured and mature), RING (ring all-reduce and all-gather over TCP sockets, always available), JACCL (low-latency RDMA over Thunderbolt, necessary for things like tensor parallelism), NCCL (the backend of choice for CUDA environments).
- `all_gather_factory` is used only with `backend='jaccl'` (other backends raise `invalid_argument`). It is called once per rank with `(rank, size)` and must return a callable `f(src: bytes, n_bytes: int) -> bytes` that performs a byte-level all-gather used as the JACCL side channel for exchanging RDMA connection metadata; the returned bytes must have length `size * n_bytes`. New in the 0.32.x line (not in the 0.32.0 sources).
- JACCL hostfiles can list several RDMA devices per peer when two Macs are connected with more than one Thunderbolt cable: JACCL sends large messages over all the cables at the same time, and if some pairs have fewer cables than others, JACCL uses the smallest number of cables for all pairs.
- `MLX_METAL_FAST_SYNCH=1` enables a faster GPU/CPU synchronization path, but it is not reliable, can lead to deadlock and leave the GPU wedged ([issue #3142](https://github.com/ml-explore/mlx/issues/3142)), so it is off by default and best left unset.
- Calling a distributed collective without an available backend raises instead of silently no-op'ing; with `strict=False`, `init()` returns a singleton group when no backend is available.
- This module is for scaling a single MLX computation across multiple processes/machines; it is unrelated to `mlx.core.fast`'s single-process fused kernels or to unified-memory-model's CPU/GPU stream split within one process.

## Related

- [Unified Memory Model](./unified-memory-model.md)
- [Devices and Streams](./devices-streams.md)
