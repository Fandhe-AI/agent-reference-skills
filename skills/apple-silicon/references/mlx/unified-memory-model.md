# Unified Memory Model

MLX is designed around Apple silicon's unified memory architecture: CPU and GPU share the same physical memory pool, so arrays never need to be copied or migrated between devices — only the *operation* that consumes them picks a device, via `stream=`.

## Signature / Usage

```python
import mlx.core as mx

a = mx.random.normal((100,))   # no device argument — lives in unified memory
b = mx.random.normal((100,))

r1 = mx.add(a, b, stream=mx.cpu)   # runs the add on the CPU
r2 = mx.add(a, b, stream=mx.gpu)   # runs the same inputs' add on the GPU

# Cross-device dependency is handled automatically:
c = mx.add(a, b, stream=mx.cpu)
d = mx.add(a, c, stream=mx.gpu)    # scheduler waits for c before running on GPU
```

## Options / Props

| Concept | Description |
| --- | --- |
| Array creation | Never takes a device parameter — every array is directly visible to both CPU and GPU |
| `stream=mx.cpu` / `stream=mx.gpu` | Per-operation device selection; the default is the current default stream/device |
| Automatic dependency tracking | The scheduler inserts waits between ops on different streams that depend on each other's outputs, with no manual synchronization needed |
| Mixed CPU/GPU graphs | A single computation can route GPU-friendly ops (e.g. large matmuls) to `mx.gpu` and small/sequential ops to `mx.cpu` concurrently |

## Notes

- Because there is no host↔device copy, splitting a workload across CPU and GPU is a scheduling decision, not a data-movement one — Apple's own benchmark shows a large matmul plus 500 small CPU-friendly exponentials running roughly 2x faster split across devices than GPU-only, on an M1 Max.
- This is the array-level counterpart to the Metal storage-mode discussion on this skill's Unified Memory (metal-compute) page — that page covers `MTLResourceOptions` storage modes and `MTLResidencySet` for hand-written Metal compute pipelines, while this page covers how MLX's own scheduler exploits the same hardware property automatically.
- See devices-streams.md for the `Stream`/`Device` objects themselves and explicit synchronization.

## Related

- [Devices and Streams](./devices-streams.md)
- [Lazy Evaluation](./lazy-evaluation.md)
