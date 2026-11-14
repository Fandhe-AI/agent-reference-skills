---
source: https://docs.flutter.dev/interop/jnigen
---

# JNIgen

JNIgen (Java Native Interface generator) creates type-safe Dart bindings for Java and Kotlin libraries and APIs, so Android APIs can be called directly and synchronously from Dart.

## Signature / Usage

Developer flow: reference the native classes or JARs, write the configuration script (typically `tool/jnigen.dart`), generate the bindings by running it, and call the generated code from Dart.

```console
dart run tool/jnigen.dart
```

Trace JNI allocation bugs such as `DoubleReleaseError` and `UseAfterReleaseError`:

```dart
Jni.captureStackTraceOnRelease = true;
```

## Options / Props

| Topic | Detail |
| --- | --- |
| Input | Java classes and packages, compiled JAR or AAR files, Android SDK packages |
| Threading | Calls run synchronously on the calling thread. Use `runOnPlatformThread` from `dart:ui` for APIs that must run on the platform thread. Dart callbacks from Java run on the isolate that created them, which can deadlock if a blocked Java thread waits for a blocked Dart thread |
| Object lifecycle | JNI wrappers use Java global references with a hard limit of 50,000 active references; call `.release()` or use `.using()` blocks; use `WeakReference` to break Dart/Java GC reference cycles when implementing interfaces |
| Runtime type checks | Wrappers are Dart extension types compiled down to `JObject`; `is` and `as` don't check the Java runtime type, use `x.isA(Foo.type)` and `x.as(Foo.type)` |

## Notes

- When the native API changes, update the configuration script and regenerate the bindings.
- Recommended when you need high-performance, low-latency interop or to pass large amounts of raw data between Dart and the JVM; use Pigeon instead for standard cross-platform plugins without critical data transfers.
- Examples named on the page: the `permissions_plugin` and `android_toast_demo` in the Flutter native interop demos repository, and `package:cronet_http` (wraps the Android Cronet HTTP library).
- The page contains no code block; the snippets above are taken verbatim from its prose.
- This page covers the Dart-side generator; the Android APIs it wraps belong to the `android-*` skills.
- Source: https://docs.flutter.dev/interop/jnigen (flutter/website `acea420`, fetched 2026-11-14).

## Related

- [Native interop](./interop-overview.md)
- [Interact with native memory using dart:ffi](./interop-dart-ffi.md)
- [Pigeon](./interop-pigeon.md)
- [Calling JetPack APIs](./android-call-jetpack-apis.md)
