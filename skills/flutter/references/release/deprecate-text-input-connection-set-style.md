---
source: https://docs.flutter.dev/release/breaking-changes/deprecate-text-input-connection-set-style
---

# Deprecate TextInputConnection.setStyle

`TextInputConnection.setStyle` is deprecated in favor of `TextInputConnection.updateStyle`, which also synchronizes `letterSpacing`, `wordSpacing`, and `lineHeight` to the engine.

## Signature / Usage

Before migration:

```dart
connection.setStyle(
  fontFamily: 'Roboto',
  fontSize: 14.0,
  fontWeight: FontWeight.normal,
  textDirection: TextDirection.ltr,
  textAlign: TextAlign.start,
);
```

After migration:

```dart
connection.updateStyle(
  TextInputStyle(
    fontFamily: 'Roboto',
    fontSize: 14.0,
    fontWeight: FontWeight.normal,
    textDirection: TextDirection.ltr,
    textAlign: TextAlign.start,
    letterSpacing: 1.2,
    wordSpacing: 1.0,
    lineHeight: 1.5,
  ),
);
```

## Notes

- Timeline: landed in version 3.43.0-0.1.pre; in stable release 3.44.
- The old `setStyle` did not support `letterSpacing`, `wordSpacing`, or `lineHeight`, which misaligned the selection highlight and IME caret when they were used.
- Migration (Flutter 3.44): only affects authors of custom text input clients.

## Related

- [Breaking changes and migration guides](./breaking-changes.md)
