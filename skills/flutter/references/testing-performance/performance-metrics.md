---
source: https://docs.flutter.dev/perf/metrics
---

# Performance metrics

Flutter metrics, and which tools and APIs are used to get them.

## Signature / Usage

```dart
WidgetsBinding.instance.firstFrameRasterized
```

Startup time to the first frame: check the time when `WidgetsBinding.instance.firstFrameRasterized` is true.

## Metrics

| Metric | Source / how to get it |
|--------|------------------------|
| Startup time to the first frame | `WidgetsBinding.instance.firstFrameRasterized`; perf dashboard query `sub_result=timeToFirstFrameRasterizedMicros` |
| Frame `buildDuration`, `rasterDuration`, and `totalSpan` | `FrameTiming` in the API docs (`dart:ui`) |
| Statistics of frame `buildDuration` (`*_frame_build_time_millis`) | Monitor four stats: average, 90th percentile, 99th percentile, and worst frame build time (e.g. `flutter_gallery__transition_perf` test) |
| Statistics of frame `rasterDuration` (`*_frame_build_time_millis`) | Same four stats (e.g. `flutter_gallery__transition_perf` test) |
| CPU/GPU usage (a good approximation for energy use) | Currently only available through trace events; see `profiling_summarizer.dart` (`packages/flutter_driver/lib/src/driver/profiling_summarizer.dart`); `simple_animation_perf_ios` test |
| `release_size_bytes` | Approximately measures the size of a Flutter app via the `basic_material_app_android`, `basic_material_app_ios`, `hello_world_android`, `hello_world_ios`, `flutter_gallery_android`, `flutter_gallery_ios` tests |

For a complete list of performance metrics Flutter measures per commit, visit https://flutter-flutter-perf.skia.org/e/ and https://flutter-engine-perf.skia.org/e/, click **Query**, and filter the **test** and **sub_result** fields.

## Notes

- For info on how to measure the size more accurately, see the app size page. `release_size_bytes` is only approximate.
- The page's metric list item for `rasterDuration` statistics is labeled `*_frame_build_time_millis` in the source, as written there.

## Related

- [Measuring your app's size](./app-size.md)
- [Performance](./performance.md)
