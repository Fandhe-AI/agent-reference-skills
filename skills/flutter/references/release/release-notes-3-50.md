---
source: https://docs.flutter.dev/release/release-notes/release-notes-3.50.0
---

# Flutter 3.50.0 release notes

Change log for Flutter 3.50: a pull-request list grouped under "What's changed" (Framework, Material, iOS, Android, Windows, Linux, Web, Tooling, Documentation, Other changes) followed by "New contributors".

## Signature / Usage

The page is a flat PR list, not an API description. These lines are copied verbatim from it and are the ones that correspond to user-visible changes covered elsewhere in this category.

```text
* Add AutofillHints.emailOTPCode for Android AUTOFILL_HINT_EMAIL_OTP by @jameskrupnik in [188123](https://github.com/flutter/flutter/pull/188123)
* Add barrierBuilder support to showDialog and showGeneralDialog by @Mairramer in [187992](https://github.com/flutter/flutter/pull/187992)
* Move WindowManager outside of WidgetsApp by @knopp in [188866](https://github.com/flutter/flutter/pull/188866)
* Rename RegularWindow* to Window* in the windowing API + rename sizedToContent to shrinkWrap in the windowing API by @mattkae in [189363](https://github.com/flutter/flutter/pull/189363)
* Return null from RenderProxyBoxMixin.computeDryBaseline when the child has no baseline by @Yusufihsangorgel in [189723](https://github.com/flutter/flutter/pull/189723)
* Support reduceMotion accessibility feature in MediaQuery by @cbracken in [190287](https://github.com/flutter/flutter/pull/190287)
* Add numeric-password variation to TextInputType.numberWithOptions by @AlexV525 in [190637](https://github.com/flutter/flutter/pull/190637)
* Add SliverClipRect and SliverClipRRect by @manu-sncf in [179003](https://github.com/flutter/flutter/pull/179003)
* Add HCPP feature flag, and turn it on by default in beta/master by @gmackall in [190623](https://github.com/flutter/flutter/pull/190623)
* feat: Add placeholder to DecorationImage by @rkishan516 in [191528](https://github.com/flutter/flutter/pull/191528)
* Expose skipTraversal in FocusableActionDetector by @ishaquehassan in [191308](https://github.com/flutter/flutter/pull/191308)
* Add itemExtentBuilder support to ListView.separated by @Mairramer in [191157](https://github.com/flutter/flutter/pull/191157)
* Support soft hyphen (U+00AD) rendering with a Hyphens API by @dbebawy in [185152](https://github.com/flutter/flutter/pull/185152)
* Use devicectl for screenshots on Xcode 27, remove idevicescreenshot artifact by @jmagman in [189091](https://github.com/flutter/flutter/pull/189091)
* Cleanup VSync infrastructure and improve iOS touch to present latency by @knopp in [191444](https://github.com/flutter/flutter/pull/191444)
* Add `--[no-]enable-hcpp` build flag and pipe through via Gradle manifest transformation by @gmackall in [189955](https://github.com/flutter/flutter/pull/189955)
* feat(web): support --web-content-hash for entrypoint files by @kevmoo in [190153](https://github.com/flutter/flutter/pull/190153)
* Migrate flutter create templates to material_ui by @Piinks in [192947](https://github.com/flutter/flutter/pull/192947)
* feat(web): support --web-content-hash for physical static assets by @kevmoo in [191919](https://github.com/flutter/flutter/pull/191919)
* feat(web): emit precache_manifest.json when --web-content-hash is enabled by @kevmoo in [192953](https://github.com/flutter/flutter/pull/192953)
* [Impeller] Add 2D texture array support (kTexture2DArray) by @bdero in [188778](https://github.com/flutter/flutter/pull/188778)
* [Flutter GPU] Add 2D texture array support by @bdero in [190036](https://github.com/flutter/flutter/pull/190036)
```

## Notes

- Section headings and what they contain: Framework (widgets, slivers, text input, windowing API, images, accessibility), Material, iOS (touch latency, devicectl, SwiftPM, Xcode 27), Android (HCPP, AGP 9.3.1, Intent hardening), Windows, Linux, Web (`--web-content-hash`, Wasm, WebParagraph), Tooling (`flutter_tools`, `flutter create` templates, skills lint), Documentation, Other changes (engine-level Impeller, Flutter GPU, tests), New contributors.
- The page ends with "Full Changelog: https://github.com/flutter/flutter/compare/3.47.0...3.50.0".
- The page holds roughly 1,200 PR entries, many of which are reverts and relands. This skill reproduces only the user-visible entries above; for narrative see the What's new in Flutter 3.50 page and for breaking changes see the breaking changes index.
- Bug-fix releases after 3.50.0 are not covered by this page.
- Source: https://docs.flutter.dev/release/release-notes/release-notes-3.50.0 (flutter/website `acea420`, fetched 2026-11-14).

## Related

- [What's new in Flutter 3.50](./whats-new-3-50.md)
- [Flutter release notes](./release-notes.md)
- [Breaking changes and migration guides](./breaking-changes.md)
