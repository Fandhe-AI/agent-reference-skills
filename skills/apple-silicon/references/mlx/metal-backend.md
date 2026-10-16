# Metal Backend Utilities

`mlx.core.metal` exposes Metal availability, device info and GPU capture helpers for MLX; `mlx.core.cuda.is_available` is the CUDA counterpart.

## Signature / Usage

```python
import mlx.core as mx

a = mx.random.uniform(shape=(512, 512))
b = mx.random.uniform(shape=(512, 512))
mx.eval(a, b)

trace_file = "mlx_trace.gputrace"

# Make sure to run with MTL_CAPTURE_ENABLED=1 and
# that the path trace_file does not already exist.
mx.metal.start_capture(trace_file)

for _ in range(10):
    mx.eval(mx.add(a, b))

mx.metal.stop_capture()
```

## Options / Props

| Function | Description |
| --- | --- |
| `mlx.core.metal.is_available()` | Check if the Metal back-end is available |
| `mlx.core.metal.device_info()` | Device info of GPU 0 (listed in `metal.rst`; the binding warns it is deprecated in favor of `mx.device_info`) |
| `mlx.core.metal.start_capture(path)` | Start a Metal capture; `path` (str) should have the extension `.gputrace` |
| `mlx.core.metal.stop_capture()` | Stop a Metal capture |
| `mlx.core.cuda.is_available()` | Check availability of the CUDA backend (`python/cuda.rst`) |

## Notes

- To capture a GPU trace, run the application with `MTL_CAPTURE_ENABLED=1`, and the output path must not already exist. Open and replay the `.gputrace` in Xcode; the `Dependencies` view gives an overview of all operations.
- Build MLX with `MLX_METAL_DEBUG` to record source during Metal compilation and label Metal objects such as command queues: `CMAKE_ARGS="-DMLX_METAL_DEBUG=ON"` prepended to the Python build call.
- Xcode workflow (skip saving to a path by running inside Xcode):

  ```shell
  mkdir build && cd build
  cmake .. -DMLX_METAL_DEBUG=ON -G Xcode
  open mlx.xcodeproj
  ```

  Then select the `metal_capture` example schema and run.
- Other `mx.metal.*` memory functions (`get_active_memory`, `set_memory_limit`, `clear_cache`, ...) print a deprecation message in the 0.32.4 binding; use the `mx.*` equivalents (see memory-management.md).
- This is MLX's own capture API; for Metal compute pipelines and GPU counters written by hand, see this skill's metal-compute pages.
- Source: https://ml-explore.github.io/mlx/build/html/python/metal.html (pinned sources at tag v0.32.4: https://github.com/ml-explore/mlx/blob/v0.32.4/docs/src/python/metal.rst, https://github.com/ml-explore/mlx/blob/v0.32.4/docs/src/python/cuda.rst, https://github.com/ml-explore/mlx/blob/v0.32.4/docs/src/dev/metal_debugger.rst, https://github.com/ml-explore/mlx/blob/v0.32.4/python/src/metal.cpp)

## Related

- [Memory Management](./memory-management.md)
- [Devices and Streams](./devices-streams.md)
- [Environment Variables](./environment-variables.md)
