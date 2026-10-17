---
source: https://docs.flutter.dev/tools/devtools
---

# Flutter and Dart DevTools

DevTools is a suite of performance and debugging tools for Dart and Flutter. Flutter DevTools and Dart DevTools refer to the same set of tools.

## Signature / Usage

Launch DevTools from VS Code, Android Studio/IntelliJ, or the command line (see "Run DevTools from the command line"). DevTools is distributed as part of the Flutter SDK:

```console
$ flutter upgrade
```

## What you can do

- Inspect the UI layout and state of a Flutter app.
- Diagnose UI jank performance issues in a Flutter app.
- CPU profiling for a Flutter or Dart app.
- Network profiling for a Flutter app.
- Source-level debugging of a Flutter or Dart app.
- Debug memory issues in a Flutter or Dart command-line app.
- View general log and diagnostics information about a running Flutter or Dart command-line app.
- Analyze code and app size.
- Validate deep links in your Android or iOS app.

## Troubleshooting

| Question | Answer |
| --- | --- |
| My app looks janky or stutters. | Performance issues can cause UI frames to be janky and/or slow down some operations. To detect which code impacts concrete late frames, start at Performance > Timeline. To learn which code takes the most CPU time in the background, use the CPU profiler. |
| I see a lot of garbage collection (GC) events. Is this a problem? | Frequent GC events might display on DevTools > Memory > Memory chart. In most cases it's not a problem. If your app has frequent background activity with some idle time, Flutter might use that opportunity to collect the created objects without performance impact. |

## Notes

- DevTools versioning: to get the latest DevTools functionality run `flutter upgrade`. To access DevTools features before they hit the Flutter `stable` channel, consider switching to the `beta` or `main` channels.
- Feedback and issues: the DevTools issue tracker at https://github.com/flutter/devtools/issues
- Use DevTools in conjunction with your existing IDE or command-line workflow. For Dart command-line apps, see the DevTools documentation on dart.dev.
- Flutter / Dart DevTools are distinct from React DevTools (react skill) and from browser test tooling such as playwright.

## Related

- [Use the Flutter inspector](./devtools-inspector.md)
- [Use the Performance view](./devtools-performance.md)
- [Use the CPU profiler view](./devtools-cpu-profiler.md)
- [Use the Memory view](./devtools-memory.md)
- [Run DevTools from the command line](./devtools-cli.md)
- [DevTools 2.60.0 release notes](./devtools-release-notes.md)
