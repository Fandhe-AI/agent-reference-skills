---
source: https://docs.flutter.dev/perf/web-performance
---

# Debug performance for web apps

Use the Chrome DevTools performance panel to debug Flutter web performance. The framework emits timeline events as it builds frames, draws scenes, and tracks activity such as garbage collections.

## Signature / Usage

Set any of these top-level properties to `true` in your app's `main` method to configure which timeline events are tracked:

| Flag | Adds `Timeline` events for |
| --- | --- |
| `debugProfileBuildsEnabled` | Every `Widget` built |
| `debugProfileBuildsEnabledUserWidgets` | Every user-created `Widget` built |
| `debugProfileLayoutsEnabled` | Every `RenderObject` layout |
| `debugProfilePaintsEnabled` | Every `RenderObject` painted |

```dart
import 'package:flutter/rendering.dart';

void main() {
  debugProfileBuildsEnabled = true;
  runApp(const MyApp());
}
```

```console
flutter run --profile -d chrome
```

## Instructions

1. Optionally set desired tracing flags to true from `main`.
2. Run your Flutter web app in profile mode.
3. Open the Chrome DevTools Performance panel for your application and start recording to capture timeline events.

## Notes

- Profiling Flutter web apps requires Flutter 3.14 or later.
- You can emit your own timeline events with the `dart:developer` `Timeline` and `TimelineTask` APIs.
- The source page shows no code. The Dart snippet only sets a flag named in the table above inside `main` (as the page instructs); `MyApp` is a placeholder. `flutter run --profile` appears on https://docs.flutter.dev/perf/ui-performance; `-d chrome` selects the web device.
- For web loading speed, see the Flutter blog post "Best practices for optimizing Flutter web loading speed".
- This is Flutter's timeline in Chrome DevTools, not React Profiler (react skill) or Playwright tracing (playwright skill).

## Related

- [Build and release a web app](./deploy-web.md)
- [Web images](./web-images.md)
