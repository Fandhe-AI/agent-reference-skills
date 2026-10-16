# Efficiency tips for Windows ML inference

Reduce power, memory, and background overhead of Windows ML inference: EcoQoS for CPU work, `ep.dynamic.workload_type` for NPU work, plus memory options.

## Signature / Usage

NPU: set on each ONNX Runtime inference session via `SetEpDynamicOptions()`:

```text
ep.dynamic.workload_type=Efficient
```

CPU: opt the process, or preferably the inference threads, into EcoQoS with `SetThreadInformation` (`ThreadPowerThrottling`, `THREAD_POWER_THROTTLING_STATE`) or `SetProcessInformation` (`ProcessPowerThrottling`, `PROCESS_POWER_THROTTLING_STATE`). Set `THREAD_POWER_THROTTLING_EXECUTION_SPEED` (thread) or `PROCESS_POWER_THROTTLING_EXECUTION_SPEED` (process) in both `ControlMask` and `StateMask`.

## Options / Props

| Approach | What it does |
| --- | --- |
| Quantized models (INT8/INT4) | Reduces per-weight storage (FP32 is 4 bytes, INT8 is 1 byte); savings depend on model structure and method. |
| `DisableCpuMemArena()` | Disables the CPU arena so allocations go to the system allocator; trades throughput for lower peak memory. |
| `CreateMemoryResourceNotification` | Monitor system-wide memory state; on low memory, evict idle sessions, drop cached arenas, or unload idle models. |
| `MEMORY_PRIORITY_INFORMATION` | Lower memory priority for idle model sessions via `SetProcessInformation` (`ProcessMemoryPriority`) or `SetThreadInformation` (`ThreadMemoryPriority`). Doesn't reduce allocations; influences working-set trimming. |

## Notes

- Use EcoQoS only for background inference that doesn't need optimal performance; not for foreground or performance-critical inference. Prefer thread-level EcoQoS when only some work should favor efficiency.
- EPs acquired through the EP catalog require Windows 11, version 24H2 (build 26100) or later; NPU inference also needs compatible NPU hardware, driver, and a supported NPU EP.
- Currently only NPU EPs act on the `Efficient` signal. It can increase latency when higher-priority accelerator workloads are active. Set it per session; configure each session independently.
- Avoid vendor-specific knobs (for example QNN `htp_performance_mode`, OpenVINO `PERFORMANCE_HINT`) when `ep.dynamic.workload_type` suffices: they bypass the OS's intent-based scheduling and power management and can conflict with system policies.
- Verify: check return values of every call (`GetLastError` on zero return). For process-level EcoQoS, confirm via `GetProcessInformation` that the execution-speed flag is in both masks; `GetThreadInformation` can't query `ThreadPowerThrottling`, so check that `SetThreadInformation` succeeds. Treat `SetEpDynamicOptions()` errors as configuration failures. Measure latency, utilization, and power under a representative workload.

## Related

- [Windows ML execution providers](./supported-execution-providers.md)
- [Windows ML overview](./overview.md)
