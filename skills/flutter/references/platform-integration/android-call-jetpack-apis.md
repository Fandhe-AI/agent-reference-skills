---
source: https://docs.flutter.dev/platform-integration/android/call-jetpack-apis
---

# Calling JetPack APIs

Flutter apps on Android can use the latest Android APIs the first day they are released. This page outlines the available ways to invoke Android-specific APIs from Dart.

## Signature / Usage

Order of preference from the source: use an existing plugin from pub.dev, otherwise call native code via FFI or add a `MethodChannel`.

```dart
// Dart side: a MethodChannel invoking arbitrary native code (always asynchronous).
const platformMethodChannel = MethodChannel('com.example.flutter_android_activity');

platformMethodChannel.invokeMethod('launchActivity', {'message': 'Hello from Flutter'});
```

## Options / Props

| Approach | Characteristics |
| --- | --- |
| Plugin (pub.dev) | Often the easiest way to access native APIs; most native features, including GPS, camera, or step counters, are supported by robust plugins. |
| FFI (`ffigen` / `jnigen` for glue code) | Most direct and efficient; links the Dart executable to native code at compile time and calls it directly from the UI thread through a small amount of glue code. |
| `MethodChannel` (`pkg:pigeon` for glue code) | Always asynchronous; requires a small amount of glue code to translate Dart objects into native objects and back. |

## Notes

- Not all native features are supported by plugins, especially immediately after release. Neither custom solution is inherently better than existing plugins, because all plugins use one of the two options.
- The source says the Dart team hopes to make the FFI approach easier "in the coming months" with direct support for calling native APIs without developer-written glue code.
- Complete guidance: using packages, the FFI documentation (dart.dev C interop), and the platform channels page.
- This is the Flutter-side route to Android APIs. The Jetpack APIs themselves are covered by the android-* skills (android-platform-core, android-architecture, android-background-work and others).

## Related

- [platform-channels](./platform-channels.md)
- [bind-native-code](./bind-native-code.md)
- [android-compose-activity](./android-compose-activity.md)
