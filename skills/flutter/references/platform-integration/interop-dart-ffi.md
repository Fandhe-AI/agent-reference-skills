---
source: https://docs.flutter.dev/interop/dart-ffi
---

# Interact with native memory using dart:ffi

`dart:ffi` (Foreign Function Interface) is a core Dart SDK library with the low-level APIs to call C-ABI functions from Dart. It is the technology underneath Pigeon's native interop mode, FFIgen, and JNIgen.

## Signature / Usage

Run blocking FFI calls in a background isolate (`Isolate.run`) so the UI thread doesn't freeze or drop frames. The generated bindings of an FFI package contain `@Native() external` functions that resolve at runtime against the code asset produced by the build hook. Snippet taken from https://docs.flutter.dev/interop/bind-native-code (project layout created by the package_ffi template):

```console
$ flutter create --template=package_ffi native_add
$ cd native_add
```

## Options / Props

| Library | Role |
| --- | --- |
| `dart:ffi` | Built into the Dart SDK; native representation types, pointers, structs, and function lookup signatures |
| `package:ffi` | Companion package with memory allocation (`calloc` and `malloc`) and C string conversion helpers (`Pointer<Utf8>`, `Pointer<Utf16>`) |

## Notes

- Dart memory is garbage collected while native C memory is manually managed: use `package:ffi` to allocate space on the system heap for native arguments and free it when done, and to convert Dart strings into C strings.
- FFI calls are synchronous and run on the calling thread; a heavy or blocking C function on the main UI thread can freeze the app, so run it inside a background isolate using `Isolate.run`.
- Resources named on the page: the Dart C interop guide, the `dart:ffi` API reference, and `package:ffi` on pub.dev.
- The page contains no code block; the snippet above is borrowed from the related bind-native-code page (see the line before it).
- Source: https://docs.flutter.dev/interop/dart-ffi (flutter/website `acea420`, fetched 2026-11-14).

## Related

- [Native interop](./interop-overview.md)
- [Bind to native code using FFI](./bind-native-code.md)
- [Bind to native code using the legacy FFI plugin template](./legacy-ffi-plugin.md)
