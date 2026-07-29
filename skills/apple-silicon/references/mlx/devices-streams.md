# Devices and Streams

Every MLX operation accepts an optional `stream=` argument selecting which device (and which stream on that device) executes it; without one, the operation runs on the current default stream/device.

## Signature / Usage

```python
import mlx.core as mx

mx.default_device()                 # current default Device (mx.cpu or mx.gpu)
mx.set_default_stream(mx.default_stream(mx.gpu))

s = mx.new_stream(mx.gpu)           # an additional independent stream on the GPU
r = mx.add(a, b, stream=s)          # runs on that specific stream

r2 = mx.add(a, b, stream=mx.gpu)    # a Device is accepted too -> its default stream

mx.synchronize()                    # block until all scheduled work completes
```

## Options / Props

| Function | Description |
| --- | --- |
| `mx.default_device()` / `mx.default_stream(device)` | Query the current default device / a device's default stream |
| `mx.set_default_stream(stream)` | Change the default stream operations run on when `stream=` is omitted |
| `mx.new_stream(device)` | Create a new stream on a device, for running work concurrently with the default stream |
| `mx.new_thread_local_stream()` | Create a stream scoped to the current thread |
| `stream=` argument | Accepts either a `Stream` or a `Device` (uses that device's default stream) |
| `mx.synchronize()` | Blocks until all scheduled operations complete |
| `mx.clear_streams()` | Clears stream-related cached state |

## Notes

- Passing a `Device` (e.g. `stream=mx.gpu`) to any op is shorthand for "that device's default stream" — use `mx.new_stream` explicitly when you need multiple independent, concurrent streams on the same device.
- This is the mechanism the unified memory model page uses to route different parts of one computation to CPU vs. GPU without any explicit data copy.

## Related

- [Unified Memory Model](./unified-memory-model.md)
- [Memory Management](./memory-management.md)
