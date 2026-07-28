# Choosing between Visual Studio Performance Profiler, WPT, and PerfView

Guidance for selecting between Visual Studio Performance Profiler, Windows Performance Toolkit (WPR/WPA), and PerfView for general-purpose performance profiling of Windows apps.

## Signature / Usage

Rule of thumb: start with Visual Studio Performance Profiler; move to Windows Performance Toolkit or PerfView when reaching the limits of the Visual Studio tools.

```text
Visual Studio Performance Profiler  -> single project/process, .NET/C++, quick turnaround
Windows Performance Toolkit (WPR/WPA) -> system-wide, multi-process, hardware/drivers, composition, ETW
PerfView                             -> deep .NET runtime diagnostics (GC, JIT, thread pool), easy to deploy (copy PerfView.exe)
```

## Options / Props

| Tool | Best for | Not for |
|------|----------|---------|
| Visual Studio Performance Profiler | Single process/project, CPU/GPU/memory, .NET & database timing | Multi-process, power usage, composition, WebView/Edge |
| Windows Performance Toolkit (WPR + WPA) | System-wide traces, multi-process, hardware I/O, power, composition, XAML/WinUI | Managed object allocation & GC detail |
| PerfView | .NET runtime diagnostics (GC, JIT, thread pool), flight-recorder mode, production deployment | GPU usage |

## Notes

- Visual Studio Performance Profiler is installed via the Visual Studio installer; the command-line `wpr.exe` recorder ships with Windows 10/11; the Windows Performance Analyzer is a separate Microsoft Store app; PerfView is a standalone `.exe` from its GitHub Releases page.
- Windows Performance Toolkit exposes extensibility points: the Microsoft Performance Toolkit SDK (custom WPA plugins) and .NET TraceProcessing (custom automated trace analysis).
- Symbols must be available (locally built or from a symbol server) for meaningful analysis in any of the three tools.

## Related

- [Tools for profiling and performance](./profiling-tools.md)
- [Disk use and memory improvements](./disk-memory.md)
- [Power consumption improvements](./power.md)
