---
source: https://docs.flutter.dev/release/breaking-changes
---

# Breaking changes and migration guides

Notices and migration guides for breaking changes in Flutter, sorted by release and listed alphabetically within each release.

## Signature / Usage

When facing Dart errors after upgrading Flutter, use `dart fix` to migrate automatically. Not every breaking change is supported this way, but many are. The page links to `/tools/flutter-fix` for details.

```console
$ dart fix --apply
```

## Notes

- Every guide follows the policy in the compatibility policy page. To be notified about future breaking changes, join the Flutter announce and Dart announce groups. To avoid being broken by future versions, submit tests to the framework test registry.
- Not yet released to stable (not treated as first-class in this skill, except the opt-in noted below): DropdownButton `enabled` property with optional `onChanged` (`dropdownbutton-enabled-property`); Migrate to standalone `material_ui` and `cupertino_ui` packages (`material-ui-and-cupertino-ui`, can be opted in to in 3.47); Stricter Android `Intent` verification for app entrypoints (`stricter-android-entrypoint-intent-verification`); Restrict Android engine flags in release mode (`restrict-android-engine-flags-release-mode`).
- Released in Flutter 3.47: OpenGL ES render-to-texture content is stored top-down (`opengles-render-to-texture-top-down`); Update semantics header and headingLevel behavior on iOS and Android (`semantics-header-heading-level`); Removal of `describeEnum` (`remove-describeEnum`; the guide's timeline says "Landed in version: TBD", "In stable release: TBD").
- Released in Flutter 3.44: Changing RawMenuAnchor close order (`raw-menu-anchor-close-order`); Deprecate `onReorder` callback (`deprecate-onreorder-callback`); Deprecate `TextInputConnection.setStyle` (`deprecate-text-input-connection-set-style`); Deprecated `cacheExtent` and `cacheExtentStyle` (`scroll-cache-extent`); `IconData` class marked as `final` (`icondata-class-marked-final`); Large screen orientation and resizability restrictions ignored on Android 17 (`android-large-screens-restrictions-ignored`); ListTile reports an error in debug when wrapped in a colored widget (`list-tile-color-warning`); Migrating Flutter Android projects to built-in Kotlin (`migrate-to-built-in-kotlin`); Page transition builders reorganization (`decouple-page-transition-builders`).
- Released in Flutter 3.41: Merged threads on Linux; `FontWeight` also controls the weight attribute of variable fonts; Deprecate `containsSemantics` in favor of `isSemantics`; Deprecate `findChildIndexCallback` in favor of `findItemIndexCallback` in `ListView` and `SliverList` separated constructors; Material 3 tokens update.
- Released in Flutter 3.38: `CupertinoDynamicColor` wide gamut support; Deprecate `OverlayPortal.targetsRootOverlay`; Deprecate `SemanticsProperties.focusable` and `SemanticsConfiguration.isFocusable`; SnackBar with action no longer auto-dismisses; The default page transition on Android is now `PredictiveBackPageTransitionBuilder`; UISceneDelegate adoption (`uiscenedelegate`).
- Releases 3.35 and earlier are listed on the page (3.35, 3.32, 3.29, 3.27, 3.24, 3.22, 3.19, 3.16, 3.13, 3.10, 3.7, 3.3, 3, 2.10, 2.5, 2.2, 2, 1.22, 1.20, 1.17; one reverted change in 2.2: Network Policy on iOS and Android) and are reachable at `https://docs.flutter.dev/release/breaking-changes/<slug>` but are not reproduced in this skill.
- Guides reproduced in this skill (3.47 and 3.44 plus the opt-in package migration) are linked below.

## Related

- [Flutter compatibility policy](./compatibility-policy.md)
- [Migrate to standalone material_ui and cupertino_ui packages](./material-ui-and-cupertino-ui.md)
- [OpenGL ES render-to-texture content is stored top-down](./opengles-render-to-texture-top-down.md)
- [Update semantics header and headingLevel behavior](./semantics-header-heading-level.md)
- [Remove describeEnum](./remove-describeEnum.md)
- [Changing RawMenuAnchor close order](./raw-menu-anchor-close-order.md)
- [Deprecate onReorder callback](./deprecate-onreorder-callback.md)
- [Deprecated cacheExtent and cacheExtentStyle](./scroll-cache-extent.md)
- [Deprecate TextInputConnection.setStyle](./deprecate-text-input-connection-set-style.md)
- [IconData class marked as final](./icondata-class-marked-final.md)
- [Large screen restrictions ignored on Android 17](./android-large-screens-restrictions-ignored.md)
- [ListTile color warning](./list-tile-color-warning.md)
- [Migrating to built-in Kotlin](./migrate-to-built-in-kotlin.md)
- [Page transition builders reorganization](./decouple-page-transition-builders.md)
