---
source: https://docs.flutter.dev/packages-and-plugins/developing-packages
---

# Developing packages & plugins

Packages enable the creation of modular code that can be shared easily. A minimal package consists of `pubspec.yaml` (metadata: name, version, author) and `lib` (public code, minimally a single `<package-name>.dart` file).

## Signature / Usage

Create a package, plugin or FFI package with `flutter create`:

```console
$ flutter create --template=package hello
$ flutter create --org com.example --template=plugin --platforms=android,ios,linux,macos,windows -a kotlin hello
$ flutter create --template=package_ffi hello
```

### Package types

| Type | Description |
|------|-------------|
| Dart packages | General packages written in Dart (for example `path`). Some depend on the Flutter framework (for example `fluro`), restricting use to Flutter. |
| Plugin packages | A Dart API combined with one or more platform-specific implementations (Android: Kotlin/Java; iOS: Swift/Objective-C; web, macOS, Windows, Linux). Example: `url_launcher`. |
| FFI packages | Call native code using `dart:ffi`. Work in standalone Dart, need no OS-specific build files, created with `--template=package_ffi`. Recommended approach to build and bundle native code since Flutter 3.38. |

### `flutter create` options for plugins

| Name | Type | Description |
|------|------|-------------|
| `--template=package` | flag | Starter Dart/Flutter package (LICENSE, `test/hello_test.dart`, `pubspec.yaml`, `README.md`, `lib/hello.dart`, `CHANGELOG.md`, ...). |
| `--template=plugin` | flag | Plugin package; adds `lib/hello.dart`, `android/src/main/java/com/example/hello/HelloPlugin.kt`, `ios/Classes/HelloPlugin.m`, `example/`. |
| `--platforms=` | comma list | `android`, `ios`, `web`, `linux`, `macos`, `windows`. If none specified, the project doesn't support any platforms. |
| `--org` | string | Organization in reverse domain name notation; used in package and bundle identifiers. |
| `-a` | `kotlin` / `java` | Android language (default Kotlin). |
| `-i` | `swift` / `objc` | iOS language (default Swift). |
| `--template=package_ffi` | flag | FFI package: `lib` (Dart API using `dart:ffi`), `src` (native source), `hook/build.dart` (build hook compiling native code). |

### Specifying a plugin's supported platforms

```yaml
flutter:
  plugin:
    platforms:
      android:
        package: com.example.hello
        pluginClass: HelloPlugin
      ios:
        pluginClass: HelloPlugin
      macos:
        pluginClass: HelloPlugin
      web:
        pluginClass: HelloPlugin
        fileName: hello_web.dart
```

Federated platform package (`implements` names the app-facing package):

```yaml
flutter:
  plugin:
    implements: hello
    platforms:
      windows:
        pluginClass: HelloPlugin
```

Endorsed implementation (app-facing package adds `default_package` and a dependency):

```yaml
flutter:
  plugin:
    platforms:
      android:
        package: com.example.hello
        pluginClass: HelloPlugin
      ios:
        pluginClass: HelloPlugin
      windows:
        default_package: hello_windows

dependencies:
  hello_windows: ^1.0.0
```

Non-endorsed implementation: the app developer adds it manually.

```yaml
dependencies:
  foobar: ^1.0.0
  foobar_windows: ^1.0.0 # Non-endorsed plugin implementation
```

Shared iOS and macOS implementation (`darwin` directory instead of `ios` and `macos`; not supported before Flutter 3.7):

```yaml
flutter:
  plugin:
    platforms:
      ios:
        pluginClass: HelloPlugin
        sharedDarwinSource: true
      macos:
        pluginClass: HelloPlugin
        sharedDarwinSource: true

environment:
  sdk: ^3.0.0
  flutter: ">=3.7.0"
```

```ruby
  s.ios.dependency 'Flutter'
  s.osx.dependency 'FlutterMacOS'
  s.ios.deployment_target = '13.0'
  s.osx.deployment_target = '10.15'
```

### Federated plugins

A federated plugin splits the API into three parts:

- **app-facing interface**: what plugin users interact with; in a package-separated federated plugin, the package users depend on.
- **platform implementation(s)**: platform-specific code; not directly used or depended on by apps unless they expose platform-specific functionality.
- **platform interface**: declares the interface every platform implementation must implement; a separate package keeps implementations uniform.

### Dart-only and hybrid platform implementations

For non-web platforms, replace `pluginClass` with `dartPluginClass` for a Dart-only implementation (web implementations are always Dart and use `pluginClass` plus `fileName`):

```yaml
flutter:
  plugin:
    implements: hello
    platforms:
      windows:
        dartPluginClass: HelloPluginWindows
```

```dart
class HelloPluginWindows extends HelloPluginPlatform {
  /// Registers this class as the default instance of [HelloPluginPlatform].
  static void registerWith() {
    HelloPluginPlatform.instance = HelloPluginWindows();
  }
```

Hybrid implementation uses both:

```yaml
      windows:
        dartPluginClass: HelloPluginWindows
        pluginClass: HelloPlugin
```

### Editing platform code

Build the example at least once before opening in the platform IDE:

```console
cd hello/example; flutter build apk --config-only
cd hello/example; flutter build ios --no-codesign --config-only
cd hello/example; flutter build linux
cd hello/example; flutter build macos --config-only
cd hello/example; flutter build windows
```

