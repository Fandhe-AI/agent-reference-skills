---
source: https://flutter.dev/blog/whats-new-in-flutter-3-44
---

# What's new in Flutter 3.44

Announcement for Flutter 3.44 (published 2026-05-20): Hybrid Composition++ for Android, Swift Package Manager as the iOS/macOS default, improved Vulkan support for Impeller, previewed multi-window desktop support, the Material and Cupertino freeze, GenUI, and agent tooling (Agentic Hot Reload, Agent Skills for Dart and Flutter).

## Signature / Usage

Opt in to Hybrid Composition++ with the `--enable-hcpp` flag on `run`, or via `AndroidManifest.xml` (verbatim):

```xml
<meta-data
  android:name="io.flutter.embedding.android.EnableHcpp"
    android:value="true" />
```

Bind fragment shader uniforms by name (verbatim):

```dart
void setUp(ui.FragmentShader shader) {
  shader.getUniformFloat('foobar').set(1.234);
}
```

## Notes

- Release scope: 972 commits from 178 unique contributors (61 first-time) in the cycle; see also the Dart 3.12 release.
- Developer experience: DevTools uses Wasm by default (release notes 2.55.0 and 2.57.0 are linked); Widget Previews (experimental in 3.44) get Analysis Server-based preview detection and filtering by group, name, and script and package URIs; Mac developers on Apple Silicon no longer need Rosetta, and a future release will end Intel x86 Mac support.
- Agent tooling: Agentic Hot Reload lets the Dart and Flutter MCP server and a coding agent find and connect to running apps; the post also announces "Agent Skills for Dart and Flutter". These are Flutter / Dart tooling for coding agents, not Claude Code Agent Skills (SKILL.md); see anthropic-claude-code-extend and hermes-agent for those.
- AI: Firebase AI Logic (Server Prompt Templates), Genkit Dart (preview), LiteRT-LM support coming to `flutter_gemma`, GenUI SDK with the A2UI protocol.
- Android: Hybrid Composition++ (HCPP) is opt-in, uses Vulkan hardware buffer swapchains and `SurfaceControl` transactions, and has Android API and hardware requirements. Display corner radii are exposed via `MediaQueryData.displayCornerRadii`. AGP 9.0 and built-in Kotlin: manually applying KGP now conflicts; temporary backward compatibility was added and will be removed in a future release. Plugin authors must set a minimum Flutter version of 3.44. ABI filters are now configured once in the base `defaultConfig` block; apps using custom `abiFilters` in build types or flavors must pass `-Pdisable-abi-filtering=true`.
- iOS: Swift Package Manager replaces CocoaPods as the default dependency manager for iOS and macOS; `flutter build swift-package` packages a Flutter app or add-to-app module as a Swift Package; opt-out is `--enable-swift-package-manager: false` in `pubspec.yaml` (to be removed eventually). `UIScene` lifecycle migration reminder (no new changes in 3.44). Experimental iOS inline predictive text via `TextField.enableInlinePrediction`.
- Web: out-of-the-box `prefers-reduced-motion` support; `--base-href` support in `flutter run`.
- Desktop: Canonical becomes lead maintainer and Strategic Steward for Flutter Desktop; experimental windowing APIs (main channel only) add tooltip windows, macOS popups, and a Material `showDialog` that creates a separate child dialog window; Windows stylus support.
- Embedded: 2026 Toyota RAV4 multimedia system; LG webOS SDK announced.
- Graphics: Impeller Vulkan memory and synchronization improvements, SDF circles, shadow and perspective fixes; shader compiler warns on shaders incompatible with Skia.
- Framework: Material and Cupertino libraries are frozen as of this release; by the next stable release the in-framework versions will be deprecated in favor of `material_ui` and `cupertino_ui`. New `CupertinoMenuAnchor`, animated `MenuAnchor` (set `animated` to true; new `SubmenuButton.hoverOpenDelay`), `CupertinoSheetRoute.scrollableBuilder`, `CarouselView` infinite scrolling, `ShapedInputBorder`.
- Breaking changes and deprecations called out: `RawMenuAnchor` callback order; `showCupertinoSheet` / `CupertinoSheetRoute` `builder` and `pageBuilder` deprecated in favor of `scrollableBuilder`; `ReorderableListView` `onReorder` to `onReorderItem`; the `--web-hot-reload` flag deprecated; the `plugin_ffi` template deprecated.

## Related

- [What's new in Flutter 3.47](./whats-new-3-47.md)
- [Migrating Flutter Android projects to built-in Kotlin](./migrate-to-built-in-kotlin.md)
- [Changing RawMenuAnchor close order](./raw-menu-anchor-close-order.md)
- [Deprecate onReorder callback](./deprecate-onreorder-callback.md)
- [Breaking changes and migration guides](./breaking-changes.md)
