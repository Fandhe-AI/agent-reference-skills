# Profiling and Debugging Tools

Performance analysis and code debugging utilities for GPU applications running on ROCm.

## Signature / Usage

```bash
# Source-level debugging of a HIP application
rocgdb ./myapp

# Trace/profile a GPU application
rocprofv3 --hip-trace -- ./myapp
```

## Options / Props

| Tool | Role |
| --- | --- |
| ROCdbgapi | ROCm debugger API library |
| ROCgdb | Source-level debugger for Linux, based on the GNU Debugger (GDB) |
| ROCm Compute Profiler | Kernel-level profiling for machine learning and HPC workloads |
| ROCm Systems Profiler | Comprehensive profiling and tracing of applications |
| ROCprofiler-SDK | Toolkit for developing analysis tools for profiling and tracing GPU applications |
| ROCr Debug Agent | Prints the state of all AMD GPU wavefronts that caused a queue error |

## Notes

- ROCm 7.14.0
- ROCgdb is a user-facing debugger; ROCdbgapi is the lower-level library it (and other debuggers) is built on
- ROCprofiler-SDK is the toolkit for building custom profiling tools; ROCm Compute Profiler and ROCm Systems Profiler are the ready-to-use profiler applications built on top of it

## Related

- [Control and Monitoring Tools](./control-monitoring-tools.md)
- [Runtime and Compilers](./runtime-and-compilers.md)
