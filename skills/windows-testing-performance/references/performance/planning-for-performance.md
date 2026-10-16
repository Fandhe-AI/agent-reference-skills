# Planning for performance

Treat performance as a feature: specify measurable goals (time, fluidity, efficiency), design and instrument for them, then measure early and often against those goals.

## Signature / Usage

```csharp
// using Windows.Foundation.Diagnostics;
// ...

LoggingChannel myLoggingChannel = new LoggingChannel("MyLoggingChannel");

myLoggingChannel.LogMessage("Here's my logged message.", LoggingLevel.Information);

// ...
```

Log start and stop events over a period with a `LoggingActivity`:

```csharp
LoggingActivity myLoggingActivity;

// myLoggingChannel is defined and initialized in the previous code example.
using (myLoggingActivity = new LoggingActivity("MyLoggingActivity", myLoggingChannel))
{   // After this logging activity starts, a start event is logged.

    // Add code here to do something of interest.

}   // After this logging activity ends, an end event is logged.
```

## Options / Props

Suggested interaction classes (label, perception, ideal, maximum):

| Interaction class | User perception | Ideal | Maximum | Examples |
|-------------------|-----------------|-------|---------|----------|
| Fast | Minimally noticeable delay | 100 ms | 200 ms | Bring up the app bar; press a button (first response) |
| Typical | Quick, but not fast | 300 ms | 500 ms | Resize; semantic zoom |
| Responsive | Not quick, but feels responsive | 500 ms | 1 s | Navigate to a different page; resume from suspended state |
| Launch | Competitive experience | 1 s | 3 s | Launch the app for the first time or after termination |
| Continuous | No longer feels responsive | 500 ms | 5 s | Download a file from the Internet |
| Captive | Long; user could switch away | 500 ms | 10 s | Install multiple apps from the Store |

Goal categories:

| Category | Example measurable goals |
|----------|--------------------------|
| Time | Interaction class per scenario time point (first response, responsive, visible complete) |
| Fluidity | No redraw glitches; animations at 60 FPS; 3-6 pages of content per second while panning/scrolling |
| Efficiency | CPU % at or below N and memory MB at or below M; zero when inactive; X hours active / Y hours idle on battery |

## Notes

- Logging APIs are in the `Windows.Foundation.Diagnostics` namespace (`FileLoggingSession`, `LoggingActivity`, `LoggingChannel`, `LoggingSession`), backed by Event Tracing for Windows (ETW). View the events with Windows Performance Recorder / Windows Performance Analyzer.
- Design guidance: update ListView/GridView items incrementally; defer UI with `x:Load`; same-size items in ListView/GridView; prefer theme transitions over storyboarded animations; load images at the displayed size with `GetThumbnailAsync`; release expensive resources such as media on suspend; unregister event handlers to avoid leaks.
- Data access: prefetch with `ContentPrefetcher` or `MaintenanceTrigger`; cache with `LocalFolder` / `LocalSettings`; show placeholder UI on cache misses without shifting content under the pointer.
- Launch and resume: defer and do not extend the splash screen unless necessary; disable animations right after the splash screen is dismissed. For adaptive UI use `VisualStateManager`; the app has about 200 to 800 ms to complete work before the UI is seen cropped.
- Testing: use release builds (native code), turn off background apps, trigger automatic maintenance manually, run multiple times, test varied hardware and screen sizes. As a heuristic, expect a low-power device to run at about a quarter the speed of a desktop PC.
- Visual Studio gives app-focused analysis; Windows Performance Analyzer gives system-focused analysis (disk I/O, GPU cost, touch events).
- In the source page, the `using (...)` line of the `LoggingActivity` sample has unbalanced parentheses, and the `LoggingChannel` sample's message string is spelled `"Here' s my logged message."`. Both were corrected on this page. The source `LoggingChannel` example also passes the arguments as `(LoggingLevel, string)`, but the API reference signature is `LogMessage(string eventString, LoggingLevel level)`, so the order was changed to match it (https://learn.microsoft.com/en-us/uwp/api/windows.foundation.diagnostics.loggingchannel.logmessage).
- The interaction classes above come from this planning guide; the [Responsive interactions](./responsive.md) page is based on a different official page and uses a different classification (Interactive / Pause / Wait, etc.).
- Optimize only performance-critical code paths identified by profiling.
- Source: https://learn.microsoft.com/en-us/windows/uwp/debug-test-perf/planning-and-measuring-performance (windows-dev-docs commit a3812316d9d6678be4e526ffb4b1c4f3958d956d).
- This is a UWP-era planning guide (page ms.date 07/14/2025); the same goal-setting approach applies to WinUI 3 apps.

## Related

- [Optimize ListView and GridView](./optimize-gridview-and-listview.md)
- [Optimize your XAML loading](./optimize-xaml-loading.md)
- [Profiling tools](./profiling-tools.md)
- [Responsive interactions and latency measurement](./responsive.md)
