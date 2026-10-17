---
source: https://docs.flutter.dev/release/release-notes/release-notes-3.47.0
---

# Flutter 3.47.0 release notes

Change log for Flutter 3.47: a pull-request list grouped under "What's changed" (Framework, Material, iOS, Android, Windows, Linux, Web, Tooling, Documentation, Other changes) followed by "New contributors".

## Signature / Usage

The page is a flat PR list, not an API description. These lines are copied verbatim from it and are the ones that correspond to user-visible changes covered elsewhere in this category.

```text
* Implementation of popup windows for Win32 by @mattkae in [184516](https://github.com/flutter/flutter/pull/184516)
* Add Linux implementation of popup windows by @robert-ancell in [185866](https://github.com/flutter/flutter/pull/185866)
* [AGP 9] Update templates to AGP 9+ and to Built-in Kotlin by @jesswrd in [185953](https://github.com/flutter/flutter/pull/185953)
* [AGP 9] Support Enabling Built-in Kotlin by @jesswrd in [188543](https://github.com/flutter/flutter/pull/188543)
* Add support for high contrast and color inversion on Android by @xxxOVALxxx in [182263](https://github.com/flutter/flutter/pull/182263)
* Added useOriginalColors flag which allows ImageIcon to bypass IconTheme colorization and use the original colors by @zawhtetnaing10 in [180491](https://github.com/flutter/flutter/pull/180491)
* Add `clipBehavior` parameter to `AnimatedCrossFade` by @ishaquehassan in [184545](https://github.com/flutter/flutter/pull/184545)
* Add reportErrors to ImageStreamListener by @koji-1009 in [180327](https://github.com/flutter/flutter/pull/180327)
* [Impeller] Retire Y-coord-scale plumbing by flipping GLES at the vertex stage by @bdero in [186556](https://github.com/flutter/flutter/pull/186556)
* iOS a11y sets header trait based on heading level by @chunhtai in [186916](https://github.com/flutter/flutter/pull/186916)
* Switches Windows to OpenGLESSDF by @gaaclarke in [187877](https://github.com/flutter/flutter/pull/187877)
* Makes impeller the default renderer for windows. by @gaaclarke in [188140](https://github.com/flutter/flutter/pull/188140)
* Turn linux impeller on by default by @gaaclarke in [187573](https://github.com/flutter/flutter/pull/187573)
* Add --flavor support for Windows desktop builds by @AngeloAvv in [187034](https://github.com/flutter/flutter/pull/187034)
* Add --flavor support for Linux desktop builds by @AngeloAvv in [187029](https://github.com/flutter/flutter/pull/187029)
* Add a macosArm64Only feature flag by @LongCatIsLooong in [188598](https://github.com/flutter/flutter/pull/188598)
* Print warnings on Intel Macs / targeting Intel Macs by @LongCatIsLooong in [188835](https://github.com/flutter/flutter/pull/188835)
* [CP-beta]Fix data for design packages by @flutteractionsbot in [189742](https://github.com/flutter/flutter/pull/189742)
```

## Notes

- Section headings and what they contain: Framework (widgets, semantics, text selection, windowing API, images, animation), Material, iOS (embedder refactors, SwiftPM, LLDB, code signing), Android (AGP 9 / built-in Kotlin, embedder, accessibility), Windows, Linux, Web (CanvasKit / Skwasm, WebParagraph), Tooling (`flutter_tools`, widget preview, native assets / hooks, `record_use`), Documentation, Other changes (engine-level Impeller, DisplayList, and so on), New contributors.
- Dart SDK constraint: the list contains both "[pubspec] Bump Dart SDK constraint to ^3.13.0 by @bkonyi in 186957" (line in Framework) and "Revert "[pubspec] Bump Dart SDK constraint to ^3.13.0 (#186957)" by @Piinks in 187209". The page does not show a later reland, so do not read the constraint bump as effective from this page alone. The Dart version bundled with the pinned stable release 3.47.7 is Dart 3.13.5 (from the Flutter release manifest).
- The list ends with cherry-pick entries for the 3.47 release candidate (for example "[flutter-3.47-candidate.0] Update Flutter DEPS to Dart 171019fea4e9662698a006b1747bf78bfecbd041" and "[flutter-3.47-candidate.0] Sync engine.version to f88005a259ba379c2c1156178aa1870936be7b7f").
- The page holds roughly 900 PR entries, many of which are reverts and relands. This skill reproduces only the user-visible entries above; for narrative see the What's new in Flutter 3.47 page and for breaking changes see the breaking changes index.
- Bug-fix releases after 3.47.0 (the latest stable is 3.47.7) are not covered by this page.

## Related

- [What's new in Flutter 3.47](./whats-new-3-47.md)
- [Flutter release notes](./release-notes.md)
- [Breaking changes and migration guides](./breaking-changes.md)
