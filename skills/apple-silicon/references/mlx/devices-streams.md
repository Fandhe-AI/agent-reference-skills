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
| `mx.new_thread_unsafe_stream(device) -> Stream` | Make a new stream that can be used in any thread. Unlike `new_stream`, which only works on the thread of creation, it can be passed to and evaluated anywhere, but all nodes in a graph must be evaluated in sequence and the user is responsible for ensuring there is no race condition |
| `mx.new_thread_local_stream(device) -> ThreadLocalStream` | Make a new stream that will be unique per thread |
| `ThreadLocalStream` | A stream that will be unique per thread and can be used to run operations on a given device; exposes `.device` |
| `stream=` argument | Accepts either a `Stream` or a `Device` (uses that device's default stream) |
| `mx.synchronize(stream=None)` | Synchronize with the given stream; if a device is given its default stream is used, if `None` the default stream of the default device is used |
| `mx.clear_streams()` | Destroy all streams created in current thread |

## Notes

- Passing a `Device` (e.g. `stream=mx.gpu`) to any op is shorthand for "that device's default stream" — use `mx.new_stream` explicitly when you need multiple independent, concurrent streams on the same device.
- `mx.new_stream(device)` creates a stream that can only be used on the thread where it was created; using it in any other thread results in errors. `new_thread_unsafe_stream` is documented since 0.32.4 (the binding already exists in 0.32.0).
- The `mx.stream(...)` `StreamContext` can be entered more than once; the contexts are stacked (0.32.4 `stream.cpp`).
- This is the mechanism the unified memory model page uses to route different parts of one computation to CPU vs. GPU without any explicit data copy.

## Related

- [Unified Memory Model](./unified-memory-model.md)
- [Memory Management](./memory-management.md)
