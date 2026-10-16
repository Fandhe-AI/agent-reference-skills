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
| rocprofv3 | Command-line interface for ROCprofiler-SDK; no code changes needed, including advanced features such as ATT, PC sampling, and SPM |
| ROCprof Compute Viewer | Desktop GUI for visualizing instruction-level ATT data (wavefront execution timelines, ISA hotspots, stall attribution) |
| ROCm Optiq | Unified visualization application for profiling data from ROCm Systems Profiler and ROCm Compute Profiler (ROCm Extras; beta) |
| ROCr Debug Agent | Prints the state of all AMD GPU wavefronts that caused a queue error |

## Notes

- ROCm Core SDK 10.1.0 (ROCprofiler-SDK 1.4.1, ROCm Systems Profiler 1.9.0, ROCm Compute Profiler 3.9.0, ROCgdb 16.3, ROCdbgapi 0.80.0, ROCr Debug Agent 2.2.0)
- The official overview page (`components/profiling-tools-overview`) describes six profiling tools built on ROCprofiler-SDK, and the selection page (`components/profiling-tools-selection`) gives guidance on choosing one; work top-down from system level (ROCm Systems Profiler) to kernel level (ROCm Compute Profiler) to instruction level (rocprofv3 ATT with ROCprof Compute Viewer)
- ROCm Systems Profiler 1.9.0 removed the deprecated `rocprof-sys-user` library and its C API (`rocprofsys_user_*`, `<rocprofiler-systems/user.h>`), including the `user` find_package component; use ROCTx (`rocprofiler-sdk-roctx`) instead. The causal macros moved to `rocprof-sys-causal-api` (`find_package(rocprofiler-systems COMPONENTS causal-api)`)
- ROCm Systems Profiler: rocpd (`rocpd.db`) is now the default output format; Perfetto output needs `--output-format proto`
- ROCm Compute Profiler 3.9.0 removed the CSV output backend, `--format-rocprof-output`, and `--join-type`; profiling always writes `rocpd`, and workloads captured with the CSV backend by an earlier release must be profiled again before analysis
- ROCprofiler-SDK 1.4.1 adds kernel replay (Beta; `rocprofv3 --replay-mode kernel --kernel-replay-beta-enabled`, requires `--pmc`) and HIP event tracing (`hipEventRecord` / `hipStreamWaitEvent`)
- ROCgdb 16.3 shows the Clang `__builtin_verbose_trap` diagnostic frame (`__clang_trap_msg$<category>$<message>`) as frame #0 in backtraces
- Profiling and GPU debugging (`rocgdb`, ROCr Debug Agent) are not supported on WSL2 in 10.1.0
- ROCgdb is a user-facing debugger; ROCdbgapi is the lower-level library it (and other debuggers) is built on
- ROCprofiler-SDK is the toolkit for building custom profiling tools; ROCm Compute Profiler and ROCm Systems Profiler are the ready-to-use profiler applications built on top of it

## Related

- [Control and Monitoring Tools](./control-monitoring-tools.md)
- [Runtime and Compilers](./runtime-and-compilers.md)
