---
source: https://docs.flutter.dev/interop
---

# Native interop

Overview of Flutter's tools for calling platform-specific code: FFIgen and JNIgen (bottom-up generators of direct bindings), Pigeon (top-down generator from a single Dart schema), `dart:ffi`, and how to package interop code.

## Signature / Usage

Package options named on the page:

```console
$ flutter create --template=plugin
$ flutter create --template=package_ffi
```

Tool selection by target language:

| Target language | Direct interop | Pigeon |
| --- | --- | --- |
| C | FFIgen | Supported on Linux (GObject) with platform channels |
| C++ with `extern "C"` | FFIgen | Supported on Windows with platform channels |
| C++ without `extern "C"` | FFIgen (not yet supported) | Supported on Windows with platform channels |
| Rust with `extern "C"` | FFIgen | Not supported directly |
| Rust without `extern "C"` | Flutter Rust Bridge | Not supported |
| Go with `extern "C"` | FFIgen | Not supported directly |
| Go without `extern "C"` | Not supported | Not supported |
| Java | JNIgen | Supported with platform channels, or through Kotlin with native interop (preview) |
| Kotlin | JNIgen | Supported with platform channels or native interop (preview) |
| Objective-C | FFIgen | Supported with platform channels, or through Swift with native interop (preview) |
| Swift without Obj-C compatibility annotations | `package:swiftgen` (experimental) | Supported with platform channels or native interop (preview) |

## Options / Props

| Approach | Tool | How it works |
| --- | --- | --- |
| Bottom-up | FFIgen | Parses C and Objective-C headers (including `@objc`-annotated Swift) and generates direct `dart:ffi` bindings |
| Bottom-up | JNIgen | Inspects Java and Kotlin classes, JAR and AAR files, or Android SDK packages and generates direct JNI bindings |
| Top-down | Pigeon | Starts from a single Dart schema; generates matching Dart and host interfaces over platform channels, with a preview mode that generates direct bindings using FFIgen (iOS, macOS) and JNIgen (Android) |

Packaging choices: in-app integration (no separate package); plugin (`flutter create --template=plugin`); FFI package (`flutter create --template=package_ffi`, build hooks plus `dart:ffi` and an FFIgen configuration).

Interop layers: Layer 1 low-level bindings (`dart:ffi`, `dart:js_interop`, FFIgen, JNIgen); Layer 2 idiomatic Dart APIs (Pigeon, the `sqlite3` package); Layer 3 framework-specific plugins (the Flutter Plugin API).

## Notes

- Bottom-up generators produce bindings that call native code without serialization overhead, so managing native memory lifetimes and threading in Dart code is the developer's responsibility.
- Direct interop: lower-level bindings with higher performance for large data; Pigeon: structured, type-safe code generator for cross-platform boundary contracts.
- Flutter 3.50 announcement: FFIgen (C and Objective-C) and JNIgen are stable; Pigeon's native interop mode is a preview.
- This page covers Flutter's Dart-side interop tooling; the platform APIs themselves belong to the `android-*` and `apple-*` skills.
- Source: https://docs.flutter.dev/interop (flutter/website `acea420`, fetched 2026-11-14).

## Related

- [FFIgen](./interop-ffigen.md)
- [JNIgen](./interop-jnigen.md)
- [Pigeon](./interop-pigeon.md)
- [Interact with native memory using dart:ffi](./interop-dart-ffi.md)
- [Bind to native code using FFI](./bind-native-code.md)
- [Writing custom platform-specific code (platform channels)](./platform-channels.md)
