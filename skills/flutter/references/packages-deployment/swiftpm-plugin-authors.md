---
source: https://docs.flutter.dev/packages-and-plugins/swift-package-manager/for-plugin-authors
---

# Swift Package Manager for plugin authors

How to add Swift Package Manager (SwiftPM) compatibility to iOS and macOS Flutter plugins that already support CocoaPods.

## Signature / Usage

Template `Package.swift` for a Swift plugin (create it in `ios/plugin_name/` next to `Sources/plugin_name/`; replace `ios` with `macos` or `darwin` as applicable):

```swift
// swift-tools-version: 5.9
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    // TODO: Update your plugin name.
    name: "plugin_name",
    platforms: [
        // TODO: Update the platforms your plugin supports.
        // If your plugin only supports iOS, remove `.macOS(...)`.
        // If your plugin only supports macOS, remove `.iOS(...)`.
        .iOS("13.0"),
        .macOS("10.15")
    ],
    products: [
        // TODO: Update your library and target names.
        // If the plugin name contains "_", replace with "-" for the library name.
        .library(name: "plugin-name", targets: ["plugin_name"])
    ],
    dependencies: [
        .package(name: "FlutterFramework", path: "../FlutterFramework")
    ],
    targets: [
        .target(
            // TODO: Update your target name.
            name: "plugin_name",
            dependencies: [
                .product(name: "FlutterFramework", package: "FlutterFramework")
            ],
            resources: [
                // TODO: If your plugin requires a privacy manifest
                // (e.g. if it uses any required reason APIs), update the PrivacyInfo.xcprivacy file
                // to describe your plugin's privacy impact, and then uncomment this line.
                // .process("PrivacyInfo.xcprivacy"),
            ]
        )
    ]
)
```

### Migration steps (Swift plugin)

1. Use Flutter 3.44 or later (SwiftPM on by default).
2. Create `ios/plugin_name/` containing `Package.swift`, `Sources/`, `Sources/plugin_name/`.
3. Fill in the template: platforms, package/library/target names (if the plugin name contains `_`, the library name must be the `-` separated version).
4. Move `PrivacyInfo.xcprivacy` to `ios/plugin_name/Sources/plugin_name/PrivacyInfo.xcprivacy` and uncomment `.process("PrivacyInfo.xcprivacy")`.
5. Move resources from `ios/Assets` to `ios/plugin_name/Sources/plugin_name` (or a subdirectory) and declare them in `Package.swift` if applicable.
6. Move all files from `ios/Classes` to `ios/plugin_name/Sources/plugin_name`; delete the empty `ios/Assets`, `ios/Resources`, `ios/Classes`.
7. Add `FlutterFramework` as a dependency (`.package(name: "FlutterFramework", path: "../FlutterFramework")` and `.product(name: "FlutterFramework", package: "FlutterFramework")`).
8. If the plugin uses Pigeon, update the output path:

```dart
  kotlinOptions: KotlinOptions(),
  javaOut: 'android/app/src/main/java/io/flutter/plugins/Messages.java',
  javaOptions: JavaOptions(),
- swiftOut: 'ios/Classes/messages.g.swift',
+ swiftOut: 'ios/plugin_name/Sources/plugin_name/messages.g.swift',
  swiftOptions: SwiftOptions(),
```

9. Customize `Package.swift` (verify no Xcode warnings; translate CocoaPods `dependency` entries to SwiftPM dependencies; explicit linking via `.library(name: "plugin-name", type: .static, targets: ["plugin_name"])`). Use unique target names.
10. Update the podspec:

```ruby
- s.source_files = 'Classes/**/*.swift'
- s.resource_bundles = {'plugin_name_privacy' => ['Resources/PrivacyInfo.xcprivacy']}
+ s.source_files = 'plugin_name/Sources/plugin_name/**/*.swift'
+ s.resource_bundles = {'plugin_name_privacy' => ['plugin_name/Sources/plugin_name/PrivacyInfo.xcprivacy']}
```

11. Load bundle resources via `Bundle.module`:

```swift
#if SWIFT_PACKAGE
     let settingsURL = Bundle.module.url(forResource: "image", withExtension: "jpg")
#else
     let settingsURL = Bundle(for: Self.self).url(forResource: "image", withExtension: "jpg")
#endif
```

12. Add `.build/` and `.swiftpm/` to `.gitignore`.
13. Verify with CocoaPods (`flutter config --no-enable-swift-package-manager`, `flutter run` in the example, then `pod lib lint ios/plugin_name.podspec --configuration=Debug --skip-tests --use-modular-headers --use-libraries` and the same without `--use-libraries`), and with SwiftPM (`flutter config --enable-swift-package-manager`, `flutter run` in the example, check **Package Dependencies** in Xcode).

### Objective-C plugin differences

