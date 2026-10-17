---
source: https://docs.flutter.dev/packages-and-plugins/swift-package-manager/for-app-developers
---

# Swift Package Manager for app developers

How to use Swift Package Manager (SwiftPM) for native iOS or macOS dependencies in a Flutter app.

## Signature / Usage

Turn SwiftPM off for a single project (affects all contributors) in `pubspec.yaml`:

```yaml
# The following section is specific to Flutter packages.
flutter:
  config:
    enable-swift-package-manager: false
```

Turn it on or off for the current user:

```sh
flutter config --enable-swift-package-manager
flutter config --no-enable-swift-package-manager
```

### Turn on SwiftPM

As of the 3.44 release, SwiftPM support is on by default. Upgrading Flutter and running your app automatically adds SwiftPM integration, so the project downloads the Swift packages that your Flutter plugins depend on. Flutter falls back to CocoaPods for dependencies that don't yet support SwiftPM.

To check that a project uses SwiftPM: in Xcode, run the app and ensure **Run Prepare Flutter Framework Script** runs as a pre-action and `FlutterGeneratedPluginSwiftPackage` is a target dependency.

### Remove CocoaPods integration

Flutter falls back to CocoaPods if any dependency doesn't support SwiftPM; ensure all plugins support it first. Manual `Podfile` edits must be removed manually.

iOS:

```sh
cd ios
pod deintegrate
cd ..
```

Delete `ios/Podfile`, `ios/Podfile.lock`, `ios/Pods/` and `ios/.symlinks/` (if present). In `ios/Flutter/Debug.xcconfig` and `ios/Flutter/Release.xcconfig`, remove `#include` lines referencing `Pods/Target Support Files` or CocoaPods `.xcconfig` files. Then:

```sh
flutter clean
flutter pub get
flutter run
```

macOS: the same with `cd macos`; delete `macos/Podfile`, `macos/Pods/`, `macos/.symlinks/`; edit `macos/Flutter/Flutter-Debug.xcconfig` and `macos/Flutter/Flutter-Release.xcconfig`.

### Add SwiftPM integration manually

Only needed if automatic migration failed (file an issue and include `ios/Runner.xcodeproj/project.pbxproj` and `ios/Runner.xcodeproj/xcshareddata/xcschemes/Runner.xcscheme`). Steps for iOS (use `macos/` paths and the macOS script in Step 2 for macOS):

1. Step 1: in Xcode open `ios/Runner.xcworkspace` > **Package Dependencies** > **+** > **Add Local...** > `ios/Flutter/ephemeral/Packages/FlutterGeneratedPluginSwiftPackage` > **Add Package**; ensure it is added to the `Runner` target and appears in **Frameworks, Libraries, and Embedded Content**.
2. Step 2 (for each flavor): **Product > Scheme > Edit Scheme** > **Build** > **Pre-actions** > **New Run Script Action**, titled `Run Prepare Flutter Framework Script`, **Provide build settings from** the `Runner` app, with the script:

iOS:

```sh
"$FLUTTER_ROOT/packages/flutter_tools/bin/xcode_backend.sh" prepare
```

macOS:

```sh
"$FLUTTER_ROOT"/packages/flutter_tools/bin/macos_assemble.sh prepare
```

3. Step 3: run the app in Xcode, confirm the pre-action runs and `FlutterGeneratedPluginSwiftPackage` is a target dependency, and confirm `flutter run` works.

For a custom Xcode target, follow the same steps but use your custom target instead of the Flutter target when adding the package (Step 1) and the pre-action (Step 2). For add-to-app, see the iOS and macOS project-setup pages.

### Remove SwiftPM integration

1. Turn off SwiftPM, then `flutter clean`.
2. Open `ios/Runner.xcworkspace` (or `macos/Runner.xcworkspace`) in Xcode.
3. **Package Dependencies**: select `FlutterGeneratedPluginSwiftPackage` and click the remove button.
4. `Runner` target > **Frameworks, Libraries, and Embedded Content**: select `FlutterGeneratedPluginSwiftPackage` and remove it.
5. **Product > Scheme > Edit Scheme** > **Build** > **Pre-actions**: delete **Run Prepare Flutter Framework Script**.

### Plugin requiring a higher OS version

Error example:

```plaintext
Target Integrity (Xcode): The package product 'plugin_name_ios' requires minimum platform version 14.0 for the iOS platform, but this target supports 12.0
```

Increase the app target's **Minimum Deployments** in Xcode, then regenerate the configuration files:

```sh
flutter build ios --config-only
flutter build macos --config-only
```

## Notes

- As of the 3.44 release, Flutter uses Swift Package Manager to manage iOS and macOS native dependencies. Flutter continues to support CocoaPods in maintenance mode, however the CocoaPods registry permanently becomes read-only on December 2, 2026.
- Turning SwiftPM off is generally not recommended; disabling SwiftPM won't be allowed in the future. Disabling makes Flutter use CocoaPods for all dependencies while SwiftPM remains integrated in the project.
- Migration (Flutter 3.44): SwiftPM is on by default; to use an older Flutter version you might need to remove SwiftPM integration from the app.
- Flutter build/integration steps only; Xcode, Swift Package Manager itself and distribution are covered by the apple-swift and apple-distribution skills.

## Related

- [Swift Package Manager for plugin authors](./swiftpm-plugin-authors.md)
- [Developing packages & plugins](./developing-packages.md)
- [Build and release an iOS app](./deploy-ios.md)
