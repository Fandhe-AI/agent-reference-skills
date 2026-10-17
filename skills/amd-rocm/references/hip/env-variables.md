# Environment Variables

Runtime-tunable environment variables controlling device visibility, queue/stream limits, logging, serialization, and heap sizing.

## Signature / Usage

```bash
export HIP_VISIBLE_DEVICES=0,2
export AMD_LOG_LEVEL=3
./my_hip_app
```

## Options / Props

| Variable | Default | Description |
| --- | --- | --- |
| `HIP_VISIBLE_DEVICES` | all devices | Restricts which GPUs are visible to the process, e.g. `"0,2"`; required on Windows (on Linux the docs recommend `ROCR_VISIBLE_DEVICES`) |
| `GPU_MAX_HW_QUEUES` | 4 | Number of independent hardware queues the HIP runtime creates per process per device; extra streams beyond this are reused round-robin. The recommended maximum value is 4 |
| `HIP_LAUNCH_BLOCKING` | 0 | When `1`, serializes kernel enqueue (same effect as `AMD_SERIALIZE_KERNEL`) |
| `AMD_LOG_LEVEL` | 0 | Logging verbosity, 1 (errors only) through 5 (debug/extra); pairs with `AMD_LOG_MASK` for granular filtering |
| `HSA_CU_MASK` | — | Sets a compute-unit mask at queue creation in the driver, e.g. `1:0-8`; also applied to profiled queues |
| `HIP_HOST_COHERENT` | 0 | Controls host/GPU memory coherence for `hipHostMalloc` allocations under specific flags |
| `HIP_INITIAL_DM_SIZE` | 8388608 (8 MB) | Initial heap size for in-kernel device `malloc` |
| `AMD_SERIALIZE_KERNEL` / `AMD_SERIALIZE_COPY` | 0 | Forces synchronous kernel/copy execution for debugging (see `debugging-logging.md`) |

## Notes

- These variables are debugging/tuning knobs, not production configuration — `HIP_LAUNCH_BLOCKING`, `AMD_SERIALIZE_KERNEL`, `AMD_SERIALIZE_COPY`, and elevated `AMD_LOG_LEVEL` all reduce performance and should not be left set in production builds.
- Documented against HIP 7.16.0 (ROCm Core SDK 10.1.0), `rocm.docs.amd.com/projects/HIP/en/latest/` as of 2026-10.
- The `CUDA_VISIBLE_DEVICES` alias was dropped from the 10.1.0 docs: the GPU isolation table now lists only `HIP_VISIBLE_DEVICES`, and the earlier advice to use `CUDA_VISIBLE_DEVICES` for cross-vendor portability is gone. Other documented isolation variables: `ROCR_VISIBLE_DEVICES` (device indices or UUIDs; recommended on Linux) and `GPU_DEVICE_ORDINAL` (indices exposed to OpenCL and HIP)
- ROCr variable `HSA_ENABLE_DXG_DETECTION` (default 1): set to 0 to disable the ROCr runtime's automatic WSL2 detection (`/dev/dxg`) and `librocdxg` loading. See the ROCm-wide environment variables reference (`reference/environment-variables`) for ROCr and other component variables

## Related

- [debugging-logging.md](./debugging-logging.md)
- [device-management.md](./device-management.md)