- Also create `Sources/plugin_name/include/plugin_name/.gitkeep` (ensures the directory is committed).
- Add `cSettings: [ .headerSearchPath("include/plugin_name") ]` to the target.
- Move public headers from `ios/Classes` to `ios/plugin_name/Sources/plugin_name/include/plugin_name` (check the podspec `public_header_files`; the `pluginClass` from `pubspec.yaml` must be public and in this directory); move remaining files to `Sources/plugin_name`.
- `modulemap`: to keep it for CocoaPods only, exclude it in `Package.swift`:

```swift
  .target(
      name: "plugin_name",
      dependencies: [],
+     exclude: ["include/cocoapods_plugin_name.modulemap", "include/plugin_name-umbrella.h"],
```

- Update imports when headers moved: `#import "./include/plugin_name/PublicHeaderFile.h"`.
- Podspec:

```ruby
- s.source_files = 'Classes/**/*.{h,m}'
- s.public_header_files = 'Classes/**/*.h'
- s.module_map = 'Classes/cocoapods_plugin_name.modulemap'
- s.resource_bundles = {'plugin_name_privacy' => ['Resources/PrivacyInfo.xcprivacy']}
+ s.source_files = 'plugin_name/Sources/plugin_name/**/*.{h,m}'
+ s.public_header_files = 'plugin_name/Sources/plugin_name/include/**/*.h'
+ s.module_map = 'plugin_name/Sources/plugin_name/include/cocoapods_plugin_name.modulemap'
+ s.resource_bundles = {'plugin_name_privacy' => ['plugin_name/Sources/plugin_name/PrivacyInfo.xcprivacy']}
```

- Load resources with `SWIFTPM_MODULE_BUNDLE`:

```objc
#if SWIFT_PACKAGE
   NSBundle *bundle = SWIFTPM_MODULE_BUNDLE;
 #else
   NSBundle *bundle = [NSBundle bundleForClass:[self class]];
 #endif
 NSURL *imageURL = [bundle URLForResource:@"image" withExtension:@"jpg"];
```

- If the `include` directory only contains `.gitkeep`, add `!.gitkeep` to `.gitignore` and run `flutter pub publish --dry-run` to ensure `include` is published.
- Pigeon: update `objcHeaderOut` / `objcSourceOut` to `ios/plugin_name/Sources/plugin_name/...`; if they are in different directories use `ObjcOptions(headerIncludePath: './include/plugin_name/messages.g.h')`.

### Plugin as local package in example app (optional, recommended)

```bash
open example/ios/Runner.xcworkspace
```

In Xcode: right click **Flutter** > **Add Files to "Runner"**, select `my_plugin/ios/my_plugin` (or `macos` / `darwin`) with "Reference files in place". This references an absolute path; change it to relative by editing `example/ios/Runner.xcodeproj/project.pbxproj`:

```text
path = ../../ios/my_plugin; sourceTree = "<group>"
```

### Update unit tests in the example app

Needed if tests use a CocoaPod dependency (for example `OCMock`) or the plugin is explicitly `type: .dynamic` in `Package.swift`. Remove the pod from the `Podfile` (`pod 'OCMock', '3.5'` under `target 'RunnerTests'`), run `pod install` in `plugin_name_ios/example/ios`, add test-only dependencies through **Package Dependencies** to the `RunnerTests` target, and for `.dynamic` libraries also add the local package to `RunnerTests` (**Link Binary With Libraries**, **Add Local...** `plugin_name/plugin_name_ios/ios/plugin_name_ios`). Ensure tests pass with **Product > Test**.

## Notes

- As of the 3.44 release, Flutter uses SwiftPM for iOS and macOS native dependencies; CocoaPods is in maintenance mode and its registry permanently becomes read-only on December 2, 2026.
- Flutter plugins should support both SwiftPM and CocoaPods until further notice. As of Flutter 3.44, plugins that don't support CocoaPods aren't usable by projects that haven't migrated to SwiftPM, and plugins that don't support SwiftPM can cause problems for projects that have migrated.
- Running the plugin's example app with SwiftPM turned on migrates the project to add SwiftPM integration, which raises the example app's Flutter SDK requirement to 3.24 or higher; don't commit the migration changes if you want to run the example with an older Flutter SDK.
- `Bundle.module` / `SWIFTPM_MODULE_BUNDLE` only work if resources are defined in `Package.swift` or automatically included by Xcode; otherwise they raise an error.
- OCMock uses unsafe build flags and can only be used if targeted by commit (`fe1661a3efed11831a6452f4b1a0c5e6ddc08c3d` is the commit for version 3.9.3).
- Migration (Flutter 3.44): SwiftPM is on by default and plugins should add `Package.swift`.
- Flutter plugin packaging only; Swift Package Manager and Xcode in general are covered by the apple-swift and apple-distribution skills.

## Related

- [Swift Package Manager for app developers](./swiftpm-app-developers.md)
- [Developing packages & plugins](./developing-packages.md)
