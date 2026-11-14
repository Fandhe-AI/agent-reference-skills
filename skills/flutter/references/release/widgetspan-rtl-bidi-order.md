---
source: https://docs.flutter.dev/release/breaking-changes/widgetspan-rtl-bidi-order
---

# WidgetSpan order in right-to-left text

`WidgetSpan` widgets in right-to-left and mixed-direction text now follow the visual order of the Unicode bidirectional algorithm. Remove workarounds that compensated for the previous layout.

## Signature / Usage

Code before migration:

```dart
WidgetSpan(
  child: Transform.translate(
    offset: rtlSwapOffset,
    child: inlineWidget,
  ),
)
```

Code after migration:

```dart
WidgetSpan(child: inlineWidget)
```

## Notes

- Timeline: landed in version 3.50.0-0.1.pre; in stable release 3.50.
- Skia's paragraph layout previously placed inline widget placeholders in source order even when the surrounding text was visually reordered. Placeholders are now placed in bidirectional visual order; `WidgetSpan` children stay in logical reading order in Dart code. No public API signatures changed.
- If the app uses `WidgetSpan` without compensating for the old layout, no code change is needed. Otherwise remove workarounds: `Transform.translate` offsets or `GlobalKey` measurements that swap widgets on a line; reversing the source order of `WidgetSpan`s for RTL text; mirroring placeholder-box x-coordinates in custom layout code.
- In the example, `rtlSwapOffset` is an offset computed by the app's workaround and `inlineWidget` is the embedded widget. Also remove the code that calculated the compensating offsets, check RTL and mixed-direction text including wrapped lines, and update golden tests that captured the incorrect layout.
- Related: issue 54400 (flutter/flutter); Skia CL 1366676.
- Source: https://docs.flutter.dev/release/breaking-changes/widgetspan-rtl-bidi-order (flutter/website `acea420`, fetched 2026-11-14).

## Related

- [Breaking changes and migration guides](./breaking-changes.md)
