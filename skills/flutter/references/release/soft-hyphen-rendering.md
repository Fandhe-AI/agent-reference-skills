---
source: https://docs.flutter.dev/release/breaking-changes/soft-hyphen-rendering
---

# Soft hyphens render at line breaks

On native platforms, text now draws a hyphen when a line breaks at a soft hyphen (U+00AD). A new `Hyphens` enum controls this, and `TextStyle.getParagraphStyle` has a new `hyphens` parameter.

## Signature / Usage

Keep soft hyphens invisible. Code before migration:

```dart
Text('inter­national')
```

Code after migration:

```dart
Text('inter­national', hyphens: Hyphens.hidden)
```

Update overrides of `getParagraphStyle`. Code before migration:

```dart
@override
ui.ParagraphStyle getParagraphStyle({
  TextAlign? textAlign,
  // ...other parameters...
  StrutStyle? strutStyle,
}) {
  // ...
}
```

Code after migration:

```dart
@override
ui.ParagraphStyle getParagraphStyle({
  TextAlign? textAlign,
  // ...other parameters...
  StrutStyle? strutStyle,
  Hyphens? hyphens,
}) {
  // ...
}
```

## Options / Props

| `Hyphens` value | Behavior |
| --- | --- |
| `Hyphens.manual` (default) | Draws a hyphen at the break |
| `Hyphens.hidden` | Doesn't draw a hyphen; the soft hyphen is still a place where the line can break |

The `hyphens` parameter is available on `Text`, `RichText`, `TextPainter`, and `dart:ui`'s `ParagraphStyle`.

## Notes

- Timeline: landed in version 3.49.0-1.0.pre-294; in stable release 3.50 (all platforms except the web). On the web: landed in 3.50.0-1.0.pre-109, in stable release "After 3.50".
- Lines still break in the same places, but the hyphen widens its line, so `Paragraph.longestLine` and the size of text laid out with `TextWidthBasis.longestLine` can change. Golden image tests that contain such text might need updating.
- Widgets built on `EditableText` (`TextField`, `SelectableText`) render the hyphen but have no `hyphens` parameter yet, so there is no opt-out for them.
- Known issues in 3.50 (fixed in a later release): the hyphen can appear where a line doesn't break at the soft hyphen (end of text, before a space or line break); it can extend slightly past the paragraph width; it isn't highlighted on selection. Workaround: `hyphens: Hyphens.hidden` on `Text`, `RichText`, or `TextPainter`.
- If an override forwards to another `getParagraphStyle` or constructs a `ParagraphStyle`, pass `hyphens` through; otherwise accepting and ignoring it is enough. Mostly affects test doubles and proxies of `TextStyle`.
- Related: issue 18443; PRs 185152, 193850 (Skwasm), 194339 (CanvasKit) in flutter/flutter.
- Source: https://docs.flutter.dev/release/breaking-changes/soft-hyphen-rendering (flutter/website `acea420`, fetched 2026-11-14).

## Related

- [Breaking changes and migration guides](./breaking-changes.md)
