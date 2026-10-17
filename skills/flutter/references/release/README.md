# release

| Name | Description | Path |
|------|-------------|------|
| Large screen orientation and resizability restrictions ignored on Android 17 | For apps targeting Android 17 or higher, orientation, resizability, and aspect ratio restrictions no longer apply on displays 600dp wide or wider. | [android-large-screens-restrictions-ignored.md](./android-large-screens-restrictions-ignored.md) |
| Breaking changes and migration guides | Notices and migration guides for breaking changes in Flutter, sorted by release. | [breaking-changes.md](./breaking-changes.md) |
| Built-in Kotlin migration for app developers | Migrate Flutter apps to built-in Kotlin, for projects updating from an AGP version before 9.0.0 to AGP 9.0.0 or later. | [built-in-kotlin-app-developers.md](./built-in-kotlin-app-developers.md) |
| Built-in Kotlin migration for plugin authors | Migrate Flutter plugins to built-in Kotlin. Requires a minimum Flutter version of 3.44 for the plugin. | [built-in-kotlin-plugin-authors.md](./built-in-kotlin-plugin-authors.md) |
| Flutter compatibility policy | How Flutter approaches breaking changes: a public test registry, RFCs and migration guides, and a deprecation policy. | [compatibility-policy.md](./compatibility-policy.md) |
| Page transition builders reorganization | `CupertinoPageTransitionsBuilder` has moved from `package:material_ui` to `package:cupertino_ui`. | [decouple-page-transition-builders.md](./decouple-page-transition-builders.md) |
| Deprecate onReorder callback | The `onReorder` callback is deprecated in favor of `onReorderItem` in the reorderable list widgets. | [deprecate-onreorder-callback.md](./deprecate-onreorder-callback.md) |
| Deprecate TextInputConnection.setStyle | `TextInputConnection.setStyle` is deprecated in favor of `TextInputConnection.updateStyle`. | [deprecate-text-input-connection-set-style.md](./deprecate-text-input-connection-set-style.md) |
| IconData class marked as final | `IconData` is now `final`, so it can no longer be extended or implemented. | [icondata-class-marked-final.md](./icondata-class-marked-final.md) |
| ListTile reports an error in debug when wrapped in a colored widget | When a widget with a non-transparent background color sits between a `ListTile` and its nearest `Material` ancestor, debug mode reports an assertion error. | [list-tile-color-warning.md](./list-tile-color-warning.md) |
| Migrate to standalone material_ui and cupertino_ui packages | The Material and Cupertino design libraries are available as standalone packages, which developers can opt in to ahead of deprecation. | [material-ui-and-cupertino-ui.md](./material-ui-and-cupertino-ui.md) |
| Migrating Flutter Android projects to built-in Kotlin | Update Flutter Android Gradle files to use built-in Kotlin support, required for projects moving to AGP 9 or later. | [migrate-to-built-in-kotlin.md](./migrate-to-built-in-kotlin.md) |
| OpenGL ES render-to-texture content is stored top-down | Impeller's OpenGL ES backend now stores render-to-texture content top-down, matching Metal and Vulkan. | [opengles-render-to-texture-top-down.md](./opengles-render-to-texture-top-down.md) |
| Changing RawMenuAnchor close order | Closing a `RawMenuAnchor` now triggers `onCloseRequested` and `onClose` for all descendant `RawMenuAnchor`s in a coordinated sequence. | [raw-menu-anchor-close-order.md](./raw-menu-anchor-close-order.md) |
| Flutter 3.47.0 release notes | Change log for Flutter 3.47, a pull-request list grouped by area, followed by new contributors. | [release-notes-3-47.md](./release-notes-3-47.md) |
| Flutter release notes | Index of announcements and release notes for stable Flutter releases. | [release-notes.md](./release-notes.md) |
| Remove describeEnum | The `describeEnum` method has been removed from the Flutter framework; enums have a `name` getter since Dart 2.14. | [remove-describeEnum.md](./remove-describeEnum.md) |
| Deprecated cacheExtent and cacheExtentStyle | `cacheExtent` and `cacheExtentStyle` are deprecated in scrolling widgets, replaced by `scrollCacheExtent`. | [scroll-cache-extent.md](./scroll-cache-extent.md) |
| Update semantics header and headingLevel behavior on iOS and Android | The `header` semantics property is now a no-op on iOS and Android; heading behavior is controlled with `headingLevel`. | [semantics-header-heading-level.md](./semantics-header-heading-level.md) |
| What's new in Flutter 3.44 | Announcement for Flutter 3.44 (published 2026-05-20): Hybrid Composition++ for Android, Swift Package Manager as the iOS/macOS default, and agent tooling. | [whats-new-3-44.md](./whats-new-3-44.md) |
| What's new in Flutter 3.47 | Announcement for Flutter 3.47 (published 2026-08-12): standalone `material_ui` and `cupertino_ui` packages, and Impeller as the default renderer on macOS, Windows, and Linux. | [whats-new-3-47.md](./whats-new-3-47.md) |
