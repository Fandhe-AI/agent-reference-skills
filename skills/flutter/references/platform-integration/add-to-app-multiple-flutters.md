---
source: https://docs.flutter.dev/add-to-app/multiple-flutters
---

# Multiple Flutter screens or views

How to integrate multiple instances of the Flutter engine, screens, or views into one application using `FlutterEngineGroup`.

## Signature / Usage

The source page contains no code listing. The primary API on Android and iOS is the `FlutterEngineGroup` class, used to construct `FlutterEngine`s instead of the previous `FlutterEngine` constructors:

```text
Android API: shell/platform/android/io/flutter/embedding/engine/FlutterEngineGroup.java
iOS API:     shell/platform/darwin/ios/framework/Headers/FlutterEngineGroup.h
```

## Options / Props

| Behavior | Detail |
| --- | --- |
| Shared resources | `FlutterEngine`s spawned from the same `FlutterEngineGroup` share common resources such as the GPU context, font metrics, and isolate group snapshot, giving faster initial rendering latency and lower memory footprint. |
| UI classes | Spawned engines connect to `FlutterActivity` or `FlutterViewController` the same way as normally constructed cached `FlutterEngine`s. |
| First engine | The first spawned engine need not keep surviving, as long as at least 1 `FlutterEngine` is alive at all times. Creating the very first engine has the same performance characteristics as the previous constructors. |
| All engines destroyed | The next engine created has the same characteristics as the very first engine. |
| Group lifetime | The `FlutterEngineGroup` need not outlive the spawned engines; destroying it does not affect existing engines but removes the ability to spawn more that share resources. |

## Notes

- Scenarios: an app where the Flutter screen is not a leaf node of the navigation graph (a hybrid native -> Flutter -> native -> Flutter stack), and a screen where multiple partial-screen Flutter views are visible at once.
- Each instance is independent and maintains its own internal navigation stack, UI, and application state, which simplifies state keeping and improves modularity.
- Incremental memory cost for adding additional Flutter instances is low (~180kB).
- Communication between Flutter instances uses platform channels (or Pigeon) through the host platform. The communication roadmap is tracked in flutter issue 72009.
- A sample using `FlutterEngineGroup` on Android and iOS is `add_to_app/multiple_flutters` in the samples repository.
- This is the Flutter embedder API for host apps. Host-side Android/iOS development belongs to the `android-*` skills and the `apple-*` skills.

## Related

- [add-to-app](./add-to-app.md)
- [platform-channels](./platform-channels.md)
