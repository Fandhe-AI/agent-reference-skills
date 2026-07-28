# WinUI performance optimization with WPR/WPA

Using Windows Performance Recorder (WPR) and Windows Performance Analyzer (WPA), including the "XAML Frame Analysis" plugin, to profile WinUI apps at the frame level.

## Signature / Usage

```text
# In WPR (GUI), select the "CPU usage" and "XAML activity" profiles, then start/stop a recording.
# Open the resulting .etl in WPA (requires Windows ADK 10.1.26100.1+ for XAML Frame Analysis).
```

## Options / Props

| WPA "XAML Frame Analysis" column | Meaning |
|-----------------------------------|---------|
| Type | Event kind: `WXM::InitializeForCurrentThread`, `DWXS::Initialize`, `Frame`, `Create graphics device`, `UpdateLayout`, `Frame::Navigating`, `Frame::Navigated`, `Hwnd Focus`, `Region of Interest` |
| IsInteresting | Whether the row matches heuristics for likely responsiveness problems |
| Duration (ms) | Computed duration from Start/Stop events |
| Weight (ms) | Actual CPU execution time within the duration |

## Notes

- WinUI is a retained-mode, declarative API: the UI thread runs layout/render in batches called "frames", ideally completing within one display refresh interval; slow frames both delay display updates and block input handling.
- Enable the plugin by adding `perf_xaml.dll` to `perfcore.ini` in the WPA install folder (e.g. `C:\Program Files (x86)\Windows Kits\10\Windows Performance Toolkit`), then restart WPA.
- Two views are available: "Interesting Xaml Frames" (heuristic-filtered) and "All Xaml Info" (every frame in every process in the trace).
- This is a Windows Performance Toolkit-specific workflow, distinct from Visual Studio's Performance Profiler / XAML UI Responsiveness tool described in `profiling-tools.md`.

## Related

- [Tools for profiling and performance](./profiling-tools.md)
- [Choosing between Visual Studio Performance Profiler, WPT, and PerfView](./choose-between-tools.md)
