---
source: https://docs.flutter.dev/tools/devtools/performance
---

# Use the Performance view

The performance page offers timing and performance information to diagnose performance problems and UI jank. It works for Flutter mobile and desktop apps; for web apps, Flutter adds timeline events to the performance panel of Chrome DevTools instead.

## Signature / Usage

Use a profile build to analyze performance (frame rendering times in debug mode aren't indicative of release performance):

```console
$ flutter run --profile
```

Tools in the view: Flutter frames chart (Flutter apps only), Frame analysis tab (Flutter apps only), Timeline events trace viewer (all native Dart applications), Advanced debugging tools (Flutter apps only). Snapshots can be exported (button above the frame chart) and imported by drag and drop; only files exported from DevTools can be imported.

## What is a frame?

Flutter renders its UI at 60 fps, or 120 fps on devices capable of 120Hz updates; each render is a frame. A frame that takes longer than ~16ms causes jank.

## Flutter frames chart

Each pair of bars is one frame, color-coded into UI thread and raster thread work. Selecting a frame updates the Frame analysis or Timeline events tab. Pause updates with the pause button; collapse with the **Flutter frames** button.

| Part | Description |
| --- | --- |
| UI | The UI thread executes Dart code in the Dart VM (application and framework). It creates a layer tree (device-agnostic painting commands) and sends it to the raster thread. Do not block this thread. |
| Raster | The raster thread executes graphics code from the Flutter Engine, taking the layer tree and talking to the GPU. If slow, it is a result of something done in Dart code (for example unnecessary `saveLayer()` calls, intersecting opacities with multiple objects, clips or shadows). Skia and Impeller use this thread. |
| Jank | Shown with a red overlay; a frame is janky if it takes more than ~16 ms (60 FPS devices). |
| Shader compilation | Frames that perform shader compilation are marked in dark red. |

## Frame analysis tab

Selecting a janky frame shows debugging hints and notes expensive operations that might have contributed to the slow frame.

## Timeline events tab

Shows all event tracing: the framework emits events as it builds frames, draws scenes, and tracks HTTP request timings and garbage collection. Send your own events with the `dart:developer` `Timeline` and `TimelineTask` APIs. The **?** button shows trace viewer help; the refresh button loads new events.

## Advanced debugging tools

- Enhance tracing: dropdown options for more detailed tracing (frame times might be negatively affected).
- Track Widget Builds: shows `build()` method events with widget names.
- Track Layouts: shows render object layout events.
- Track Paints: shows render object paint events.
- More debugging options (enabled by default; toggle off to diagnose): Render Clip layers, Render Opacity layers, Render Physical Shape layers. If raster time significantly decreases with a layer disabled, excessive use of that effect might contribute to the jank.

## Notes

- Flutter DevTools performance view (Dart) is distinct from React DevTools (react skill).

## Related

- [Flutter and Dart DevTools](./devtools.md)
- [Use the CPU profiler view](./devtools-cpu-profiler.md)
- [Use the Memory view](./devtools-memory.md)
