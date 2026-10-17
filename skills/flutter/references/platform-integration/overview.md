---
source: https://docs.flutter.dev/platform-integration
---

# Build for and integrate with multiple platforms

Flutter enables you to build, test, and deploy beautiful, natively compiled, multi-platform applications from a single codebase.

## Signature / Usage

Set up an additional target platform, then (only if no existing plugin covers the need) integrate with platform-specific functionality.

```console
$ flutter create --platforms=windows,macos,linux .
```

Setup pages per target (each page is "set up your development environment to build Flutter apps for ..."):

| Target | Host requirement | Setup page |
| --- | --- | --- |
| Android | On any device | `/platform-integration/android/setup` |
| iOS | On macOS only | `/platform-integration/ios/setup` |
| Web | On any device | `/platform-integration/web/setup` |
| Windows | On Windows only | `/platform-integration/windows/setup` |
| macOS | On macOS only | `/platform-integration/macos/setup` |
| Linux | On Linux only | `/platform-integration/linux/setup` |

## Integration guides per platform

| Platform | Guides listed on the page |
| --- | --- |
| Android | Add a splash screen; Support predictive back; Call JetPack APIs; Bind to native code; Embed an Android view; Launch a Compose activity; Request local network permissions (`/platform-integration/android/local-network-permission`) |
| iOS | Add a launch screen; Leverage system frameworks; Bind to native code; Embed an iOS view; Add an app extension |
| Web | Customize app initialization; Embed web content; Embed your app; Compile to WebAssembly; Interop with JavaScript (dart.dev `/interop/js-interop`) |
| Windows | Bind to native C code; Distribute your app; Follow Windows UI conventions (all in `/platform-integration/windows/building`) |
| macOS | Bind to native code; Embed a macOS view; Set up macOS entitlements; Integrate with the macOS visual style (`/platform-integration/macos/building`) |
| Linux | Bind to native code; Prepare for distribution (`/platform-integration/linux/building`); Deploy to the Snap Store (`/deployment/linux/`) |

## Notes

- Flutter and its core packages often automatically support and integrate with Flutter's officially supported platforms. Some platforms require additional tooling, but once the development environment is set up, Flutter apps are usually functional across platforms out of the box.
- For platform-specific functionality, first look for a Flutter plugin (see `/packages-and-plugins/using-packages`); if none meets your needs, write platform-specific code (see platform-channels) and even create your own plugin (see `/packages-and-plugins/developing-packages`).
- Tip from the source: if you are exploring building your app for multiple platforms, also consider building your UI with adaptive and responsive design in mind (`/ui/adaptive-responsive/`).
- This is a Flutter-side integration index. The native platform APIs themselves belong to other skills (android-platform-core and the other android-* skills, apple-uikit / apple-appkit / apple-swiftui, windows-app-sdk); this page only routes to the Flutter guides.
- The source page lists a "Request local network permissions" card (Android) whose target page is outside this reference set.

## Related

- [platform-channels](./platform-channels.md)
- [bind-native-code](./bind-native-code.md)
- [desktop](./desktop.md)
- [android-platform-views](./android-platform-views.md)
- [ios-platform-views](./ios-platform-views.md)
