# CUDA Environment Variables

Environment variables controlling device enumeration, JIT compilation caching, execution/launch behavior, module loading strategy, and error log output, grouped by the category they affect.

## Signature / Usage

```bash
export CUDA_VISIBLE_DEVICES=0,1
export CUDA_MODULE_LOADING=LAZY
export CUDA_LAUNCH_BLOCKING=1
```

## Options / Props

| Name | Category | Description |
| --- | --- | --- |
| `CUDA_VISIBLE_DEVICES` | Device Enumeration | Governs which GPU devices are visible to a CUDA application and in what order they are enumerated. |
| `CUDA_DEVICE_ORDER` | Device Enumeration | Determines enumeration sequence: `FASTEST_FIRST` or `PCI_BUS_ID`. |
| `CUDA_MANAGED_FORCE_DEVICE_ALLOC` | Device Enumeration | Forces managed memory allocations to behave as device allocations. |
| `CUDA_CACHE_DISABLE` / `CUDA_CACHE_PATH` / `CUDA_CACHE_MAXSIZE` | JIT Compilation | Control the on-disk JIT compilation cache: disable it, set its path, or cap its size. |
| `CUDA_FORCE_PTX_JIT` / `CUDA_FORCE_JIT` | JIT Compilation | Force PTX JIT compilation even when a matching cubin is available. |
| `CUDA_DISABLE_PTX_JIT` / `CUDA_DISABLE_JIT` | JIT Compilation | Disable PTX JIT compilation. |
| `CUDA_FORCE_PRELOAD_LIBRARIES` | JIT Compilation | Forces preloading of CUDA libraries. |
| `CUDA_LAUNCH_BLOCKING` | Execution | Toggles synchronous (blocking) kernel launches, useful for debugging. |
| `CUDA_DEVICE_MAX_CONNECTIONS` / `CUDA_DEVICE_MAX_COPY_CONNECTIONS` | Execution | Set the number of hardware connections/queues available for concurrent kernel and copy engine work. |
| `CUDA_SCALE_LAUNCH_QUEUES` | Execution | Scales the number of launch queues. |
| `CUDA_GRAPHS_USE_NODE_PRIORITY` | Execution | Controls whether CUDA Graphs respect per-node priority. |
| `CUDA_DEVICE_WAITS_ON_EXCEPTION` | Execution | Makes the device wait on an unhandled exception rather than terminating immediately (debugging aid). |
| `CUDA_DEVICE_DEFAULT_PERSISTING_L2_CACHE_PERCENTAGE_LIMIT` | Execution | Default cap on the percentage of L2 cache reservable for persisting accesses. |
| `CUDA_DISABLE_PERF_BOOST` / `CUDA_AUTO_BOOST` | Execution | Control automatic clock-boost behavior. |
| `CUDA_MODULE_LOADING` | Module Loading | Selects `LAZY` (default on modern toolkits) or `EAGER` module/kernel loading at startup. |
| `CUDA_MODULE_DATA_LOADING` | Module Loading | Controls lazy loading of module data specifically (as distinct from kernel/function loading). |
| `CUDA_BINARY_LOADER_THREAD_COUNT` | Module Loading | Number of threads used for binary loading. |
| `CUDA_LOG_FILE` | Error Log Management | Directs internal CUDA error/warning log output to `stdout`, `stderr`, or a file path. |

## Notes

- `CUDA_MODULE_LOADING=LAZY` and `CUDA_LOG_FILE` are the two variables also referenced directly from feature pages in this guide (see Lazy Loading and Error Log Management).
- `CUDA_VISIBLE_DEVICES` is the most commonly used variable for restricting a process to a subset of GPUs in a multi-GPU host, and combines with `cudaSetDevice`'s device indices which are re-numbered relative to the visible set.

## Related

- [Lazy Loading](../features/lazy-loading.md)
- [Error Log Management](../features/error-log-management.md)
- [Advanced CUDA APIs and Features](../core/advanced-host-programming.md)
