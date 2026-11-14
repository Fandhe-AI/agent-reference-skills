---
source: https://flutter.dev/blog/whats-new-in-flutter-3-50
---

# What's new in Flutter 3.50

Announcement for Flutter 3.50 (published 2026-11-11, with Dart 3.14): direct native interop is stable, faster WebAssembly and `--web-content-hash` on the web, standalone `material_ui` / `cupertino_ui` as the default for new projects, and stricter Android `Intent` handling.

## Signature / Usage

Upgrade and the commands the post introduces:

```bash
flutter upgrade
dart fix --apply --code=migrate_design_widgets
flutter build web --wasm
flutter build web --web-content-hash
flutter build web --no-deprecated-js-interop
flutter config --enable-macos-arm64-only
flutter config --enable-hcpp
```

Opt in to WebAssembly on Safari and Firefox in `web/flutter_bootstrap.js` (verbatim from the post):

```js
{{flutter_js}}
{{flutter_build_config}}
_flutter.loader.load({
  config: {
    wasmAllowList: {
      blink: true,
      webkit: true,
      gecko: true,
    },
  },
});
```

Cache header the post recommends for hashed bundles and assets:

```text
Cache-Control: public, max-age=31536000, immutable
```

## Notes

- Native interop: FFIgen (C and Objective-C) and JNIgen (Java and Kotlin) are stable; Pigeon's native interop mode is a preview and uses both generators for iOS, macOS and Android. Calls can be synchronous or from background isolates. Docs: https://docs.flutter.dev/interop.
- Web: `flutter build web --wasm` compiles to both Wasm and JavaScript with automatic fallback. Chromium (Chrome and Edge 137+) runs Wasm by default; Safari 26.2+ and Firefox 147+ are opt-in via `wasmAllowList` and become default in a future stable release. `--web-content-hash` embeds content hashes in JS, Wasm and `build/web/assets/**` filenames, updates `flutter_bootstrap.js`, lets `index.html` and `flutter_bootstrap.js` stay on `no-cache`, and generates `build/web/precache_manifest.json` (replacing the deprecated `flutter_service_worker.js` tokens). `--no-deprecated-js-interop` (`flutter build web`, `flutter run`, `flutter test --platform chrome`) fails the build if the app or a dependency uses `dart:html`, `dart:js`, `dart:js_util` or `package:js`. `WebParagraph` (experimental preview, issue 172561) shrinks CanvasKit to roughly 3.75 MB from 5.46 MB.
- Design packages: `package:flutter/material.dart` and `package:flutter/cupertino.dart` and their `flutter_localizations` delegates are formally deprecated; `flutter create` projects import `package:material_ui` by default. Migrate with `dart fix --apply --code=migrate_design_widgets`. DevTools uses the standalone packages.
- Framework additions: `SliverClipRect` / `SliverClipRRect` (`clipOverlap`), `ListView.separated` `itemExtentBuilder`, `ScrollPhysics.shouldUpdate`, `RawScrollbar.mouseCursor`, `TextInputType.numberWithOptions` `password` option, `AutofillHints.emailOTPCode`, `Hyphens` enum, `DecorationImage` `placeholder`, `FadeInImageTransition.fadeInOver`, `ResizeImage` `useLogicalSize`, `Image` `useLogicalCacheSize`, `RawImage` `blendMode`, `SemanticsRole.slider`, `MediaQueryData.reduceMotion`, `FocusableActionDetector` `skipTraversal`, `showDialog` `barrierBuilder`, `Navigator.popUntilWithResult` returning its result to the last popped route.
- Desktop windowing (experimental): `WindowControllerLinux` for custom title bars and transparent windows; macOS windows can size to content before appearing; `RegularWindow` renamed `Window`, `sizedToContent` replaced by `shrinkWrap`; `WindowManager` now above `WidgetsApp`.
- Engine: Impeller SDF renderer extended to lines, thin borders, rounded corners and gradients (macOS, Linux, Windows); Flutter GPU 2D texture arrays; Windows requests OpenGL ES 3 by default with ES 2 fallback; Vulkan to OpenGL fallback on B-series PowerVR GPUs; custom embedders get Vulkan external textures and `FlutterEngineNotifyLowMemoryWarning`.
- iOS and macOS: touch events reach the framework immediately (16 ms faster on 60 Hz, 8 ms on 120 Hz); `flutter screenshot` restored on physical devices with Xcode 27; disabling Swift Package Manager now warns on every CLI command (CocoaPods trunk becomes read-only in December 2026); Intel Macs are no longer tested and the CLI warns once; `flutter config --enable-macos-arm64-only` builds Apple Silicon-only macOS apps.
- Android: release builds ignore `route`, `dart_entrypoint` and `cached_engine_id` from external `Intent` extras and reject runtime engine flags (see the two breaking change pages). Hybrid Composition++ (since 3.44; default on beta since 3.49.0-0.1.pre; stable default in a future release) requires Android 14 (API 34) or higher and Impeller on Vulkan, otherwise falls back; try it with `flutter config --enable-hcpp` and look for `Using HCPP platform view rendering strategy` in `logcat`. Plugins must migrate to AGP Built-in Kotlin (minimum `flutter: ">=3.44.0"`). New projects use AGP 9.3.1, Gradle 9.5.0, KGP 2.4.20, Java 17 minimum; `flutter.compileSdkVersion` 36, `flutter.targetSdkVersion` 36, `flutter.minSdkVersion` 24.
- AI and tooling: official Flutter agent plugins (skills, Dart and Flutter MCP server configuration, agents, rules including `flutter-hot-reload`); package authors can ship a top-level `skills/` directory in pub.dev packages, installed with `dart run skills@ get` (as written in the post), checked in CI with `package:skills_lint`. Genkit Dart reaches 1.0; a MediaPipe package for on-device tasks; a public Flutter RFC process (`flutter/rfc`).
- Deprecations and breaking changes: material / cupertino libraries; Android `Intent` verification and engine flags; `DropdownButtonFormField` `enabled`; soft hyphens; `WidgetSpan` RTL order; web `viewport-fit=cover`. Framework cleanups: `ignoringSemantics` removed from `IgnorePointer`, `AbsorbPointer`, `SliverIgnorePointer` and their render objects; `computeDryBaseline` on `RenderProxyBox` and render objects using `RenderProxyBoxMixin` returns `null` when the child has no baseline instead of failing an assertion.
- Source: https://flutter.dev/blog/whats-new-in-flutter-3-50 (flutter/website `acea420`, `sites/www/content/blog/whats-new-in-flutter-3-50/index.md`, fetched 2026-11-14).

## Related

- [Flutter 3.50.0 release notes](./release-notes-3-50.md)
- [Migrate to standalone material_ui and cupertino_ui packages](./material-ui-and-cupertino-ui.md)
- [Stricter Android Intent verification for app entrypoints](./stricter-android-entrypoint-intent-verification.md)
- [Restrict Android engine flags in release mode](./restrict-android-engine-flags-release-mode.md)
