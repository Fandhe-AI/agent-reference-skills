---
source: https://docs.flutter.dev/interop/ffigen
---

# FFIgen

FFIgen (the Foreign Function Interface generator) creates type-safe Dart bindings for C libraries and Apple frameworks (Objective-C and Swift), so iOS and macOS APIs can be called directly and synchronously from Dart.

## Signature / Usage

Developer flow: reference the native headers, write the configuration script (typically `tool/ffigen.dart`), generate the bindings by running it, and call the generated code from Dart.

```console
dart run tool/ffigen.dart
```

## Options / Props

| Topic | Detail |
| --- | --- |
| Input | C and Objective-C headers; `@objc`-annotated Swift classes (Swift interop is experimental) |
| C++ | Expose a C-compatible interface around the C++ code; FFIgen can't parse C++ classes or templates directly |
| Parser | Uses `libclang`; resolve compiler warnings logged during generation to prevent runtime crashes |
| OS differences | Dart has no C macros such as `#if TARGET_OS_IPHONE`; use runtime `Platform.isIOS` checks |
| Objective-C references | Wrap captured native objects in a `WeakReference` to break reference cycles with Dart closures |
| Objective-C runtime types | Dart `is` and `as` don't check the Objective-C runtime subclass; use `.isA()` and `.as()` |
| Objective-C threading | UI-related calls must run on the iOS main platform thread; some callbacks crash if run on the wrong thread |
| Swift | Goes through Objective-C: pure Swift structs, generics and enums with associated values aren't supported; classes must be annotated `@objc` |

## Notes

- When the native API changes, update the configuration script and regenerate the bindings.
- Use Pigeon instead for standard cross-platform plugin development without critical data transfers; for pure Swift interop see the experimental `package:swiftgen`.
- Examples named on the page: the official FFIgen examples (`add` shows the flow with one function in one header; `code_assets` covers system hostname lookup and audio playback) and `package:cupertino_http`, which wraps Apple's `NSURLSession`.
- The page contains no code block; the single command above is taken verbatim from its prose.
- This page covers the Dart-side generator; the Apple frameworks it wraps belong to the `apple-*` skills.
- Source: https://docs.flutter.dev/interop/ffigen (flutter/website `acea420`, fetched 2026-11-14).

## Related

- [Native interop](./interop-overview.md)
- [Interact with native memory using dart:ffi](./interop-dart-ffi.md)
- [Pigeon](./interop-pigeon.md)
- [Bind to native code using FFI](./bind-native-code.md)
