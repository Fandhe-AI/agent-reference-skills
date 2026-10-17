---
source: https://flutter.dev/blog/whats-new-in-flutter-3-47
---

# What's new in Flutter 3.47

Announcement for Flutter 3.47 (published 2026-08-12): standalone `material_ui` and `cupertino_ui` 1.0 as opt-in packages, Impeller as the default renderer on macOS, Windows and Linux, and Widget Previews graduating to stable.

## Signature / Usage

Upgrade and the commands the post introduces:

```bash
flutter upgrade
dart fix --apply --code=migrate_design_widgets
flutter build web --release --wasm
flutter config --enable-macos-arm64-only
flutter config --enable-swift-package-manager
flutter build windows --flavor flavor_a
flutter build linux --flavor flavor_a
```

Experimental, main channel only (not available on stable 3.47.7):

```bash
flutter build web --release --wasm --enable-wasm-deferred-loading
```

Flavor-specific assets on desktop in `pubspec.yaml` (verbatim from the post):

```yaml
flutter:
  assets:
    - path: assets/flavor_a/images
      flavors:
        - flavor_a
    - path: assets/flavor_b/images
      flavors:
        - flavor_c
```

## Notes

- The source lists the deferred-loading flag alongside the other commands; this page separates it because it requires the main channel.
- Design libraries: the core SDK still includes Material and Cupertino in 3.47; you can opt in to the standalone packages (1.0 on pub.dev, planned weekly releases). The in-framework libraries "are scheduled for formal deprecation in the upcoming Fall stable release in November". Treat package migration as a major release if you maintain an ecosystem package. `flutter_localizations` is unbundled: `GlobalMaterialLocalizations.delegates` includes the Cupertino and Widgets delegates. `MaterialUiCompatibilityBridge` bridges dependencies still using legacy imports.
- Apple: Xcode 27 minimum OS bump: iOS 13 to 15, macOS 10.15 to 12 (Flutter 3.47+). The iOS 27 SDK mandates the `UIScene` lifecycle; apps built with Xcode 27 that don't adopt it fail to launch; the CLI migrates most apps automatically, manual migration is needed for custom `AppDelegate` code or plugins relying on the legacy lifecycle. Intel Macs: warnings in the CLI now, errors in a future release. SwiftPM: 92 of the top 100 iOS plugins migrated; CocoaPods is in maintenance mode.
- Web: Wasm needs `package:web` JS interop (the legacy `dart:html` is not supported). Deferred loading on Wasm is experimental and available under a flag on the main channel.
- Impeller: default renderer for macOS, Windows and Linux in 3.47. Opt-outs: macOS `FLTEnableImpeller` = `false` in `Info.plist`; Windows `project.set_impeller_switch(flutter::ImpellerSwitch::Disabled)` in `main.cpp`; Linux `fl_dart_project_set_enable_impeller(project, FALSE)` in `my_application.cc`. Fallback options will be removed in a future release. Wide Gamut Color is active by default on macOS; SDF text rendering is used on macOS, Linux and Windows.
- Experimental multi-window: popup windows on Linux and Windows; `windowHandle` on platform-specific controllers (`HWND`, `NSWindow`, `GtkWindow`); a sized-to-content API for regular and dialog windows.
- Widget Previews are stable: local caching in `.widget_preview/`, an abstract `PreviewThemeData` API, automatic web asset synchronization.
- GenUI: `genui` 0.10.0 with a new `a2ui_core` package and A2UI client-side functions.
- Android verified dependency matrix: Java 17 (minimum), KGP 2.4.0, AGP 9.1.0, Gradle 9.3.1; defaults `flutter.compileSdkVersion` 36, `flutter.targetSdkVersion` 36, `flutter.minSdkVersion` 24.
- Framework: `MediaQueryData.highContrast` and `MediaQueryData.invertColors` on Android; `ImageIcon` `useOriginalColors: true`; `AnimatedCrossFade` clip behavior; `ImageStreamListener` error tracking; fragment shaders targeting OpenGLES no longer need conditional coordinate flipping (see the OpenGL ES breaking change page).
- Pinned stable for this skill is 3.47.7; this post describes 3.47.0.

## Related

- [Flutter 3.47.0 release notes](./release-notes-3-47.md)
- [Migrate to standalone material_ui and cupertino_ui packages](./material-ui-and-cupertino-ui.md)
- [OpenGL ES render-to-texture content is stored top-down](./opengles-render-to-texture-top-down.md)
- [What's new in Flutter 3.44](./whats-new-3-44.md)
