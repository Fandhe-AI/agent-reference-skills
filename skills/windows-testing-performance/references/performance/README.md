# performance

| Name | Description | Path |
|------|-------------|------|
| Choosing between Visual Studio Performance Profiler, WPT, and PerfView | Comparison guide for selecting a general-purpose profiling tool | [choose-between-tools.md](./choose-between-tools.md) |
| Disk use and memory improvements | Working set/dynamic memory analysis, memory leak detection, disk footprint reduction | [disk-memory.md](./disk-memory.md) |
| Improve garbage collection performance | .NET GC generations, reducing memory consumption and collection time in WinUI apps | [improve-garbage-collection-performance.md](./improve-garbage-collection-performance.md) |
| Power consumption improvements | Trace-based methodology for finding unnecessary background CPU/vsync wakes | [power.md](./power.md) |
| Responsive interactions and latency measurement | Interaction-class latency goals and ETW-based measurement methodology | [responsive.md](./responsive.md) |
| Keep the UI thread responsive | `DispatcherQueue`, async APIs, and background-thread offloading | [keep-ui-thread-responsive.md](./keep-ui-thread-responsive.md) |
| WinUI performance optimization with WPR/WPA | Frame-level profiling with the WPA "XAML Frame Analysis" plugin | [winui-perf.md](./winui-perf.md) |
| Best practices for WinUI app startup performance | Startup stages, `x:Load` deferral, `Frame` navigation caching | [app-startup-performance.md](./app-startup-performance.md) |
| MVVM performance tips for WinUI apps | `{x:Bind}` vs `{Binding}`, `ICommand` allocation cost, deferred view state | [mvvm-performance-tips.md](./mvvm-performance-tips.md) |
| Optimize animations, media, and images | Independent vs. dependent animations, `CacheMode`, media/image decode tuning | [optimize-animations-and-media.md](./optimize-animations-and-media.md) |
| Optimize file access | `QueryOptions` property prefetch, stream buffering tuning | [optimize-file-access.md](./optimize-file-access.md) |
| Optimize ListView and GridView performance | UI virtualization, element reduction, `x:Phase`, container recycling | [optimize-gridview-and-listview.md](./optimize-gridview-and-listview.md) |
| ListView and GridView data virtualization | `ISupportIncrementalLoading`, `IItemsRangeInfo` incremental/random-access loading | [listview-and-gridview-data-optimization.md](./listview-and-gridview-data-optimization.md) |
| Optimize your XAML layout | Panel nesting reduction, single-cell `Grid`, built-in border properties | [optimize-xaml-layout.md](./optimize-xaml-layout.md) |
| Optimize XAML loading | `x:Load` deferred loading, resource dictionary scoping, overdraw reduction | [optimize-xaml-loading.md](./optimize-xaml-loading.md) |
| Manage app state effectively | Saving/restoring state in a non-suspending desktop app, `AppWindow.Closing` | [state-management.md](./state-management.md) |
| Tools for profiling and performance | Catalog of Visual Studio, WPT, and .NET diagnostic tools | [profiling-tools.md](./profiling-tools.md) |
| XAML analysis and best practices | Visual Studio XAML analysis tool ruleset checklist | [xaml-analysis.md](./xaml-analysis.md) |
| Optimize background activity | `PowerManager`, timer scheduling, background task cancellation | [optimize-background-activity.md](./optimize-background-activity.md) |
