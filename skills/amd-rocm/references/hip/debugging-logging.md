# Debugging and Logging

Tools and environment variables for diagnosing HIP application faults and tracing runtime behavior.

## Signature / Usage

```bash
export PATH=$PATH:/opt/rocm/bin
rocgdb ./application_name
```

## Options / Props

| Tool / Variable | Description |
| --- | --- |
| ROCgdb | GDB-based source-level debugger for HIP on Linux (ROCm's equivalent to CUDA-GDB); integrates with Eclipse, VS Code, GDB dashboard; installed at `/opt/rocm/bin` |
| `ltrace` | Traces dynamic library calls to observe the ROCm software stack's behavior before deeper debugging |
| `AMD_SERIALIZE_KERNEL` | Serializes kernel execution (values 1-3 control timing) to make faults easier to localize |
| `AMD_SERIALIZE_COPY` | Serializes memory copy operations |
| `HIP_VISIBLE_DEVICES` | Restricts which GPUs are visible to the HIP runtime |
| `GPU_DUMP_CODE_OBJECT` | Extracts compiled kernel code objects for inspection |
| `AMD_LOG_LEVEL` | Diagnostic log verbosity, 0-5 |
| `HIP_LAUNCH_BLOCKING` | Forces synchronous kernel execution |

## Notes

- Setting `AMD_SERIALIZE_KERNEL=3` and `AMD_SERIALIZE_COPY=3` forces synchronous execution so faults appear at the offending call in backtraces; unset these before benchmarking, as they are debug-only and not for production use.
- Memory-violation (VM) faults typically stem from out-of-bounds array access, invalid pointers, missing synchronization, or compiler issues.

## Related

- [error-handling.md](./error-handling.md)
- [env-variables.md](./env-variables.md)