| Platform | Open | Plugin code location |
|----------|------|----------------------|
| Android (Android Studio) | `hello/example/android/build.gradle` or `build.gradle.kts` | `hello/java/com.example.hello/HelloPlugin` |
| iOS (Xcode) | `hello/example/ios/Runner.xcworkspace` | `Pods/Development Pods/hello/../../example/ios/.symlinks/plugins/hello/ios/Classes` (with `sharedDarwinSource`: ends with `Flutter/hello/Sources/hello`) |
| Linux (VS Code with C/C++ and CMake) | `hello/example/linux/` | `flutter/ephemeral/.plugin_symlinks/hello/linux/` |
| macOS (Xcode) | `hello/example/macos/Runner.xcworkspace` | `Pods/Development Pods/hello/../../example/macos/Flutter/ephemeral/.symlinks/plugins/hello/macos/Classes` (with `sharedDarwinSource`: ends with `hello/darwin/Classes`) |
| Windows (Visual Studio) | `hello/example/build/windows/hello_example.sln` | `hello_plugin/Source Files` and `hello_plugin/Header Files` |

Connect the Dart API and the platform code with a platform channel, or through the interfaces defined in a platform interface package.

Add platforms to an existing plugin:

```console
$ flutter create --template=plugin --platforms=web .
```

### Native Darwin dependencies

Flutter uses Swift Package Manager as the primary strategy to manage native iOS and macOS dependencies. Create `Package.swift` in the plugin's `ios/my_plugin_name` or `macos/my_plugin_name` directory:

```swift
dependencies: [
    .package(url: "https://github.com/path/to/HelloLibrary.git", from: "1.0.0")
]
```

Legacy CocoaPods dependency (end of `ios/hello.podspec`):

```ruby
s.dependency 'HelloPod', '0.0.1'
```

Privacy manifest (podspec):

```ruby
s.resource_bundles = {'your_plugin_privacy' => ['your_plugin/Sources/your_plugin/Resources/PrivacyInfo.xcprivacy']}
```

### Developing FFI packages

Bindings are generated from the header file (`src/hello.h`) by `package:ffigen`:

```console
$ dart run tool/ffigen.dart
```

Very short-running native functions can be invoked directly from any isolate (see `sum` in `lib/hello.dart`); longer-running functions should run on a helper isolate to avoid dropping frames (see `sumAsync`).

### Documentation and publishing

Recommended for all packages: `README.md`, `CHANGELOG.md`, `LICENSE`, API documentation for public APIs. Generate API docs locally:

```console
export FLUTTER_ROOT=~/dev/flutter  # on macOS or Linux
$FLUTTER_ROOT/bin/cache/dart-sdk/bin/dart doc   # on macOS or Linux
```

Individual licenses in a LICENSE file are separated by 80 hyphens on their own line; each component license starts with the package names it applies to, followed by a blank line.

Publish:

```console
$ flutter pub publish --dry-run
$ flutter pub publish
```

### Handling package interdependencies

```yaml
dependencies:
  url_launcher: ^6.3.2
```

Platform-specific build files, Android (`hello/android/build.gradle`):

```groovy
android {
    // lines skipped
    dependencies {
        compileOnly rootProject.findProject(":url_launcher")
    }
}
```

iOS (`hello/ios/hello/Package.swift`):

```swift
let package = Package(
  // lines skipped
  dependencies: [
    .package(path: "../url_launcher"),
  ],
  targets: [
    .target(
      name: "hello",
      dependencies: [
        .product(name: "url_launcher", package: "url_launcher"),
      ],
    ),
  ],
)
```

CocoaPods (legacy, `hello/ios/hello.podspec`): `s.dependency 'url_launcher'`. Web dependencies are handled by `pubspec.yaml`.

### Bundle AI package skills

To distribute skills with your package: create a `skills/` directory in the package repo root, create `skills/<package_name>/` inside it, add a `SKILL.md` with guidelines and idiomatic code examples, and publish to `pub.dev`.

## Notes

- Multiple Flutter instances: all Flutter platforms allow apps to create multiple Flutter engines. Each engine creates its own instance of every registered plugin with independent lifetimes. Don't assume a plugin class has only one instance; keep engine-specific state on the plugin instance (not in global or static variables) and clean it up when the plugin detaches. If instances share a native singleton, coordinate access (for example reference counting) and release only after every instance has stopped using it.
- If your plugin needs the Flutter Plugin API or a Google Play services runtime on Android, use `--template=plugin` instead of an FFI package.
- Linux: building and running through your editor's CMake integration won't work correctly; use `flutter run`.
- Windows: after changing plugin code, select **Build > Build Solution** before running again, otherwise an outdated copy of the built plugin runs.
- Migration (Flutter 3.44): Android plugins that apply the Kotlin Gradle Plugin (KGP) must migrate to built-in Kotlin for Android Gradle Plugin 9 and later; Flutter 3.44 added temporary support for legacy KGP with `android.builtInKotlin=false`, and Flutter 3.47 added support for enabling built-in Kotlin (`android.builtInKotlin=true`) once an app and all its plugins have migrated. See the built-in Kotlin migration guide for plugin authors in the release category. Flutter plans to remove KGP support in a future version.
- Migration (Flutter 3.44): native Darwin dependencies default to Swift Package Manager; CocoaPods is legacy (see Swift Package Manager for plugin authors).
- This page covers Flutter packages and plugins (Dart); the android-build-gradle, apple-distribution and rust skills cover Gradle, App Store distribution and Rust respectively. Package skills here are the pub.dev mechanism, distinct from Claude Code Agent Skills documented by anthropic-claude-code-extend.

## Related

- [Using packages](./using-packages.md)
- [Swift Package Manager for plugin authors](./swiftpm-plugin-authors.md)
- [Package dependency management](./dependency-management.md)
