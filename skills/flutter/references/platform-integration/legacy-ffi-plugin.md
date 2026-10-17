---
source: https://docs.flutter.dev/platform-integration/legacy-ffi-plugin
---

# Bind to native code using the legacy FFI plugin template

Documents the legacy `plugin_ffi` approach to C interop: bundle C/C++ sources in a Flutter plugin and bind to them with `dart:ffi`.

## Signature / Usage

```console
$ flutter create --platforms=android,ios,macos,windows,linux --template=plugin_ffi native_add
```

Mark exported C++ symbols so they are visible to Dart (`extern "C"` plus attributes that stop the linker discarding them during link-time optimization):

```objc
extern "C" /* <= C++ only */ __attribute__((visibility("default"))) __attribute__((used))
```

Swift symbols:

```swift
@_cdecl("myFunctionName")
```

Load a platform library on Android:

```dart
DynamicLibrary.open('libGLESv3.so');
```

## Options / Props

Platform build file that links the code:

| Platform | File |
| --- | --- |
| Android | `native_add/android/build.gradle` |
| iOS | `native_add/ios/native_add.podspec` |
| macOS | `native_add/macos/native_add.podspec` |
| Linux | `native_add/linux/CMakeLists.txt` |
| Windows | `native_add/windows/CMakeLists.txt` |

Loading APIs:

| API | Use |
| --- | --- |
| `DynamicLibrary.executable` / `DynamicLibrary.process` | Resolve symbols from statically linked libraries (embedded in the executable image, loaded at app start). |
| `DynamicLibrary.open` | Load a dynamically linked library on demand. |

Distribution format of dynamic libraries: Android: set of `.so` (ELF) files, one per architecture (only dynamic libraries are supported, because the main executable is the JVM); iOS and macOS: `.framework` folder.

## Notes

- Corrected from the official docs: the source sample loads `libGLES_v3.so`; the Android NDK system library is `libGLESv3.so`.
- Legacy: since Flutter 3.38 the `package_ffi` template with build hooks is recommended. This legacy template is still useful if you need to access the Flutter Plugin API, use static linking (on iOS and macOS), or configure a Google Play services runtime on Android.
- You can exclude platforms from `--platforms` that you do not want to build for, but include the platform of the device you are testing on.
- The FFI library can only bind against C symbols. The native code is invoked from Dart in `lib/native_add_bindings_generated.dart`, generated with `package:ffigen`.
- iOS / macOS: the dynamic linker loads dynamically linked libraries at app start; symbols resolve with `DynamicLibrary.process`. A handle from `DynamicLibrary.open` restricts symbol resolution, but "it's unclear how Apple's review process handles this".
- iOS / macOS link options: platform library (Xcode, `Runner.xcworkspace`, **Linked Frameworks and Libraries** > **+**); source code (add files to the Xcode project and use the symbol prefix above); compiled dynamic library (add a signed framework to **Frameworks, Libraries, and Embedded Content** with **Embed & Sign**); open-source third-party library (add native code to `source_files` in `ios/<myproject>.podspec`; statically linked into apps using the plugin); closed-source third-party library (add a `vendored_frameworks` field in the podspec).
- Do not upload a plugin containing binary code (closed-source iOS plugin) to pub.dev; it should be downloaded from a trusted third party.
- Stripping symbols (iOS and macOS): Xcode strips symbols for release builds; in the **Runner** target, **Build Settings > Strip Style**, change from **All Symbols** to **Non-Global Symbols**.
- macOS closed-source dylib: drag `libyourlibrary.dylib` into `Runner/Frameworks`, add it to **Copy Bundle Resources**, check **Code Sign on Copy** under **Embed Libraries**, set **Link Binary With Libraries** to **Optional**, embed with **Embed & Sign**, add the library path to **Library Search Paths**, then use `DynamicLibrary.open('libyourlibrary.dylib')`.
- Android: pick stable native APIs from the Android NDK Native APIs list; follow "Add C and C++ code to your project" for CMake or `ndk-build`; for closed-source code, add the AAR artifact in `android/build.gradle` as a dependency (do not include it in your Flutter package; download it from a repository such as Maven Central).
- Android APK size: by default Flutter APKs compress `libflutter.so` and `libapp.so` (smaller APK, larger on-device size). To control whether native libraries are stored compressed and extracted at install time, set the Android Gradle plugin's `useLegacyPackaging` option.
- This is the Flutter-side FFI workflow (Dart and C). Android Gradle/NDK and Xcode build-system details belong to the android-build-gradle and apple-distribution skills; the source does not mention Rust.

## Related

- [bind-native-code](./bind-native-code.md)
- [platform-channels](./platform-channels.md)
