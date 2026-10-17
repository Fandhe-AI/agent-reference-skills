---
source: https://docs.flutter.dev/platform-integration/bind-native-code
---

# Bind to native code using FFI

Flutter apps can use the `dart:ffi` library to call native APIs. Since Flutter 3.38, the recommended way to bind to native code is the `package_ffi` template, which uses build hooks.

## Signature / Usage

```console
$ flutter create --template=package_ffi native_add
$ cd native_add
```

Generated content:

| File | Role |
| --- | --- |
| `lib/native_add.dart` | The Dart code that defines the API of the package. |
| `lib/native_add_bindings_generated.dart` | The generated Dart bindings for the native code. |
| `src/native_add.c` | The native C source code. |
| `src/native_add.h` | The C header file for the native code. |
| `hook/build.dart` | A script run by the Flutter SDK to compile the native code. |
| `ffigen.yaml` | Configuration file for `package:ffigen` to generate the Dart bindings. |
| `pubspec.yaml` | The package definition, which enables the `build.dart` hook. |

Linking against system libraries with a build hook (`hook/build.dart`):

```dart
// hook/build.dart
import 'package:hooks/hooks.dart';
import 'package:code_assets/code_assets.dart';

void main(List<String> args) async {
  await build(args, (input, output) async {
    final targetOS = input.target.os;
    switch (targetOS) {
      case OS.android || OS.iOS || OS.linux || OS.macOS:
        output.assets.code.add(
          CodeAsset(
            package: 'host_name',
            name: 'src/third_party/unix.dart',
            linkMode: LookupInProcess(),
          ),
        );
      case OS.windows:
        output.assets.code.add(
          CodeAsset(
            package: 'host_name',
            name: 'src/third_party/windows.dart',
            linkMode: DynamicLoadingSystem(Uri.file('ws2_32.dll')),
          ),
        );
      default:
        throw Exception('Unsupported target os: $targetOS');
    }
  });
}
```

Closed-source pre-compiled library (simplified `CodeAsset` creation):

```dart
// hook/build.dart
import 'package:hooks/hooks.dart';
import 'package:code_assets/code_assets.dart';

void main(List<String> args) async {
  await build(args, (input, output) async {
    // 1. Download the library from a URL.
    // 2. Verify the hash of the downloaded file.
    // 3. Place the library in the build output directory.

    output.assets.code.add(
      CodeAsset(
        package: input.packageName,
        name: 'src/my_lib.dart', // Dart file with bindings
        linkMode: DynamicLoadingBundled(),
        file: input.outputDirectory.resolve('my_lib.so'),
      ),
    );
  });
}
```

## Options / Props

| Topic | Detail |
| --- | --- |
| Build hook compiler | `hook/build.dart` uses `package:native_toolchain_c` to compile C code into a dynamic library; it can be customized to build other native languages or download pre-compiled binaries. |
| Bindings | `package:ffigen` generates `lib/native_add_bindings_generated.dart` from `src/native_add.h`; generated functions are `@Native() external` and resolve at runtime against the code asset produced by the build hook. |
| `LookupInProcess()` | Find symbols in the main process; usable for many system libraries on Android, iOS, Linux, and macOS. |
| `DynamicLoadingSystem()` | Used on Windows with the DLL name (for example `Uri.file('ws2_32.dll')`). |
| `DynamicLoadingBundled()` | Used with a `file` for a library placed in the build output directory (closed-source libraries). |
| `libc++_shared.so` on Android | Not a system library; add a dependency on `package:android_libcpp_shared`, which uses its own build hook to bundle it per target architecture. |

## Notes

- The package_ffi template no longer requires OS-specific build files (`CMakeLists.txt` for Linux/Windows, `.podspec` for iOS/macOS, `build.gradle` for Android). It works for both Flutter and Dart standalone projects.
- If you need the Flutter Plugin API, or need to configure a Google Play services runtime on Android, use the standard plugin template (`flutter create --template=plugin`). The previous `plugin_ffi` workflow is documented in the legacy FFI plugin page.
- Closed-source libraries: the recommended approach is to download pre-compiled binaries at build time and verify integrity with a file hash. You must handle different architectures and platforms by providing different versions of the library.
- Dynamic library naming: for a given asset ID the hook is invoked once per architecture and must produce the same filename regardless of architecture (no suffixes like `_arm64`); Flutter combines architecture binaries with `lipo`. Write to `input.outputDirectory` or to an architecture-specific subdirectory of `input.outputDirectoryShared`.
- iOS: device (`iphoneos`) and simulator (`iphonesimulator`) invocations must produce the same framework name for the same asset ID (no `_sim` / `_simulator` suffixes); `flutter build ios-framework` fails otherwise because `xcodebuild -create-xcframework` needs identical framework names.
- Your hook must produce the same set of asset IDs across all SDKs for a target platform; otherwise XCFramework slices may lack a device counterpart and Apple may reject the app. Stub implementations are allowed for other SDKs.
- The generated package includes a unit test in `test/native_add_test.dart`.
- This page covers Dart-to-C binding from Flutter (`dart:ffi` / build hooks). The source describes C code only and does not mention Rust.

## Related

- [legacy-ffi-plugin](./legacy-ffi-plugin.md)
- [platform-channels](./platform-channels.md)
