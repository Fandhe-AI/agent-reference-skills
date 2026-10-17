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
- ROCgdb 16.3 (ROCm Core SDK 10.1.0) automatically presents the diagnostic inline frame of Clang's `__builtin_verbose_trap` in backtraces, for both AMD64 and AMDGPU targets: after a verbose trap, `__clang_trap_msg$<category>$<message>` is shown as frame #0 (previously the program counter had to be rewound manually to recover the category and message strings).
- 10.0.0: the ROCr runtime generates a valid GPU core dump even when a debugger such as ROCgdb or ROCr Debug Agent is already attached to the process, so debugging sessions and core dump collection are no longer mutually exclusive.
- With the TheRock-based Core SDK, `/opt/rocm/bin` remains valid for `PATH` through the symlinks provided by the `amdrocm` meta package; the real install path is `/opt/rocm/core-10.1`. Debugging (`rocgdb`, ROCr Debug Agent) is not supported on WSL2 in 10.1.0.

## Related

- [error-handling.md](./error-handling.md)
- [env-variables.md](./env-variables.md)
