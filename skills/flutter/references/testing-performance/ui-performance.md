---
source: https://docs.flutter.dev/perf/ui-performance
---

# Flutter performance profiling

Where to look when your Flutter app drops frames in the UI: the Performance Overlay, DevTools Performance view, Dart tracing, benchmarking, and the widget rebuild profiler.

## Signature / Usage

```console
$ flutter run --profile
```

Almost all performance debugging should be conducted on a physical Android or iOS device, with your app running in profile mode. Launch in profile mode by:

- VS Code: open `launch.json` and set the `flutterMode` property to `profile` (when done profiling, change it back to `release` or `debug`):

  ```json
  "configurations": [
    {
      "name": "Flutter",
      "request": "launch",
      "type": "dart",
      "flutterMode": "profile"
    }
  ]
  ```

- Android Studio and IntelliJ: **Run > Flutter Run main.dart in Profile Mode**.
- Command line: the `--profile` flag as above.

## Overview

Flutter offers several tools for performance analysis:

- **The Performance Overlay**: displays a simplified set of metrics directly within your running app.
- **The Performance View**: a web-based interface (part of DevTools) that connects to your app and displays detailed performance metrics.
- **Performance tracing within Dart**: add tracing directly into your app's Dart code, using the `dart:developer` package, and track performance in DevTools.
- **Benchmarking**: write benchmark tests; the Flutter Driver library provides support, so you can generate metrics that track jank, download size, battery efficiency, and startup time.
- **Widget rebuild profiler (IntelliJ for Android Studio)**: shows widget rebuild counts for the current screen and frame.

Flutter aims to provide 60 frames per second (fps) performance, or 120 fps on devices that support it. To achieve 60fps, each frame must render approximately every 16ms to avoid jank. Jank occurs when frames take significantly longer to render and are dropped, resulting in a visible stutter in animations.

## Connect to a physical device

Using debug mode, or running apps on simulators or emulators, is generally not indicative of the final behavior of release mode builds. You should consider checking performance on the slowest device that your users might reasonably use.

- Simulators and emulators don't use the same hardware, so their performance characteristics are different; some operations are faster on simulators than real devices, and some are slower.
- Debug mode enables additional checks (such as asserts) that don't run in profile or release builds, and these checks can be expensive.
- Debug mode also executes code in a different way than release mode. The debug build compiles the Dart code "just in time" (JIT) as the app runs, but profile and release builds are pre-compiled to native instructions ("ahead of time", AOT) before the app is loaded onto the device. JIT can cause the app to pause for JIT compilation, which itself can cause jank.

## Run in profile mode

Flutter's profile mode compiles and launches your application almost identically to release mode, but with just enough additional functionality to allow debugging performance problems. For example, profile mode provides tracing information to the profiling tools.

## Launch DevTools and display the performance overlay

DevTools provides features like profiling, examining the heap, displaying code coverage, enabling the performance overlay, and a step-by-step debugger. Once your app is running in profile mode, launch DevTools. Toggle the performance overlay:

- **DevTools Performance view**: click the **Performance Overlay** button to toggle the overlay on your running app.
- **Command line**: toggle with the **P** key.
- **Programmatically**: see "Performance overlay" in "Debugging Flutter apps programmatically".

## Observe the performance overlay

The performance overlay displays statistics in two graphs that show where time is being spent in your app. The graphs display on top of your running app, but the Flutter engine itself paints the overlay and only minimally impacts performance. Each graph represents the last 300 frames for that thread.

### Review the graphs

- The top graph (marked "GPU") shows the time spent by the raster thread; the bottom graph shows the time spent by the UI thread.
- The white lines across the graphs show 16ms increments along the vertical axis; if the graph ever goes over one of these lines then you are running at less than 60Hz. The horizontal axis represents frames. The graph is only updated when your application paints, so if it's idle the graph stops moving.
- Always view the overlay in profile mode, since debug mode performance is intentionally sacrificed in exchange for expensive asserts.
- A frame exceeding 1/60th of a second (approximately 16ms) in either graph fails to display, resulting in jank, and a vertical red bar appears in one or both graphs. If a red bar appears in the UI graph, the Dart code is too expensive. If a red vertical bar appears in the GPU graph, the scene is too complicated to render quickly. When both graphs display red, start by diagnosing the UI thread.

