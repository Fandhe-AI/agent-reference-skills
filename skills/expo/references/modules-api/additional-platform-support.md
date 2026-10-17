---
source: https://docs.expo.dev/modules/additional-platform-support/
---

# Additional platform support

How to add macOS and tvOS support to an Expo module. Android and iOS are first-class; other Out-of-Tree platforms are possible because all Apple platforms share the same foundation and language. Currently only macOS and tvOS are supported (experimental).

## Signature / Usage

1. Use the universal `"apple"` platform in **expo-module.config.json**:

```diff
- "platforms": ["ios"],
- "ios": {
- "modules": ["MyModule"]
- }
+ "platforms": ["apple"],
+ "apple": {
+ "modules": ["MyModule"]
+ }
  }
```

2. Declare supported platforms in the podspec (then run `pod install`):

```diff
- s.platform       = :ios, '13.4'
+ s.platforms = {
+ :ios => '13.4',
+ :tvos => '13.4',
+ :osx => '10.15'
+ }
```

3. Branch platform-specific Swift code:

```swift
#if os(iOS)
  // iOS implementation
#elseif os(macOS)
  // macOS implementation
#elseif os(tvOS)
  // tvOS implementation
#endif
```

## Notes

- With the `"apple"` platform, whether to link the module in a specific CocoaPods target is moved to the podspec, which becomes the source of truth for autolinking. CocoaPods fails to install the pod on other targets unless the podspec lists them.
- The app needs `react-native-macos` (follow its "Install React Native for macOS" guide) or `react-native-tvos` (and the Expo "Build Expo apps for TV" guide). Skip if a local module's app is already set up.
- UI frameworks differ: `UIKit` on iOS/tvOS vs `AppKit` on macOS. `react-native-macos` and `expo-modules-core` provide aliases (for example `UIView` is an alias to `NSView`, `UIApplication` to `NSApplication`), but iOS-first libraries usually still need conditionally compiled code.
- Distinct from apple-swift / apple-appkit / apple-uikit (platform framework references).
- Source modificationDate: October 01, 2026 (unversioned guide page, fetched 2026-10-17).

## Related

- [expo-module.config.json](./module-config.md)
- [Autolinking](./autolinking.md)
- [Overview](./overview.md)
