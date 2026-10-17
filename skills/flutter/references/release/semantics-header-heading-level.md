---
source: https://docs.flutter.dev/release/breaking-changes/semantics-header-heading-level
---

# Update semantics header and headingLevel behavior on iOS and Android

The `header` semantics property is now a no-op on iOS and Android. Accessibility heading behaviors are controlled with `headingLevel`.

## Signature / Usage

Before migration:

```dart
Semantics(
  header: true,
  child: Text('Section Title'),
)
```

After migration:

```dart
Semantics(
  headingLevel: 1,
  child: Text('Section Title'),
)
```

The same applies to `SemanticsProperties`: replace `header: true` with `headingLevel: 1`.

## Notes

- Timeline: landed in version 3.45.0-0.1.pre; in stable release 3.47.
- Before: on Android `header: true` mapped to `View.setHeading(true)`; on iOS it mapped to the `UIAccessibilityTraitHeader` trait. Now `header` is a no-op on iOS and Android (still available in the API), and `headingLevel` greater than `0` maps to `View.setHeading(true)` on Android and `UIAccessibilityTraitHeader` on iOS; on iOS 13 or later it also maps to `accessibilityHeadingLevel`.
- Other platforms treat the number differently: on the web, `1` through `6` map to `<h1>` through `<h6>`.
- Migration (Flutter 3.47): `Semantics(header: true, ...)` and `SemanticsProperties(header: true, ...)` should use `headingLevel: 1` (or another integer greater than `0`).
- Related API pages: `Semantics` (widgets), `SemanticsProperties` and `SemanticsConfiguration` (semantics) on api.flutter.dev.

## Related

- [Breaking changes and migration guides](./breaking-changes.md)
