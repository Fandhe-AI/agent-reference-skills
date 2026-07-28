# Tools for profiling and performance

Overview of Visual Studio diagnostic tools, the Windows Performance Toolkit, and .NET diagnostic tools available for Windows App SDK apps.

## Signature / Usage

```text
Debug > Performance Profiler   (Visual Studio: CPU Usage, Memory Usage, XAML UI Responsiveness)
wpr.exe / wpa.exe              (Windows Performance Toolkit: system-wide ETW traces)
dotnet-counters / dotnet-trace / dotnet-dump   (.NET runtime diagnostics)
```

## Options / Props

| Tool | Purpose |
|------|---------|
| Visual Studio CPU Usage | Identify functions/code paths consuming the most CPU time |
| Visual Studio Memory Usage | Track memory allocations and find memory leaks |
| Visual Studio XAML UI Responsiveness tool | Measure the performance impact of XAML operations (layout, rendering, loading) |
| Windows Performance Recorder (WPR) | Capture system-wide traces (CPU, disk, memory) |
| Windows Performance Analyzer (WPA) | Visualize/analyze WPR traces (system info, touch, disk I/O, GPU cost) |
| `dotnet-counters` | Real-time .NET runtime performance counters |
| `dotnet-trace` | Detailed .NET runtime trace collection |
| `dotnet-dump` | Capture/analyze process dumps for memory diagnosis |

## Notes

- This page is the entry-point tool catalog; for guidance on which tool to pick, see the dedicated comparison guide.
- Namespace/tool scope: Visual Studio diagnostic tools and WPT are general Windows tools (not XAML-specific); the XAML UI Responsiveness tool and "XAML Frame Analysis" WPA plugin (see `winui-perf.md`) are specific to WinUI/XAML apps.

## Related

- [Choosing between Visual Studio Performance Profiler, WPT, and PerfView](./choose-between-tools.md)
- [WinUI performance optimization with WPR/WPA](./winui-perf.md)
- [XAML analysis and best practices](./xaml-analysis.md)