### Review the threads

Flutter uses several threads, though only two are shown in the overlay. All of your Dart code runs on the UI thread.

| Thread | Description |
|--------|-------------|
| Platform thread | The platform's main thread. Plugin code runs here. _Not shown in the performance overlay._ |
| UI thread | Executes Dart code in the Dart VM, including code you wrote and code executed by Flutter's framework on your app's behalf. When your app creates and displays a scene, the UI thread creates a _layer tree_ (a lightweight object containing device-agnostic painting commands) and sends it to the raster thread. _Don't block this thread!_ Shown in the bottom row of the overlay. |
| Raster thread | Takes the layer tree and displays it by talking to the GPU. You cannot directly access the raster thread or its data but, if it is slow, it's a result of something done in the Dart code. Skia and Impeller, the graphics libraries, run on this thread. Shown in the top row of the overlay. The thread itself runs on the CPU. |
| I/O thread | Performs expensive tasks (mostly I/O) that would otherwise block either the UI or raster threads. _Not shown in the performance overlay._ |

## Identify problems

### Review the UI graph

If the performance overlay shows red in the UI graph, start by profiling the Dart VM, even if the GPU graph also shows red.

### Review the GPU graph

Sometimes a scene results in a layer tree that is easy to construct, but expensive to render on the raster thread. When this happens, the UI graph has no red, but the GPU graph shows red. Specific kinds of workloads are more difficult for the GPU. They might involve unnecessary calls to `saveLayer`, intersecting opacities with multiple objects, and clips or shadows in specific situations.

If you suspect that the source of the slowness is during an animation, click the **Slow Animations** button in the Flutter inspector to slow animations down by 5x (or do this programmatically). Is the slowness on the first frame, or on the whole animation? If it's the whole animation, is clipping causing the slow down? Maybe there's an alternative way of drawing the scene that doesn't use clipping (for example, overlay opaque corners onto a square instead of clipping to a rounded rectangle). If it's a static scene that's being faded, rotated, or otherwise manipulated, a `RepaintBoundary` might help.

#### Checking for offscreen layers

The `saveLayer` method is one of the most expensive methods in the Flutter framework. It's useful when applying post-processing to the scene, but it can slow your app and should be avoided if you don't need it. Implicit calls might happen on your behalf, for example when specifying `Clip.antiAliasWithSaveLayer` (typically as a `clipBehavior`). For a group of objects with opacities rendered using `saveLayer`, it's probably more performant to apply an opacity to each individual widget, rather than a parent widget higher up in the widget tree. The same goes for clipping or shadows.

When you encounter calls to `saveLayer`, ask yourself:

- Does the app need this effect?
- Can any of these calls be eliminated?
- Can I apply the same effect to an individual element instead of a group?

#### Checking for non-cached images

Caching an image with `RepaintBoundary` is good, _when it makes sense_. One of the most expensive operations, from a resource perspective, is rendering a texture using an image file. First, the compressed image is fetched from persistent storage. The image is decompressed into host memory (GPU memory), and transferred to device memory (RAM). Image I/O can be expensive. The cache provides snapshots of complex hierarchies so they are easier to render in subsequent frames. _Because raster cache entries are expensive to construct and take up loads of GPU memory, cache images only where absolutely necessary._

## Notes

- Dart/Flutter DevTools can't connect to a Flutter web app running in profile mode. Use Chrome DevTools to generate timeline events for a web app.
- Other resources linked by the page: Debugging, Performance view, Flutter inspector, DevTools, and the `PerformanceOverlay` class and `dart:developer` package in the Flutter API docs.

## Related

- [Debug Flutter apps from code](./code-debugging.md)
- [Performance best practices](./performance-best-practices.md)
- [Improving rendering performance](./rendering-performance.md)
