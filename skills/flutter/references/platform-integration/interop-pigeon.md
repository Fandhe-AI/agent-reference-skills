---
source: https://docs.flutter.dev/interop/pigeon
---

# Pigeon

Pigeon replaces the manual setup of raw platform channels with generated, type-safe APIs between Dart and the host platform, preventing typos in method names and mismatched argument types.

## Signature / Usage

Developer flow: create the Pigeon definition file in Dart (typically outside `lib/`, such as `pigeons/messages.dart`) using `@HostApi` and `@FlutterApi`, run the generator, implement the generated native interfaces in `android/`, `ios/`, or `macos/` and register them with the Flutter engine, then call the generated Dart classes.

For the native interop option, the page says to set these in the `@ConfigurePigeon` section of the definition file: `appDirectory`, `swiftOptions: SwiftOptions(useFfi: true, ffiModuleName: 'Runner')`, and `kotlinOptions: KotlinOptions(useJni: true)`. Create the client with:

```dart
<MyApi>.createWithNativeInteropApi()
```

## Options / Props

| Option | Platforms | Use when |
| --- | --- | --- |
| Native interop (preview, not stable for production) | iOS and macOS through FFIgen, Android through JNIgen | You need synchronous execution on the native platform, high-frequency data streaming (audio or camera frames), or calls from background Dart isolates |
| Platform channels | Android, iOS, macOS, Windows, Linux | You need desktop support on Windows or Linux, or want zero external toolchains |

## Notes

- Constraints: complex inheritance isn't supported (flatten data models); for raw native pointers or C and C++ memory management use FFIgen or JNIgen.
- Async errors with platform channels: `@async` methods generate Kotlin `suspend` and Swift `async throws` functions where native code throws `FlutterError` or `PigeonError` directly; for `@asyncCallback` methods or other target languages, native code returns errors through the completion callback.
- Multiple Flutter engines with native interop: `<MyApi>.createWithNativeInteropApi()` binds to the most recently registered host instance for a given `name` rather than the calling `FlutterEngine` (Flutter issue 195877). Don't register multiple engines under the same `name` before each earlier engine initializes its Dart API client.
- Examples named on the page: Pigeon with native interop, Pigeon with platform channels (the `pigeon` package `example/`), and the `shared_preferences` plugin. Guides: `native_interop_guide.md` and `native_interop_migration_guide.md` in `flutter/packages` `packages/pigeon`.
- The page contains no code block; the snippet above is taken verbatim from its prose, and the options are the ones the page lists.
- Source: https://docs.flutter.dev/interop/pigeon (flutter/website `acea420`, fetched 2026-11-14).

## Related

- [Native interop](./interop-overview.md)
- [FFIgen](./interop-ffigen.md)
- [JNIgen](./interop-jnigen.md)
- [Writing custom platform-specific code (platform channels)](./platform-channels.md)
