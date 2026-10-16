# Environment Variables

MLX reads environment variables to configure compilation, numerical precision, backend behavior and distributed execution.

## Signature / Usage

```shell
MLX_ENABLE_TF32=0 python my_script.py
```

## Options / Props

Set them before starting the process; many are read when the subsystem is first initialized. Boolean variables use `0` to disable and a nonzero integer to enable unless noted.

General

| Variable | Default | Description |
| --- | --- | --- |
| `MLX_DISABLE_COMPILE` | unset | Disable compilation globally. Enabled by presence (setting `0` also disables). `mlx.core.enable_compile()` overrides it |
| `MLX_ENABLE_TF32` | `1` | Allow reduced-precision `float32` matmul-family ops on supported hardware; `0` keeps full `float32` |

Distributed (formats and `mlx.launch` behavior are in the distributed docs)

| Variable | Default | Description |
| --- | --- | --- |
| `MLX_RANK` | — | Zero-based rank of the process; used by Ring, JACCL, NCCL. `JACCL_RANK` is a higher-priority alias for JACCL |
| `MLX_HOSTFILE` | — | Path to the JSON host file used by the Ring backend |
| `MLX_RING_VERBOSE` | unset | Verbose logging for Ring; enabled by presence |
| `MLX_IBV_DEVICES` | — | Path to the JSON device-connectivity file for JACCL. `JACCL_IBV_DEVICES` is a higher-priority alias |
| `MLX_JACCL_COORDINATOR` | — | Coordinator address `IP:port` for JACCL. `JACCL_COORDINATOR` is a higher-priority alias |
| `MLX_JACCL_RING` | unset | Prefer ring topology for JACCL; enabled by presence. `JACCL_RING` is a higher-priority alias |
| `MLX_WORLD_SIZE` | — | Total number of processes in an NCCL group |
| `MLX_NCCL_TIMEOUT` | `300000` | Timeout in ms for NCCL bootstrap connections |
| `MLX_MPI_LIBNAME` | `libmpi.dylib` (macOS) / `libmpi.so` (other) | Override the MPI dynamic-library name |

Metal

| Variable | Default | Description |
| --- | --- | --- |
| `MLX_METAL_RESIDENCY_REFRESH_INTERVAL_MS` | `0` (disabled) | Re-request residency for existing wired allocations at this interval (ms); works around macOS releasing residency while the GPU is idle. Nonpositive disables. Requires a Metal 3 GPU on macOS 15 / iOS 18 or later |
| `MLX_METAL_FAST_SYNCH` | `0` | Enable the faster Metal CPU/GPU synchronization path; requires Metal 3.2+ (macOS 15 / iOS 18 or later). Not reliable: it can deadlock and leave the GPU wedged, so best left unset (see Notes) |
| `MLX_CONV_WINOGRAD` | `1` | Allow Winograd for 3x3 `conv2d`; `0` uses the GEMM convolution for all inputs |

Advanced tuning (development / diagnostics; behavior may change)

| Variable | Default | Description |
| --- | --- | --- |
| `MLX_BFS_MAX_WIDTH` | `20` | Breadth-first-search width limit when constructing an evaluation tape |
| `MLX_MAX_OPS_PER_BUFFER` | device-dependent | Max operations in one Metal command buffer or CUDA graph |
| `MLX_MAX_MB_PER_BUFFER` | device-dependent | Approximate memory limit (MB) for one Metal command buffer or CUDA graph |
| `MLX_METAL_GPU_ARCH` | — | Override the Metal GPU architecture string reported to MLX; a mismatch can select incompatible kernels and give incorrect results |
| `MLX_SDPA_BLOCKS` | — | Override the number of reduction blocks in the Metal SDPA kernel; positive values rounded up to a multiple of `32` |

CUDA

| Variable | Default | Description |
| --- | --- | --- |
| `MLX_USE_CUDA_GRAPHS` | `1` | Enable CUDA graph capture and replay |
| `MLX_SAVE_CUDA_GRAPHS_DOT_FILE` | unset | Filename prefix for numbered DOT files of captured CUDA graphs; unset or empty disables |
| `MLX_PTX_CACHE_DIR` | `mlx/<version>/ptx` under the system temp dir | Directory for runtime-compiled PTX cache |
| `MLX_CUDA_USE_CUDNN_SDPA` | `1` | Allow cuDNN scaled dot-product attention when supported |
| `MLX_CUDA_CONV_CACHE_SIZE` | `128` | CUDA convolution cache capacity |
| `MLX_CUDA_FFT_CACHE_SIZE` | `128` | CUDA FFT plan cache capacity |
| `MLX_CUDA_GRAPH_CACHE_SIZE` | `400` | CUDA graph cache capacity |
| `MLX_CUDA_SDPA_CACHE_SIZE` | `256` | CUDA forward SDPA cache capacity |
| `MLX_CUDA_SDPA_BACKWARD_CACHE_SIZE` | `64` | CUDA backward SDPA cache capacity |
| `MLX_ENABLE_CACHE_THRASHING_CHECK` | `1` | Raise an error on consecutive CUDA cache misses (more than twice the capacity with no hit) suggesting a larger capacity |

## Notes

- The NCCL backend also requires `NCCL_HOST_IP` and `NCCL_PORT`; `NCCL_DEBUG=INFO` enables extra bootstrap logging. `CUDA_VISIBLE_DEVICES` selects the local CUDA device and is handled by the CUDA runtime. MLX uses `CUDA_HOME` or `CUDA_PATH` to find CUDA headers for runtime kernel compilation.
- `MLX_METAL_RESIDENCY_REFRESH_INTERVAL_MS` does not change the wired limit set by `mx.set_wired_limit` or submit GPU work, and can keep memory wired during long idle periods.
- `MLX_METAL_FAST_SYNCH` is unreliable and can lead to deadlock and leave the GPU wedged (issue #3142); it is best left unset. See the distributed docs for MLX `v0.32.4` (`docs/src/usage/distributed.rst`).
- Source: https://ml-explore.github.io/mlx/build/html/usage/environment_variables.html (pinned source: https://github.com/ml-explore/mlx/blob/v0.32.4/docs/src/usage/environment_variables.rst; new in 0.32.4). Issue: https://github.com/ml-explore/mlx/issues/3142

## Related

- [Numerical Precision](./precision.md)
- [Distributed](./distributed.md)
- [Memory Management](./memory-management.md)
- [Compilation](./compilation.md)
